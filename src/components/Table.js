import axios from "axios";
import { useEffect, useState } from "react";
import { HiDotsVertical, HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import "../paginate.css";

const Table = () => {
  const [userData, setUserData] = useState([]);
  const [todos, setTodos] = useState([]);
  const [todosSliced, setTodosSliced] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(10); //هرصفحه10تا
  const [pageCount, setPageCount] = useState(0); //تعدادکل صفحات
  const [actionValue, setActionValue] = useState("");
  const [searchItem, setSearchItem] = useState("");
  // const [allUserData, setAllUserData] = useState([]);

  const changePerPageHandler = (e) => {
    setPerPage(+e.target.value);
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    console.log(selectedPage);
    if (perPage === 10) setOffset(selectedPage * 10);
    if (perPage === 5) setOffset(selectedPage * 5);
  };

  const changeActionHandler = (e, id) => {
    setActionValue(e.target.value);
    const selectActions = todosSliced.map((todo) => {
      if (todo.id === id) {
        let result =
          e.target.value === "completed"
            ? true
            : e.target.value === "unCompleted"
            ? false
            : "unActive";
        return { ...todo, completed: result };
      } else {
        console.log("bye");
        return todo;
      }
    });
    setTodosSliced(selectActions);
  };

  const searchHandler = (e) => {
    setSearchItem(e.target.value);
    // if (e.target.value !== "") {
    //   const filteredBySearch = todos.filter((todo) => {
    //     return Object.values(todo).join(" ").toLowerCase().includes(e.target.value.toLowerCase());
    //   });
    //   setTodosSliced(filteredBySearch);
    // } else {
    //   setTodosSliced(todos);
    // }
  };

  useEffect(() => {
    const fetchTodos = async () => {
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/todos");
      setTodos(data);
      const sliced = data.slice(offset, offset + perPage);

      setTodosSliced(sliced);
      setPageCount(Math.ceil(data.length / perPage)); //200/10==>20
    };

    const fetchUsers = async () => {
      const { data } = await axios.get("https://jsonplaceholder.typicode.com/users");
      setUserData(data);
    };
    fetchTodos();
    fetchUsers();
  }, [offset, perPage]);

  // useEffect(() => {
  //   // let searchResult = todos;
  //   // searchResult = searchResult.filter((todo) => {
  //   //   // console.log(todo.id.toString().includes());
  //   //   return todo.id.toString().includes(searchItem);
  //   // });
  //   // setTodosSliced(searchResult);
  // }, [todos]);

  return (
    <>
      <div className="flex flex-col md:flex-row space-y-5 justify-between items-center my-8">
        <div className="flex  items-center text-gray-700 font-semibold">
          <label>Show</label>
          <select
            className="border-2 border-gray-300 rounded-md py-1 px-2 mx-2 w-28"
            onChange={changePerPageHandler}
            value={perPage}
          >
            <option value={10} name="10">
              10
            </option>
            <option value={5} name="5">
              5
            </option>
          </select>
          entries
        </div>

        <div>
          <input
            value={searchItem}
            onChange={searchHandler}
            type="text"
            placeholder=" search name , etc"
            className="border-2 border-gray-300 rounded-md py-1 px-2 placeholder:italic placeholder:text-gray-500 placeholder:text-base placeholder:font-semibold"
          />
        </div>
      </div>
      <div className=" ">
        <div className=" rounded-2xl  overflow-auto md:overflow-hidden border-2 md:px-4 ">
          <table className="  w-full  border-spacing-4 border-separate  ">
            <thead className=" ">
              <tr className=" ">
                <th>
                  <input type="checkbox" />
                </th>
                <th>Users</th>
                <th>Contact</th>
                <th>Todo</th>
                <th>Completed</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {todosSliced.map((todo) => {
                const linkedUser = userData.find((user) => user.id === todo.userId);

                return (
                  <tr key={todo.id} className="border-b ">
                    <td className="text-center">
                      <input type="checkbox" />
                    </td>
                    <td className="text-center  ">
                      <div className="">
                        <div className="text-base font-semibold text-gray-800 ">
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
                      <div className="text-xs font-semibold text-gray-500 ">
                        {linkedUser && linkedUser.phone}
                      </div>
                    </td>
                    <td className="text-center p-4 text-sm font-semibold text-gray-500 ">
                      userId:{todo.userId}-id:{todo.id}-{todo.title.slice(0, 15)}
                    </td>
                    <td>
                      <div
                        className={`text-center text-xs font-semibold ${
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
                    </td>
                    <td className="text-center p-4">
                      <div className="flex items-center text-center justify-center space-x-5 p-4">
                        <HiDotsVertical />

                        <select
                          className="border-2 border-gray-300 rounded-md text-xs py-1 px-2 mx-2 "
                          onChange={(e) => changeActionHandler(e, todo.id)}
                        >
                          <option value=""></option>
                          <option value="completed" name="completed">
                            completed
                          </option>
                          <option value="unCompleted" name="unCompleted">
                            unCompleted
                          </option>
                        </select>
                        {/* <HiChevronDown /> */}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col md:flex-row justify-between items-center my-12">
        <div className="font-semibold text-gray-500">
          Showing <span className="text-gray-800">{perPage}</span> to{" "}
          <span className="text-gray-800">{pageCount}</span> of
          <span className="text-gray-800"> {todos.length}</span> entres
        </div>
        <div className="flex items-center space-x-5">
          <ReactPaginate
            previousLabel={<HiChevronLeft className="text-blue-500 text-3xl" />}
            nextLabel={<HiChevronRight className="text-blue-500 text-3xl" />}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </>
  );
};

export default Table;
