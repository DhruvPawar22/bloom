import React, { useState } from "react";
import {Eye, EyeOff} from "lucide-react"

interface InputFieldProps {
  type?: "email" | "password"
  icon: React.ReactNode
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

const InputField = ({ type = "email", icon, placeholder, value, onChange, error }: InputFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="input-wrapper">
        <span className="input-icon">{icon}</span>
        <input
          type={type === "password" && showPassword ? "text" : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`input-field ${type === "password" ? "pr-11" : "pr-4"}`}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="input-eye"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && <p className="input-error">{error}</p>}
    </div>
  );
};
export default InputField;