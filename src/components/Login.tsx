"use client";

import React, { useState } from "react";
import { Lock, Eye, EyeOff, ShieldAlert } from "lucide-react";

interface LoginProps {
  onLoginSuccess: () => void;
}

export default function Login({ onLoginSuccess }: LoginProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!password) {
      setError("Sandi tidak boleh kosong");
      return;
    }

    setIsLoading(true);

    // Simulate a minor loading transition for premium experience
    setTimeout(() => {
      if (password === "Abditam@22") {
        sessionStorage.setItem("mlh_auth", "true");
        onLoginSuccess();
      } else {
        setError("Sandi salah! Silakan coba lagi.");
        setIsLoading(false);
      }
    }, 600);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-logo" style={{ overflow: "hidden", padding: "6px" }}>
          <img src="/mlh-logo.png" alt="MLH Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
        </div>
        
        <h1 className="login-title glow-text">Madrasah Link Hub</h1>
        <p className="login-desc">Masukkan sandi pengaman untuk mengakses data akun madrasah</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="password">Sandi Pengaman</label>
            <div className="input-container">
              <Lock className="input-icon" size={18} />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="form-input"
                placeholder="Masukkan sandi..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (error) setError("");
                }}
                disabled={isLoading}
                autoFocus
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                disabled={isLoading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            
            {error && (
              <div className="error-message">
                <ShieldAlert size={16} />
                <span>{error}</span>
              </div>
            )}
          </div>
          
          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isLoading}
          >
            {isLoading ? "Memeriksa..." : "Buka Kunci"}
          </button>
        </form>
      </div>
    </div>
  );
}
