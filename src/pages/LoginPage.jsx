// src/pages/LoginPage.jsx
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

function LoginPage() {
  const { login, logout, user, isLoggedIn } = useAuth();
  const [name, setName] = useState("");

  const handleLogin = () => {
    if (!name.trim()) return;
    const mockUser = {
      // id를 Date.now() 대신 name으로 사용 (간단 예시)
      id: name,
      name,
      // token은 예시로 유지
      token: "sample_token_" + Date.now(),
    };
    login(mockUser);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <h2>로그인 페이지</h2>
      {isLoggedIn ? (
        <div>
          <p>안녕하세요, {user.name}님!</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            placeholder="이름을 입력하세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={handleLogin}>로그인</button>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
