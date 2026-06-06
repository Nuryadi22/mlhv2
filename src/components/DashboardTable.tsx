"use client";

import React, { useState } from "react";
import { Eye, EyeOff, Copy, ExternalLink, Info, Check } from "lucide-react";

interface FlatAccount {
  categoryId: string;
  categoryName: string;
  applicationId: string;
  applicationName: string;
  applicationLink: string;
  accountId: string;
  accountName: string;
  username: string;
  password?: string;
}

interface DashboardTableProps {
  accounts: FlatAccount[];
  onViewDetails: (appId: string) => void;
  triggerToast: (message: string) => void;
}

export default function DashboardTable({ accounts, onViewDetails, triggerToast }: DashboardTableProps) {
  // Map of account ID to boolean representing password visibility
  const [visiblePasswords, setVisiblePasswords] = useState<{ [key: string]: boolean }>({});
  // Track copied status for transient feedback on button icons
  const [copiedId, setCopiedId] = useState<string | null>(null);

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

  if (accounts.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">🔍</div>
        <h3 className="empty-title">Akun Tidak Ditemukan</h3>
        <p className="empty-desc">Tidak ada akun yang cocok dengan kriteria pencarian Anda.</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Kategori</th>
            <th>Aplikasi</th>
            <th>Pengguna/Role</th>
            <th>Username</th>
            <th>Sandi</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((acc) => {
            const isPasswordVisible = !!visiblePasswords[acc.accountId];
            const isUsernameCopied = copiedId === `${acc.accountId}-username`;
            const isPasswordCopied = copiedId === `${acc.accountId}-password`;

            return (
              <tr key={acc.accountId}>
                <td>
                  <span className="badge-category">{acc.categoryName}</span>
                </td>
                <td>
                  {acc.applicationLink ? (
                    <a
                      href={acc.applicationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="app-link"
                      title="Buka Aplikasi"
                    >
                      {acc.applicationName}
                      <ExternalLink size={12} className="text-secondary" />
                    </a>
                  ) : (
                    <span className="font-semibold">{acc.applicationName}</span>
                  )}
                </td>
                <td>{acc.accountName || <span className="text-muted italic">-</span>}</td>
                <td>
                  <div className="cell-credentials">
                    <span className="font-mono">{acc.username || <span className="text-muted italic">-</span>}</span>
                    {acc.username && (
                      <button
                        onClick={() => handleCopy(acc.username, acc.accountId, "username")}
                        className="action-icon-btn"
                        title="Salin Username"
                      >
                        {isUsernameCopied ? <Check size={12} /> : <Copy size={12} />}
                      </button>
                    )}
                  </div>
                </td>
                <td>
                  <div className="cell-credentials">
                    {acc.password ? (
                      <>
                        <span className={isPasswordVisible ? "password-visible" : "password-hidden"}>
                          {isPasswordVisible ? acc.password : "••••••••"}
                        </span>
                        <button
                          onClick={() => togglePasswordVisibility(acc.accountId)}
                          className="action-icon-btn eye-btn"
                          title={isPasswordVisible ? "Sembunyikan Sandi" : "Tampilkan Sandi"}
                        >
                          {isPasswordVisible ? <EyeOff size={12} /> : <Eye size={12} />}
                        </button>
                        <button
                          onClick={() => handleCopy(acc.password || "", acc.accountId, "password")}
                          className="action-icon-btn"
                          title="Salin Sandi"
                        >
                          {isPasswordCopied ? <Check size={12} /> : <Copy size={12} />}
                        </button>
                      </>
                    ) : (
                      <span className="text-muted italic">Tidak ada sandi</span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="actions-cell">
                    <button
                      onClick={() => onViewDetails(acc.applicationId)}
                      className="action-icon-btn"
                      title="Detail Akun Aplikasi"
                    >
                      <Info size={14} />
                    </button>
                    {acc.applicationLink && (
                      <a
                        href={acc.applicationLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-icon-btn link-btn"
                        title="Buka Website"
                      >
                        <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
