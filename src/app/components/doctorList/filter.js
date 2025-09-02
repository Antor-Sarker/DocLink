import { FunnelIcon } from "@heroicons/react/24/outline";

export default function Filter() {
  return (
    <div className="flex w-full sm:w-auto items-center gap-3">
      <div className="flex items-center border rounded-2xl px-3 py-2 shadow-sm bg-white">
        <FunnelIcon className="w-5 h-5 text-gray-500 mr-2" />
        <select
          // value={category}
          // onChange={(e) => setCategory(e.target.value)}
          className="outline-none text-sm bg-transparent"
        >
          <option value="">All Specializations</option>
          <option value="electronics">Electronics</option>
          <option value="fashion">Fashion</option>
          <option value="books">Books</option>
        </select>
      </div>
    </div>
  );
}
