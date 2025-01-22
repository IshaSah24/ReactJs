import React, { useState } from "react";
import { FiTrash } from "react-icons/fi"; // Importing delete icon

const App = () => {
  const [input, setInput] = useState("");
  const [tasks, setTasks] = useState([]);

  function handleDelete(deleteTask) {
    console.log("task here", { deleteTask });
    const updatedTasks = tasks.filter((task) => task !== deleteTask);
    setTasks(updatedTasks);
  }
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) {
      alert("Task cannot be empty!");
      return;
    }
    setTasks([...tasks, input]);
    setInput("");
  };
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "16px",
      }}
    >
      <div
        className="content"
        style={{
          backgroundColor: "#0f3b48",
          width: "500px",
          padding: "14px",
          borderRadius: "4px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            fontSize: "20px",
            padding: "10px",
            paddingBottom: "20px",
            textTransform: "uppercase",
          }}
        >
          {["Todo", " App"].map((items) => {
            return <span key={items}>{items}</span>;
          })}
        </h1>
        <form
          onSubmit={(e) => {
            HandleSubmit(e);
          }}
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <input
            onChange={(e) => {
              setInput(e.target.value);
            }}
            value={input}
            placeholder="enter your task here..."
            type="text"
            style={{
              width: "100%",
              outline: "none",
              paddingLeft: "6px",
              fontSize: "18px",
            }}
          />
          <button
            style={{
              padding: "14px",
              backgroundColor: "green",
              border: "none",
              color: "white",
              fontSize: "14px",
              textTransform: "uppercase",
            }}
          >
            Submit
          </button>
        </form>
        <ol
          style={{
            marginLeft: "14px",
            marginTop: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {tasks && tasks.length > 0 ? (
            tasks.map((task, index) => (
              <li
                style={{
                  position: "relative",
                  borderRadius: "6px",
                  padding: "8px",
                  paddingLeft: "12px",
                  backgroundColor: "#0e303a",
                }}
                key={index}
              >
                {task}
                <span
                  onClick={() => {
                    handleDelete(task);
                  }}
                  style={{
                    position: "absolute",
                    right: "15px",
                    cursor: "pointer",
                    color: "#c63835",
                  }}
                >
                  <FiTrash />
                </span>
              </li>
            ))
          ) : (
            <li
              style={{
                listStyle: "none",
                textAlign: " center",
                color: "#cb3d3d",
              }}
            >
              no task available
            </li>
          )}
        </ol>
      </div>
    </div>
  );
};

export default App;
