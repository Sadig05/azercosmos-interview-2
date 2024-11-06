/*
  TODO: 
  Implement the functionality of Search, Pagination, Sort by column and Row size control
*/

import { useEffect, useState } from "react";
import { fakeData } from "./data";
import "./index.css";

export default function App() {
  const pageNumbers = [];
  const [search, setSearch] = useState("");
  const [data, setData] = useState(fakeData);
  const [toggleSort, setToggleSort] = useState(false);
  const [currentPage, setCurrentPages] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  const sortNames = () => {
    setToggleSort((prev) => !prev);

    setData((prev) =>
      prev?.sort((a, b) =>
        toggleSort ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
      )
    );
  };

  const totalPageNumbers = () => {
    for (let i = 1; i <= Math.ceil(data.length / pageSize); i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const changePage = (pageNum) => {
    setCurrentPages(pageNum);
  };

  useEffect(() => {
    if (search) {
      setData((prev) =>
        prev.filter((item) =>
          item?.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    } else {
      setData(fakeData);
    }
  }, [search]);

  console.log(pageNumbers, " sad");

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
              <th>
                Name
                <button onClick={sortNames} className="ml-2 p-[2px]">
                  {toggleSort ? <>^</> : <>%</>}
                </button>
              </th>
              <th>
                Email<button className="ml-2 p-[2px]">^</button>
              </th>
              <th>
                Occupation<button className="ml-2 p-[2px]">^</button>
              </th>
              <th>
                City<button className="ml-2 p-[2px]">^</button>
              </th>
              <th>
                Country<button className="ml-2 p-[2px]">^</button>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((data, index) => {
              return (
                <tr key={index} className="border">
                  <td>{data.name}</td>
                  <td className="font-bold">{data.email}</td>
                  <td>{data.occupation}</td>
                  <td className="text-[green]">{data.city}</td>
                  <td>{data.country}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}

      <div className="flex justify-between">
        <div>
          <label htmlFor="row-size" className="flex gap-2 py-[5px]">
            <span className="font-bold text-sm">Row size</span>
            <select
              id="row-size"
              className="text-sm"
              value={pageSize}
              onChange={(e) => setPageSize(e.target.value)}
            >
              <option value={15} key={15}>
                15
              </option>
              <option value={25} key={25}>
                25
              </option>
              <option value={50} key={50}>
                50
              </option>
            </select>
          </label>
        </div>

        <div></div>

        <div className="pagination flex justify-center items-center gap-4">
          <button className="p-[5px]">{"<"}</button>

          <div className="flex gap-2">
            {totalPageNumbers()?.map((item) => (
              <button
                key={item}
                className={` p-[5px] ${
                  currentPage == item ? "active-pg-num" : ""
                }`}
              >
                {item}
              </button>
            ))}

            {/* <button className="p-[5px] active-pg-num">1</button>
            <button className="p-[5px] ">2</button>
            <button className="p-[5px] ">3</button>
            <button className="p-[5px] ">...</button>
            <button className="p-[5px] ">10</button> */}
          </div>

          <button className="p-[5px]">{">"}</button>
        </div>
      </div>
    </div>
  );
}
