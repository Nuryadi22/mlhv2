"use client";

import React, { useState, useEffect } from "react";
import { X, Lock, Eye, EyeOff, ShieldAlert } from "lucide-react";

interface UnlockModalProps {
  onClose: () => void;
  onUnlockSuccess: () => void;
  triggerToast: (message: string) => void;
}

export default function UnlockModal({ onClose, onUnlockSuccess, triggerToast }: UnlockModalProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!password) {
      setError("Sandi tidak boleh kosong");
      return;
    }

    setIsLoading(true);

    // Minor loading animation for a premium feel
    setTimeout(() => {
      if (password === "Perselak015") {
        onUnlockSuccess();
        triggerToast("Kategori Nuryadi berhasil dibuka!");
        onClose();
      } else {
        setError("Sandi kategori salah! Silakan coba lagi.");
        setIsLoading(false);
      }
    }, 500);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: "420px", animation: "zoomIn var(--transition-fast)" }}
      >
        <div className="modal-header" style={{ padding: "20px 24px" }}>
          <div className="modal-title-wrapper" style={{ flexDirection: "row", alignItems: "center", gap: "10px" }}>
            <div 
              style={{ 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center", 
                width: "36px", 
                height: "36px", 
                borderRadius: "var(--radius-sm)", 
                backgroundColor: "var(--bg-badge-accent)", 
                color: "var(--accent)" 
              }}
            >
              <Lock size={18} />
            </div>
            <div>
              <span className="modal-category">Proteksi Kategori</span>
              <h2 className="modal-title" style={{ fontSize: "18px" }}>Buka Kategori Nuryadi</h2>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Tutup">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: "24px" }}>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "20px", lineHeight: "1.6" }}>
            Kategori ini terproteksi. Silakan masukkan sandi khusus untuk membuka akses.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: "20px" }}>
              <label className="form-label" htmlFor="category-password">Sandi Kategori</label>
              <div className="input-container">
                <Lock className="input-icon" size={18} />
                <input
                  id="category-password"
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
                  style={{ padding: "12px 40px" }}
                />
                <button
                  type="button"
                  className="toggle-password-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                  disabled={isLoading}
                  style={{ right: "12px" }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>

              {error && (
                <div className="error-message" style={{ marginTop: "12px" }}>
                  <ShieldAlert size={16} />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={onClose}
                disabled={isLoading}
                style={{ padding: "10px 16px" }}
              >
                Batal
              </button>
              <button
                type="submit"
                className="btn-primary"
                disabled={isLoading}
                style={{ padding: "10px 20px", width: "auto" }}
              >
                {isLoading ? "Membuka..." : "Buka Kunci"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
