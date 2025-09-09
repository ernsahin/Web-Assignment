import { useState } from "react";
import type { User, CreateUser } from "../types";
import { fetchUsers, createUser, updateUser, deleteUser } from "../api";
import { AxiosError } from "axios";
import { useDataFetching } from "../hooks/useDataFetching";
import SearchInput from "./shared/SearchInput";
import DeleteModal from "./shared/DeleteModal";
import DataTable from "./shared/DataTable";
import BulkActions from "./shared/BulkActions";
import EmptyState from "./shared/EmptyState";
import Pagination from "./shared/Pagination";
import EntityForm from "./forms/EntityForm";
import TextField from "./forms/fields/TextField";

function Users() {
  const {
    data: users,
    loading,
    error: fetchError,
    refetch,
  } = useDataFetching(() => fetchUsers());
  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<CreateUser>({
    name: "",
    username: "",
    email: "",
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedUsers, setSelectedUsers] = useState<Set<number>>(new Set());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{
    show: boolean;
    userId?: number;
    isMultiple?: boolean;
  }>({ show: false });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-red-800">
        Error: {fetchError}
      </div>
    );
  }

  if (!users) {
    return (
      <div className="text-center text-gray-500">No users data available</div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation for uniqueness
    if (editingUser) {
      // When editing, check if email/username belongs to a different user
      const emailConflict = users.find(
        (u) =>
          u.id !== editingUser.id &&
          u.email.toLowerCase() === formData.email.toLowerCase(),
      );
      const usernameConflict = users.find(
        (u) =>
          u.id !== editingUser.id &&
          u.username.toLowerCase() === formData.username.toLowerCase(),
      );

      if (emailConflict) {
        setError(
          `Email "${formData.email}" is already in use by another user.`,
        );
        return;
      }

      if (usernameConflict) {
        setError(
          `Username "${formData.username}" is already in use by another user.`,
        );
        return;
      }
    } else {
      // When creating, check if email/username already exists
      const emailConflict = users.find(
        (u) => u.email.toLowerCase() === formData.email.toLowerCase(),
      );
      const usernameConflict = users.find(
        (u) => u.username.toLowerCase() === formData.username.toLowerCase(),
      );

      if (emailConflict) {
        setError(`Email "${formData.email}" is already in use.`);
        return;
      }

      if (usernameConflict) {
        setError(`Username "${formData.username}" is already in use.`);
        return;
      }
    }

    try {
      if (editingUser) {
        await updateUser(editingUser.id, {
          ...editingUser,
          ...formData,
        });
        await refetch();
        setEditingUser(null);
      } else {
        await createUser(formData);
        await refetch();
        setShowCreateForm(false);
      }
      setFormData({ name: "", username: "", email: "" });
      setError(null);
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.message) {
        setError(error.message);
      } else {
        setError("Failed to save user");
      }
      console.error(err);
    }
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      username: user.username,
      email: user.email,
    });
    setShowCreateForm(false);
    setError(null);
  };

  const handleDelete = async (id: number) => {
    setShowDeleteConfirm({ show: true, userId: id, isMultiple: false });
  };

  const handleBulkDelete = () => {
    if (selectedUsers.size === 0) return;
    setShowDeleteConfirm({ show: true, isMultiple: true });
  };

  const confirmDelete = async () => {
    try {
      if (showDeleteConfirm.isMultiple) {
        await Promise.all(
          Array.from(selectedUsers).map((id) => deleteUser(id)),
        );
        setSelectedUsers(new Set());
      } else if (showDeleteConfirm.userId) {
        await deleteUser(showDeleteConfirm.userId);
      }
      await refetch();
      setShowDeleteConfirm({ show: false });
    } catch (err) {
      setError("Failed to delete user(s)");
      console.error(err);
    }
  };

  const toggleUserSelection = (userId: number) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedUsers.size === paginatedUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(paginatedUsers.map((u) => u.id)));
    }
  };

  const resetForm = () => {
    setFormData({ name: "", username: "", email: "" });
    setShowCreateForm(false);
    setEditingUser(null);
    setError(null);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const usersPerPage = 10;
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage,
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">User List</h1>
          <BulkActions
            selectedCount={selectedUsers.size}
            onDelete={handleBulkDelete}
            itemName="User"
          />
        </div>
        <button
          onClick={() => {
            setError(null);
            setShowCreateForm(!showCreateForm);
          }}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
          Add User
        </button>
      </div>
      {(showCreateForm || editingUser) && (
        <EntityForm
          title="User"
          mode={editingUser ? "edit" : "create"}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          error={error}
          submitLabel={editingUser ? "Update" : "Add"}
        >
          <TextField
            label="Name"
            value={formData.name}
            onChange={(v) => setFormData({ ...formData, name: v })}
            required
            maxLength={30}
          />
          <TextField
            label="Username"
            value={formData.username}
            onChange={(v) => setFormData({ ...formData, username: v })}
            required
            maxLength={30}
          />
          <TextField
            label="Email"
            type="email"
            value={formData.email}
            onChange={(v) => setFormData({ ...formData, email: v })}
            required
            maxLength={30}
          />
        </EntityForm>
      )}

      <SearchInput
        placeholder="Search for users..."
        value={searchTerm}
        onChange={setSearchTerm}
        onPageReset={() => setCurrentPage(1)}
      />

      {paginatedUsers.length === 0 ? (
        <EmptyState
          icon={
            <svg
              className="h-6 w-6 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
              />
            </svg>
          }
          title={searchTerm ? "No users found" : "No users yet"}
          description={
            searchTerm
              ? `No users match "${searchTerm}". Try a different search term.`
              : "Get started by adding your first user."
          }
          actionButton={
            !searchTerm
              ? {
                  label: "Add Your First User",
                  onClick: () => setShowCreateForm(true),
                }
              : undefined
          }
        />
      ) : (
        <DataTable
          data={paginatedUsers}
          columns={[
            {
              key: "id",
              label: "ID",
              render: (user: User) => (
                <span className="whitespace-nowrap text-sm">{user.id}</span>
              ),
            },
            {
              key: "name",
              label: "NAME",
              render: (user: User) => (
                <div className="text-sm leading-tight">
                  <span
                    className="block"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      wordBreak: "break-word",
                    }}
                  >
                    {user.name}
                  </span>
                </div>
              ),
            },
            {
              key: "username",
              label: "USERNAME",
              render: (user: User) => (
                <div className="text-sm leading-tight text-gray-600">
                  <span
                    className="block"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      wordBreak: "break-word",
                    }}
                  >
                    {user.username}
                  </span>
                </div>
              ),
            },
            {
              key: "email",
              label: "EMAIL",
              render: (user: User) => (
                <div className="text-sm leading-tight">
                  <span
                    className="block"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      wordBreak: "break-word",
                    }}
                  >
                    {user.email}
                  </span>
                </div>
              ),
            },
          ]}
          selectedItems={selectedUsers}
          onItemSelect={(id) => toggleUserSelection(id as number)}
          onSelectAll={toggleSelectAll}
          getItemId={(user) => user.id}
          actions={(user) => (
            <>
              <button
                onClick={() => handleEdit(user)}
                className="text-blue-600 hover:text-blue-900 mr-4 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="text-red-600 hover:text-red-900 transition-colors"
              >
                Delete
              </button>
            </>
          )}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        totalItems={filteredUsers.length}
        itemsPerPage={usersPerPage}
        itemName="users"
        onPageChange={setCurrentPage}
      />

      <DeleteModal
        show={showDeleteConfirm.show}
        title={showDeleteConfirm.isMultiple ? "Delete Users" : "Delete User"}
        message={
          showDeleteConfirm.isMultiple
            ? `Are you sure you want to delete ${selectedUsers.size} selected users? This action cannot be undone.`
            : "Are you sure you want to delete this user? This action cannot be undone."
        }
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm({ show: false })}
      />
    </div>
  );
}
export default Users;
