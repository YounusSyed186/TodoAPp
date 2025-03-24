import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const todosString = localStorage.getItem("todos");
    if (todosString) {
      const parsedTodos = JSON.parse(todosString);
      setTodos(parsedTodos);
    }
  }, []);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleEdit = (e, id) => {
    const todoToEdit = todos.find((item) => item.id === id);
    setTodo(todoToEdit.todo);
    const newTodos = todos.filter((item) => item.id !== id);
    saveToLS();
    setTodos(newTodos);
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    saveToLS();
    setTodos(newTodos);
  };

  const handleAdd = () => {
    if (todo.trim() === "") return;

    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    saveToLS();
    setTodo("");
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const newTodos = todos.map((item) =>
      item.id === id ? { ...item, isCompleted: !item.isCompleted } : item
    );
    saveToLS();
    setTodos(newTodos);
  };

  const clearTodos = () => {
    localStorage.removeItem("todos");
    setTodos([]);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 min-h-screen">
        <div className="bg-violet-300 rounded-2xl p-4 md:p-8 w-full max-w-4xl mx-auto">
          <h1 className="font-bold text-xl md:text-2xl mb-4">Add a Todo</h1>
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <input
              value={todo}
              onChange={(e) => setTodo(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && todo.trim() !== "") {
                  handleAdd();
                }
              }}
              className="flex-grow px-4 py-2 rounded-lg focus:outline-none focus:ring-2 bg-white focus:ring-purple-600"
              type="text"
              placeholder="Enter a todo..."
            />
            <div className="flex gap-3">
              <button
                onClick={handleAdd}
                disabled={todo.trim() === ""}
                className="px-4 py-2 hover:bg-purple-500 bg-purple-800 text-white font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
              >
                Add
              </button>
              <button
                onClick={clearTodos}
                disabled={todos.length === 0}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105"
              >
                Clear
              </button>
            </div>
          </div>

          <div className="mt-6">
            <h1 className="font-bold text-xl md:text-2xl mb-4">Your Todos</h1>
            <div className="space-y-3">
              {todos.length === 0 ? (
                <div className="text-center py-8">
                  <p className="inline-block px-4 py-2 rounded-2xl bg-red-400 text-white font-bold">
                    No todos to display
                  </p>
                </div>
              ) : (
                todos.map((item) => (
                  <div
                    key={item.id}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl ${
                      item.isCompleted ? "bg-black" : "bg-red-400"
                    } text-white transition-all duration-200 hover:scale-[1.02]`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        name={item.id}
                        onChange={handleCheckbox}
                        checked={item.isCompleted}
                        className="w-5 h-5 cursor-pointer"
                        type="checkbox"
                      />
                      <p
                        className={`break-words flex-grow ${
                          item.isCompleted ? "line-through" : ""
                        }`}
                      >
                        {item.todo}
                      </p>
                    </div>
                    <div className="flex gap-2 self-end sm:self-auto">
                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className="px-3 py-1 hover:bg-purple-500 bg-purple-800 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105"
                      >
                        Edit
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="px-3 py-1 hover:bg-purple-500 bg-purple-800 text-white font-bold rounded-lg transition-all duration-200 hover:scale-105"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        <div className="justify-center flex">
          <div className="border h-90 w-70 rounded-2xl mt-10 flex justify-center bg-black ">
            <div className="">
              <h1 className="text-xl font-bold mb-2  text-white">Created By YounusSyed</h1>
              <img
                className="rounded-xl h-50 w-50"
                src="/src/assets/Younus.jpg"
                alt=""
              />
              <h1 className="text-white">Linkedin:</h1>
              <p className="text-white w-50">"www.linkedin.com/in/younus-syed-2b7913295"</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
