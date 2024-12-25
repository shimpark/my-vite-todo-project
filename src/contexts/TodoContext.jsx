// src/contexts/TodoContext.jsx
import { createContext, useState, useEffect, useCallback } from "react";
import { useAuth } from "../hooks/useAuth";

export const TodoContext = createContext();

export function TodoProvider({ children }) {
  const { user, isLoggedIn } = useAuth();
  const [todos, setTodos] = useState([]);

  /**
   * 1) localStorage에서 userId에 해당하는 todos 가져오기
   */
  const loadTodosForUser = useCallback((userId) => {
    const storedData = localStorage.getItem("todoData");
    if (!storedData) return []; // 아무 데이터도 없으면 빈 배열
    try {
      const parsed = JSON.parse(storedData); // { [userId]: [...todo], ... }
      return parsed[userId] || [];
    } catch (error) {
      console.error("Failed to parse todoData from localStorage:", error);
      return [];
    }
  }, []);

  /**
   * 2) localStorage에 userId별 todos 저장
   */
  const saveTodosForUser = useCallback((userId, updatedTodos) => {
    const storedData = localStorage.getItem("todoData");
    let parsed = {};
    if (storedData) {
      try {
        parsed = JSON.parse(storedData);
      } catch (error) {
        console.error("Failed to parse todoData from localStorage:", error);
      }
    }
    // 기존에 있던 userId의 Todo를 덮어씌움
    parsed[userId] = updatedTodos;
    localStorage.setItem("todoData", JSON.stringify(parsed));
  }, []);

  /**
   * 3) 로그인 상태가 바뀔 때 해당 사용자 Todo 불러오기
   *    - 로그인이 되었으면 => 그 사용자 Todo 불러오기
   *    - 로그아웃이면 => todos 초기화(또는 빈 배열)
   */
  useEffect(() => {
    if (isLoggedIn && user?.id) {
      const userTodos = loadTodosForUser(user.id);
      setTodos(userTodos);
    } else {
      setTodos([]);
    }
  }, [isLoggedIn, user?.id, loadTodosForUser]);

  /**
   * 4) Todo 추가
   */
  const addTodo = (text) => {
    if (!isLoggedIn) return; // 로그인 안 되어 있으면 작업 불가
    const newTodo = {
      id: Date.now(),
      text,
      done: false,
    };
    const updated = [...todos, newTodo];
    setTodos(updated);
    // 사용자별로 저장
    saveTodosForUser(user.id, updated);
  };

  /**
   * 5) Todo 완료여부 토글
   */
  const toggleTodo = (id) => {
    if (!isLoggedIn) return;
    const updated = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    );
    setTodos(updated);
    saveTodosForUser(user.id, updated);
  };

  /**
   * 6) Todo 삭제
   */
  const removeTodo = (id) => {
    if (!isLoggedIn) return;
    const updated = todos.filter((todo) => todo.id !== id);
    setTodos(updated);
    saveTodosForUser(user.id, updated);
  };

  const contextValue = {
    todos,
    addTodo,
    toggleTodo,
    removeTodo,
  };

  return (
    <TodoContext.Provider value={contextValue}>{children}</TodoContext.Provider>
  );
}
