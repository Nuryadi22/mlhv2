"use client";

import React, { useEffect } from "react";
import { X, LogOut, ShieldAlert } from "lucide-react";

interface LogoutModalProps {
  onClose: () => void;
  onConfirm: () => void;
}

export default function LogoutModal({ onClose, onConfirm }: LogoutModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content" 
        onClick={(e) => e.stopPropagation()} 
        style={{ maxWidth: "400px", animation: "zoomIn var(--transition-fast)" }}
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
              <LogOut size={18} />
            </div>
            <div>
              <span className="modal-category">Sesi Hub</span>
              <h2 className="modal-title" style={{ fontSize: "18px" }}>Konfirmasi Keluar</h2>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Tutup">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body" style={{ padding: "24px" }}>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "24px", lineHeight: "1.6" }}>
            Apakah Anda yakin ingin keluar dari Madrasah Link Hub? 
          </p>

          <div style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}>
            <button
              type="button"
              className="btn-secondary"
              onClick={onClose}
              style={{ padding: "10px 16px" }}
            >
              Batal
            </button>
            <button
              type="button"
              className="btn-danger"
              onClick={onConfirm}
              style={{ padding: "10px 20px", display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <LogOut size={16} />
              <span>Keluar</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
