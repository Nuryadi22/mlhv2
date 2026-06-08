"use client";

import React, { useState, useEffect, useMemo } from "react";
import { 
  Search, 
  TableProperties, 
  LayoutGrid, 
  LogOut, 
  Layers, 
  Globe, 
  UserCheck,
  CheckCircle2,
  Calendar,
  Sun,
  Moon,
  Lock
} from "lucide-react";
import { accountsData, Category } from "@/data/accounts";
import Login from "@/components/Login";
import DashboardTable from "@/components/DashboardTable";
import CategoryGroups from "@/components/CategoryGroups";
import DetailsModal from "@/components/DetailsModal";
import UnlockModal from "@/components/UnlockModal";

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

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isMounting, setIsMounting] = useState<boolean>(true);
  
  // Theme state
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  
  // Dashboard states
  const [activeTab, setActiveTab] = useState<"table" | "cards">("table");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);
  
  // Nuryadi Category protection states
  const [isNuryadiUnlocked, setIsNuryadiUnlocked] = useState<boolean>(false);
  const [isUnlockModalOpen, setIsUnlockModalOpen] = useState<boolean>(false);
  
  // Toast notifications state
  const [toast, setToast] = useState<{ show: boolean; message: string }>({
    show: false,
    message: ""
  });

  // Verify authentication and initialize theme on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem("mlh_auth");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
    
    const nuryadiStatus = sessionStorage.getItem("mlh_nuryadi_unlocked");
    if (nuryadiStatus === "true") {
      setIsNuryadiUnlocked(true);
    }
    
    // Load theme
    const savedTheme = localStorage.getItem("mlh_theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      const systemPrefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
      const initialTheme = systemPrefersLight ? "light" : "dark";
      setTheme(initialTheme);
      document.documentElement.setAttribute("data-theme", initialTheme);
    }
    
    setIsMounting(false);
  }, []);

  const triggerToast = (message: string) => {
    setToast({ show: true, message });
  };

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ show: false, message: "" });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast.show]);

  // Automatically lock Nuryadi category when switching away from it
  useEffect(() => {
    if (selectedCategory !== "nuryadi" && isNuryadiUnlocked) {
      setIsNuryadiUnlocked(false);
      sessionStorage.removeItem("mlh_nuryadi_unlocked");
      triggerToast("Kategori Nuryadi otomatis dikunci kembali.");
    }
  }, [selectedCategory, isNuryadiUnlocked]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("mlh_theme", nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    triggerToast(`Tema ${nextTheme === "dark" ? "Gelap" : "Terang"} diaktifkan!`);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("mlh_auth");
    sessionStorage.removeItem("mlh_nuryadi_unlocked");
    setIsNuryadiUnlocked(false);
    setSelectedCategory("all");
    setIsAuthenticated(false);
    triggerToast("Logout berhasil!");
  };

  // Compile flat list of accounts
  const flatAccounts = useMemo(() => {
    const list: FlatAccount[] = [];
    accountsData.forEach((cat) => {
      if (cat.id === "nuryadi" && !isNuryadiUnlocked) {
        return;
      }
      cat.applications.forEach((app) => {
        if (app.accounts.length === 0) {
          list.push({
            categoryId: cat.id,
            categoryName: cat.name,
            applicationId: app.id,
            applicationName: app.name,
            applicationLink: app.link,
            accountId: `${app.id}-empty`,
            accountName: "",
            username: "",
            password: "",
          });
        } else {
          app.accounts.forEach((acc) => {
            list.push({
              categoryId: cat.id,
              categoryName: cat.name,
              applicationId: app.id,
              applicationName: app.name,
              applicationLink: app.link,
              accountId: acc.id,
              accountName: acc.name,
              username: acc.username,
              password: acc.password,
            });
          });
        }
      });
    });
    return list;
  }, [isNuryadiUnlocked]);

  // Filter accounts for the table view
  const filteredFlatAccounts = useMemo(() => {
    return flatAccounts.filter((acc) => {
      // Filter by category
      if (selectedCategory !== "all" && acc.categoryId !== selectedCategory) {
        return false;
      }
      
      // Filter by search query
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchApp = acc.applicationName.toLowerCase().includes(q);
        const matchRole = acc.accountName.toLowerCase().includes(q);
        const matchUsername = acc.username.toLowerCase().includes(q);
        const matchCategory = acc.categoryName.toLowerCase().includes(q);
        return matchApp || matchRole || matchUsername || matchCategory;
      }
      
      return true;
    });
  }, [flatAccounts, selectedCategory, searchQuery]);

  // Filter categories and apps for the cards view
  const filteredGroupData = useMemo(() => {
    return accountsData
      .filter((cat) => {
        if (cat.id === "nuryadi" && !isNuryadiUnlocked) {
          return false;
        }
        return true;
      })
      .map((cat) => {
        const matchedApps = cat.applications.filter((app) => {
          // Filter by category
          if (selectedCategory !== "all" && cat.id !== selectedCategory) {
            return false;
          }

          // Filter by search query
          if (searchQuery.trim() !== "") {
            const q = searchQuery.toLowerCase();
            const matchApp = app.name.toLowerCase().includes(q);
            const matchAccounts = app.accounts.some(
              (acc) =>
                acc.name.toLowerCase().includes(q) ||
                acc.username.toLowerCase().includes(q)
            );
            return matchApp || matchAccounts;
          }

          return true;
        });

        return {
          ...cat,
          applications: matchedApps,
        };
      })
      .filter((cat) => cat.applications.length > 0);
  }, [selectedCategory, searchQuery, isNuryadiUnlocked]);

  // Calculate statistics
  const stats = useMemo(() => {
    let totalCategories = 0;
    let totalApps = 0;
    let totalAccounts = 0;
    
    accountsData.forEach((cat) => {
      if (cat.id === "nuryadi" && !isNuryadiUnlocked) {
        return;
      }
      totalCategories++;
      totalApps += cat.applications.length;
      cat.applications.forEach((app) => {
        // Only count accounts that have actual username or password
        totalAccounts += app.accounts.filter(a => a.username || a.password).length;
      });
    });

    return {
      totalCategories,
      totalApps,
      totalAccounts
    };
  }, [isNuryadiUnlocked]);

  const handleViewDetails = (appId: string) => {
    const cat = accountsData.find((c) => c.applications.some((app) => app.id === appId));
    if (cat && cat.id === "nuryadi" && !isNuryadiUnlocked) {
      setIsUnlockModalOpen(true);
    } else {
      setSelectedAppId(appId);
    }
  };

  if (isMounting) {
    return (
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "var(--bg-deep)",
        color: "var(--text-primary)",
        fontFamily: "'Outfit', sans-serif"
      }}>
        <div style={{ textAlign: "center" }}>
          <div className="login-logo" style={{ animation: "ripple 1.5s infinite", overflow: "hidden", padding: "6px" }}>
            <img src="/mlh-logo.png" alt="MLH Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          </div>
          <h2 style={{ marginTop: "16px", fontWeight: 600 }}>Memuat...</h2>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Login onLoginSuccess={() => {
      setIsAuthenticated(true);
      triggerToast("Akses diizinkan! Selamat datang.");
    }} />;
  }

  return (
    <div className="app-container">
      <main className="dashboard">
        
        {/* Header */}
        <header className="dashboard-header">
          <div className="logo-section">
            <div className="logo-icon" style={{ overflow: "hidden", padding: "4px" }}>
              <img src="/mlh-logo.png" alt="MLH Logo" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
            </div>
            <div>
              <h1 className="app-title glow-text">Madrasah Link Hub</h1>
              <p className="app-subtitle">Manajemen Akun, Sandi & Link Portal Madrasah</p>
            </div>
          </div>
          
          <div className="header-actions">
            <button 
              onClick={toggleTheme} 
              className="btn-secondary" 
              title={theme === "dark" ? "Aktifkan Mode Terang" : "Aktifkan Mode Gelap"}
              style={{ display: "inline-flex", padding: "10px", borderRadius: "var(--radius-md)" }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <button onClick={handleLogout} className="btn-danger">
              <LogOut size={16} />
              <span>Keluar</span>
            </button>
          </div>
        </header>

        {/* Stats Overview */}
        <section className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon-wrapper">
              <Layers size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.totalCategories}</span>
              <span className="stat-label">Kategori Link</span>
            </div>
          </div>
          
          <div className="stat-card">
            <div className="stat-icon-wrapper" style={{ color: "var(--secondary)", backgroundColor: "var(--bg-badge-secondary)" }}>
              <Globe size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.totalApps}</span>
              <span className="stat-label">Total Aplikasi/Web</span>
            </div>
          </div>

          <div className="stat-card accent">
            <div className="stat-icon-wrapper">
              <UserCheck size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-value">{stats.totalAccounts}</span>
              <span className="stat-label">Akun Tersimpan</span>
            </div>
          </div>

          <div className="stat-card" style={{ borderLeft: "4px solid var(--accent)" }}>
            <div className="stat-icon-wrapper" style={{ color: "var(--accent)", backgroundColor: "var(--bg-badge-accent)" }}>
              <Calendar size={22} />
            </div>
            <div className="stat-info">
              <span className="stat-value" style={{ fontSize: "15px", fontWeight: 600 }}>Tahun Ajaran</span>
              <span className="stat-label" style={{ color: "var(--text-secondary)", fontWeight: 500 }}>2025/2026</span>
            </div>
          </div>
        </section>

        {/* Controls Toolbar */}
        <section className="toolbar">
          <div className="search-container">
            <Search className="search-input-icon" size={18} />
            <input
              type="text"
              placeholder="Cari nama aplikasi, username, atau kategori..."
              className="search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="view-controls">
            <button
              onClick={() => setActiveTab("table")}
              className={`view-btn ${activeTab === "table" ? "active" : ""}`}
            >
              <TableProperties size={16} />
              <span>Keseluruhan (Tabel)</span>
            </button>
            <button
              onClick={() => setActiveTab("cards")}
              className={`view-btn ${activeTab === "cards" ? "active" : ""}`}
            >
              <LayoutGrid size={16} />
              <span>Grup Kategori (Card)</span>
            </button>
          </div>
        </section>

        {/* Category Chips for Filtering */}
        <section className="category-chips">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`chip ${selectedCategory === "all" ? "active" : ""}`}
          >
            Semua ({flatAccounts.length})
          </button>
          {accountsData.map((cat) => {
            const count = flatAccounts.filter(acc => acc.categoryId === cat.id).length;
            const isLocked = cat.id === "nuryadi" && !isNuryadiUnlocked;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  if (isLocked) {
                    setIsUnlockModalOpen(true);
                  } else {
                    setSelectedCategory(cat.id);
                  }
                }}
                className={`chip ${selectedCategory === cat.id ? "active" : ""}`}
                style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
              >
                {cat.name}
                {isLocked ? <Lock size={12} style={{ opacity: 0.8 }} /> : `(${count})`}
              </button>
            );
          })}
        </section>

        {/* Active View */}
        {activeTab === "table" ? (
          <DashboardTable 
            accounts={filteredFlatAccounts} 
            onViewDetails={handleViewDetails}
            triggerToast={triggerToast}
          />
        ) : (
          <CategoryGroups 
            categories={filteredGroupData} 
            onViewDetails={handleViewDetails}
            showAccountsPreview={selectedCategory !== "all"}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p>
          Madrasah Link Hub &copy; {new Date().getFullYear()} - Dibuat untuk mempermudah akses portal sekolah MI Cikembulan & RA As-syifa.
        </p>
        <p style={{ marginTop: "4px", fontSize: "11px", color: "var(--text-muted)" }}>
          Keamanan Terjamin • Tersimpan Lokal di Browser • Hosting di Vercel & GitHub
        </p>
      </footer>

      {/* Account Details Modal */}
      {selectedAppId && (
        <DetailsModal 
          appId={selectedAppId}
          categories={accountsData}
          onClose={() => setSelectedAppId(null)}
          triggerToast={triggerToast}
        />
      )}

      {/* Unlock Category Password Modal */}
      {isUnlockModalOpen && (
        <UnlockModal
          onClose={() => setIsUnlockModalOpen(false)}
          onUnlockSuccess={() => {
            setIsNuryadiUnlocked(true);
            sessionStorage.setItem("mlh_nuryadi_unlocked", "true");
            setSelectedCategory("nuryadi");
          }}
          triggerToast={triggerToast}
        />
      )}

      {/* Shared Toast Container */}
      <div className={`toast ${toast.show ? "show" : ""}`}>
        <CheckCircle2 className="toast-icon" size={18} />
        <span className="toast-message">{toast.message}</span>
      </div>
    </div>
  );
}
