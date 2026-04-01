import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [mode, setMode] = useState("menu");
  const navigate = useNavigate();
  return (
    <div className="bg-linear-to-br from-[#DDD788] to-[#B8A355] h-screen overflow-hidden">
      <button
        onClick={() => navigate("/")}
        className="mt-20 mx-20 cursor-pointer text-gray-950 "
      >
        ← Kembali ke Home
      </button>
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-64  px)]">
        <h1
          className="text-6xl pt-20 mb-10"
          style={{ fontFamily: "'Jersey 20', sans-serif" }}
        >
          Welcome
        </h1>

        {mode === "menu" && (
          <div className="flex flex-col gap-5 items-center">
            <button
              onClick={() => setMode("signup")}
              className="bg-[#241919] px-16 py-3 rounded text-white hover:opacity-80 transiton cursor-pointer"
            >
              Sign Up
            </button>
            <button
              onClick={() => setMode("signin")}
              className="bg-[#241919] px-16 py-3 rounded text-white hover:opacity-80 transiton cursor-pointer"
            >
              Sign In
            </button>
          </div>
        )}

        {mode === "signin" && (
          <div className="flex flex-col gap-5 items-center">
            <input
              type="text"
              placeholder="Masukkan Username"
              className="bg-[#A88C8C] px-10 py-3 rounded text-center outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="bg-[#A88C8C] px-10 py-3 rounded text-center outline-none"
            />

            <button className="mt-3">Masuk</button>

            <button onClick={() => setMode("menu")} className="text-sm mt-2">
              ← Kembali
            </button>
          </div>
        )}

        {mode === "signup" && (
          <div className="flex flex-col gap-5 items-center">
            <p>Form Sign Up nanti di sini</p>

            <button onClick={() => setMode("menu")} className="text-sm mt-2">
              ← Kembali
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
