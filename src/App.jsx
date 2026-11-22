import React, { useEffect, useState } from "react";
import {
  Smartphone, Wifi, Tv, Zap, Gift, ShieldCheck, Headphones,
  Wallet, RefreshCw, CheckCircle, XCircle, Menu, User, ArrowRight,
  LayoutDashboard, History, LogOut, CreditCard, ChevronRight, Globe,
  Lock, Activity, X, Eye, EyeOff, Home, Sparkles
} from "lucide-react";
import { supabase } from "./supabase";

const WHATSAPP = "https://wa.me/2348114095631";

const services = [
  { key: "airtime", icon: Smartphone, title: "Buy Airtime", desc: "Recharge MTN, Airtel and Glo", color: "#16a34a", status: "Existing integration" },
  { key: "data", icon: Wifi, title: "Buy Data", desc: "Affordable data plans", color: "#0d9488", status: "Supplier setup required" },
  { key: "cable", icon: Tv, title: "Cable TV", desc: "DStv, GOtv and StarTimes", color: "#7c3aed", status: "Supplier setup required" },
  { key: "electricity", icon: Zap, title: "Electricity", desc: "Pay supported electricity bills", color: "#d97706", status: "Supplier setup required" },
  { key: "exam", icon: Gift, title: "Exam Pins", desc: "WAEC, NECO and other pins", color: "#2563eb", status: "Supplier setup required" },
  { key: "recharge", icon: CreditCard, title: "Recharge Cards", desc: "Generate recharge PINs", color: "#9333ea", status: "Supplier setup required" },
  { key: "sms", icon: Headphones, title: "Bulk SMS", desc: "Send messages to customers", color: "#0891b2", status: "Supplier setup required" },
  { key: "referral", icon: Gift, title: "Referral", desc: "Invite friends and earn rewards", color: "#db2777", status: "Backend setup required" },
  { key: "gifting", icon: Gift, title: "Gifting", desc: "Send airtime or wallet gifts", color: "#ea580c", status: "Backend setup required" },
  { key: "giveaway", icon: Sparkles, title: "Giveaway", desc: "View special rewards and promotions", color: "#7c3aed", status: "Admin setup required" }
];

