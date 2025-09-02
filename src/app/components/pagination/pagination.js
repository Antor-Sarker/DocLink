"use client";
export default function Pagination({
  currentPage,
  totalPages,
  handelPageChange,
}) {
  // Create page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex flex-wrap justify-center items-center mt-7 space-x-2 space-y-2 mb-28">
      {/* Previous Button */}
      <button
        onClick={() => handelPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 rounded-md bg-red-400 hover:bg-red-600 cursor-pointer disabled:opacity-50"
      >
        Prev
      </button>

      {/* Page Numbers */}
      {pageNumbers?.map((num) => (
        <button
          key={num}
          onClick={() => handelPageChange(num)}
          className={`px-3 py-1 rounded-md cursor-pointer ${
            num === currentPage
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
        >
          {num}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handelPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-2 py-1 rounded-md bg-red-400 hover:bg-red-600 cursor-pointer disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}
