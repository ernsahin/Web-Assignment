import React from "react";

interface EntityFormProps {
  title: string;
  mode: "create" | "edit";
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  children: React.ReactNode;
  error?: string | null;
  submitLabel?: string;
  submitting?: boolean;
}

function EntityForm({
  title,
  mode,
  onSubmit,
  onCancel,
  children,
  error,
  submitLabel,
  submitting,
}: EntityFormProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {mode === "edit" ? `Edit ${title}` : `Add New ${title}`}
      </h3>
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4 flex justify-between">
          <p className="text-red-700 text-sm">{error}</p>
          <button
            onClick={onCancel}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            ✕
          </button>
        </div>
      )}
      <form onSubmit={onSubmit} autoComplete="off" className="space-y-5">
        {children}
        <div className="flex space-x-3 pt-2">
          <button
            type="submit"
            disabled={submitting}
            className="inline-flex items-center px-4 py-2 bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {submitting
              ? "Saving..."
              : submitLabel || (mode === "edit" ? "Update" : "Add")}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex items-center px-4 py-2 bg-gray-600 text-white text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EntityForm;