const styles = `
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: #f5f8f6; }
.st-app {
  min-height: 100vh; background: #f5f8f6; color: #17251d;
  font-family: Inter, Arial, sans-serif; overflow-x: hidden;
}
.st-app button, .st-app input, .st-app select { font: inherit; }
.st-app button { cursor: pointer; }
.st-header {
  position: sticky; top: 0; z-index: 50; background: rgba(255,255,255,.94);
  backdrop-filter: blur(18px); border-bottom: 1px solid #e4eee7;
  box-shadow: 0 4px 18px rgba(20,70,40,.04);
}
.st-nav {
  max-width: 1200px; margin: auto; padding: 15px 22px; display: flex;
  align-items: center; justify-content: space-between; gap: 15px;
}
.st-brand {
  border: 0; background: none; color: #173b27; font-weight: 950;
  font-size: 20px; letter-spacing: -.8px;
}
.st-brand span { color: #16a34a; }
.st-navlinks { display: flex; align-items: center; gap: 23px; }
.st-navlinks button {
  border: 0; background: none; color: #53675a; font-weight: 650; transition: .2s;
}
.st-navlinks button:hover { color: #15803d; }
.st-menu {
  display: none; border: 1px solid #dce9df; background: #f4faf5;
  color: #15803d; padding: 9px; border-radius: 10px;
}
.st-mobile-menu {
  display: grid; gap: 8px; padding: 14px 20px 20px;
  background: #fff; animation: stDrop .25s ease;
}
.st-mobile-menu button {
  text-align: left; padding: 13px; border: 1px solid #e5eee7;
  border-radius: 10px; background: #f8fbf8; color: #203b2a;
}
.st-container { max-width: 1200px; margin: auto; padding: 30px 22px 75px; }
.st-btn {
  position: relative; overflow: hidden; border: 1px solid #15803d;
  border-radius: 11px; padding: 13px 19px;
  background: linear-gradient(135deg,#22c55e,#15803d); color: #fff;
  font-weight: 850; display: inline-flex; align-items: center;
  justify-content: center; gap: 9px; transition: .25s;
  box-shadow: 0 8px 22px rgba(22,163,74,.16);
}
.st-btn:before {
  content: ""; position: absolute; top: -60%; left: -70%; width: 45%; height: 220%;
  background: rgba(255,255,255,.25); transform: rotate(25deg); transition: .6s;
}
.st-btn:hover:before { left: 130%; }
.st-btn:hover { transform: translateY(-3px); box-shadow: 0 12px 28px rgba(22,163,74,.23); }
.st-btn:active { transform: scale(.97); }
.st-btn:disabled { opacity: .55; cursor: not-allowed; transform: none; }
.st-btn-light {
  background: #fff; color: #15803d; border: 1px solid #cfe4d4; box-shadow: none;
}
.st-btn-light:hover { background: #f0faf2; }
.st-eyebrow {
  display: inline-flex; align-items: center; gap: 8px; padding: 8px 13px;
  border-radius: 30px; background: #eaf8ed; border: 1px solid #ccebd3;
  color: #15803d; font-size: 11px; font-weight: 850; letter-spacing: 1px;
}
.st-hero {
  position: relative; overflow: hidden; border-radius: 25px; padding: 65px 7%;
  background: radial-gradient(circle at 85% 20%,rgba(34,197,94,.15),transparent 30%),
    linear-gradient(120deg,#fff,#f0faf2 70%,#e8f6eb);
  border: 1px solid #d8ebdd; display: grid; grid-template-columns: 1.3fr .7fr;
  align-items: center; gap: 25px; animation: stFade .7s ease;
}
.st-hero h1 { font-size: clamp(36px,6vw,66px); line-height: 1.08; letter-spacing: -2px; margin: 20px 0; color: #173b27; }
.st-hero h1 span { color: #16a34a; }
.st-hero p { color: #617568; line-height: 1.85; max-width: 520px; font-size: 15px; }
.st-hero-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 26px; }
.st-hero-art { position: relative; min-height: 250px; display: grid; place-items: center; }
.st-art-circle {
  width: 205px; height: 205px; border-radius: 50%; display: grid; place-items: center;
  color: #16a34a; background: linear-gradient(145deg,#fff,#e7f7eb);
  border: 1px solid #bfe5c8; box-shadow: 0 0 45px rgba(22,163,74,.12);
  animation: stFloat 4s ease-in-out infinite;
}
.st-float-tag {
  position: absolute; display: flex; align-items: center; gap: 8px; padding: 12px 14px;
  border-radius: 12px; background: #fff; border: 1px solid #e0ece3;
  color: #244331; font-size: 12px; font-weight: 800; box-shadow: 0 8px 22px #174d2510;
  animation: stFloat 5s ease-in-out infinite;
}
.st-tag-one { top: 10px; right: 0; }
.st-tag-two { bottom: 12px; left: 0; animation-delay: 1s; }
.st-section { margin-top: 48px; }
.st-section-head { display: flex; align-items: end; justify-content: space-between; gap: 15px; margin-bottom: 20px; }
.st-section-head h2 { margin: 0; font-size: 27px; color: #173b27; }
.st-section-head p { color: #75877b; margin: 7px 0 0; font-size: 14px; }
.st-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 16px; }
.st-card {
  background: #fff; border: 1px solid #e2ece4; border-radius: 17px; padding: 21px;
  box-shadow: 0 8px 25px rgba(20,70,40,.045);
  transition: transform .25s,border-color .25s,box-shadow .25s; animation: stFade .5s ease both;
}
.st-card:hover { transform: translateY(-5px); border-color: #a9dcb5; box-shadow: 0 14px 35px rgba(20,70,40,.09); }
.st-service-icon {
  width: 52px; height: 52px; border-radius: 15px; display: grid; place-items: center;
  background: #f0f8f1; margin-bottom: 15px; transition: transform .3s;
}
.st-card:hover .st-service-icon { transform: rotate(-7deg) scale(1.08); }
.st-service-card h3 { margin: 0 0 7px; color: #203b2a; font-size: 16px; }
.st-service-card p { margin: 0; color: #75877b; font-size: 13px; line-height: 1.6; }
.st-feature {
  background: linear-gradient(110deg,#f0faf2,#fff); border: 1px solid #d7eadb;
  border-radius: 18px; padding: 25px; display: flex; align-items: center;
  gap: 17px; margin-top: 35px;
}
.st-feature-icon { background: #e4f7e8; color: #15803d; padding: 14px; border-radius: 14px; flex-shrink: 0; }
.st-feature p { color: #718276; line-height: 1.7; margin-bottom: 0; }
.st-form-wrap {
  max-width: 520px; margin: 25px auto; background: #fff; border: 1px solid #dceade;
  padding: 30px; border-radius: 21px; box-shadow: 0 15px 45px rgba(20,70,40,.07);
  animation: stFade .45s ease;
}
.st-form-wrap h2 { margin-top: 17px; font-size: 27px; color: #173b27; }
.st-form-wrap > p { color: #75877b; line-height: 1.6; }
.st-input {
  width: 100%; padding: 14px 15px; margin: 7px 0 17px; border: 1px solid #dce8df;
  background: #fbfdfb; color: #203b2a; border-radius: 10px; outline: none;
  font-size: 15px; transition: .2s;
}
.st-input:focus { border-color: #22a34a; box-shadow: 0 0 0 4px rgba(34,163,74,.09); background: #fff; }
.st-input option { background: #fff; color: #203b2a; }
.st-label { font-size: 13px; font-weight: 750; color: #405b49; }
.st-message {
  padding: 14px 17px; background: #effaf1; color: #176b32; border: 1px solid #ccebd3;
  border-radius: 12px; margin-bottom: 20px; overflow-wrap: anywhere; animation: stFade .3s ease;
}
.st-dashboard-top { display: flex; align-items: center; justify-content: space-between; gap: 15px; flex-wrap: wrap; margin-bottom: 22px; }
.st-dashboard-top h1 { margin: 13px 0 0; font-size: 29px; color: #173b27; }
.st-muted { color: #75877b; }
.st-profile-row { display: flex; align-items: center; gap: 15px; }
.st-avatar { width: 53px; height: 53px; display: grid; place-items: center; background: #e8f7eb; color: #15803d; border-radius: 50%; flex-shrink: 0; }
.st-profile-row h3 { margin: 0 0 5px; overflow-wrap: anywhere; color: #203b2a; }
.st-profile-row p { margin: 0; color: #75877b; font-size: 13px; overflow-wrap: anywhere; }
.st-wallet {
  background: radial-gradient(circle at 90% 0%,rgba(34,197,94,.15),transparent 40%),
    linear-gradient(120deg,#f1fbf3,#fff); border: 1px solid #bfe5c8;
  position: relative; overflow: hidden; animation: stWalletGlow 4s ease-in-out infinite;
}
.st-wallet:after {
  content: ""; position: absolute; width: 190px; height: 190px; border: 1px solid #ccebd3;
  border-radius: 50%; right: -55px; top: -95px; box-shadow: 0 0 0 25px #16a34a08,0 0 0 50px #16a34a06;
  pointer-events: none;
}
.st-wallet-top { display: flex; justify-content: space-between; align-items: center; color: #15803d; }
.st-wallet h2 { font-size: 34px; margin: 12px 0 20px; color: #173b27; overflow-wrap: anywhere; }
.st-wallet .st-btn { position: relative; z-index: 1; }
.st-eye-button { background: transparent; color: #15803d; border: 0; padding: 6px; }
.st-actions-grid { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 13px; }
.st-action {
  border: 1px solid #e0ebe2; background: #fff; padding: 18px 10px; border-radius: 14px;
  color: #405b49; display: grid; justify-items: center; gap: 10px; font-weight: 750; transition: .22s;
}
.st-action:hover { transform: translateY(-4px); border-color: #a9dcb5; background: #f5fbf6; }
.st-action svg { color: #16a34a; }
.st-history { display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 10px; }
.st-status { padding: 6px 10px; border-radius: 30px; background: #eaf8ed; color: #15803d; font-size: 12px; font-weight: 800; text-transform: capitalize; }
.st-empty { text-align: center; padding: 30px 15px; color: #75877b; background: #fbfdfb; border: 1px dashed #cbdccf; border-radius: 15px; }
.st-admin-label { display: inline-block; background: #eaf8ed; color: #15803d; padding: 6px 11px; border-radius: 30px; font-size: 12px; font-weight: 800; }
.st-provider-output { background: #f6faf7; color: #304b39; border: 1px solid #dce8df; padding: 15px; border-radius: 12px; overflow: auto; white-space: pre-wrap; overflow-wrap: anywhere; font-size: 12px; max-height: 450px; }
.st-bottom-nav { display: none; }
.st-footer { background: #fff; border-top: 1px solid #e2ece4; padding: 35px 22px; text-align: center; color: #75877b; }
.st-footer strong { color: #15803d; font-size: 18px; }
.st-footer a { color: #15803d; text-decoration: none; font-weight: 750; }
.st-spinner { animation: stSpin 1s linear infinite; }
.st-opay-card {
  position: relative; overflow: hidden; padding: 23px; margin: 20px 0;
  border: 1px solid #ccebd3; border-radius: 18px;
  background: radial-gradient(circle at 100% 0%,#dff7e5,transparent 42%),linear-gradient(135deg,#fff,#f1faf3);
  box-shadow: 0 12px 28px rgba(22,163,74,.09); animation: stCardIn .55s ease both;
}
.st-opay-top { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.st-opay-brand { display: flex; align-items: center; gap: 10px; color: #087b36; font-weight: 950; font-size: 23px; }
.st-opay-mark {
  width: 42px; height: 42px; border: 6px solid #13a64a; border-radius: 50%;
  display: grid; place-items: center; color: #13a64a; font-size: 0; position: relative;
  animation: stOpayPulse 2.5s ease-in-out infinite;
}
.st-opay-mark:after { content: ""; width: 12px; height: 12px; background: #13a64a; border-radius: 50%; }
.st-opay-number { color: #087b36 !important; font-size: clamp(28px,6vw,36px); letter-spacing: 1px; font-weight: 950; margin: 22px 0 6px !important; }
.st-opay-name { color: #254b32; font-weight: 850; margin: 5px 0; }
.st-copy-note { color: #66816d; font-size: 12px; line-height: 1.6; }
@keyframes stFade { from { opacity: 0; transform: translateY(15px); } to { opacity: 1; transform: translateY(0); } }
@keyframes stDrop { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }
@keyframes stFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
@keyframes stSpin { to { transform: rotate(360deg); } }
@keyframes stCardIn { from { opacity: 0; transform: translateY(18px) scale(.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes stOpayPulse { 0%,100% { box-shadow: 0 0 0 0 rgba(19,166,74,.08); } 50% { box-shadow: 0 0 0 9px rgba(19,166,74,.08); } }
@keyframes stWalletGlow { 0%,100% { box-shadow: 0 8px 25px rgba(22,163,74,.04); } 50% { box-shadow: 0 12px 32px rgba(22,163,74,.12); } }
@media(max-width:760px) {
  .st-navlinks { display: none; } .st-menu { display: inline-flex; }
  .st-hero { grid-template-columns: 1fr; padding: 42px 7%; }
  .st-hero-art { min-height: 205px; } .st-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
  .st-actions-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
  .st-container { padding-bottom: 105px; }
  .st-bottom-nav {
    display: flex; position: fixed; z-index: 60; bottom: 0; left: 0; right: 0;
    justify-content: space-around; align-items: center; padding: 10px 5px calc(10px + env(safe-area-inset-bottom));
    background: rgba(255,255,255,.97); backdrop-filter: blur(18px); border-top: 1px solid #e1ebe3;
  }
  .st-bottom-nav button { border: 0; background: transparent; color: #7b8c80; display: grid; justify-items: center; gap: 4px; font-size: 10px; font-weight: 750; padding: 5px 12px; }
  .st-bottom-nav button.active { color: #15803d; }
}
@media(max-width:430px) {
  .st-container { padding: 20px 14px 110px; } .st-nav { padding: 13px 15px; }
  .st-brand { font-size: 18px; } .st-hero { padding: 35px 22px; border-radius: 20px; }
  .st-hero h1 { letter-spacing: -1.3px; } .st-grid { gap: 10px; }
  .st-card { padding: 15px; } .st-form-wrap { padding: 22px 17px; }
  .st-wallet h2 { font-size: 28px; } .st-section-head { align-items: start; flex-direction: column; }
  .st-feature { align-items: flex-start; padding: 18px; }
}
@media(prefers-reduced-motion: reduce) {
  *,*:before,*:after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; scroll-behavior: auto !important; transition-duration: .01ms !important; }
}
`;

