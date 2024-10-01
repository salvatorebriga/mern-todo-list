import { useEffect, useState } from "react";
import {
  TrashIcon,
  PencilSquareIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";
import axios from "../axios.js";

function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editTodoId, setEditTodoId] = useState(null);
  const [editTodoTitle, setEditTodoTitle] = useState("");

  // Funzione per recuperare i Todo dal server
  const fetchTodos = async () => {
    try {
      const response = await axios.get("/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Errore nel recupero dei todos:", error);
    }
  };

  // Funzione per aggiungere un nuovo Todo
  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return; // Evita di inviare una stringa vuota

    try {
      const response = await axios.post("/todos", { title: newTodo });
      setTodos((prevTodos) => [...prevTodos, response.data]); // Aggiorna lo stato con il nuovo Todo
      setNewTodo(""); // Resetta il campo di input
    } catch (error) {
      console.error("Errore nell'aggiunta del todo:", error);
    }
  };

  // Funzione per eliminare un Todo
  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/todos/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id)); // Rimuovi il Todo dallo stato
    } catch (error) {
      console.error("Errore nell'eliminazione del todo:", error);
    }
  };

  // Inizia la modifica di un Todo
  const startEditing = (id, title) => {
    setEditTodoId(id);
    setEditTodoTitle(title);
  };

  // Salva le modifiche di un Todo
  const saveEdit = async (id) => {
    if (!editTodoTitle.trim()) return; // Evita di inviare una stringa vuota
    try {
      await axios.put(`/todos/${id}`, { title: editTodoTitle });
      fetchTodos(); // Ricarica i TODO
      setEditTodoId(null); // Resetta lo stato dell'editing
      setEditTodoTitle(""); // Resetta il titolo dell'editing
    } catch (error) {
      console.error("Errore nella modifica del todo:", error);
    }
  };

  // Effetto per caricare i Todo all'inizio
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="container mx-auto h-full flex flex-col font-base text-lg 2xl:text-2xl">
      {/* Form per aggiungere un nuovo Todo */}
      <form
        onSubmit={addTodo}
        className="flex flex-col mb-2 mt-2 lg:mb-4 lg:mt-4"
      >
        <div className="relative w-full mx-auto">
          <input
            type="text"
            maxLength={256}
            className="text-center py-2 border rounded-full border-gray-300 dark:bg-gray-950 transition-colors ease-in-out duration-300 w-full"
            placeholder="Add New Todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent focus:outline-none"
          >
            <PlusIcon className="h-5 w-5 mr-2 text-gray-400 dark:text-white" />
          </button>
        </div>
      </form>

      {/* Totale dei Todo */}
      <div className="flex justify-between items-center mb-2 mt-3">
        <span>Total Todos: {todos.length}</span>
      </div>

      {/* Lista dei Todo */}
      <div className="overflow-hidden overflow-y-auto flex-1">
        <ul className="flex flex-col">
          {todos.map((todo, index) => (
            <li
              key={todo._id}
              className={`flex py-4 px-2 items-start ${
                index === 0 ? "" : "border-t border-gray-300"
              }`}
            >
              <div className="flex items-center justify-center mr-2 h-7 2xl:h-9 w-6">
                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
              </div>
              <div className="flex-1">
                {editTodoId === todo._id ? (
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={editTodoTitle}
                      onChange={(e) => setEditTodoTitle(e.target.value)}
                      className="px-2 py-1 border rounded-lg border-gray-300 dark:bg-gray-950 transition-colors ease-in-out duration-300 w-full"
                      placeholder="Modifica il TODO"
                    />
                    <button
                      onClick={() => saveEdit(todo._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded-lg hover:bg-green-600 transition-colors ml-2"
                    >
                      Salva
                    </button>
                  </div>
                ) : (
                  <p className="overflow-hidden text-start break-words">
                    {todo.title}
                  </p>
                )}
              </div>

              <div className="flex items-center ml-4 mt-1">
                <button
                  onClick={() => deleteTodo(todo._id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={() => startEditing(todo._id, todo.title)}
                  className="ml-2"
                >
                  <PencilSquareIcon className="h-5 w-5 hover:text-black dark:text-white dark:hover:text-gray-400" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
