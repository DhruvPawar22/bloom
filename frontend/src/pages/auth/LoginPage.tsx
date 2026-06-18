import React, { useState } from "react";
import InputField from "../../components/InputField";
import { Mail, Lock } from "lucide-react";
import client from "../../api/client";
import { useNavigate, Link } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }


    try {
      const response = await client.post("/auth/login", { email, password });
      localStorage.setItem("token", response.data.access_token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <p className="auth-wordmark">bloom</p>

      <h1 className="auth-heading">Welcome Back</h1>
      <p className="auth-subtitle">Sign in to your Account</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <InputField
          type="email"
          icon={<Mail size={16} />}
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputField
          type="password"
          icon={<Lock size={16} />}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="input-error">{error}</p>}

        <button type="submit" className="btn-primary">
          Login
        </button>
      </form>

      <p className="auth-footer">
        Don't have an account?{" "}
        <Link to="/register" className="auth-link">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;
