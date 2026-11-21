import React, { useEffect, useState } from "react";
import {
  Smartphone, Wifi, Tv, Zap, Gift, ShieldCheck, Headphones,
  Wallet, RefreshCw, CheckCircle, XCircle, Menu, User, ArrowRight,
  LayoutDashboard, History, LogOut, CreditCard, ChevronRight, Globe,
  Lock, Activity, X, Eye, EyeOff, Home, Sparkles, Settings,
  Receipt, UserCircle, Copy, Phone, Mail, Clock, AlertCircle
} from "lucide-react";
import { supabase } from "./supabase";

const WHATSAPP = "https://wa.me/2348114095631";

const services = [
  { icon: Smartphone, title: "Buy Airtime", desc: "Recharge all networks", color: "#16a34a", page: "airtime" },
  { icon: Wifi, title: "Buy Data", desc: "Affordable data plans", color: "#0d9488", page: "data" },
  { icon: Tv, title: "Cable TV", desc: "Renew subscriptions", color: "#7c3aed", page: "cable" },
  { icon: Zap, title: "Electricity", desc: "Pay electricity bills", color: "#d97706", page: "electricity" },
  { icon: Gift, title: "Referral", desc: "Invite and earn", color: "#db2777", page: "referral" }
];

const styles = `
*{box-sizing:border-box}
html{scroll-behavior:smooth}
body{margin:0;background:#f5f8f6}
button,input,select{font:inherit}
button{cursor:pointer}
.st-app{min-height:100vh;background:#f5f8f6;color:#17251d;font-family:Inter,Arial,sans-serif}
.st-header{position:sticky;top:0;z-index:50;background:#ffffffed;backdrop-filter:blur(18px);border-bottom:1px solid #e4eee7}
.st-nav{max-width:1200px;margin:auto;padding:15px 22px;display:flex;align-items:center;justify-content:space-between;gap:15px}
.st-brand{border:0;background:none;color:#173b27;font-weight:950;font-size:20px;letter-spacing:-.8px}
.st-brand span{color:#16a34a}
.st-navlinks{display:flex;align-items:center;gap:18px}
.st-navlinks button{border:0;background:none;color:#53675a;font-weight:650}
.st-menu{display:none;border:1px solid #dce9df;background:#f4faf5;color:#15803d;padding:9px;border-radius:10px}
.st-mobile-menu{display:grid;gap:8px;padding:14px 20px 20px;background:white}
.st-mobile-menu button{padding:13px;border:1px solid #e5eee7;border-radius:10px;background:#f8fbf8;color:#203b2a;text-align:left}
.st-container{max-width:1200px;margin:auto;padding:30px 22px 80px}
.st-btn{border:1px solid #15803d;border-radius:11px;padding:13px 19px;background:linear-gradient(135deg,#22c55e,#15803d);color:white;font-weight:850;display:inline-flex;align-items:center;justify-content:center;gap:9px;transition:.2s;box-shadow:0 8px 22px #16a34a20}
.st-btn:hover{transform:translateY(-2px)}
.st-btn:disabled{opacity:.55;cursor:not-allowed;transform:none}
.st-btn-light{background:white;color:#15803d;border:1px solid #cfe4d4;box-shadow:none}
.st-eyebrow{display:inline-flex;align-items:center;gap:8px;padding:8px 13px;border-radius:30px;background:#eaf8ed;border:1px solid #ccebd3;color:#15803d;font-size:11px;font-weight:850;letter-spacing:1px}
.st-hero{border-radius:25px;padding:60px 7%;background:radial-gradient(circle at 85% 20%,#22c55e26,transparent 30%),linear-gradient(120deg,#fff,#f0faf2 70%,#e8f6eb);border:1px solid #d8ebdd;display:grid;grid-template-columns:1.3fr .7fr;align-items:center;gap:25px;animation:fade .6s}
.st-hero h1{font-size:clamp(36px,6vw,66px);line-height:1.08;letter-spacing:-2px;margin:20px 0;color:#173b27}
.st-hero h1 span{color:#16a34a}
.st-hero p{color:#617568;line-height:1.85;max-width:520px}
.st-hero-actions{display:flex;flex-wrap:wrap;gap:12px;margin-top:26px}
.st-hero-art{min-height:230px;display:grid;place-items:center;position:relative}
.st-art-circle{width:200px;height:200px;border-radius:50%;display:grid;place-items:center;color:#16a34a;background:linear-gradient(145deg,#fff,#e7f7eb);border:1px solid #bfe5c8;box-shadow:0 0 45px #16a34a20;animation:float 4s infinite}
.st-float-tag{position:absolute;padding:12px 14px;border-radius:12px;background:white;border:1px solid #e0ece3;color:#244331;font-size:12px;font-weight:800;box-shadow:0 8px 22px #174d2510}
.st-tag-one{top:10px;right:0}.st-tag-two{bottom:10px;left:0}
.st-section{margin-top:42px}
.st-section-head{display:flex;align-items:end;justify-content:space-between;gap:15px;margin-bottom:20px}
.st-section-head h2{margin:0;font-size:26px;color:#173b27}
.st-section-head p{color:#75877b;margin:7px 0 0;font-size:14px}
.st-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
.st-card{background:white;border:1px solid #e2ece4;border-radius:17px;padding:21px;box-shadow:0 8px 25px #1446280b;transition:.2s;animation:fade .4s}
.st-card:hover{transform:translateY(-3px);border-color:#a9dcb5}
.st-service-card{width:100%;text-align:left;color:inherit}
.st-service-icon{width:52px;height:52px;border-radius:15px;display:grid;place-items:center;background:#f0f8f1;margin-bottom:15px}
.st-service-card h3{margin:0 0 7px;color:#203b2a;font-size:16px}
.st-service-card p{margin:0;color:#75877b;font-size:13px;line-height:1.6}
.st-form-wrap{max-width:560px;margin:25px auto;background:white;border:1px solid #dceade;padding:30px;border-radius:21px;box-shadow:0 15px 45px #14462812;animation:fade .4s}
.st-form-wrap h2{margin-top:17px;font-size:27px;color:#173b27}
.st-form-wrap>p{color:#75877b;line-height:1.6}
.st-input{width:100%;padding:14px 15px;margin:7px 0 17px;border:1px solid #dce8df;background:#fbfdfb;color:#203b2a;border-radius:10px;outline:none;font-size:15px}
.st-input:focus{border-color:#22a34a;box-shadow:0 0 0 4px #22a34a17;background:white}
.st-label{font-size:13px;font-weight:750;color:#405b49}
.st-message{padding:14px 17px;background:#effaf1;color:#176b32;border:1px solid #ccebd3;border-radius:12px;margin-bottom:20px;overflow-wrap:anywhere}
.st-error{background:#fff1f0;color:#a32119;border-color:#f2c7c3}
.st-dashboard-top{display:flex;align-items:center;justify-content:space-between;gap:15px;flex-wrap:wrap;margin-bottom:22px}
.st-dashboard-top h1{margin:13px 0 0;font-size:29px;color:#173b27}
.st-muted{color:#75877b}
.st-profile-row{display:flex;align-items:center;gap:15px}
.st-avatar{width:53px;height:53px;display:grid;place-items:center;background:#e8f7eb;color:#15803d;border-radius:50%;flex-shrink:0}
.st-profile-row h3{margin:0 0 5px;overflow-wrap:anywhere}
.st-profile-row p{margin:0;color:#75877b;font-size:13px;overflow-wrap:anywhere}
.st-wallet{background:radial-gradient(circle at 90% 0%,#22c55e26,transparent 40%),linear-gradient(120deg,#f1fbf3,#fff);border:1px solid #bfe5c8;position:relative;overflow:hidden}
.st-wallet-top{display:flex;justify-content:space-between;align-items:center;color:#15803d}
.st-wallet h2{font-size:34px;margin:12px 0 20px;color:#173b27;overflow-wrap:anywhere}
.st-eye-button{background:transparent;color:#15803d;border:0;padding:6px}
.st-actions-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:13px}
.st-action{border:1px solid #e0ebe2;background:white;padding:18px 10px;border-radius:14px;color:#405b49;display:grid;justify-items:center;gap:10px;font-weight:750;transition:.2s}
.st-action:hover{transform:translateY(-3px);border-color:#a9dcb5;background:#f5fbf6}
.st-action svg{color:#16a34a}
.st-history{display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:10px}
.st-status{padding:6px 10px;border-radius:30px;background:#eaf8ed;color:#15803d;font-size:12px;font-weight:800;text-transform:capitalize}
.st-empty{text-align:center;padding:30px 15px;color:#75877b;background:#fbfdfb;border:1px dashed #cbdccf;border-radius:15px}
.st-admin-label{display:inline-block;background:#eaf8ed;color:#15803d;padding:6px 11px;border-radius:30px;font-size:12px;font-weight:800}
.st-provider-output{background:#f6faf7;color:#304b39;border:1px solid #dce8df;padding:15px;border-radius:12px;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere;font-size:12px;max-height:450px}
.st-opay-card{padding:23px;margin:20px 0;border:1px solid #ccebd3;border-radius:18px;background:linear-gradient(135deg,#fff,#f1faf3);box-shadow:0 12px 28px #16a34a17}
.st-opay-top{display:flex;align-items:center;justify-content:space-between;gap:10px}
.st-opay-brand{display:flex;align-items:center;gap:10px;color:#087b36;font-weight:950;font-size:23px}
.st-opay-mark{width:42px;height:42px;border:6px solid #13a64a;border-radius:50%;display:grid;place-items:center;color:#13a64a}
.st-opay-number{color:#087b36!important;font-size:clamp(28px,6vw,36px);letter-spacing:1px;font-weight:950;margin:22px 0 6px!important}
.st-opay-name{color:#254b32;font-weight:850;margin:5px 0}
.st-copy-note{color:#66816d;font-size:12px;line-height:1.6}
.st-feature{background:linear-gradient(110deg,#f0faf2,#fff);border:1px solid #d7eadb;border-radius:18px;padding:25px;display:flex;align-items:center;gap:17px;margin-top:35px}
.st-feature-icon{background:#e4f7e8;color:#15803d;padding:14px;border-radius:14px}
.st-footer{background:white;border-top:1px solid #e2ece4;padding:35px 22px;text-align:center;color:#75877b}
.st-footer strong{color:#15803d;font-size:18px}
.st-footer a{color:#15803d;text-decoration:none;font-weight:750}
.st-bottom-nav{display:none}
.st-spinner{animation:spin 1s linear infinite}
@keyframes fade{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
@keyframes spin{to{transform:rotate(360deg)}}
@media(max-width:760px){
.st-navlinks{display:none}.st-menu{display:inline-flex}
.st-hero{grid-template-columns:1fr;padding:40px 7%}
.st-hero-art{min-height:190px}
.st-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
.st-actions-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
.st-container{padding-bottom:105px}
.st-bottom-nav{display:flex;position:fixed;z-index:60;bottom:0;left:0;right:0;justify-content:space-around;align-items:center;padding:10px 5px calc(10px + env(safe-area-inset-bottom));background:#ffffffed;backdrop-filter:blur(18px);border-top:1px solid #e1ebe3}
.st-bottom-nav button{border:0;background:transparent;color:#7b8c80;display:grid;justify-items:center;gap:4px;font-size:10px;font-weight:750;padding:5px 9px}
.st-bottom-nav button.active{color:#15803d}
}
@media(max-width:430px){
.st-container{padding:20px 14px 110px}.st-nav{padding:13px 15px}
.st-brand{font-size:18px}.st-hero{padding:32px 20px}
.st-grid{gap:10px}.st-card{padding:15px}
.st-form-wrap{padding:22px 17px}
.st-wallet h2{font-size:28px}
.st-section-head{align-items:start;flex-direction:column}
.st-feature{align-items:flex-start;padding:18px}
}
@media(prefers-reduced-motion:reduce){*,*:before,*:after{animation-duration:.01ms!important;animation-iteration-count:1!important;scroll-behavior:auto!important;transition-duration:.01ms!important}}
`;

