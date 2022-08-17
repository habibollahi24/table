import React from "react";
import { HiDotsVertical } from "react-icons/hi";

const Table = ({ userData, filterByUserSelected, onAction }) => {
  // md:border-spacing-4 border-separate
  return (
    <>
      <div className=" rounded-2xl overflow-auto md:overflow-hidden border border-blue-200 ">
        <table className="w-full md:table-fixed">
          <thead className="bg-blue-300">
            <tr className="text-sm md:text-lg text-gray-600  ">
              <th className="hidden md:table-cell w-[10%]">
                <input type="checkbox" />
              </th>
              <th>Users</th>
              <th>Contact</th>
              <th>Todo</th>
              <th className="hidden md:block ">Completed</th>
              <th className="md:hidden">Comp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterByUserSelected.map((todo) => {
              const linkedUser = userData.find((user) => user.id === todo.userId);

              return (
                <tr key={todo.id} className="border-b ">
                  <td className=" hidden md:table-cell text-center">
                    <input type="checkbox" />
                  </td>
                  <td className="text-center  ">
                    <div className="">
                      <div className="text-sm md:text-base font-semibold text-gray-800 ">
                        {linkedUser && linkedUser.name}
                      </div>
                      <div className="text-xs font-semibold text-gray-500 ">
                        {linkedUser && linkedUser.company.name}
                      </div>
                    </div>
                  </td>
                  <td className="text-center ">
                    <div className="text-xs font-semibold text-gray-500 ">
                      {linkedUser && linkedUser.email}
                    </div>
                    <div className="text-xs  text-gray-500 ">{linkedUser && linkedUser.phone}</div>
                  </td>
                  <td className="text-center  text-xs md:text-sm font-semibold text-gray-500 ">
                    {todo.title}
                    {/* .slice(0, 15) */}
                  </td>
                  <td className="">
                    <div
                      className={`text-center text-xs  font-semibold hidden md:block ${
                        todo.completed === true
                          ? "Completed"
                          : todo.completed === false
                          ? "InCompleted"
                          : "unActive"
                      } `}
                    >
                      {todo.completed === true
                        ? "Completed"
                        : todo.completed === false
                        ? "InCompleted"
                        : "unActive"}
                    </div>
                    <div
                      className={`text-center text-xs font-semibold md:hidden ${
                        todo.completed === true
                          ? "Completed"
                          : todo.completed === false
                          ? "InCompleted"
                          : "unActive"
                      } `}
                    >
                      {todo.completed === true ? "Comp" : todo.completed === false ? "InCo" : "unA"}
                    </div>
                  </td>
                  <td className=" text-center ">
                    <div className="flex items-center text-center justify-center md:space-x-5 ">
                      <HiDotsVertical className="hidden md:block" />

                      <select
                        className="border-2 border-gray-300 rounded-md text-xs py-1 px-2 w-12 md:w-auto "
                        onChange={(e) => onAction(e, todo.id)}
                      >
                        <option value=""></option>
                        <option value="completed" name="completed">
                          completed
                        </option>
                        <option value="unCompleted" name="unCompleted">
                          unCompleted
                        </option>
                      </select>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
