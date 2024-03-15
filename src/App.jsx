import { useEffect, useState, useRef } from "react";
import Navbar from "./components/Navbar";

import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const [showFinished, setShowFinished] = useState(true);

  const addInput = useRef();

  if (todos.length !== 0) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  useEffect(() => {
    if (localStorage.getItem("todos")) {
      setTodos(JSON.parse(localStorage.getItem("todos")));
    } else {
      setTodos([]);
    }
  }, []);

  const handleAdd = () => {
    setTodo("");
    if (todo !== "") {
      setTodos([...todos, { todo, isCompleted: false, id: undefined }]);
    }
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };
  const toggleFinished = () => {
    setShowFinished(!showFinished);
  };

  return (
    <>
      <Navbar />
      <div className="lg:w-1/2 w-[95%] mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[85vh]">
        <div className="addTodo my-5 text-center">
          <h1 className="text-2xl font-bold mb-5">
            iTask - Manage your todos at one place
          </h1>
          <h2 className="text-xl font-bold mb-5">Add Your Todo</h2>
          <form
            className="flex md:flex-row flex-col items-center justify-center gap-y-4"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              onChange={handleChange}
              value={todo}
              type="text"
              ref={addInput}
              className="md:w-[85%] bg-gray-50 text-slate-800 font-semibold text-md rounded-lg border border-violet-700 outline-none focus:border-violet-900 px-2 py-1"
            />
            <button
              onClick={handleAdd}
              className="bg-violet-800 md:w-auto w-[85%] hover:bg-violet-900 py-2 px-8 rounded-lg text-white font-semibold mx-4"
            >
              Save
            </button>
          </form>
        </div>
        {todos.map((item) => {
          return (
            item.isCompleted && (
              <div
                key="toggleFinished"
                className="flex gap-2 whitespace-nowrap md:justify-normal justify-center items-center w-full px-8 my-4"
              >
                <input
                  type="checkbox"
                  id="showFinished"
                  name="showFinished"
                  onChange={toggleFinished}
                  checked={showFinished}
                  className="cursor-pointer"
                />
                <label htmlFor="showFinished" className="cursor-pointer">
                  Show Finished
                </label>
              </div>
            )
          );
        })}
        <div className="border-b my-3 border-b-gray-400"></div>
        <h1 className="text-2xl text-center mb-5 font-bold">Your Todos</h1>
        <div className="todos flex flex-col gap-4 justify-center ">
          {todos.length === 0 ? (
            <div className="text-2xl font-semibold my-10 text-center">
              No Todos yet!
            </div>
          ) : (
            todos.map((item, idx) => {
              return (
                (showFinished || !item.isCompleted) && (
                  <div
                    key={idx}
                    className={
                      "todo flex sm:justify-between items-center relative px-2 sm:px-10"
                    }
                  >
                    <div className="flex items-center justify-start gap-4 sm:gap-8">
                      <input
                        type="checkbox"
                        className="cursor-pointer"
                        checked={item.isCompleted}
                        onChange={() => {
                          todos[idx].isCompleted = !todos[idx].isCompleted;
                          setTodos([...todos]);
                        }}
                      />
                      <div
                        className={` ${
                          item.isCompleted && "line-through"
                        }  text font-semibold capitalize`}
                      >
                        {item.todo}
                      </div>
                    </div>
                    <div className="buttons flex-nowrap absolute right-0 inline-flex items-center gap-y-2 justify-center">
                      <button
                        onClick={(e) => {
                          setTodo(
                            e.target.parentElement.parentElement.childNodes[0]
                              .childNodes[1].innerText
                          );
                          e.target.parentElement.parentElement.remove();
                          addInput.current.focus();
                        }}
                        className="bg-violet-800 hover:bg-violet-900 py-2 px-6 rounded-lg max-w-[90px] max-h-[40px] text-white font-semibold mx-2"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => {
                          let newTodos = todos.filter((i) => i !== item);
                          setTodos(newTodos);
                        }}
                        className="bg-violet-800 hover:bg-violet-900 py-2 px-6 rounded-lg max-w-[110px] max-h-[40px] text-white font-semibold mx-2"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default App;
