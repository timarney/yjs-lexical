import { useState } from "react";

export const Todos = () => {
  const [todos, setTodos] = useState<string[]>([]);
  return (
    <div>
      <h1>Todo</h1>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
};
