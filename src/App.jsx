import { useEffect, useState } from "react";
import { fakeData } from "./data";
import "./index.css";

export default function App() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState(fakeData);
  const [filteredData, setFilteredData] = useState(fakeData);
  const [toggleSort, setToggleSort] = useState({ column: "", ascending: true });
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const totalPageNumbers = () => {
    return Array.from({ length: Math.ceil(filteredData.length / pageSize) }, (_, i) => i + 1);
  };

  const changePage = (pageNum) => {
    setCurrentPage(pageNum);
  };

  const sortData = (column) => {
    setToggleSort((prev) => ({
      column,
      ascending: prev.column === column ? !prev.ascending : true
    }));

    setFilteredData((prev) =>
      [...prev].sort((a, b) => {
        const order = toggleSort.ascending ? 1 : -1;
        return a[column].localeCompare(b[column]) * order;
      })
    );
  };

  useEffect(() => {
    const filtered = fakeData.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); 
  }, [search]);

  useEffect(() => {
    setFilteredData(fakeData); 
  }, []);

  const paginatedData = filteredData.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  return (
    <div className="p-[20px] flex flex-col gap-2">
      {/* SEARCH */}
      <div className="flex gap-8">
        <div>
          <input
            className="p-2 border border-black min-w-[300px]"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* GRID SELF */}
      <div className="max-h-[calc(100vh-200px)] overflow-scroll border-b-2 border-[black]">
        <table className="table-layout w-full text-sm">
          <thead className="bg-[black] text-white">
            <tr className="text-left h-[35px]">
              {["name", "email", "occupation", "city", "country"].map((col) => (
                <th key={col}>
                  {col.charAt(0).toUpperCase() + col.slice(1)}
                  <button onClick={() => sortData(col)} className="ml-2 p-[2px]">
                    {toggleSort.column === col && toggleSort.ascending ? "↑" : "↓"}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index} className="border">
                <td>{item.name}</td>
                <td className="font-bold">{item.email}</td>
                <td>{item.occupation}</td>
                <td className="text-[green]">{item.city}</td>
                <td>{item.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION AND ROW SIZE CONTROL */}
      <div className="flex justify-between">
        <div>
          <label htmlFor="row-size" className="flex gap-2 py-[5px]">
            <span className="font-bold text-sm">Row size</span>
            <select
              id="row-size"
              className="text-sm"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1); // Reset to page 1 when page size changes
              }}
            >
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </label>
        </div>

        <div className="pagination flex justify-center items-center gap-4">
          <button
            className="p-[5px]"
            onClick={() => changePage(Math.max(currentPage - 1, 1))}
          >
            {"<"}
          </button>
          <div className="flex gap-2">
            {totalPageNumbers().map((item) => (
              <button
                key={item}
                className={`p-[5px] ${currentPage === item ? "active-pg-num" : ""}`}
                onClick={() => changePage(item)}
              >
                {item}
              </button>
            ))}
          </div>
          <button
            className="p-[5px]"
            onClick={() => changePage(Math.min(currentPage + 1, totalPageNumbers().length))}
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
}
