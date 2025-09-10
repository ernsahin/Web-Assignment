import { useState } from "react";
import type { Post, CreatePost } from "../types";
import {
  fetchPosts,
  createPost,
  updatePost,
  deletePost,
  fetchUsers,
} from "../api";
import { useDataFetching } from "../hooks/useDataFetching";

import SearchInput from "./shared/SearchInput";
import DeleteModal from "./shared/DeleteModal";
import DataTable from "./shared/DataTable";
import BulkActions from "./shared/BulkActions";
import EmptyState from "./shared/EmptyState";
import Pagination from "./shared/Pagination";
import EntityForm from "./forms/EntityForm";
import TextField from "./forms/fields/TextField";
import SelectField from "./forms/fields/SelectField";
import Toast from "./shared/Toast";

interface UserOption {
  value: number;
  label: string;
}

function Posts() {
  const {
    data: posts,
    loading: postsLoading,
    error: postsError,
    refetch: refetchPosts,
  } = useDataFetching(() => fetchPosts());
  const {
    data: users,
    loading: usersLoading,
    error: usersError,
    refetch: refetchUsers,
  } = useDataFetching(() => fetchUsers());

  const loading = postsLoading || usersLoading;
  const fetchError = postsError || usersError;

  const [error, setError] = useState<string | null>(null);
  const [showCreateForm, setShowCreateForm] = useState<boolean>(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedUserOption, setSelectedUserOption] =
    useState<UserOption | null>(null);
  const [selectedPosts, setSelectedPosts] = useState<Set<number>>(new Set());
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<{
    show: boolean;
    postId?: number;
    isMultiple?: boolean;
  }>({ show: false });
  const [formData, setFormData] = useState<CreatePost>({
    userId: 1,
    title: "",
  });
  const [toast, setToast] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({ show: false, message: "", type: "success" });

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

  if (!posts || !users) {
    return <div className="text-center text-gray-500">No data available</div>;
  }

  const getUserName = (userId: number): string => {
    const user = users.find((u) => u.id === userId);
    return user ? user.name : `User ${userId}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingPost) {
        await updatePost(editingPost.id, {
          ...editingPost,
          title: formData.title,
        });
        await refetchPosts();
        setEditingPost(null);
        setToast({
          show: true,
          message: "Post updated successfully!",
          type: "success",
        });
      } else {
        await createPost(formData);
        await refetchPosts();
        setShowCreateForm(false);
        setToast({
          show: true,
          message: "Post created successfully!",
          type: "success",
        });
      }
      setFormData({ userId: 1, title: "" });
      setSelectedUserOption(null);
      setError(null);
    } catch (err) {
      setError("Failed to save post");
      console.error(err);
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setFormData({ userId: post.userId, title: post.title });
    setShowCreateForm(false);
    const userOption = users.find((u) => u.id === post.userId);
    if (userOption) {
      setSelectedUserOption({
        value: userOption.id,
        label: `${userOption.name} (@${userOption.username})`,
      });
    }
  };

  const handleDelete = (id: number) => {
    setShowDeleteConfirm({ show: true, postId: id, isMultiple: false });
  };

  const handleBulkDelete = () => {
    if (selectedPosts.size === 0) return;
    setShowDeleteConfirm({ show: true, isMultiple: true });
  };

  const confirmDelete = async () => {
    try {
      if (showDeleteConfirm.isMultiple) {
        await Promise.all(
          Array.from(selectedPosts).map((id) => deletePost(id)),
        );
        setSelectedPosts(new Set());
      } else if (showDeleteConfirm.postId) {
        await deletePost(showDeleteConfirm.postId);
      }
      await refetchPosts();
      setShowDeleteConfirm({ show: false });
      setToast({
        show: true,
        message: showDeleteConfirm.isMultiple
          ? `${selectedPosts.size} posts deleted successfully!`
          : "Post deleted successfully!",
        type: "success",
      });
    } catch (err) {
      setError("Failed to delete post(s)");
      console.error(err);
    }
  };

  const togglePostSelection = (postId: number) => {
    const newSelected = new Set(selectedPosts);
    if (newSelected.has(postId)) {
      newSelected.delete(postId);
    } else {
      newSelected.add(postId);
    }
    setSelectedPosts(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedPosts.size === paginatedPosts.length) {
      setSelectedPosts(new Set());
    } else {
      setSelectedPosts(new Set(paginatedPosts.map((p) => p.id)));
    }
  };

  const resetForm = () => {
    setFormData({ userId: 1, title: "" });
    setShowCreateForm(false);
    setEditingPost(null);
    setSelectedUserOption(null);
  };

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      getUserName(post.userId).toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const postsPerPage = 10;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const paginatedPosts = filteredPosts.slice(
    startIndex,
    startIndex + postsPerPage,
  );

  const userOptions: UserOption[] = users.map((user) => ({
    value: user.id,
    label: `${user.name} (@${user.username})`,
  }));

  const handleUserSelect = (option: UserOption | null) => {
    setSelectedUserOption(option);
    if (option) {
      setFormData({ ...formData, userId: option.value });
    } else {
      setFormData({ ...formData, userId: 0 });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-900">Post List</h1>
          <BulkActions
            selectedCount={selectedPosts.size}
            onDelete={handleBulkDelete}
            itemName="Post"
          />
        </div>
        <button
          onClick={async () => {
            if (!showCreateForm) {
              try {
                await refetchUsers();
              } catch (err) {
                console.error("Failed to refresh users:", err);
              }
            }
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
          Add Post
        </button>
      </div>

      {(showCreateForm || editingPost) && (
        <EntityForm
          title="Post"
          mode={editingPost ? "edit" : "create"}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          submitLabel={editingPost ? "Update" : "Add"}
          error={error}
        >
          {editingPost ? (
            <TextField
              label="User"
              value={`${
                users.find((u) => u.id === formData.userId)?.name || "Unknown"
              } (@${
                users.find((u) => u.id === formData.userId)?.username ||
                "unknown"
              })`}
              onChange={() => {}}
              disabled
            />
          ) : (
            <SelectField
              label="User"
              value={selectedUserOption}
              onChange={(opt) => {
                handleUserSelect(opt);
              }}
              required
              options={userOptions}
              placeholder="Select user..."
            />
          )}
          <TextField
            label="Title"
            value={formData.title}
            onChange={(v) => setFormData({ ...formData, title: v })}
            required
            maxLength={100}
          />
        </EntityForm>
      )}

      <SearchInput
        placeholder="Search posts..."
        value={searchTerm}
        onChange={setSearchTerm}
        onPageReset={() => setCurrentPage(1)}
      />

      {paginatedPosts.length === 0 ? (
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          }
          title={searchTerm ? "No posts found" : "No posts yet"}
          description={
            searchTerm
              ? `No posts match "${searchTerm}". Try a different search term.`
              : "Get started by creating your first post."
          }
          actionButton={
            !searchTerm
              ? {
                  label: "Create Your First Post",
                  onClick: async () => {
                    try {
                      await refetchUsers();
                    } catch (err) {
                      console.error("Failed to refresh users:", err);
                    }
                    setShowCreateForm(true);
                  },
                }
              : undefined
          }
        />
      ) : (
        <DataTable
          data={paginatedPosts}
          columns={[
            {
              key: "id",
              label: "ID",
              render: (post: Post) => (
                <span className="whitespace-nowrap text-sm">{post.id}</span>
              ),
            },
            {
              key: "userId",
              label: "USERID",
              render: (post: Post) => (
                <span className="whitespace-nowrap text-sm">{post.userId}</span>
              ),
            },
            {
              key: "title",
              label: "TITLE",
              render: (post: Post) => (
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
                    {post.title}
                  </span>
                </div>
              ),
            },
            {
              key: "author",
              label: "AUTHOR",
              render: (post: Post) => (
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
                    {getUserName(post.userId)}
                  </span>
                </div>
              ),
            },
          ]}
          selectedItems={selectedPosts}
          onItemSelect={(id) => togglePostSelection(id as number)}
          onSelectAll={toggleSelectAll}
          getItemId={(post) => post.id}
          actions={(post) => (
            <>
              <button
                onClick={() => handleEdit(post)}
                className="text-blue-600 hover:text-blue-900 mr-4 transition-colors"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(post.id)}
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
        totalItems={filteredPosts.length}
        itemsPerPage={postsPerPage}
        itemName="posts"
        onPageChange={setCurrentPage}
      />

      <DeleteModal
        show={showDeleteConfirm.show}
        title={showDeleteConfirm.isMultiple ? "Delete Posts" : "Delete Post"}
        message={
          showDeleteConfirm.isMultiple
            ? `Are you sure you want to delete ${selectedPosts.size} selected posts? This action cannot be undone.`
            : "Are you sure you want to delete this post? This action cannot be undone."
        }
        onConfirm={confirmDelete}
        onCancel={() => setShowDeleteConfirm({ show: false })}
      />
      
      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}

export default Posts;