const textLink = {
  border: 0,
  background: "transparent",
  color: "#15803d",
  fontWeight: 750,
  cursor: "pointer"
};

export default function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(0);
  const [deposits, setDeposits] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [pendingDeposits, setPendingDeposits] = useState([]);
  const [page, setPage] = useState("home");
  const [loading, setLoading] = useState(false);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [catalogResult, setCatalogResult] = useState(null);
  const [message, setMessage] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  const [form, setForm] = useState({
    full_name: "",
    username: "",
    gender: "",
    phone: "",
    email: "",
    password: ""
  });

  const [depositForm, setDepositForm] = useState({
    amount: "",
    reference: ""
  });

  const [airtimeForm, setAirtimeForm] = useState({
    network: "mtn",
    phone: "",
    amount: ""
  });

  const [dataForm, setDataForm] = useState({
    network: "mtn",
    phone: "",
    plan: ""
  });

  const money = value =>
    "₦" + Number(value || 0).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  const button = "st-btn";
  const input = "st-input";

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      if (data.session) loadAccount(data.session.user);
    });

    const { data: { subscription } } =
      supabase.auth.onAuthStateChange((_event, newSession) => {
        if (!mounted) return;

        setSession(newSession);

        if (newSession) {
          loadAccount(newSession.user);
        } else {
          setProfile(null);
          setBalance(0);
          setDeposits([]);
          setTransactions([]);
          setPendingDeposits([]);
          setCatalogResult(null);
        }
      });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  async function loadAccount(user) {
    if (!user) return;

    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", user.id)
      .maybeSingle();

    setProfile(profileData);

    const { data: walletData } = await supabase
      .from("wallets")
      .select("balance")
      .eq("user_id", user.id)
      .maybeSingle();

    setBalance(Number(walletData?.balance || 0));

    const { data: depositData } = await supabase
      .from("deposits")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setDeposits(depositData || []);

    const { data: transactionData } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    setTransactions(transactionData || []);

    if (profileData?.role === "admin") {
      await loadPendingDeposits();
    }
  }

  function go(destination) {
    setPage(destination);
    setMessage("");
    setShowMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function register(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (
      !form.full_name.trim() ||
      !form.username.trim() ||
      !form.gender ||
      !form.phone.trim() ||
      !form.email.trim() ||
      !form.password
    ) {
      setMessage("Please complete all fields.");
      setLoading(false);
      return;
    }

    if (form.password.length < 6) {
      setMessage("Password must contain at least 6 characters.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email: form.email.trim(),
      password: form.password,
      options: {
        data: {
          full_name: form.full_name.trim(),
          username: form.username.trim(),
          gender: form.gender,
          phone: form.phone.trim()
        }
      }
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Registration submitted! Check your email for a confirmation link.");
      setPage("login");
    }

    setLoading(false);
  }

  async function login(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.auth.signInWithPassword({
      email: form.email.trim(),
      password: form.password
    });

    if (error) {
      setMessage(error.message);
    } else {
      await loadAccount(data.user);
      setPage("dashboard");
    }

    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();
    setPage("home");
    setMessage("");
    setCatalogResult(null);
  }

  async function submitDeposit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const amount = Number(depositForm.amount);

    if (!Number.isFinite(amount) || amount <= 0) {
      setMessage("Enter a valid deposit amount.");
      setLoading(false);
      return;
    }

    if (!depositForm.reference.trim()) {
      setMessage("Enter your OPay transfer reference.");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("deposits").insert({
      user_id: session.user.id,
      amount,
      payment_reference: depositForm.reference.trim(),
      status: "pending"
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Deposit request submitted. Awaiting admin verification.");
      setDepositForm({ amount: "", reference: "" });
      await loadAccount(session.user);
      setPage("dashboard");
    }

    setLoading(false);
  }

  async function loadPendingDeposits() {
    const { data, error } = await supabase.functions.invoke(
      "admin-deposits-v2",
      { body: { action: "list" } }
    );

    if (error) {
      setMessage(error.message);
      return;
    }

    if (data?.error) {
      setMessage(data.error);
      return;
    }

    setPendingDeposits(data?.deposits || []);
  }

  async function processDeposit(depositId, action) {
    const confirmed = window.confirm(
      action === "approve"
        ? "Have you verified that this payment was received in your OPay account?"
        : "Reject this deposit request?"
    );

    if (!confirmed) return;

    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.functions.invoke(
      "admin-deposits-v2",
      { body: { action, depositId } }
    );

    if (error) {
      setMessage(error.message);
    } else if (data?.error) {
      setMessage(data.error);
    } else {
      setMessage(`Deposit ${action}d successfully.`);
      await loadPendingDeposits();
      await loadAccount(session.user);
    }

    setLoading(false);
  }

  async function loadAutoSyncCatalog() {
    if (catalogResult) return catalogResult;

    setCatalogLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "autosync-catalog-v2",
        { body: {} }
      );

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setCatalogResult(data);
      return data;
    } catch (error) {
      setMessage(error.message || "Unable to load AutoSyncNG catalogue.");
      return null;
    } finally {
      setCatalogLoading(false);
    }
  }

  async function testAutoSyncCatalog() {
    setCatalogResult(null);
    await loadAutoSyncCatalog();
    setMessage("AutoSyncNG catalogue test completed.");
  }

  async function openService(destination) {
    if (!session) {
      go("login");
      return;
    }

    go(destination);

    if (!catalogResult) {
      await loadAutoSyncCatalog();
    }
  }

  function submitAirtime(e) {
    e.preventDefault();

    if (!/^\d{10,11}$/.test(airtimeForm.phone.replace(/\s/g, ""))) {
      setMessage("Enter a valid 10 or 11 digit phone number.");
      return;
    }

    if (Number(airtimeForm.amount) < 50) {
      setMessage("Minimum airtime amount is ₦50.");
      return;
    }

    setMessage(
      "Airtime purchase is not activated yet. No wallet deduction has been made."
    );
  }

  function submitData(e) {
    e.preventDefault();

    if (!/^\d{10,11}$/.test(dataForm.phone.replace(/\s/g, ""))) {
      setMessage("Enter a valid 10 or 11 digit phone number.");
      return;
    }

    if (!dataForm.plan) {
      setMessage("Please select a data plan.");
      return;
    }

    setMessage(
      "Data purchase is not activated yet. No wallet deduction has been made."
    );
  }

  function copyReferral() {
    const code = profile?.username || session?.user?.id || "";
    if (!code) return;

    navigator.clipboard?.writeText(code)
      .then(() => setMessage("Referral code copied."))
      .catch(() => setMessage("Your referral code is: " + code));
  }

  const catalogue = catalogResult?.catalogue || [];

  const airtimeProducts =
    catalogue.find(x => x.endpoint === "airtime")
      ?.data?.category?.products || [];

  const dataProducts =
    catalogue.find(x => x.endpoint === "data")
      ?.data?.category?.products || [];

  const selectedDataProduct = dataProducts.find(
    p => p.code === dataForm.network
  );

  const dataPlans = selectedDataProduct?.variations || [];

  return (
    <div className="st-app">
      <style>{styles}</style>

      <header className="st-header">
        <div className="st-nav">
          <button className="st-brand" onClick={() => go("home")}>
            <span>SODIQ</span> TELECOM
          </button>

          <div className="st-navlinks">
            <button onClick={() => go("home")}>Home</button>

            {session && (
              <>
                <button onClick={() => go("dashboard")}>Dashboard</button>
                <button onClick={() => go("transactions")}>Transactions</button>
              </>
            )}

            <a href={WHATSAPP} style={{
              color: "#53675a",
              textDecoration: "none",
              fontWeight: 650
            }}>
              Support
            </a>

            {session ? (
              <button className={button} onClick={logout}>
                <LogOut size={16} /> Logout
              </button>
            ) : (
              <>
                <button onClick={() => go("login")}>Login</button>
                <button className={button} onClick={() => go("register")}>
                  Create Account
                </button>
              </>
            )}
          </div>

          <button
            className="st-menu"
            onClick={() => setShowMenu(!showMenu)}
            aria-label="Toggle menu"
          >
            {showMenu ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>

        {showMenu && (
          <nav className="st-mobile-menu">
            <button onClick={() => go("home")}>Home</button>

            {session ? (
              <>
                <button onClick={() => go("dashboard")}>Dashboard</button>
                <button onClick={() => go("airtime")}>Buy Airtime</button>
                <button onClick={() => openService("data")}>Buy Data</button>
                <button onClick={() => go("deposit")}>Fund Wallet</button>
                <button onClick={() => go("transactions")}>Transactions</button>
                <button onClick={() => go("profile")}>My Profile</button>
                <button onClick={() => go("support")}>Support</button>

                {profile?.role === "admin" && (
                  <button onClick={() => go("admin")}>Admin Panel</button>
                )}

                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => go("login")}>Login</button>
                <button onClick={() => go("register")}>Create Account</button>
              </>
            )}
          </nav>
        )}
      </header>

      <main className="st-container">
        {message && (
          <div className="st-message">
            {message}
          </div>
        )}

        {/* HOME */}
        {page === "home" && (
          <>
            <section className="st-hero">
              <div>
                <div className="st-eyebrow">
                  <Activity size={14} /> YOUR DIGITAL PAYMENT PLATFORM
                </div>

                <h1>
                  Your digital world.<br />
                  <span>One platform.</span>
                </h1>

                <p>
                  Buy airtime, subscribe to data, pay bills and access digital
                  services with Sodiq Telecom Services. Simple, convenient
                  and reliable.
                </p>

                <div className="st-hero-actions">
                  <button
                    className={button}
                    onClick={() => go(session ? "dashboard" : "register")}
                  >
                    Get Started <ArrowRight size={17} />
                  </button>

                  <button
                    className="st-btn st-btn-light"
                    onClick={() => go("login")}
                  >
                    Login to Account
                  </button>
                </div>
              </div>

              <div className="st-hero-art">
                <div className="st-art-circle">
                  <Globe size={105} strokeWidth={1.2} />
                </div>

                <div className="st-float-tag st-tag-one">
                  <Wifi size={15} color="#16a34a" /> Data & Airtime
                </div>

                <div className="st-float-tag st-tag-two">
                  <ShieldCheck size={15} color="#16a34a" /> Secure Payments
                </div>
              </div>
            </section>

            <section className="st-section">
              <div className="st-section-head">
                <div>
                  <h2>Our Services</h2>
                  <p>Explore the services on our platform.</p>
                </div>
                <Sparkles color="#16a34a" size={23} />
              </div>

              <div className="st-grid">
                {services.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <button
                      type="button"
                      className="st-card st-service-card"
                      key={item.title}
                      style={{ animationDelay: `${index * 80}ms` }}
                      onClick={() => {
                        if (item.page === "airtime" || item.page === "data") {
                          openService(item.page);
                        } else {
                          if (!session) go("login");
                          else go(item.page);
                        }
                      }}
                    >
                      <div
                        className="st-service-icon"
                        style={{ color: item.color }}
                      >
                        <Icon size={26} />
                      </div>

                      <h3>{item.title}</h3>
                      <p>{item.desc}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="st-feature">
              <div className="st-feature-icon">
                <ShieldCheck size={29} />
              </div>

              <div>
                <h3 style={{ margin: "0 0 6px", color: "#203b2a" }}>
                  Simple and secure wallet funding
                </h3>
                <p>
                  Deposit requests are reviewed by the administrator before
                  funds are added to your wallet.
                </p>
              </div>
            </div>
          </>
        )}

        {/* REGISTER */}
        {page === "register" && (
          <section className="st-form-wrap">
            <div className="st-eyebrow">
              <Lock size={14} /> ACCOUNT REGISTRATION
            </div>

            <h2>Create your account</h2>
            <p>Join Sodiq Telecom Services.</p>

            <form onSubmit={register}>
              <label className="st-label">Full Name</label>
              <input
                className={input}
                value={form.full_name}
                onChange={e => setForm({ ...form, full_name: e.target.value })}
                required
              />

              <label className="st-label">Username</label>
              <input
                className={input}
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })}
                required
              />

              <label className="st-label">Gender</label>
              <select
                className={input}
                value={form.gender}
                onChange={e => setForm({ ...form, gender: e.target.value })}
                required
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Prefer not to say</option>
              </select>

              <label className="st-label">Phone Number</label>
              <input
                className={input}
                type="tel"
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
                required
              />

              <label className="st-label">Email Address</label>
              <input
                className={input}
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />

              <label className="st-label">Password</label>
              <input
                className={input}
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />

              <button className={button} disabled={loading} style={{ width: "100%" }}>
                {loading ? "Creating account..." : "Create Account"}
                <ArrowRight size={17} />
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: 20 }}>
              Already have an account?{" "}
              <button onClick={() => go("login")} style={textLink}>Login</button>
            </p>
          </section>
        )}

        {/* LOGIN */}
        {page === "login" && (
          <section className="st-form-wrap">
            <div className="st-eyebrow">
              <Lock size={14} /> SECURE LOGIN
            </div>

            <h2>Welcome back</h2>
            <p>Login to access your Sodiq Telecom account.</p>

            <form onSubmit={login}>
              <label className="st-label">Email Address</label>
              <input
                className={input}
                type="email"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required
              />

              <label className="st-label">Password</label>
              <input
                className={input}
                type="password"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required
              />

              <button className={button} disabled={loading} style={{ width: "100%" }}>
                {loading ? "Logging in..." : "Login"}
                <ArrowRight size={17} />
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: 20 }}>
              New here?{" "}
              <button onClick={() => go("register")} style={textLink}>
                Create an account
              </button>
            </p>
          </section>
        )}

        {/* DASHBOARD */}
        {page === "dashboard" && session && (
          <>
            <div className="st-dashboard-top">
              <div>
                <div className="st-eyebrow">
                  <LayoutDashboard size={14} /> CUSTOMER DASHBOARD
                </div>
                <h1>My Dashboard</h1>
                <p className="st-muted">
                  Welcome back, {profile?.full_name || "Customer"}.
                </p>
              </div>

              <button className="st-btn st-btn-light" onClick={() => loadAccount(session.user)}>
                <RefreshCw size={16} /> Refresh
              </button>
            </div>

            <div className="st-grid" style={{ gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))" }}>
              <div className="st-card">
                <div className="st-profile-row">
                  <div className="st-avatar"><User size={25} /></div>
                  <div>
                    <h3>{profile?.full_name || session.user.email}</h3>
                    <p>{session.user.email}</p>
                  </div>
                </div>

                <p className="st-muted" style={{ marginTop: 18, fontSize: 13 }}>
                  Username: {profile?.username || "Customer"}
                </p>

                {profile?.role === "admin" && (
                  <span className="st-admin-label">Administrator</span>
                )}
              </div>

              <div className="st-card st-wallet">
                <div className="st-wallet-top">
                  <Wallet size={28} />
                  <button className="st-eye-button" onClick={() => setShowBalance(!showBalance)}>
                    {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
                  </button>
                </div>

                <p style={{ marginBottom: 0, color: "#5e7866" }}>
                  AVAILABLE WALLET BALANCE
                </p>

                <h2>{showBalance ? money(balance) : "₦ ••••••"}</h2>

                <button className={button} onClick={() => go("deposit")}>
                  <CreditCard size={17} /> Fund Wallet
                </button>
              </div>
            </div>

            <section className="st-section">
              <div className="st-section-head">
                <div>
                  <h2>Quick Actions</h2>
                  <p>Access your account services.</p>
                </div>
              </div>

              <div className="st-actions-grid">
                <button className="st-action" onClick={() => openService("airtime")}>
                  <Smartphone size={25} /> Buy Airtime
                </button>

                <button className="st-action" onClick={() => openService("data")}>
                  <Wifi size={25} /> Buy Data
                </button>

                <button className="st-action" onClick={() => go("deposit")}>
                  <Wallet size={25} /> Fund Wallet
                </button>

                <button className="st-action" onClick={() => go("transactions")}>
                  <History size={25} /> Transactions
                </button>

                <button className="st-action" onClick={() => go("profile")}>
                  <UserCircle size={25} /> My Profile
                </button>

                <button className="st-action" onClick={() => go("support")}>
                  <Headphones size={25} /> Support
                </button>

                {profile?.role === "admin" && (
                  <button className="st-action" onClick={() => go("admin")}>
                    <ShieldCheck size={25} /> Admin Panel
                  </button>
                )}
              </div>
            </section>

            <section className="st-section">
              <div className="st-section-head">
                <div>
                  <h2>Recent Deposits</h2>
                  <p>Your latest wallet funding requests.</p>
                </div>
                <button style={textLink} onClick={() => go("deposit-history")}>
                  View all
                </button>
              </div>

              {deposits.length === 0 ? (
                <div className="st-empty">No deposits yet.</div>
              ) : (
                deposits.slice(0, 3).map(deposit => (
                  <div className="st-card" key={deposit.id} style={{ marginBottom: 12 }}>
                    <div className="st-history">
                      <strong>{money(deposit.amount)}</strong>
                      <span className="st-status">{deposit.status}</span>
                    </div>
                    <small className="st-muted">
                      {new Date(deposit.created_at).toLocaleString()}
                    </small>
                  </div>
                ))
              )}
            </section>
          </>
        )}

        {/* AIRTIME */}
        {page === "airtime" && session && (
          <section className="st-form-wrap">
            <div className="st-eyebrow"><Smartphone size={14} /> AIRTIME RECHARGE</div>
            <h2>Buy Airtime</h2>
            <p>Select your network and enter your recharge details.</p>

            {catalogLoading ? (
              <div className="st-empty">Loading networks...</div>
            ) : (
              <form onSubmit={submitAirtime}>
                <label className="st-label">Network</label>
                <select
                  className={input}
                  value={airtimeForm.network}
                  onChange={e => setAirtimeForm({ ...airtimeForm, network: e.target.value })}
                >
                  {airtimeProducts.map(n => (
                    <option key={n.id} value={n.code}>{n.name}</option>
                  ))}
                </select>

                <label className="st-label">Phone Number</label>
                <input
                  className={input}
                  type="tel"
                  placeholder="Enter phone number"
                  value={airtimeForm.phone}
                  onChange={e => setAirtimeForm({ ...airtimeForm, phone: e.target.value })}
                  required
                />

                <label className="st-label">Amount (₦)</label>
                <input
                  className={input}
                  type="number"
                  min="50"
                  placeholder="Enter amount"
                  value={airtimeForm.amount}
                  onChange={e => setAirtimeForm({ ...airtimeForm, amount: e.target.value })}
                  required
                />

                <div className="st-message">
                  Airtime purchase is awaiting secure supplier and wallet integration.
                </div>

                <button className={button} disabled style={{ width: "100%" }}>
                  Purchase Coming Soon
                </button>
              </form>
            )}
          </section>
        )}

        {/* DATA */}
        {page === "data" && session && (
          <section className="st-form-wrap">
            <div className="st-eyebrow"><Wifi size={14} /> DATA SUBSCRIPTION</div>
            <h2>Buy Data</h2>
            <p>Choose your network and available data plan.</p>

            {catalogLoading ? (
              <div className="st-empty">Loading data plans...</div>
            ) : (
              <form onSubmit={submitData}>
                <label className="st-label">Network</label>
                <select
                  className={input}
                  value={dataForm.network}
                  onChange={e => setDataForm({
                    ...dataForm,
                    network: e.target.value,
                    plan: ""
                  })}
                >
                  {dataProducts.map(p => (
                    <option key={p.id} value={p.code}>{p.name}</option>
                  ))}
                </select>

                <label className="st-label">Phone Number</label>
                <input
                  className={input}
                  type="tel"
                  placeholder="Enter phone number"
                  value={dataForm.phone}
                  onChange={e => setDataForm({ ...dataForm, phone: e.target.value })}
                  required
                />

                <label className="st-label">Select Data Plan</label>
                <select
                  className={input}
                  value={dataForm.plan}
                  onChange={e => setDataForm({ ...dataForm, plan: e.target.value })}
                  required
                >
                  <option value="">Choose a plan</option>
                  {dataPlans.map((plan, index) => (
                    <option key={`${plan.id}-${index}`} value={String(plan.id)}>
                      {plan.name} — Supplier price: {money(plan.amount)}
                    </option>
                  ))}
                </select>

                {dataForm.plan && (
                  <div className="st-message">
                    Supplier price: {money(dataPlans.find(p => String(p.id) === dataForm.plan)?.amount)}
                    <br />
                    Final customer price will be configured separately.
                  </div>
                )}

                {dataPlans.length === 0 && (
                  <div className="st-empty">
                    No plans available for this network in the current catalogue.
                  </div>
                )}

                <button className={button} disabled style={{ width: "100%" }}>
                  Purchase Coming Soon
                </button>
              </form>
            )}
          </section>
        )}

        {/* CABLE TV */}
        {page === "cable" && session && (
          <section className="st-form-wrap">
            <div className="st-eyebrow"><Tv size={14} /> CABLE TV</div>
            <h2>Cable TV Subscription</h2>
            <p>Manage your television subscription through our platform.</p>

            <label className="st-label">Select Provider</label>
            <select className={input} disabled>
              <option>Choose cable provider</option>
              <option>DStv</option>
              <option>GOtv</option>
              <option>Startimes</option>
            </select>

            <div className="st-message">
              Cable TV payments are not connected to a verified supplier yet.
              No payment can be made from this page.
            </div>
          </section>
        )}

        {/* ELECTRICITY */}
        {page === "electricity" && session && (
          <section className="st-form-wrap">
            <div className="st-eyebrow"><Zap size={14} /> ELECTRICITY</div>
            <h2>Electricity Bill Payment</h2>
            <p>Electricity bill payment will be available after supplier integration.</p>

            <label className="st-label">Select Distribution Company</label>
            <select className={input} disabled>
              <option>Choose electricity provider</option>
              <option>IBEDC</option>
              <option>EKEDC</option>
              <option>IKEDC</option>
              <option>BEDC</option>
              <option>Other</option>
            </select>

            <div className="st-message">
              Electricity purchases are not activated yet. Your wallet will not
              be charged here.
            </div>
          </section>
        )}

        {/* DEPOSIT */}
        {page === "deposit" && session && (
          <section className="st-form-wrap">
            <div className="st-eyebrow"><Wallet size={14} /> WALLET FUNDING</div>
            <h2>Fund your wallet</h2>
            <p>Transfer to the account below and submit your payment reference.</p>

            <div className="st-opay-card">
              <div className="st-opay-top">
                <div className="st-opay-brand">
                  <span className="st-opay-mark">O</span> OPay
                </div>
                <span className="st-admin-label">BANK TRANSFER</span>
              </div>

              <p className="st-opay-number">8114095631</p>
              <h3 className="st-opay-name">Ogunlowo Sodiq Ayomiposi</h3>
              <p style={{ color: "#587362", margin: "7px 0" }}>Bank: OPay</p>

              <p className="st-copy-note">
                Transfer to this account, then enter the exact amount and
                transfer reference below. Your wallet will be credited only
                after admin verification.
              </p>
            </div>

            <form onSubmit={submitDeposit}>
              <label className="st-label">Amount (₦)</label>
              <input
                className={input}
                type="number"
                min="1"
                value={depositForm.amount}
                onChange={e => setDepositForm({ ...depositForm, amount: e.target.value })}
                required
              />

              <label className="st-label">OPay Transfer Reference</label>
              <input
                className={input}
                value={depositForm.reference}
                onChange={e => setDepositForm({ ...depositForm, reference: e.target.value })}
                required
              />

              <button className={button} disabled={loading} style={{ width: "100%" }}>
                {loading ? "Submitting..." : "Submit Deposit Request"}
                <ArrowRight size={17} />
              </button>
            </form>
          </section>
        )}

        {/* DEPOSIT HISTORY */}
        {page === "deposit-history" && session && (
          <section className="st-section">
            <div className="st-dashboard-top">
              <div>
                <div className="st-eyebrow"><History size={14} /> WALLET RECORDS</div>
                <h1>Deposit History</h1>
              </div>
              <button className="st-btn st-btn-light" onClick={() => loadAccount(session.user)}>
                <RefreshCw size={16} /> Refresh
              </button>
            </div>

            {deposits.length === 0 ? (
              <div className="st-empty">No deposits yet.</div>
            ) : deposits.map(deposit => (
              <div className="st-card" key={deposit.id} style={{ marginBottom: 12 }}>
                <div className="st-history">
                  <strong>{money(deposit.amount)}</strong>
                  <span className="st-status">{deposit.status}</span>
                </div>
                <p className="st-muted">Reference: {deposit.payment_reference || "N/A"}</p>
                <small className="st-muted">{new Date(deposit.created_at).toLocaleString()}</small>
              </div>
            ))}
          </section>
        )}

        {/* TRANSACTIONS */}
        {page === "transactions" && session && (
          <section className="st-section">
            <div className="st-dashboard-top">
              <div>
                <div className="st-eyebrow"><Receipt size={14} /> ACCOUNT ACTIVITY</div>
                <h1>Transactions</h1>
                <p className="st-muted">Your transaction records.</p>
              </div>
              <button className="st-btn st-btn-light" onClick={() => loadAccount(session.user)}>
                <RefreshCw size={16} /> Refresh
              </button>
            </div>

            {transactions.length === 0 ? (
              <div className="st-empty">
                <History size={32} />
                <p>No transactions recorded yet.</p>
              </div>
            ) : transactions.map(tx => (
              <div className="st-card" key={tx.id} style={{ marginBottom: 12 }}>
                <div className="st-history">
                  <strong>{money(tx.amount)}</strong>
                  <span className="st-status">{tx.status || "Unknown"}</span>
                </div>
                <p className="st-muted">
                  {tx.type || tx.service || "Transaction"}
                </p>
                <small className="st-muted">
                  {tx.created_at ? new Date(tx.created_at).toLocaleString() : ""}
                </small>
              </div>
            ))}
          </section>
        )}

        {/* REFERRAL */}
        {page === "referral" && session && (
          <section className="st-form-wrap">
            <div className="st-eyebrow"><Gift size={14} /> REFERRAL PROGRAMME</div>
            <h2>Invite and earn</h2>
            <p>Share your referral code with people you invite to the platform.</p>

            <div className="st-card">
              <p className="st-muted">Your referral code</p>
              <h2 style={{ overflowWrap: "anywhere" }}>
                {profile?.username || session.user.id.slice(0, 8)}
              </h2>
              <button className={button} onClick={copyReferral}>
                <Copy size={16} /> Copy Referral Code
              </button>
            </div>

            <div className="st-message" style={{ marginTop: 18 }}>
              Referral tracking and reward withdrawals will be enabled after
              the referral database and secure reward-processing functions
              are configured. No referral earnings are being promised yet.
            </div>
          </section>
        )}

        {/* PROFILE */}
        {page === "profile" && session && (
          <section className="st-form-wrap">
            <div className="st-eyebrow"><UserCircle size={14} /> ACCOUNT PROFILE</div>
            <h2>My Profile</h2>
            <p>Your registered account information.</p>

            <label className="st-label">Full Name</label>
            <input className={input} value={profile?.full_name || ""} readOnly />

            <label className="st-label">Username</label>
            <input className={input} value={profile?.username || ""} readOnly />

            <label className="st-label">Email Address</label>
            <input className={input} value={session.user.email || ""} readOnly />

            <label className="st-label">Phone Number</label>
            <input className={input} value={profile?.phone || ""} readOnly />

            <label className="st-label">Account Role</label>
            <input className={input} value={profile?.role || "customer"} readOnly />

            <div className="st-message">
              Profile information is displayed from your registered account.
            </div>
          </section>
        )}

        {/* SUPPORT */}
        {page === "support" && session && (
          <section className="st-form-wrap">
            <div className="st-eyebrow"><Headphones size={14} /> CUSTOMER SUPPORT</div>
            <h2>How can we help?</h2>
            <p>Contact Sodiq Telecom Services for assistance.</p>

            <div className="st-card">
              <div className="st-profile-row">
                <div className="st-avatar"><Phone size={23} /></div>
                <div>
                  <h3>WhatsApp Support</h3>
                  <p>Chat with our support team.</p>
                </div>
              </div>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noreferrer"
                className={button}
                style={{ marginTop: 18, textDecoration: "none" }}
              >
                <Headphones size={17} /> Contact on WhatsApp
              </a>
            </div>

            <div className="st-card" style={{ marginTop: 15 }}>
              <div className="st-profile-row">
                <div className="st-avatar"><Mail size={23} /></div>
                <div>
                  <h3>Email Support</h3>
                  <p>ogunlowosodiq19@gmail.com</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ADMIN */}
        {page === "admin" && session && profile?.role === "admin" && (
          <>
            <div className="st-dashboard-top">
              <div>
                <div className="st-eyebrow"><ShieldCheck size={14} /> ADMINISTRATION</div>
                <h1>Admin Panel</h1>
                <p className="st-muted">Manage deposits and monitor provider connection.</p>
              </div>

              <button className="st-btn st-btn-light" onClick={loadPendingDeposits} disabled={loading}>
                <RefreshCw size={16} /> Refresh Requests
              </button>
            </div>

            <div className="st-grid">
              <div className="st-card">
                <Wallet size={25} color="#16a34a" />
                <p className="st-muted">Customer wallet balance</p>
                <h2>{money(balance)}</h2>
              </div>

              <div className="st-card">
                <History size={25} color="#16a34a" />
                <p className="st-muted">Pending deposits</p>
                <h2>{pendingDeposits.length}</h2>
              </div>

              <div className="st-card">
                <Activity size={25} color="#16a34a" />
                <p className="st-muted">Your account</p>
                <h2 style={{ fontSize: 18 }}>Administrator</h2>
              </div>
            </div>

            <div className="st-card" style={{ marginTop: 22 }}>
              <h3>Pending Deposits ({pendingDeposits.length})</h3>

              {pendingDeposits.length === 0 ? (
                <div className="st-empty">No pending deposits.</div>
              ) : pendingDeposits.map(deposit => (
                <div className="st-card" key={deposit.id} style={{ marginTop: 13 }}>
                  <h3 style={{ color: "#15803d" }}>{money(deposit.amount)}</h3>
                  <p>Customer: {deposit.customer?.full_name || "Unknown"}</p>
                  <p>Username: {deposit.customer?.username || "N/A"}</p>
                  <p>Phone: {deposit.customer?.phone || "N/A"}</p>
                  <p>Reference: {deposit.payment_reference || "N/A"}</p>

                  <p className="st-muted">
                    {new Date(deposit.created_at).toLocaleString()}
                  </p>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    <button
                      className={button}
                      onClick={() => processDeposit(deposit.id, "approve")}
                      disabled={loading}
                    >
                      <CheckCircle size={16} /> Approve
                    </button>

                    <button
                      className="st-btn"
                      style={{ background: "#b42318", borderColor: "#b42318" }}
                      onClick={() => processDeposit(deposit.id, "reject")}
                      disabled={loading}
                    >
                      <XCircle size={16} /> Reject
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="st-card" style={{ marginTop: 22 }}>
              <div className="st-eyebrow"><Activity size={14} /> API CONNECTION</div>
              <h2>AutoSyncNG Provider</h2>
              <p className="st-muted">
                Retrieve the available supplier catalogue.
              </p>

              <button
                className={button}
                onClick={testAutoSyncCatalog}
                disabled={catalogLoading}
              >
                <RefreshCw size={16} className={catalogLoading ? "st-spinner" : ""} />
                {catalogLoading ? "Testing Connection..." : "Test AutoSyncNG Connection"}
              </button>

              {catalogResult && (
                <div style={{ marginTop: 20 }}>
                  <h3>Provider Response</h3>
                  <pre className="st-provider-output">
                    {JSON.stringify(catalogResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </>
        )}

        {!session && [
          "dashboard", "deposit", "admin", "airtime", "data",
          "cable", "electricity", "transactions", "deposit-history",
          "referral", "profile", "support"
        ].includes(page) && (
          <div className="st-form-wrap">
            <h2>Login required</h2>
            <p>Please log in to access this section.</p>
            <button className={button} onClick={() => go("login")}>Login</button>
          </div>
        )}

        {session && page === "admin" && profile?.role !== "admin" && (
          <div className="st-form-wrap">
            <h2>Access restricted</h2>
            <p>This section is only available to administrators.</p>
            <button className={button} onClick={() => go("dashboard")}>
              Return to Dashboard
            </button>
          </div>
        )}
      </main>

      {session && (
        <nav className="st-bottom-nav">
          <button className={page === "home" ? "active" : ""} onClick={() => go("home")}>
            <Home size={20} /> Home
          </button>

          <button className={page === "dashboard" ? "active" : ""} onClick={() => go("dashboard")}>
            <LayoutDashboard size={20} /> Dashboard
          </button>

          <button className={page === "deposit" ? "active" : ""} onClick={() => go("deposit")}>
            <Wallet size={20} /> Wallet
          </button>

          <button className={page === "transactions" ? "active" : ""} onClick={() => go("transactions")}>
            <History size={20} /> History
          </button>

          <button onClick={() => go("support")}>
            <Headphones size={20} /> Support
          </button>
        </nav>
      )}

      <footer className="st-footer">
        <strong>SODIQ TELECOM SERVICES</strong>
        <p>Reliable digital services. Simple connectivity.</p>

        <a href={WHATSAPP}>
          <Headphones size={16} style={{ verticalAlign: "middle" }} />
          Contact Support
        </a>

        <p style={{ fontSize: 12, marginTop: 20 }}>
          © 2026 Sodiq Telecom Services. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
