// src/components/TodoList.jsx
import { useTodos } from "../hooks/useTodos";

function TodoList() {
  // toggleTodo: 클릭 시 done 상태 토글
  // removeTodo: 삭제 버튼 클릭 시 해당 항목 제거
  const { todos, toggleTodo, removeTodo } = useTodos();

  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {todos.map((todo) => (
        <li key={todo.id} style={{ margin: "0.5rem 0" }}>
          <span
            onClick={() => toggleTodo(todo.id)}
            style={{
              textDecoration: todo.done ? "line-through" : "none",
              marginRight: "0.5rem",
              cursor: "pointer",
            }}
          >
            {todo.text}
          </span>
          <button onClick={() => removeTodo(todo.id)}>삭제</button>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;