const textLink = {
  border: 0, background: "transparent", color: "#15803d",
  fontWeight: 750, cursor: "pointer"
};export default function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(0);
  const [deposits, setDeposits] = useState([]);
  const [pendingDeposits, setPendingDeposits] = useState([]);
  const [page, setPage] = useState("home");
  const [loading, setLoading] = useState(false);
  const [catalogLoading, setCatalogLoading] = useState(false);
  const [catalogResult, setCatalogResult] = useState(null);
  const [message, setMessage] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [showBalance, setShowBalance] = useState(true);

  const [form, setForm] = useState({
    full_name: "", username: "", gender: "", phone: "", email: "", password: ""
  });
  const [depositForm, setDepositForm] = useState({ amount: "", reference: "" });

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      if (data.session) loadAccount(data.session.user);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!mounted) return;
      setSession(newSession);
      if (newSession) loadAccount(newSession.user);
      else {
        setProfile(null); setBalance(0); setDeposits([]); setPendingDeposits([]); setCatalogResult(null);
      }
    });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, []);

  async function loadAccount(user) {
    if (!user) return;
    const { data: profileData } = await supabase.from("profiles").select("*").eq("id", user.id).maybeSingle();
    setProfile(profileData);
    const { data: walletData } = await supabase.from("wallets").select("balance").eq("user_id", user.id).maybeSingle();
    setBalance(Number(walletData?.balance || 0));
    const { data: depositData } = await supabase.from("deposits").select("*").eq("user_id", user.id).order("created_at", { ascending: false });
    setDeposits(depositData || []);
    if (profileData?.role === "admin") await loadPendingDeposits();
  }

  async function register(e) {
    e.preventDefault(); setLoading(true); setMessage("");
    if (!form.full_name.trim() || !form.username.trim() || !form.gender || !form.phone.trim() || !form.email.trim() || !form.password) {
      setMessage("Please complete all fields."); setLoading(false); return;
    }
    if (form.password.length < 6) {
      setMessage("Password must contain at least 6 characters."); setLoading(false); return;
    }
    const { error } = await supabase.auth.signUp({
      email: form.email.trim(), password: form.password,
      options: { data: {
        full_name: form.full_name.trim(), username: form.username.trim(),
        gender: form.gender, phone: form.phone.trim()
      } }
    });
    if (error) setMessage(error.message);
    else { setMessage("Registration submitted! Check your email for a confirmation link."); setPage("login"); }
    setLoading(false);
  }

  async function login(e) {
    e.preventDefault(); setLoading(true); setMessage("");
    const { data, error } = await supabase.auth.signInWithPassword({ email: form.email.trim(), password: form.password });
    if (error) setMessage(error.message);
    else { await loadAccount(data.user); setPage("dashboard"); }
    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut(); setPage("home"); setMessage(""); setCatalogResult(null);
  }

  async function submitDeposit(e) {
    e.preventDefault(); setLoading(true); setMessage("");
    const amount = Number(depositForm.amount);
    if (!Number.isFinite(amount) || amount <= 0) {
      setMessage("Enter a valid deposit amount."); setLoading(false); return;
    }
    if (!depositForm.reference.trim()) {
      setMessage("Enter your OPay transfer reference."); setLoading(false); return;
    }
    const { error } = await supabase.from("deposits").insert({
      user_id: session.user.id, amount, payment_reference: depositForm.reference.trim(), status: "pending"
    });
    if (error) setMessage(error.message);
    else {
      setMessage("Deposit request submitted. Awaiting admin verification.");
      setDepositForm({ amount: "", reference: "" });
      await loadAccount(session.user); setPage("dashboard");
    }
    setLoading(false);
  }

  async function loadPendingDeposits() {
    const { data, error } = await supabase.functions.invoke("admin-deposits-v2", { body: { action: "list" } });
    if (error) { setMessage(error.message); return; }
    if (data?.error) { setMessage(data.error); return; }
    setPendingDeposits(data?.deposits || []);
  }

  async function processDeposit(depositId, action) {
    const confirmed = window.confirm(action === "approve"
      ? "Have you verified that this payment was received in your OPay account?"
      : "Reject this deposit request?");
    if (!confirmed) return;
    setLoading(true); setMessage("");
    const { data, error } = await supabase.functions.invoke("admin-deposits-v2", { body: { action, depositId } });
    if (error) setMessage(error.message);
    else if (data?.error) setMessage(data.error);
    else { setMessage(`Deposit ${action}d successfully.`); await loadPendingDeposits(); await loadAccount(session.user); }
    setLoading(false);
  }

  async function testAutoSyncCatalog() {
    setCatalogLoading(true); setCatalogResult(null); setMessage("");
    try {
      const { data, error } = await supabase.functions.invoke("autosync-catalog", { body: {} });
      if (error) setMessage(error.message);
      else if (data?.error) setMessage(data.error);
      else { setCatalogResult(data); setMessage("AutoSyncNG catalogue test completed."); }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Could not connect to AutoSyncNG.");
    }
    setCatalogLoading(false);
  }

  const money = value => "₦" + Number(value || 0).toLocaleString("en-NG", {
    minimumFractionDigits: 2, maximumFractionDigits: 2
  });

  function go(destination) {
    setPage(destination); setMessage(""); setShowMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const button = "st-btn";
  const input = "st-input";

  return (
    <div className="st-app">
      <style>{styles}</style>
      <header className="st-header">
        <div className="st-nav">
          <button className="st-brand" onClick={() => go("home")}><span>SODIQ</span> TELECOM</button>
          <div className="st-navlinks">
            <button onClick={() => go("home")}>Home</button>
            {session && <button onClick={() => go("dashboard")}>Dashboard</button>}
            <button onClick={() => {
              go("home");
              setTimeout(() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" }), 100);
            }}>Services</button>
            <a href={WHATSAPP} style={{ color: "#53675a", textDecoration: "none", fontWeight: 650 }}>Support</a>
            {session ? <button className={button} onClick={logout}><LogOut size={16} /> Logout</button> : <>
              <button onClick={() => go("login")}>Login</button>
              <button className={button} onClick={() => go("register")}>Create Account</button>
            </>}
          </div>
          <button className="st-menu" onClick={() => setShowMenu(!showMenu)} aria-label="Toggle menu">
            {showMenu ? <X size={23} /> : <Menu size={23} />}
          </button>
        </div>
        {showMenu && <nav className="st-mobile-menu">
          <button onClick={() => go("home")}>Home</button>
          {session ? <>
            <button onClick={() => go("dashboard")}>Dashboard</button>
            <button onClick={() => go("deposit")}>Fund Wallet</button>
            {profile?.role === "admin" && <button onClick={() => go("admin")}>Admin Panel</button>}
            <button onClick={logout}>Logout</button>
          </> : <>
            <button onClick={() => go("login")}>Login</button>
            <button onClick={() => go("register")}>Create Account</button>
          </>}
          <a href={WHATSAPP} style={{ padding: 12, color: "#15803d" }}>Contact Support</a>
        </nav>}
      </header>

      <main className="st-container">
        {message && <div className="st-message">{message}</div>}

        {page === "home" && <>
          <section className="st-hero">
            <div>
              <div className="st-eyebrow"><Activity size={14} /> YOUR DIGITAL PAYMENT PLATFORM</div>
              <h1>Your digital world.<br /><span>One platform.</span></h1>
              <p>Buy airtime, subscribe to data, pay bills and access digital services with Sodiq Telecom Services. Simple, convenient and reliable.</p>
              <div className="st-hero-actions">
                <button className={button} onClick={() => go(session ? "dashboard" : "register")}>Get Started <ArrowRight size={17} /></button>
                <button className="st-btn st-btn-light" onClick={() => go("login")}>Login to Account</button>
              </div>
            </div>
            <div className="st-hero-art">
              <div className="st-art-circle"><Globe size={105} strokeWidth={1.2} /></div>
              <div className="st-float-tag st-tag-one"><Wifi size={15} color="#16a34a" /> Data & Airtime</div>
              <div className="st-float-tag st-tag-two"><ShieldCheck size={15} color="#16a34a" /> Secure Payments</div>
            </div>
          </section>

          <section className="st-section" id="services">
            <div className="st-section-head"><div><h2>Our Services</h2><p>Explore the services on our platform.</p></div><Sparkles color="#16a34a" size={23} /></div>
            <div className="st-grid">
              {services.map((item, index) => {
                const Icon = item.icon;
                return <button type="button" className="st-card st-service-card" key={item.title} onClick={() => {
                  if (item.key === "airtime") { go(session ? "dashboard" : "login"); return; }
                  if (["referral", "gifting", "giveaway"].includes(item.key) && !session) { go("login"); return; }
                  go(item.key);
                }} style={{ animationDelay: `${index * 80}ms`, textAlign: "left", width: "100%", cursor: "pointer" }}>
                  <div className="st-service-icon" style={{ color: item.color }}><Icon size={25} /></div>
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                  <small style={{ display: "block", marginTop: 13, color: item.color, fontWeight: 800 }}>{item.status}</small>
                </button>;
              })}
            </div>
          </section>

          <section className="st-feature">
            <div className="st-feature-icon"><ShieldCheck size={25} /></div>
            <div><h3>Payments with clarity</h3><p>Wallet funding is manually reviewed before your balance is credited. Always confirm your transfer before submitting a deposit request.</p></div>
          </section>
        </>}        {page === "register" && <section className="st-form-wrap">
          <div className="st-eyebrow"><User size={14} /> CREATE YOUR ACCOUNT</div>
          <h2>Join Sodiq Telecom</h2>
          <p>Create an account to access our digital services.</p>
          <form onSubmit={register}>
            <label className="st-label">Full Name</label>
            <input className={input} placeholder="Enter your full name" value={form.full_name} onChange={e => setForm({ ...form, full_name: e.target.value })} required />
            <label className="st-label">Username</label>
            <input className={input} placeholder="Choose a username" value={form.username} onChange={e => setForm({ ...form, username: e.target.value })} required />
            <label className="st-label">Gender</label>
            <select className={input} value={form.gender} onChange={e => setForm({ ...form, gender: e.target.value })} required>
              <option value="">Select gender</option><option value="Male">Male</option><option value="Female">Female</option>
            </select>
            <label className="st-label">Phone Number</label>
            <input className={input} placeholder="08012345678" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
            <label className="st-label">Email Address</label>
            <input className={input} type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            <label className="st-label">Password</label>
            <input className={input} type="password" placeholder="At least 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            <button className={button} type="submit" disabled={loading} style={{ width: "100%" }}>{loading ? "Creating account..." : "Create Account"}</button>
          </form>
          <p style={{ textAlign: "center", marginTop: 20 }}>Already registered? <button style={textLink} onClick={() => go("login")}>Login</button></p>
        </section>}

        {page === "login" && <section className="st-form-wrap">
          <div className="st-eyebrow"><Lock size={14} /> SECURE LOGIN</div>
          <h2>Welcome Back</h2>
          <p>Login to access your Sodiq Telecom account.</p>
          <form onSubmit={login}>
            <label className="st-label">Email Address</label>
            <input className={input} type="email" placeholder="Enter your email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
            <label className="st-label">Password</label>
            <input className={input} type="password" placeholder="Enter your password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
            <button className={button} type="submit" disabled={loading} style={{ width: "100%" }}>{loading ? "Signing in..." : "Login"}</button>
          </form>
          <p style={{ textAlign: "center", marginTop: 20 }}>New here? <button style={textLink} onClick={() => go("register")}>Create an account</button></p>
        </section>}

        {page === "dashboard" && session && <>
          <div className="st-dashboard-top">
            <div className="st-profile-row">
              <div className="st-avatar"><User size={25} /></div>
              <div><span className="st-muted">Welcome back,</span><h3>{profile?.full_name || session.user.user_metadata?.full_name || "Customer"}</h3><p>{session.user.email}</p></div>
            </div>
            <button className="st-btn st-btn-light" onClick={() => loadAccount(session.user)}><RefreshCw size={15} /> Refresh</button>
          </div>

          <section className="st-card st-wallet">
            <div className="st-wallet-top"><span><Wallet size={18} /> Wallet Balance</span><button className="st-eye-button" onClick={() => setShowBalance(!showBalance)}>{showBalance ? <Eye size={19} /> : <EyeOff size={19} />}</button></div>
            <h2>{showBalance ? money(balance) : "₦ ••••••"}</h2>
            <button className={button} onClick={() => go("deposit")}><CreditCard size={16} /> Fund Wallet</button>
          </section>

          <section className="st-section">
            <div className="st-section-head"><div><h2>Quick Actions</h2><p>Choose what you want to do.</p></div></div>
            <div className="st-actions-grid">
              <button className="st-action" onClick={() => go("airtime")}><Smartphone size={24} />Buy Airtime</button>
              <button className="st-action" onClick={() => go("data")}><Wifi size={24} />Buy Data</button>
              <button className="st-action" onClick={() => go("deposit")}><Wallet size={24} />Fund Wallet</button>
              <button className="st-action" onClick={() => go("referral")}><Gift size={24} />Referral</button>
              <button className="st-action" onClick={() => go("gifting")}><Gift size={24} />Gifting</button>
              <button className="st-action" onClick={() => go("giveaway")}><Sparkles size={24} />Giveaway</button>
            </div>
          </section>

          <section className="st-section">
            <div className="st-section-head"><div><h2>Recent Deposits</h2><p>Your wallet funding requests.</p></div><button style={textLink} onClick={() => go("deposit")}>Fund wallet</button></div>
            {deposits.length ? deposits.slice(0, 6).map(item => <div className="st-card st-history" key={item.id} style={{ marginBottom: 10 }}>
              <div><strong>{money(item.amount)}</strong><p className="st-muted" style={{ margin: "5px 0 0", fontSize: 12 }}>{item.created_at ? new Date(item.created_at).toLocaleString() : "Deposit request"}</p></div>
              <span className="st-status">{item.status || "pending"}</span>
            </div>) : <div className="st-empty">No deposit requests yet.</div>}
          </section>

          {profile?.role === "admin" && <section className="st-section">
            <div className="st-card">
              <div className="st-dashboard-top"><div><span className="st-admin-label">ADMIN ACCESS</span><h2>Admin Panel</h2></div><button className={button} onClick={() => go("admin")}>Open Admin Panel</button></div>
              <p className="st-muted">Review deposit requests and manage platform activities.</p>
            </div>
          </section>}
        </>}

        {page === "deposit" && session && <section className="st-form-wrap">
          <div className="st-eyebrow"><Wallet size={14} /> MANUAL WALLET FUNDING</div>
          <h2>Fund Your Wallet</h2>
          <p>Transfer to the OPay account below, then submit your payment reference. Your wallet is credited after admin verification.</p>
          <div className="st-opay-card">
            <div className="st-opay-top"><div className="st-opay-brand"><div className="st-opay-mark"></div>OPay</div><span className="st-admin-label">TRANSFER</span></div>
            <p className="st-copy-note" style={{ marginTop: 20 }}>OPay account details</p>
            <h2 className="st-opay-number">Use your configured account</h2>
            <p className="st-opay-name">Confirm the correct account number and account name with the platform administrator before transferring.</p>
            <p className="st-copy-note">Do not transfer to an account unless the administrator has confirmed its details.</p>
          </div>
          <form onSubmit={submitDeposit}>
            <label className="st-label">Amount (₦)</label>
            <input className={input} type="number" min="1" step="1" placeholder="Enter amount" value={depositForm.amount} onChange={e => setDepositForm({ ...depositForm, amount: e.target.value })} required />
            <label className="st-label">Transfer Reference</label>
            <input className={input} placeholder="Enter your transfer reference" value={depositForm.reference} onChange={e => setDepositForm({ ...depositForm, reference: e.target.value })} required />
            <button className={button} type="submit" disabled={loading} style={{ width: "100%" }}>{loading ? "Submitting..." : "Submit Deposit Request"}</button>
          </form>
        </section>}

        {page === "admin" && session && profile?.role === "admin" && <>
          <div className="st-dashboard-top"><div><span className="st-admin-label">ADMIN PANEL</span><h1>Manage Deposits</h1><p className="st-muted">Review customer wallet funding requests.</p></div><button className="st-btn st-btn-light" onClick={loadPendingDeposits}><RefreshCw size={15} /> Refresh</button></div>
          {pendingDeposits.length ? pendingDeposits.map(item => <div className="st-card" key={item.id} style={{ marginBottom: 13 }}>
            <div className="st-history"><div><h3 style={{ margin: "0 0 5px" }}>{money(item.amount)}</h3><p className="st-muted" style={{ margin: 0, fontSize: 12 }}>Reference: {item.payment_reference || item.reference || "Not provided"}</p></div><span className="st-status">{item.status || "pending"}</span></div>
            <p className="st-muted" style={{ fontSize: 12 }}>Customer ID: {item.user_id || "Unavailable"}</p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button className={button} onClick={() => processDeposit(item.id, "approve")} disabled={loading}><CheckCircle size={15} /> Approve</button>
              <button className="st-btn st-btn-light" onClick={() => processDeposit(item.id, "reject")} disabled={loading}><XCircle size={15} /> Reject</button>
            </div>
          </div>) : <div className="st-empty">No pending deposits returned. Use Refresh to check again.</div>}
        </>}

        {page === "admin" && session && profile?.role !== "admin" && <div className="st-empty">You do not have administrator access.</div>}

        {page === "airtime" && session && <section className="st-form-wrap">
          <div className="st-eyebrow"><Smartphone size={14} /> AIRTIME</div>
          <h2>Buy Airtime</h2>
          <p>The airtime purchase integration is handled by the configured AutoSyncNG function.</p>
          <p className="st-muted">Use the airtime purchase section already connected in your existing working version. This replacement screen does not submit an airtime purchase.</p>
          <button className="st-btn st-btn-light" onClick={() => go("dashboard")}>Back to Dashboard</button>
        </section>}

        {page === "data" && <section className="st-form-wrap">
          <div className="st-eyebrow"><Wifi size={14} /> DATA SUBSCRIPTIONS</div>
          <h2>Buy Data</h2><p>Data purchase will be available after the AutoSyncNG data catalogue and purchase endpoint are connected.</p>
          <div className="st-empty">Data supplier integration is not active yet. No payment will be taken.</div>
          <button className="st-btn st-btn-light" onClick={() => go("dashboard")}>Back to Dashboard</button>
        </section>}

        {page === "cable" && <section className="st-form-wrap">
          <div className="st-eyebrow"><Tv size={14} /> CABLE TV</div>
          <h2>Cable TV</h2><p>Support for DStv, GOtv and StarTimes will be enabled after supplier configuration.</p>
          <div className="st-empty">Cable TV integration is not active yet. No payment will be taken.</div>
          <button className="st-btn st-btn-light" onClick={() => go("dashboard")}>Back to Dashboard</button>
        </section>}

        {page === "electricity" && <section className="st-form-wrap">
          <div className="st-eyebrow"><Zap size={14} /> ELECTRICITY</div>
          <h2>Electricity Bills</h2><p>Electricity bill payment will be enabled after the supplier integration is configured.</p>
          <div className="st-empty">Electricity integration is not active yet. No payment will be taken.</div>
          <button className="st-btn st-btn-light" onClick={() => go("dashboard")}>Back to Dashboard</button>
        </section>}

        {page === "exam" && <section className="st-form-wrap">
          <div className="st-eyebrow"><Gift size={14} /> EXAM PINS</div>
          <h2>Exam Pins</h2><p>Exam PIN sales will be enabled after supplier product IDs and purchase endpoints are configured.</p>
          <div className="st-empty">Exam PIN integration is not active yet. No payment will be taken.</div>
          <button className="st-btn st-btn-light" onClick={() => go("dashboard")}>Back to Dashboard</button>
        </section>}

        {page === "recharge" && <section className="st-form-wrap">
          <div className="st-eyebrow"><CreditCard size={14} /> RECHARGE CARDS</div>
          <h2>Recharge Cards</h2><p>Recharge card PIN generation will be enabled after the supplier API is configured.</p>
          <div className="st-empty">Recharge card integration is not active yet. No payment will be taken.</div>
          <button className="st-btn st-btn-light" onClick={() => go("dashboard")}>Back to Dashboard</button>
        </section>}

        {page === "sms" && <section className="st-form-wrap">
          <div className="st-eyebrow"><Headphones size={14} /> BULK SMS</div>
          <h2>Bulk SMS</h2><p>Bulk SMS will be enabled after the messaging supplier is connected.</p>
          <div className="st-empty">Bulk SMS integration is not active yet. No payment will be taken.</div>
          <button className="st-btn st-btn-light" onClick={() => go("dashboard")}>Back to Dashboard</button>
        </section>}        {page === "referral" && session && <section className="st-form-wrap">
          <div className="st-eyebrow"><Gift size={14} /> REFERRAL PROGRAMME</div>
          <h2>Invite Friends</h2>
          <p>Share Sodiq Telecom with friends and family. Referral rewards will be activated when the referral tracking system is connected.</p>
          <div className="st-card">
            <h3>Your Referral Details</h3>
            <p className="st-muted">Your account email:</p>
            <strong>{session.user.email}</strong>
            <p className="st-muted" style={{ marginTop: 15 }}>Referral code generation is awaiting backend setup.</p>
          </div>
          <div className="st-empty" style={{ marginTop: 15 }}>
            Referral rewards are not active yet. No rewards will be credited until the system is configured.
          </div>
          <button className="st-btn st-btn-light" style={{ marginTop: 15 }} onClick={() => go("dashboard")}>Back to Dashboard</button>
        </section>}

        {page === "gifting" && session && <section className="st-form-wrap">
          <div className="st-eyebrow"><Gift size={14} /> CUSTOMER GIFTING</div>
          <h2>Send a Gift</h2>
          <p>Give someone a special surprise through Sodiq Telecom.</p>
          <div className="st-card">
            <div className="st-service-icon"><Gift size={25} /></div>
            <h3>Gifting Centre</h3>
            <p>Wallet gifts and airtime gifts will be supported after secure recipient verification and transfer functions are configured.</p>
          </div>
          <div className="st-empty" style={{ marginTop: 15 }}>
            Gifting is not active yet. No wallet transfers will be made from this page.
          </div>
          <button className="st-btn st-btn-light" style={{ marginTop: 15 }} onClick={() => go("dashboard")}>Back to Dashboard</button>
        </section>}

        {page === "giveaway" && session && <section className="st-form-wrap">
          <div className="st-eyebrow"><Sparkles size={14} /> SPECIAL GIVEAWAYS</div>
          <h2>Giveaway Centre</h2>
          <p>Stay updated on special promotions and rewards from Sodiq Telecom Services.</p>
          <div className="st-card">
            <div className="st-service-icon"><Sparkles size={25} /></div>
            <h3>Something Special Is Coming!</h3>
            <p>Giveaway announcements and participation details will appear here when published by the administrator.</p>
          </div>
          <div className="st-empty" style={{ marginTop: 15 }}>
            There are no published giveaways yet.
          </div>
          <button className="st-btn st-btn-light" style={{ marginTop: 15 }} onClick={() => go("dashboard")}>Back to Dashboard</button>
        </section>}

        {!session && !["home", "login", "register"].includes(page) &&
          <section className="st-form-wrap">
            <div className="st-eyebrow"><Lock size={14} /> ACCOUNT REQUIRED</div>
            <h2>Please Login</h2>
            <p>You need to log in to access this section.</p>
            <button className="st-btn" onClick={() => go("login")}>Login to Continue</button>
          </section>}
      </main>

      {session && <nav className="st-bottom-nav">
        <button className={page === "home" ? "active" : ""} onClick={() => go("home")}><Home size={19} />Home</button>
        <button className={page === "dashboard" ? "active" : ""} onClick={() => go("dashboard")}><LayoutDashboard size={19} />Dashboard</button>
        <button className={page === "deposit" ? "active" : ""} onClick={() => go("deposit")}><Wallet size={19} />Wallet</button>
        <button className={page === "referral" ? "active" : ""} onClick={() => go("referral")}><Gift size={19} />Referral</button>
      </nav>}

      <footer className="st-footer">
        <strong>SODIQ TELECOM SERVICES</strong>
        <p>Digital services made simple.</p>
        <p>Need assistance? <a href={WHATSAPP} target="_blank" rel="noreferrer">Contact Support on WhatsApp</a></p>
        <p style={{ fontSize: 12 }}>© {new Date().getFullYear()} Sodiq Telecom Services. All rights reserved.</p>
      </footer>
    </div>
  );
}
