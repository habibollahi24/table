import axios from "axios";
import { useEffect, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import ReactPaginate from "react-paginate";
import "../paginate.css";
import Table from "./Table";

const TodoTable = () => {
  const [userData, setUserData] = useState([]);
  const [todos, setTodos] = useState([]);
  const [todosSliced, setTodosSliced] = useState([]);
  const [offset, setOffset] = useState(0);
  const [perPage, setPerPage] = useState(10); //هرصفحه10تا
  const [pageCount, setPageCount] = useState(0); //تعدادکل صفحات
  const [setActionValue] = useState("");
  const [searchItem, setSearchItem] = useState("");

  const changePerPageHandler = (e) => {
    setPerPage(+e.target.value);
  };

  const handlePageClick = (e) => {
    const selectedPage = e.selected;
    console.log(selectedPage);
    if (perPage === 10) setOffset(selectedPage * 10);
    if (perPage === 6) setOffset(selectedPage * 6);
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

  const linkedTodoByUser = todosSliced.map((todo) => {
    const pinnedUser = userData.find((user) => user.id === todo.userId);

    return { ...todo, pinnedUser };
  });

  const filterByUserSelected = !searchItem
    ? todosSliced
    : linkedTodoByUser.filter((todo) => {
        const {
          title,
          pinnedUser: { name, email },
        } = todo;
        const allDataForSearch = {
          name,
          email,
          title,
        };

        return Object.values(allDataForSearch)
          .join(" ")
          .toLowerCase()
          .includes(searchItem.toLowerCase());
      });

  ////

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
            <option value={6} name="6">
              6
            </option>
          </select>
          entries
        </div>

        <div>
          <input
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            type="text"
            placeholder=" search By name,email ,todo "
            className=" border-2 border-gray-300 rounded-md py-1 px-2 placeholder:italic placeholder:text-gray-500 placeholder:text-sm placeholder:font-semibold"
          />
        </div>
      </div>

      {!todos.length ? (
        <div className="text-center text-4xl text-gray-700 ">Loading ...</div>
      ) : (
        <Table
          userData={userData}
          filterByUserSelected={filterByUserSelected}
          onAction={changeActionHandler}
        />
      )}
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

export default TodoTable;
