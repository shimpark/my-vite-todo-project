// src/pages/TodoPage.jsx
import { useAuth } from "../hooks/useAuth";
import { useTodos } from "../hooks/useTodos";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";

// TodoInput과 TodoList를 배치해 Todo 기능을 한 페이지에서 관리.
function TodoPage() {
  const { isLoggedIn } = useAuth();
  const { todos } = useTodos();

  if (!isLoggedIn) {
    return (
      <div>
        <h2>접근 불가</h2>
        <p>로그인 후 Todo를 작성할 수 있습니다.</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Todo List</h2>
      <TodoInput />
      <TodoList />
      <p>총 {todos.length}개</p>
    </div>
  );
}

export default TodoPage;
