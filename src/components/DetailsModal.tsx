"use client";

import React, { useState, useEffect } from "react";
import { X, Copy, ExternalLink, Eye, EyeOff, Check, AlertCircle } from "lucide-react";
import { Application, Category } from "@/data/accounts";

interface DetailsModalProps {
  appId: string;
  categories: Category[];
  onClose: () => void;
  triggerToast: (message: string) => void;
}

export default function DetailsModal({ appId, categories, onClose, triggerToast }: DetailsModalProps) {
  const [app, setApp] = useState<Application | null>(null);
  const [categoryName, setCategoryName] = useState<string>("");
  const [visiblePasswords, setVisiblePasswords] = useState<{ [key: string]: boolean }>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    // Find application and category name from categories list
    for (const cat of categories) {
      const foundApp = cat.applications.find((a) => a.id === appId);
      if (foundApp) {
        setApp(foundApp);
        setCategoryName(cat.name);
        break;
      }
    }
  }, [appId, categories]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const togglePasswordVisibility = (accountId: string) => {
    setVisiblePasswords((prev) => ({
      ...prev,
      [accountId]: !prev[accountId],
    }));
  };

  const handleCopy = (text: string, id: string, type: "username" | "password") => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    triggerToast(`${type === "username" ? "Username" : "Sandi"} berhasil disalin!`);
    
    setCopiedId(`${id}-${type}`);
    setTimeout(() => {
      setCopiedId(null);
    }, 1500);
  };

  if (!app) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-wrapper">
            <span className="modal-category">{categoryName}</span>
            <h2 className="modal-title">{app.name}</h2>
          </div>
          <button className="modal-close-btn" onClick={onClose} title="Tutup">
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          <div className="modal-app-info">
            <div>
              <span className="info-label">Link Aplikasi:</span>
              <div style={{ marginTop: "4px" }}>
                {app.link ? (
                  <a
                    href={app.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="info-value-link"
                  >
                    {app.link}
                    <ExternalLink size={14} />
                  </a>
                ) : (
                  <span className="text-muted italic">Tidak ada link terdaftar</span>
                )}
              </div>
            </div>
            {app.link && (
              <a
                href={app.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ padding: "8px 16px", fontSize: "14px", width: "auto", marginTop: "8px" }}
              >
                Buka Website
                <ExternalLink size={14} />
              </a>
            )}
          </div>

          <h3 className="modal-section-title">Daftar Akun ({app.accounts.length})</h3>

          {app.accounts.length === 0 ? (
            <div className="warning-alert">
              <AlertCircle size={20} style={{ flexShrink: 0 }} />
              <span>Aplikasi ini belum memiliki akun terdaftar. Anda bisa langsung membuka website melalui tombol di atas.</span>
            </div>
          ) : (
            <div className="modal-accounts-list">
              {app.accounts.map((acc) => {
                const isPasswordVisible = !!visiblePasswords[acc.id];
                const isUsernameCopied = copiedId === `${acc.id}-username`;
                const isPasswordCopied = copiedId === `${acc.id}-password`;

                return (
                  <div key={acc.id} className="modal-account-card">
                    <div className="account-role">{acc.name || "Akun Madrasah"}</div>
                    
                    <div className="credential-field">
                      <span className="credential-label">Username</span>
                      <span className="credential-value font-mono">
                        {acc.username || <span className="text-muted italic">-</span>}
                      </span>
                      {acc.username && (
                        <div className="credential-actions">
                          <button
                            onClick={() => handleCopy(acc.username, acc.id, "username")}
                            className="action-icon-btn"
                            title="Salin Username"
                          >
                            {isUsernameCopied ? <Check size={12} /> : <Copy size={12} />}
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="credential-field">
                      <span className="credential-label">Sandi</span>
                      <span 
                        className={`credential-value font-mono ${!isPasswordVisible && acc.password ? "hidden-pw" : ""}`}
                      >
                        {acc.password ? (isPasswordVisible ? acc.password : "••••••••") : <span className="text-muted italic">-</span>}
                      </span>
                      {acc.password && (
                        <div className="credential-actions">
                          <button
                            onClick={() => togglePasswordVisibility(acc.id)}
                            className="action-icon-btn eye-btn"
                            title={isPasswordVisible ? "Sembunyikan Sandi" : "Tampilkan Sandi"}
                          >
                            {isPasswordVisible ? <EyeOff size={12} /> : <Eye size={12} />}
                          </button>
                          <button
                            onClick={() => handleCopy(acc.password || "", acc.id, "password")}
                            className="action-icon-btn"
                            title="Salin Sandi"
                          >
                            {isPasswordCopied ? <Check size={12} /> : <Copy size={12} />}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
