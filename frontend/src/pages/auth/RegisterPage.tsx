import React, { useState } from "react";
import InputField from "../../components/InputField";
import { Mail, UserPen, Lock } from "lucide-react";
import client from "../../api/client";
import { useNavigate, Link } from "react-router-dom";

const RegisterPage = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!displayName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await client.post("/auth/register", {
        display_name: displayName,
        email,
        password,
      });
      navigate("/login");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Something went wrong");
    }
  };

  return (
    <div className="auth-page">
      <p className="auth-wordmark">bloom</p>

      <h1 className="auth-heading">Create account</h1>
      <p className="auth-subtitle">Track your cycle with care</p>

      <form onSubmit={handleSubmit} className="auth-form">
        <InputField
          type="text"
          icon={<UserPen size={16} />}
          placeholder="Your Name"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />
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
        <InputField
          type="password"
          icon={<Lock size={16} />}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {error && <p className="input-error">{error}</p>}

        <button type="submit" className="btn-primary">
          Create account
        </button>
      </form>

      <p className="auth-footer">
        Already have an account?{" "}
        <Link to="/login" className="auth-link">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
