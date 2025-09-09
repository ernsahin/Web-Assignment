interface BulkActionsProps {
  selectedCount: number;
  onDelete: () => void;
  itemName: string; // "Post" or "User"
}

function BulkActions({ selectedCount, onDelete, itemName }: BulkActionsProps) {
  if (selectedCount === 0) return null;

  return (
    <button
      onClick={onDelete}
      className="inline-flex items-center px-3 py-1 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors"
    >
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
        />
      </svg>
      Delete {selectedCount} Selected {itemName}
      {selectedCount > 1 ? "s" : ""}
    </button>
  );
}

export default BulkActions;
