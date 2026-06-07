"use client";

import React from "react";
import { 
  Folder, 
  Key, 
  ExternalLink, 
  ArrowRight,
  Database,
  UserCheck,
  Award,
  Wallet,
  FileText,
  TrendingUp,
  ShieldCheck,
  Tv,
  Monitor,
  Info
} from "lucide-react";
import { Category, Application } from "@/data/accounts";

interface CategoryGroupsProps {
  categories: Category[];
  onViewDetails: (appId: string) => void;
  showAccountsPreview: boolean;
}

export default function CategoryGroups({ categories, onViewDetails, showAccountsPreview }: CategoryGroupsProps) {
  // Filter out categories that don't have applications matching search filters (if parent handles it)
  const activeCategories = categories.filter((cat) => cat.applications.length > 0);

  // Helper to map category names to Lucide icons and colors based on screenshot
  const getCategoryConfig = (name: string) => {
    const cleanName = name.toUpperCase();
    if (cleanName.includes("EMIS")) {
      return { icon: Database, color: "#2ec4b6" };
    }
    if (cleanName.includes("VERVAL")) {
      return { icon: UserCheck, color: "#219ebc" };
    }
    if (cleanName.includes("UJIAN")) {
      return { icon: Award, color: "#ffb703" };
    }
    if (cleanName.includes("BOS") || cleanName.includes("BANTUAN")) {
      return { icon: Wallet, color: "#e63946" };
    }
    if (cleanName.includes("RAPOR") || cleanName.includes("IJAZAH")) {
      return { icon: FileText, color: "#9d4edd" };
    }
    if (cleanName.includes("PENGEMBANGAN")) {
      return { icon: TrendingUp, color: "#ff007f" };
    }
    if (cleanName.includes("AKREDITASI")) {
      return { icon: ShieldCheck, color: "#06b6d4" };
    }
    if (cleanName.includes("HIBURAN")) {
      return { icon: Tv, color: "#64748b" };
    }
    if (cleanName.includes("NURYADI")) {
      return { icon: ShieldCheck, color: "#10b981" };
    }
    if (cleanName.includes("ASN") || cleanName.includes("PORTAL")) {
      return { icon: Monitor, color: "#0f766e" };
    }
    return { icon: Folder, color: "#219ebc" };
  };

  if (activeCategories.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📂</div>
        <h3 className="empty-title">Kategori Kosong</h3>
        <p className="empty-desc">Tidak ada kategori atau aplikasi yang cocok dengan pencarian Anda.</p>
      </div>
    );
  }

  // Helper to format/clean URL for card display
  const formatUrl = (url: string) => {
    if (!url) return "Tidak ada link";
    try {
      const parsed = new URL(url);
      return parsed.hostname;
    } catch {
      return url.replace("https://", "").replace("http://", "").split("/")[0];
    }
  };

  if (!showAccountsPreview) {
    return (
      <div className="category-cards-grid">
        {activeCategories.map((cat) => {
          const config = getCategoryConfig(cat.name);
          const CategoryIcon = config.icon;
          const themeColor = config.color;
          const linkCount = cat.applications.length;
          
          return (
            <div 
              key={cat.id} 
              className="category-card" 
              style={{ borderTop: `4px solid ${themeColor}` }}
            >
              <div className="category-card-header">
                <div className="category-card-title-group" style={{ color: themeColor }}>
                  <CategoryIcon size={18} />
                  <h3>{cat.name}</h3>
                </div>
                <span 
                  className="category-link-badge" 
                  style={{ 
                    backgroundColor: `${themeColor}15`, 
                    color: themeColor,
                    borderColor: `${themeColor}25`
                  }}
                >
                  {linkCount} links
                </span>
              </div>
              
              <div className="category-card-apps-list">
                {cat.applications.map((app, index) => (
                  <div 
                    key={app.id} 
                    className="category-app-row"
                    onClick={() => onViewDetails(app.id)}
                  >
                    <div className="category-app-left">
                      <span 
                        className="app-index-circle" 
                        style={{ 
                          backgroundColor: `${themeColor}12`, 
                          color: themeColor 
                        }}
                      >
                        {index + 1}
                      </span>
                      <span className="app-row-name">{app.name}</span>
                    </div>
                    <div className="category-app-actions" onClick={(e) => e.stopPropagation()}>
                      {app.link && (
                        <a
                          href={app.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="app-row-action-btn"
                          title="Buka Website"
                        >
                          <ExternalLink size={13} style={{ color: themeColor }} />
                        </a>
                      )}
                      <button
                        onClick={() => onViewDetails(app.id)}
                        className="app-row-action-btn"
                        title="Detail Akun"
                      >
                        <Info size={13} style={{ color: "var(--text-muted)" }} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="group-grid">
      {activeCategories.map((cat) => (
        <div key={cat.id} className="category-section">
          <h2 className="category-group-header">
            <Folder size={18} />
            {cat.name}
          </h2>
          
          <div className="cards-container">
            {cat.applications.map((app) => {
              const accountCount = app.accounts.filter(acc => acc.username || acc.password).length;
              
              return (
                <div 
                  key={app.id} 
                  className="app-card"
                  onClick={() => onViewDetails(app.id)}
                >
                  <div>
                    <div className="card-top">
                      <h3 className="card-title">{app.name}</h3>
                      {accountCount > 0 ? (
                        <span className="card-count-badge">
                          {accountCount} Akun
                        </span>
                      ) : (
                        <span className="card-count-badge no-account">
                          Tanpa Akun
                        </span>
                      )}
                    </div>
                    
                    <p className="card-desc">
                      {formatUrl(app.link)}
                    </p>
 
                    {/* Quick Preview of accounts inside the card */}
                    {showAccountsPreview && app.accounts.length > 0 && (
                      <div style={{ marginTop: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                        {app.accounts.slice(0, 2).map((acc) => (
                          <div 
                            key={acc.id} 
                            style={{ 
                              display: "flex", 
                              alignItems: "center", 
                              gap: "6px", 
                              fontSize: "12px", 
                              color: "var(--text-secondary)",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              whiteSpace: "nowrap"
                            }}
                          >
                            <Key size={10} style={{ color: "var(--accent)", flexShrink: 0 }} />
                            <span style={{ fontWeight: 500, flexShrink: 0 }}>{acc.name}:</span>
                            <span style={{ fontFamily: "monospace", overflow: "hidden", textOverflow: "ellipsis" }}>
                              {acc.username || "Sandi saja"}
                            </span>
                          </div>
                        ))}
                        {app.accounts.length > 2 && (
                          <div style={{ fontSize: "11px", color: "var(--text-muted)", fontStyle: "italic", marginLeft: "16px" }}>
                            + {app.accounts.length - 2} akun lainnya...
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="card-footer">
                    <button className="card-btn">
                      Lihat Detail
                      <ArrowRight size={14} />
                    </button>
                    {app.link && (
                      <a
                        href={app.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-icon-btn link-btn"
                        onClick={(e) => e.stopPropagation()} // Prevent card modal from opening
                        title="Buka Website"
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
