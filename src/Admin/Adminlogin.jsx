import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (username === "admin" && password === "admin123") {
        navigate("/admin/dashboard");
      } else {
        setError("Incorrect username or password.");
      }
      setLoading(false);
    }, 600);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background glow effects */}
      <div className="absolute w-72 h-72 bg-blue-500/30 rounded-full blur-3xl top-[-50px] left-[-50px]"></div>
      <div className="absolute w-72 h-72 bg-purple-500/30 rounded-full blur-3xl bottom-[-50px] right-[-50px]"></div>

      {/* Login Card */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-md border border-white/20">
        {/* Logo */}
        <div className="w-12 h-12 rounded-xl bg-slate-900 flex items-center justify-center mb-6">
          <span className="text-white text-xl font-bold">N</span>
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-1">Admin Portal</h1>
        <p className="text-slate-500 mb-8 text-sm">
          Dr. Maha Naturopath — staff access only
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="admin"
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg">
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-800 transition disabled:opacity-60 shadow-lg"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          <button
          onClick={()=>navigate("/")}
          className="w-full py-3 bg-slate-900 text-white rounded-xl font-semibold text-sm hover:bg-slate-800 transition disabled:opacity-60 shadow-lg">
            Back to Home
          </button>
        </form>
      </div>
    </div>
  );
}
