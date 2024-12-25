// src/components/TodoInput.jsx
import { useState } from "react";

// useTodos 훅에서 addTodo 함수를 가져와 새 할 일을 추가.
import { useTodos } from "../hooks/useTodos";

function TodoInput() {
  const { addTodo } = useTodos();
  const [value, setValue] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!value.trim()) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={onSubmit} style={{ marginBottom: "1rem" }}>
      <input
        type="text"
        placeholder="할 일을 입력하세요..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">추가</button>
    </form>
  );
}

export default TodoInput;
