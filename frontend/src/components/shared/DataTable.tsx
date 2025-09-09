interface Column<T> {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  selectedItems: Set<number | string>;
  onItemSelect: (id: number | string) => void;
  onSelectAll: () => void;
  getItemId: (item: T) => number | string;
  actions?: (item: T) => React.ReactNode;
}

function DataTable<T>({
  data,
  columns,
  selectedItems,
  onItemSelect,
  onSelectAll,
  getItemId,
  actions,
}: DataTableProps<T>) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table
          className="w-full divide-y divide-gray-200"
          style={{ tableLayout: "fixed", minWidth: "800px" }}
        >
          <thead className="bg-gray-50">
            <tr>
              <th style={{ width: "60px" }} className="px-4 py-3 text-left">
                <label htmlFor="select-all-items" className="sr-only">
                  Select all items
                </label>
                <input
                  id="select-all-items"
                  name="select-all-items"
                  type="checkbox"
                  checked={
                    selectedItems.size === data.length && data.length > 0
                  }
                  onChange={onSelectAll}
                  aria-label="Select all items"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
              </th>
              {columns.map((column) => {
                let width = "120px"; // default
                if (column.key === "id") width = "80px";
                if (column.key === "userId") width = "100px";
                if (column.key === "title") width = "250px";
                if (column.key === "name") width = "150px";
                if (column.key === "username") width = "150px";
                if (column.key === "email") width = "200px";
                if (column.key === "author") width = "180px";

                return (
                  <th
                    key={column.key}
                    style={{ width }}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.label}
                  </th>
                );
              })}
              {actions && (
                <th
                  style={{ width: "120px" }}
                  className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item) => {
              const itemId = getItemId(item);
              return (
                <tr
                  key={itemId}
                  className={`hover:bg-gray-50 ${
                    selectedItems.has(itemId) ? "bg-blue-50" : ""
                  }`}
                >
                  <td className="px-4 py-4 whitespace-nowrap align-top">
                    <label
                      htmlFor={`select-item-${itemId}`}
                      className="sr-only"
                    >
                      Select item {itemId}
                    </label>
                    <input
                      id={`select-item-${itemId}`}
                      name={`select-item-${itemId}`}
                      type="checkbox"
                      checked={selectedItems.has(itemId)}
                      onChange={() => onItemSelect(itemId)}
                      aria-label={`Select item ${itemId}`}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                  </td>
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-4 py-4 text-sm text-gray-900 align-top"
                    >
                      {column.render(item)}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-4 py-4 whitespace-nowrap text-center text-sm font-medium align-top">
                      {actions(item)}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DataTable;
