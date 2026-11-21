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
  { icon: Smartphone, title: "Buy Airtime", desc: "Recharge all networks", color: "#16a34a" },
  { icon: Wifi, title: "Buy Data", desc: "Affordable data plans", color: "#0d9488" },
  { icon: Tv, title: "Cable TV", desc: "Renew your subscriptions", color: "#7c3aed" },
  { icon: Zap, title: "Electricity", desc: "Pay electricity bills", color: "#d97706" },
  { icon: Gift, title: "Referral", desc: "Invite and earn", color: "#db2777" }
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
`;const textLink = {
  border: 0,
  background: "transparent",
  color: "#15803d",
  fontWeight: 800,
  cursor: "pointer",
  padding: 0
};

export default function App() {
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
    full_name: "",
    username: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
    confirm_password: "",
    transaction_pin: ""
  });

  const [depositForm, setDepositForm] = useState({
    amount: "",
    reference: ""
  });

  const [airtimeForm, setAirtimeForm] = useState({
    phone: "",
    amount: "",
    product_id: ""
  });

  const [airtimeBusy, setAirtimeBusy] = useState(false);
  const [airtimeResult, setAirtimeResult] = useState(null);

  const go = (target) => {
    setPage(target);
    setMessage("");
    setShowMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const notify = (text) => {
    setMessage(text);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const loadAccount = async (user) => {
    if (!user) return;

    try {
      const [profileRes, walletRes, depositsRes] = await Promise.all([
        supabase.from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle(),

        supabase.from("wallets")
          .select("*")
          .eq("user_id", user.id)
          .maybeSingle(),

        supabase.from("deposits")
          .select("*")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(20)
      ]);

      if (profileRes.error) throw profileRes.error;
      if (walletRes.error) throw walletRes.error;
      if (depositsRes.error) throw depositsRes.error;

      setProfile(profileRes.data || null);
      setBalance(Number(walletRes.data?.balance || 0));
      setDeposits(depositsRes.data || []);
    } catch (error) {
      console.error("Account loading error:", error);
      notify(error.message || "Unable to load your account.");
    }
  };

  useEffect(() => {
    let active = true;

    const initialize = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) console.error(error);

      if (active && data?.session) {
        setSession(data.session);
        await loadAccount(data.session.user);
      }
    };

    initialize();

    const { data: listener } = supabase.auth.onAuthStateChange(
      async (_event, newSession) => {
        if (!active) return;

        setSession(newSession);

        if (newSession?.user) {
          await loadAccount(newSession.user);
        } else {
          setProfile(null);
          setBalance(0);
          setDeposits([]);
          setPendingDeposits([]);
          setPage("home");
        }
      }
    );

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session && profile?.role === "admin") {
      loadPendingDeposits();
    }
  }, [session, profile]);

  const loadPendingDeposits = async () => {
    try {
      const { data, error } = await supabase
        .from("deposits")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: true });

      if (error) throw error;
      setPendingDeposits(data || []);
    } catch (error) {
      console.error("Pending deposits error:", error);
    }
  };

  const register = async (event) => {
    event.preventDefault();

    if (form.password !== form.confirm_password) {
      return notify("Your passwords do not match.");
    }

    if (!/^\d{11}$/.test(form.phone)) {
      return notify("Enter a valid 11-digit Nigerian phone number.");
    }

    if (!/^\d{4}$/.test(form.transaction_pin)) {
      return notify("Your transaction PIN must contain exactly 4 digits.");
    }

    if (form.password.length < 6) {
      return notify("Your password must contain at least 6 characters.");
    }

    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signUp({
        email: form.email.trim(),
        password: form.password,
        options: {
          data: {
            full_name: form.full_name.trim(),
            username: form.username.trim(),
            gender: form.gender,
            phone: form.phone,
            transaction_pin: form.transaction_pin
          }
        }
      });

      if (error) throw error;

      if (data.session) {
        setSession(data.session);
        await loadAccount(data.session.user);
        go("dashboard");
        notify("Your account has been created successfully.");
      } else {
        go("login");
        notify("Registration successful. Check your email to confirm your account, then log in.");
      }
    } catch (error) {
      notify(error.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const login = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: form.email.trim(),
        password: form.password
      });

      if (error) throw error;

      setSession(data.session);
      await loadAccount(data.user);
      go("dashboard");
      notify("Login successful.");
    } catch (error) {
      notify(error.message || "Unable to log in.");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setSession(null);
      setProfile(null);
      setBalance(0);
      setDeposits([]);
      go("home");
    } catch (error) {
      notify(error.message || "Logout failed.");
    } finally {
      setLoading(false);
    }
  };

  const requestDeposit = async (event) => {
    event.preventDefault();

    const amount = Number(depositForm.amount);

    if (!Number.isFinite(amount) || amount < 100) {
      return notify("Minimum deposit is ₦100.");
    }

    if (!depositForm.reference.trim()) {
      return notify("Enter your payment reference.");
    }

    setLoading(true);

    try {
      const { error } = await supabase.from("deposits").insert({
        user_id: session.user.id,
        amount,
        payment_reference: depositForm.reference.trim(),
        status: "pending"
      });

      if (error) throw error;

      setDepositForm({ amount: "", reference: "" });
      await loadAccount(session.user);

      notify("Deposit request submitted. Your wallet will be credited after admin approval.");
    } catch (error) {
      notify(error.message || "Could not submit deposit request.");
    } finally {
      setLoading(false);
    }
  };

  const testCatalog = async () => {
    setCatalogLoading(true);
    setCatalogResult(null);

    try {
      const { data, error } = await supabase.functions.invoke("autosync-catalog");

      if (error) throw error;

      setCatalogResult(data);
      notify("Supplier catalogue request completed.");
    } catch (error) {
      setCatalogResult({ error: error.message });
      notify("Could not connect to the supplier catalogue.");
    } finally {
      setCatalogLoading(false);
    }
  };

  const purchaseAirtime = async (event) => {
    event.preventDefault();

    const phone = airtimeForm.phone.trim();
    const amount = Number(airtimeForm.amount);
    const productId = airtimeForm.product_id.trim();

    if (!/^0\d{10}$/.test(phone)) {
      return notify("Enter a valid 11-digit Nigerian phone number starting with 0.");
    }

    if (!Number.isInteger(amount) || amount < 1 || amount > 100000) {
      return notify("Enter a valid airtime amount.");
    }

    if (!productId) {
      return notify("Enter the supplier airtime product ID.");
    }

    if (amount > balance) {
      return notify("Insufficient wallet balance. Please fund your wallet.");
    }

    const confirmed = window.confirm(
      `Confirm airtime purchase of ₦${amount.toLocaleString("en-NG")} for ${phone}?`
    );

    if (!confirmed) return;

    setAirtimeBusy(true);
    setAirtimeResult(null);

    try {
      const requestRef = crypto.randomUUID();

      const { data, error } = await supabase.functions.invoke(
        "autosync-airtime-purchase",
        {
          body: {
            phone,
            amount,
            product_id: productId,
            request_ref: requestRef
          }
        }
      );

      if (error) throw error;

      setAirtimeResult(data);

      if (data?.status === "successful") {
        notify("Airtime purchase successful.");
        setAirtimeForm({ phone: "", amount: "", product_id: "" });
        await loadAccount(session.user);
      } else if (data?.status === "pending" || data?.status === "processing") {
        notify("Your transaction is still processing. Check your transaction status before trying again.");
        await loadAccount(session.user);
      } else {
        notify(data?.message || "Airtime purchase was not successful.");
        await loadAccount(session.user);
      }
    } catch (error) {
      setAirtimeResult({ error: error.message });
      notify("Purchase response could not be confirmed. Check your transaction history before retrying.");
      await loadAccount(session.user);
    } finally {
      setAirtimeBusy(false);
    }
  };

  const approveDeposit = async (depositId) => {
    if (!window.confirm("Approve this deposit and credit the customer's wallet?")) {
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "admin-deposits-v2",
        {
          body: {
            action: "approve",
            deposit_id: depositId
          }
        }
      );

      if (error) throw error;

      if (data?.error) throw new Error(data.error);

      await loadPendingDeposits();
      if (session?.user) await loadAccount(session.user);

      notify("Deposit approval request completed.");
    } catch (error) {
      notify(error.message || "Could not approve deposit.");
    } finally {
      setLoading(false);
    }
  };

  const rejectDeposit = async (depositId) => {
    if (!window.confirm("Reject this deposit request?")) return;

    setLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke(
        "admin-deposits-v2",
        {
          body: {
            action: "reject",
            deposit_id: depositId
          }
        }
      );

      if (error) throw error;

      if (data?.error) throw new Error(data.error);

      await loadPendingDeposits();
      notify("Deposit rejection request completed.");
    } catch (error) {
      notify(error.message || "Could not reject deposit.");
    } finally {
      setLoading(false);
    }
  };

  const money = value => "₦" + Number(value || 0).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  const button = "st-btn";
  const input = "st-input";  return (
    <div className="st-app">
      <style>{styles}</style>

      <header className="st-header">
        <div className="st-nav">
          <button className="st-brand" onClick={() => go("home")}>
            <span>SODIQ</span> TELECOM
          </button>

          <div className="st-navlinks">
            <button onClick={() => go("home")}>Home</button>
            <button onClick={() => go("dashboard")}>Dashboard</button>
            <button onClick={() => go("deposit")}>Fund Wallet</button>
            <button onClick={() => go("airtime")}>Airtime</button>
            {profile?.role === "admin" &&
              <button onClick={() => go("admin")}>Admin</button>}
            {session
              ? <button className={button} onClick={logout}>Logout</button>
              : <>
                  <button onClick={() => go("login")}>Login</button>
                  <button className={button} onClick={() => go("register")}>
                    Create Account
                  </button>
                </>}
          </div>

          <button className="st-menu" onClick={() => setShowMenu(!showMenu)}>
            {showMenu ? <X /> : <Menu />}
          </button>
        </div>

        {showMenu && (
          <div className="st-mobile-menu">
            <button onClick={() => go("home")}>Home</button>
            <button onClick={() => go("dashboard")}>Dashboard</button>
            <button onClick={() => go("deposit")}>Fund Wallet</button>
            <button onClick={() => go("airtime")}>Buy Airtime</button>
            {profile?.role === "admin" &&
              <button onClick={() => go("admin")}>Admin Panel</button>}
            {session
              ? <button onClick={logout}>Logout</button>
              : <button onClick={() => go("login")}>Login</button>}
          </div>
        )}
      </header>

      <main className="st-container">
        {message && <div className="st-message">{message}</div>}

        {/* HOME */}
        {page === "home" && <>
          <section className="st-hero">
            <div>
              <div className="st-eyebrow">
                <Activity size={14} /> YOUR DIGITAL PAYMENT PLATFORM
              </div>
              <h1>Your digital world.<br /><span>One platform.</span></h1>
              <p>
                Buy airtime, access data services and manage your digital
                payments with Sodiq Telecom Services.
              </p>
              <div className="st-hero-actions">
                <button className={button}
                  onClick={() => go(session ? "dashboard" : "register")}>
                  Get Started <ArrowRight size={17} />
                </button>
                <button className="st-btn st-btn-light"
                  onClick={() => go("login")}>Login</button>
              </div>
            </div>
            <div className="st-hero-art">
              <div className="st-art-circle">
                <Globe size={105} />
              </div>
              <div className="st-float-tag st-tag-one">
                <Wifi size={15} /> Airtime & Data
              </div>
              <div className="st-float-tag st-tag-two">
                <ShieldCheck size={15} /> Secure Payments
              </div>
            </div>
          </section>

          <section className="st-section" id="services">
            <div className="st-section-head">
              <div>
                <h2>Our Services</h2>
                <p>Explore our available services.</p>
              </div>
            </div>

            <div className="st-grid">
              {services.map((item, index) => {
                const Icon = item.icon;
                return (
                  <button className="st-card st-service-card"
                    key={item.title}
                    style={{ textAlign: "left", width: "100%" }}
                    onClick={() => {
                      if (item.title === "Buy Airtime")
                        go(session ? "airtime" : "login");
                      else
                        notify(item.title + " is coming soon.");
                    }}>
                    <div className="st-service-icon"
                      style={{ color: item.color }}>
                      <Icon size={26} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    <small style={{
                      display: "block", marginTop: 12,
                      color: "#15803d", fontWeight: 800
                    }}>
                      {item.title === "Buy Airtime" ? "BUY NOW →" : "COMING SOON"}
                    </small>
                  </button>
                );
              })}
            </div>
          </section>

          <div className="st-feature">
            <div className="st-feature-icon"><ShieldCheck size={29} /></div>
            <div>
              <h3>Secure wallet funding</h3>
              <p>Your deposit is reviewed by the administrator before
                your wallet is credited.</p>
            </div>
          </div>
        </>}

        {/* REGISTER */}
        {page === "register" && (
          <section className="st-form-wrap">
            <div className="st-eyebrow">ACCOUNT REGISTRATION</div>
            <h2>Create your account</h2>
            <p>Join Sodiq Telecom Services.</p>

            <form onSubmit={register}>
              <label className="st-label">Full Name</label>
              <input className={input} required
                value={form.full_name}
                onChange={e => setForm({ ...form, full_name: e.target.value })} />

              <label className="st-label">Username</label>
              <input className={input} required
                value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })} />

              <label className="st-label">Gender</label>
              <select className={input} required value={form.gender}
                onChange={e => setForm({ ...form, gender: e.target.value })}>
                <option value="">Select gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>

              <label className="st-label">Phone Number</label>
              <input className={input} required value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })} />

              <label className="st-label">Email Address</label>
              <input className={input} type="email" required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} />

              <label className="st-label">Password</label>
              <input className={input} type="password" required
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })} />

              <label className="st-label">Confirm Password</label>
              <input className={input} type="password" required
                value={form.confirm_password}
                onChange={e => setForm({ ...form, confirm_password: e.target.value })} />

              <label className="st-label">4-digit Transaction PIN</label>
              <input className={input} type="password" inputMode="numeric"
                maxLength={4} required value={form.transaction_pin}
                onChange={e => setForm({
                  ...form,
                  transaction_pin: e.target.value.replace(/\D/g, "").slice(0, 4)
                })} />

              <button className={button} disabled={loading}
                style={{ width: "100%" }}>
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: 20 }}>
              Already registered?{" "}
              <button style={textLink} onClick={() => go("login")}>Login</button>
            </p>
          </section>
        )}

        {/* LOGIN */}
        {page === "login" && (
          <section className="st-form-wrap">
            <div className="st-eyebrow">SECURE LOGIN</div>
            <h2>Welcome back</h2>
            <p>Login to your account.</p>

            <form onSubmit={login}>
              <label className="st-label">Email Address</label>
              <input className={input} type="email" required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} />

              <label className="st-label">Password</label>
              <input className={input} type="password" required
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })} />

              <button className={button} disabled={loading}
                style={{ width: "100%" }}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: 20 }}>
              New customer?{" "}
              <button style={textLink} onClick={() => go("register")}>
                Create Account
              </button>
            </p>
          </section>
        )}

        {/* DASHBOARD */}
        {page === "dashboard" && session && (
          <>
            <div className="st-dashboard-top">
              <div>
                <div className="st-eyebrow">CUSTOMER DASHBOARD</div>
                <h1>My Dashboard</h1>
                <p className="st-muted">
                  Welcome, {profile?.full_name || "Customer"}.
                </p>
              </div>
              <button className="st-btn st-btn-light"
                onClick={() => loadAccount(session.user)}>
                <RefreshCw size={16} /> Refresh
              </button>
            </div>

            <div className="st-grid">
              <div className="st-card">
                <div className="st-profile-row">
                  <div className="st-avatar"><User size={25} /></div>
                  <div>
                    <h3>{profile?.full_name || session.user.email}</h3>
                    <p>{session.user.email}</p>
                  </div>
                </div>
                <p className="st-muted">
                  Username: {profile?.username || "Customer"}
                </p>
                {profile?.role === "admin" &&
                  <span className="st-admin-label">Administrator</span>}
              </div>

              <div className="st-card st-wallet">
                <div className="st-wallet-top">
                  <Wallet size={28} />
                  <button className="st-eye-button"
                    onClick={() => setShowBalance(!showBalance)}>
                    {showBalance ? <Eye /> : <EyeOff />}
                  </button>
                </div>
                <p>AVAILABLE WALLET BALANCE</p>
                <h2>{showBalance ? money(balance) : "₦ ••••••"}</h2>
                <button className={button} onClick={() => go("deposit")}>
                  Fund Wallet
                </button>
              </div>
            </div>

            <section className="st-section">
              <div className="st-section-head">
                <div><h2>Quick Actions</h2></div>
              </div>
              <div className="st-actions-grid">
                <button className="st-action" onClick={() => go("airtime")}>
                  <Smartphone /> Buy Airtime
                </button>
                <button className="st-action" onClick={() => go("deposit")}>
                  <Wallet /> Fund Wallet
                </button>
                <button className="st-action" onClick={() => go("admin")}>
                  <ShieldCheck /> Admin Panel
                </button>
              </div>
            </section>

            <section className="st-section">
              <h2>Deposit History</h2>
              {deposits.length === 0
                ? <div className="st-empty">No deposits yet.</div>
                : deposits.map(item => (
                  <div className="st-card" key={item.id}
                    style={{ marginBottom: 12 }}>
                    <div className="st-history">
                      <strong>{money(item.amount)}</strong>
                      <span className="st-status">{item.status}</span>
                    </div>
                    <p className="st-muted">
                      Reference: {item.payment_reference || "N/A"}
                    </p>
                  </div>
                ))}
            </section>
          </>
        )}

        {/* FUND WALLET */}
        {page === "deposit" && session && (
          <section className="st-form-wrap">
            <div className="st-eyebrow">WALLET FUNDING</div>
            <h2>Fund your wallet</h2>
            <p>Transfer to the account below and submit your payment details.</p>

            <div className="st-opay-card">
              <div className="st-opay-brand">OPay</div>
              <p className="st-opay-number">8114095631</p>
              <h3 className="st-opay-name">Ogunlowo Sodiq Ayomiposi</h3>
              <p>Bank: OPay</p>
              <p className="st-copy-note">
                Your wallet will only be credited after admin verification.
              </p>
            </div>

            <form onSubmit={requestDeposit}>
              <label className="st-label">Amount (₦)</label>
              <input className={input} type="number" min="100" required
                value={depositForm.amount}
                onChange={e => setDepositForm({
                  ...depositForm, amount: e.target.value
                })} />

              <label className="st-label">Payment Reference</label>
              <input className={input} required
                value={depositForm.reference}
                onChange={e => setDepositForm({
                  ...depositForm, reference: e.target.value
                })} />

              <button className={button} disabled={loading}
                style={{ width: "100%" }}>
                {loading ? "Submitting..." : "Submit Deposit Request"}
              </button>
            </form>
          </section>
        )}

        {/* AIRTIME */}
        {page === "airtime" && session && (
          <section className="st-form-wrap">
            <div className="st-eyebrow">AIRTIME TOP-UP</div>
            <h2>Buy Airtime</h2>
            <p>Purchase airtime using your wallet.</p>

            <div className="st-card">
              <p className="st-muted">Available Balance</p>
              <h2 style={{ color: "#15803d" }}>{money(balance)}</h2>
            </div>

            <form onSubmit={purchaseAirtime}>
              <label className="st-label">AutoSyncNG Product ID</label>
              <input className={input} required
                value={airtimeForm.product_id}
                onChange={e => setAirtimeForm({
                  ...airtimeForm, product_id: e.target.value
                })}
                placeholder="Enter exact supplier product ID" />

              <label className="st-label">Phone Number</label>
              <input className={input} type="tel" required maxLength={11}
                placeholder="08012345678"
                value={airtimeForm.phone}
                onChange={e => setAirtimeForm({
                  ...airtimeForm,
                  phone: e.target.value.replace(/\D/g, "").slice(0, 11)
                })} />

              <label className="st-label">Amount (₦)</label>
              <input className={input} type="number" min="1"
                max="100000" step="1" required
                value={airtimeForm.amount}
                onChange={e => setAirtimeForm({
                  ...airtimeForm, amount: e.target.value
                })} />

              <button className={button} disabled={airtimeBusy}
                style={{ width: "100%" }}>
                {airtimeBusy ? "Processing..." : "Purchase Airtime"}
              </button>
            </form>

            {airtimeResult && (
              <pre className="st-provider-output">
                {JSON.stringify(airtimeResult, null, 2)}
              </pre>
            )}

            <p className="st-copy-note">
              If a transaction is pending, check its status before attempting
              another purchase.
            </p>
          </section>
        )}

        {/* ADMIN */}
        {page === "admin" && session && profile?.role === "admin" && (
          <>
            <div className="st-dashboard-top">
              <div>
                <div className="st-eyebrow">ADMINISTRATION</div>
                <h1>Admin Panel</h1>
                <p className="st-muted">Manage deposit requests.</p>
              </div>
              <button className="st-btn st-btn-light"
                onClick={loadPendingDeposits}>
                <RefreshCw size={16} /> Refresh
              </button>
            </div>

            <div className="st-card">
              <h2>Pending Deposits ({pendingDeposits.length})</h2>

              {pendingDeposits.length === 0
                ? <div className="st-empty">No pending deposits.</div>
                : pendingDeposits.map(item => (
                  <div className="st-card" key={item.id}
                    style={{ marginTop: 15 }}>
                    <h3>{money(item.amount)}</h3>
                    <p>Reference: {item.payment_reference || "N/A"}</p>
                    <p className="st-muted">
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                    <div style={{
                      display: "flex", flexWrap: "wrap", gap: 10
                    }}>
                      <button className={button} disabled={loading}
                        onClick={() => approveDeposit(item.id)}>
                        <CheckCircle size={16} /> Approve
                      </button>
                      <button className={button} disabled={loading}
                        style={{ background: "#b42318", borderColor: "#b42318" }}
                        onClick={() => rejectDeposit(item.id)}>
                        <XCircle size={16} /> Reject
                      </button>
                    </div>
                  </div>
                ))}
            </div>

            <div className="st-card" style={{ marginTop: 20 }}>
              <h2>AutoSyncNG Connection</h2>
              <p className="st-muted">
                Test the supplier catalogue connection.
              </p>
              <button className={button} disabled={catalogLoading}
                onClick={testCatalog}>
                <RefreshCw size={16} />
                {catalogLoading ? "Testing..." : "Test Admin Connection"}
              </button>

              {catalogResult && (
                <pre className="st-provider-output"
                  style={{ marginTop: 15 }}>
                  {JSON.stringify(catalogResult, null, 2)}
                </pre>
              )}
            </div>
          </>
        )}

        {!session &&
          ["dashboard", "deposit", "admin", "airtime"].includes(page) && (
            <div className="st-form-wrap">
              <h2>Login required</h2>
              <p>Please log in to access this section.</p>
              <button className={button} onClick={() => go("login")}>
                Login
              </button>
            </div>
          )}

        {session && page === "admin" && profile?.role !== "admin" && (
          <div className="st-form-wrap">
            <h2>Access restricted</h2>
            <p>This page is only available to administrators.</p>
            <button className={button} onClick={() => go("dashboard")}>
              Return to Dashboard
            </button>
          </div>
        )}
      </main>

      {session && (
        <nav className="st-bottom-nav">
          <button onClick={() => go("home")}><Home size={20} />Home</button>
          <button onClick={() => go("dashboard")}>
            <LayoutDashboard size={20} />Dashboard
          </button>
          <button onClick={() => go("airtime")}>
            <Smartphone size={20} />Airtime
          </button>
          <button onClick={() => go("deposit")}>
            <Wallet size={20} />Wallet
          </button>
          <button onClick={() => window.open(WHATSAPP, "_blank")}>
            <Headphones size={20} />Support
          </button>
        </nav>
      )}

      <footer className="st-footer">
        <strong>SODIQ TELECOM SERVICES</strong>
        <p>Reliable digital services. Simple connectivity.</p>
        <a href={WHATSAPP}>Contact Support</a>
        <p style={{ fontSize: 12, marginTop: 20 }}>
          © 2026 Sodiq Telecom Services. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
