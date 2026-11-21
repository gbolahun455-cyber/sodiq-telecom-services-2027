import React, { useEffect, useState } from "react";
import {
  Smartphone, Wifi, Tv, Zap, Gift, ShieldCheck,
  Headphones, Wallet, RefreshCw, CheckCircle,
  XCircle, Menu, User, ArrowRight, LayoutDashboard,
  History, LogOut, CreditCard, ChevronRight,
  Globe, Lock, Activity, X, Eye, EyeOff,
  Home, Clock, Sparkles, CircleHelp
} from "lucide-react";
import { supabase } from "./supabase";

const WHATSAPP = "https://wa.me/2348114095631";

const services = [
  {
    icon: Smartphone,
    title: "Buy Airtime",
    desc: "Recharge all networks",
    color: "#f5c451"
  },
  {
    icon: Wifi,
    title: "Buy Data",
    desc: "Affordable data plans",
    color: "#65c8e8"
  },
  {
    icon: Tv,
    title: "Cable TV",
    desc: "Renew your subscriptions",
    color: "#b69aff"
  },
  {
    icon: Zap,
    title: "Electricity",
    desc: "Pay electricity bills",
    color: "#f5c451"
  },
  {
    icon: Gift,
    title: "Referral",
    desc: "Invite and earn",
    color: "#ff9cbe"
  }
];

const styles = `
* {
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

.st-app {
  min-height: 100vh;
  background: #080b12;
  color: #f5f5f5;
  font-family: Inter, Arial, sans-serif;
  overflow-x: hidden;
  padding-bottom: 0;
}

.st-app button,
.st-app input,
.st-app select {
  font: inherit;
}

.st-app button {
  cursor: pointer;
}

.st-header {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(8,11,18,.94);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(255,255,255,.08);
}

.st-nav {
  max-width: 1200px;
  margin: auto;
  padding: 16px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.st-brand {
  border: 0;
  background: none;
  color: white;
  font-weight: 950;
  font-size: 20px;
  letter-spacing: -.8px;
}

.st-brand span {
  color: #f5c451;
}

.st-navlinks {
  display: flex;
  align-items: center;
  gap: 23px;
}

.st-navlinks button {
  border: 0;
  background: none;
  color: #aeb4c2;
  font-weight: 650;
  transition: .2s;
}

.st-navlinks button:hover {
  color: #f5c451;
}

.st-menu {
  display: none;
  border: 1px solid rgba(255,255,255,.12);
  background: #151a25;
  color: #f5c451;
  padding: 9px;
  border-radius: 10px;
}

.st-mobile-menu {
  display: grid;
  gap: 8px;
  padding: 14px 20px 20px;
  background: #101520;
  animation: stDrop .25s ease;
}

.st-mobile-menu button {
  text-align: left;
  padding: 13px;
  border: 1px solid rgba(255,255,255,.06);
  border-radius: 10px;
  background: #171e2b;
  color: white;
}

.st-container {
  max-width: 1200px;
  margin: auto;
  padding: 30px 22px 75px;
}

.st-btn {
  border: 1px solid #f5c451;
  border-radius: 11px;
  padding: 13px 19px;
  background: linear-gradient(135deg,#f5c451,#dba52d);
  color: #10131a;
  font-weight: 850;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
  transition: .25s;
  box-shadow: 0 8px 25px rgba(245,196,81,.13);
}

.st-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 12px 30px rgba(245,196,81,.22);
}

.st-btn:active {
  transform: scale(.97);
}

.st-btn:disabled {
  opacity: .55;
  cursor: not-allowed;
  transform: none;
}

.st-btn-light {
  background: #171d29;
  color: #f5c451;
  border: 1px solid rgba(245,196,81,.25);
  box-shadow: none;
}

.st-btn-light:hover {
  background: #202838;
}

.st-eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 13px;
  border-radius: 30px;
  background: rgba(245,196,81,.09);
  border: 1px solid rgba(245,196,81,.22);
  color: #f5c451;
  font-size: 11px;
  font-weight: 850;
  letter-spacing: 1px;
}

.st-hero {
  position: relative;
  overflow: hidden;
  border-radius: 25px;
  padding: 65px 7%;
  background:
    radial-gradient(circle at 85% 20%,rgba(245,196,81,.14),transparent 30%),
    linear-gradient(120deg,#141b29,#0d111b 70%,#171b24);
  border: 1px solid rgba(245,196,81,.18);
  display: grid;
  grid-template-columns: 1.3fr .7fr;
  align-items: center;
  gap: 25px;
  animation: stFade .7s ease;
}

.st-hero h1 {
  font-size: clamp(36px,6vw,66px);
  line-height: 1.08;
  letter-spacing: -2px;
  margin: 20px 0;
  color: white;
}

.st-hero h1 span {
  color: #f5c451;
}

.st-hero p {
  color: #a7afbf;
  line-height: 1.85;
  max-width: 520px;
  font-size: 15px;
}

.st-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-top: 26px;
}

.st-hero-art {
  position: relative;
  min-height: 250px;
  display: grid;
  place-items: center;
}

.st-art-circle {
  width: 205px;
  height: 205px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: #f5c451;
  background: linear-gradient(145deg,#252c3b,#111722);
  border: 1px solid rgba(245,196,81,.35);
  box-shadow: 0 0 45px rgba(245,196,81,.12);
  animation: stFloat 4s ease-in-out infinite;
}

.st-float-tag {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 14px;
  border-radius: 12px;
  background: #1a2230;
  border: 1px solid rgba(255,255,255,.1);
  color: white;
  font-size: 12px;
  font-weight: 800;
  animation: stFloat 5s ease-in-out infinite;
}

.st-tag-one {
  top: 10px;
  right: 0;
}

.st-tag-two {
  bottom: 12px;
  left: 0;
  animation-delay: 1s;
}

.st-section {
  margin-top: 48px;
}

.st-section-head {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 20px;
}

.st-section-head h2 {
  margin: 0;
  font-size: 27px;
  color: white;
}

.st-section-head p {
  color: #858fa2;
  margin: 7px 0 0;
  font-size: 14px;
}

.st-grid {
  display: grid;
  grid-template-columns: repeat(3,minmax(0,1fr));
  gap: 16px;
}

.st-card {
  background: linear-gradient(145deg,#151c29,#10151f);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 17px;
  padding: 21px;
  box-shadow: 0 8px 25px rgba(0,0,0,.12);
  transition: transform .25s,border-color .25s,box-shadow .25s;
  animation: stFade .5s ease both;
}

.st-card:hover {
  transform: translateY(-5px);
  border-color: rgba(245,196,81,.35);
  box-shadow: 0 14px 35px rgba(0,0,0,.22);
}

.st-service-icon {
  width: 52px;
  height: 52px;
  border-radius: 15px;
  display: grid;
  place-items: center;
  background: rgba(255,255,255,.055);
  margin-bottom: 15px;
  transition: transform .3s;
}

.st-card:hover .st-service-icon {
  transform: rotate(-7deg) scale(1.08);
}

.st-service-card h3 {
  margin: 0 0 7px;
  color: white;
  font-size: 16px;
}

.st-service-card p {
  margin: 0;
  color: #8993a5;
  font-size: 13px;
  line-height: 1.6;
}

.st-feature {
  background: linear-gradient(110deg,#171e2b,#10151f);
  border: 1px solid rgba(245,196,81,.18);
  border-radius: 18px;
  padding: 25px;
  display: flex;
  align-items: center;
  gap: 17px;
  margin-top: 35px;
}

.st-feature-icon {
  background: rgba(245,196,81,.1);
  color: #f5c451;
  padding: 14px;
  border-radius: 14px;
  flex-shrink: 0;
}

.st-feature p {
  color: #929bad;
  line-height: 1.7;
  margin-bottom: 0;
}

.st-form-wrap {
  max-width: 520px;
  margin: 25px auto;
  background: linear-gradient(145deg,#151c29,#10151f);
  border: 1px solid rgba(245,196,81,.16);
  padding: 30px;
  border-radius: 21px;
  box-shadow: 0 15px 45px rgba(0,0,0,.2);
  animation: stFade .45s ease;
}

.st-form-wrap h2 {
  margin-top: 17px;
  font-size: 27px;
  color: white;
}

.st-form-wrap > p {
  color: #8993a5;
  line-height: 1.6;
}

.st-input {
  width: 100%;
  padding: 14px 15px;
  margin: 7px 0 17px;
  border: 1px solid rgba(255,255,255,.11);
  background: #0b1019;
  color: white;
  border-radius: 10px;
  outline: none;
  font-size: 15px;
  transition: .2s;
}

.st-input:focus {
  border-color: #f5c451;
  box-shadow: 0 0 0 4px rgba(245,196,81,.09);
}

.st-input option {
  background: #10151f;
  color: white;
}

.st-label {
  font-size: 13px;
  font-weight: 750;
  color: #c5cad4;
}

.st-message {
  padding: 14px 17px;
  background: rgba(245,196,81,.09);
  color: #f5c451;
  border: 1px solid rgba(245,196,81,.22);
  border-radius: 12px;
  margin-bottom: 20px;
  overflow-wrap: anywhere;
}

.st-dashboard-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  flex-wrap: wrap;
  margin-bottom: 22px;
}

.st-dashboard-top h1 {
  margin: 13px 0 0;
  font-size: 29px;
  color: white;
}

.st-muted {
  color: #8993a5;
}

.st-profile-row {
  display: flex;
  align-items: center;
  gap: 15px;
}

.st-avatar {
  width: 53px;
  height: 53px;
  display: grid;
  place-items: center;
  background: rgba(245,196,81,.1);
  color: #f5c451;
  border-radius: 50%;
  flex-shrink: 0;
}

.st-profile-row h3 {
  margin: 0 0 5px;
  overflow-wrap: anywhere;
}

.st-profile-row p {
  margin: 0;
  color: #8993a5;
  font-size: 13px;
  overflow-wrap: anywhere;
}

.st-wallet {
  background:
    radial-gradient(circle at 90% 0%,rgba(245,196,81,.2),transparent 40%),
    linear-gradient(120deg,#202a3b,#111824);
  border: 1px solid rgba(245,196,81,.3);
  position: relative;
  overflow: hidden;
}

.st-wallet:after {
  content: "";
  position: absolute;
  width: 190px;
  height: 190px;
  border: 1px solid rgba(245,196,81,.18);
  border-radius: 50%;
  right: -55px;
  top: -95px;
  box-shadow:
    0 0 0 25px rgba(245,196,81,.04),
    0 0 0 50px rgba(245,196,81,.03);
  pointer-events: none;
}

.st-wallet-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #f5c451;
}

.st-wallet h2 {
  font-size: 34px;
  margin: 12px 0 20px;
  color: white;
  overflow-wrap: anywhere;
}

.st-wallet .st-btn {
  position: relative;
  z-index: 1;
}

.st-eye-button {
  background: transparent;
  color: #f5c451;
  border: 0;
  padding: 6px;
}

.st-actions-grid {
  display: grid;
  grid-template-columns: repeat(3,minmax(0,1fr));
  gap: 13px;
}

.st-action {
  border: 1px solid rgba(255,255,255,.08);
  background: #141b27;
  padding: 18px 10px;
  border-radius: 14px;
  color: #d9dce4;
  display: grid;
  justify-items: center;
  gap: 10px;
  font-weight: 750;
  transition: .22s;
}

.st-action:hover {
  transform: translateY(-4px);
  border-color: rgba(245,196,81,.35);
  background: #1c2534;
}

.st-action svg {
  color: #f5c451;
}

.st-history {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
}

.st-status {
  padding: 6px 10px;
  border-radius: 30px;
  background: rgba(245,196,81,.1);
  color: #f5c451;
  font-size: 12px;
  font-weight: 800;
  text-transform: capitalize;
}

.st-empty {
  text-align: center;
  padding: 30px 15px;
  color: #8993a5;
  background: #121925;
  border: 1px dashed rgba(255,255,255,.13);
  border-radius: 15px;
}

.st-admin-label {
  display: inline-block;
  background: rgba(245,196,81,.1);
  color: #f5c451;
  padding: 6px 11px;
  border-radius: 30px;
  font-size: 12px;
  font-weight: 800;
}

.st-provider-output {
  background: #090e17;
  color: #d7dce6;
  border: 1px solid rgba(255,255,255,.1);
  padding: 15px;
  border-radius: 12px;
  overflow: auto;
  white-space: pre-wrap;
  overflow-wrap: anywhere;
  font-size: 12px;
  max-height: 450px;
}

.st-bottom-nav {
  display: none;
}

.st-footer {
  background: #0d121c;
  border-top: 1px solid rgba(255,255,255,.08);
  padding: 35px 22px;
  text-align: center;
  color: #8993a5;
}

.st-footer strong {
  color: #f5c451;
  font-size: 18px;
}

.st-footer a {
  color: #f5c451;
  text-decoration: none;
  font-weight: 750;
}

.st-spinner {
  animation: stSpin 1s linear infinite;
}

@keyframes stFade {
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes stDrop {
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes stFloat {
  0%,100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-12px);
  }
}

@keyframes stSpin {
  to {
    transform: rotate(360deg);
  }
}

@media(max-width:760px) {
  .st-navlinks {
    display: none;
  }

  .st-menu {
    display: inline-flex;
  }

  .st-hero {
    grid-template-columns: 1fr;
    padding: 42px 7%;
  }

  .st-hero-art {
    min-height: 205px;
  }

  .st-grid {
    grid-template-columns: repeat(2,minmax(0,1fr));
  }

  .st-actions-grid {
    grid-template-columns: repeat(2,minmax(0,1fr));
  }

  .st-container {
    padding-bottom: 105px;
  }

  .st-bottom-nav {
    display: flex;
    position: fixed;
    z-index: 60;
    bottom: 0;
    left: 0;
    right: 0;
    justify-content: space-around;
    align-items: center;
    padding: 10px 5px calc(10px + env(safe-area-inset-bottom));
    background: rgba(12,17,27,.97);
    backdrop-filter: blur(18px);
    border-top: 1px solid rgba(255,255,255,.1);
  }

  .st-bottom-nav button {
    border: 0;
    background: transparent;
    color: #8993a5;
    display: grid;
    justify-items: center;
    gap: 4px;
    font-size: 10px;
    font-weight: 750;
    padding: 5px 12px;
  }

  .st-bottom-nav button.active {
    color: #f5c451;
  }
}

@media(max-width:430px) {
  .st-container {
    padding: 20px 14px 110px;
  }

  .st-nav {
    padding: 13px 15px;
  }

  .st-brand {
    font-size: 18px;
  }

  .st-hero {
    padding: 35px 22px;
    border-radius: 20px;
  }

  .st-hero h1 {
    letter-spacing: -1.3px;
  }

  .st-grid {
    gap: 10px;
  }

  .st-card {
    padding: 15px;
  }

  .st-form-wrap {
    padding: 22px 17px;
  }

  .st-wallet h2 {
    font-size: 28px;
  }

  .st-section-head {
    align-items: start;
    flex-direction: column;
  }

  .st-feature {
    align-items: flex-start;
    padding: 18px;
  }
}

@media(prefers-reduced-motion: reduce) {
  *,*:before,*:after {
    animation-duration: .01ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
    transition-duration: .01ms !important;
  }
}
`;

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
    password: ""
  });

  const [depositForm, setDepositForm] = useState({
    amount: "",
    reference: ""
  });

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setSession(data.session);
      if (data.session) loadAccount(data.session.user);
    });

    const {
      data: { subscription }
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (!mounted) return;

      setSession(newSession);

      if (newSession) {
        loadAccount(newSession.user);
      } else {
        setProfile(null);
        setBalance(0);
        setDeposits([]);
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

    if (profileData?.role === "admin") {
      await loadPendingDeposits();
    }
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
      setMessage(
        "Registration submitted! Check your email for a confirmation link."
      );
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
      setMessage(
        "Deposit request submitted. Awaiting admin verification."
      );
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

  async function testAutoSyncCatalog() {
    setCatalogLoading(true);
    setCatalogResult(null);
    setMessage("");

    try {
      const { data, error } = await supabase.functions.invoke(
        "autosync-catalog",
        { body: {} }
      );

      if (error) {
        setMessage(error.message);
      } else if (data?.error) {
        setMessage(data.error);
      } else {
        setCatalogResult(data);
        setMessage("AutoSyncNG catalogue test completed.");
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Could not connect to AutoSyncNG."
      );
    }

    setCatalogLoading(false);
  }

  const money = value =>
    "₦" + Number(value || 0).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });

  function go(destination) {
    setPage(destination);
    setMessage("");
    setShowMenu(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const button = "st-btn";
  const input = "st-input";

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
              <button onClick={() => go("dashboard")}>
                Dashboard
              </button>
            )}

            <button
              onClick={() => {
                go("home");
                setTimeout(() => {
                  document.getElementById("services")?.scrollIntoView({
                    behavior: "smooth"
                  });
                }, 100);
              }}
            >
              Services
            </button>

            <a
              href={WHATSAPP}
              style={{
                color: "#aeb4c2",
                textDecoration: "none",
                fontWeight: 650
              }}
            >
              Support
            </a>

            {session ? (
              <button className={button} onClick={logout}>
                <LogOut size={16} /> Logout
              </button>
            ) : (
              <>
                <button onClick={() => go("login")}>Login</button>
                <button
                  className={button}
                  onClick={() => go("register")}
                >
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
                <button onClick={() => go("deposit")}>Fund Wallet</button>

                {profile?.role === "admin" && (
                  <button onClick={() => go("admin")}>Admin Panel</button>
                )}

                <button onClick={logout}>Logout</button>
              </>
            ) : (
              <>
                <button onClick={() => go("login")}>Login</button>
                <button onClick={() => go("register")}>
                  Create Account
                </button>
              </>
            )}

            <a
              href={WHATSAPP}
              style={{ padding: 12, color: "#f5c451" }}
            >
              Contact Support
            </a>
          </nav>
        )}
      </header>

      <main className="st-container">
        {message && (
          <div className="st-message">{message}</div>
        )}

        {page === "home" && (
          <>
            <section className="st-hero">
              <div>
                <div className="st-eyebrow">
                  <Activity size={14} />
                  YOUR DIGITAL PAYMENT PLATFORM
                </div>

                <h1>
                  Your digital world.
                  <br />
                  <span>One platform.</span>
                </h1>

                <p>
                  Buy airtime, subscribe to data, pay bills and access
                  digital services with Sodiq Telecom Services.
                  Simple, convenient and reliable.
                </p>

                <div className="st-hero-actions">
                  <button
                    className={button}
                    onClick={() =>
                      go(session ? "dashboard" : "register")
                    }
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
                  <Wifi size={15} color="#f5c451" />
                  Data & Airtime
                </div>

                <div className="st-float-tag st-tag-two">
                  <ShieldCheck size={15} color="#f5c451" />
                  Secure Payments
                </div>
              </div>
            </section>

            <section className="st-section" id="services">
              <div className="st-section-head">
                <div>
                  <h2>Our Services</h2>
                  <p>Explore the services on our platform.</p>
                </div>

                <Sparkles color="#f5c451" size={23} />
              </div>

              <div className="st-grid">
                {services.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <div
                      className="st-card st-service-card"
                      key={item.title}
                      style={{
                        animationDelay: `${index * 80}ms`
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
                    </div>
                  );
                })}
              </div>
            </section>

            <div className="st-feature">
              <div className="st-feature-icon">
                <ShieldCheck size={29} />
              </div>

              <div>
                <h3 style={{ margin: "0 0 6px" }}>
                  Simple and secure wallet funding
                </h3>

                <p>
                  Deposit requests are reviewed by the administrator
                  before funds are added to your wallet.
                </p>
              </div>
            </div>

            <section
              className="st-section"
              style={{ textAlign: "center" }}
            >
              <h2>Ready to get started?</h2>

              <p className="st-muted">
                Create your account and explore Sodiq Telecom.
              </p>

              <button
                className={button}
                onClick={() =>
                  go(session ? "dashboard" : "register")
                }
              >
                {session ? "Open Dashboard" : "Create Free Account"}
                <ChevronRight size={17} />
              </button>
            </section>
          </>
        )}

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
                onChange={e =>
                  setForm({ ...form, full_name: e.target.value })
                }
                required
              />

              <label className="st-label">Username</label>
              <input
                className={input}
                value={form.username}
                onChange={e =>
                  setForm({ ...form, username: e.target.value })
                }
                required
              />

              <label className="st-label">Gender</label>
              <select
                className={input}
                value={form.gender}
                onChange={e =>
                  setForm({ ...form, gender: e.target.value })
                }
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
                onChange={e =>
                  setForm({ ...form, phone: e.target.value })
                }
                required
              />

              <label className="st-label">Email Address</label>
              <input
                className={input}
                type="email"
                value={form.email}
                onChange={e =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />

              <label className="st-label">Password</label>
              <input
                className={input}
                type="password"
                value={form.password}
                onChange={e =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />

              <button
                className={button}
                disabled={loading}
                style={{ width: "100%" }}
              >
                {loading ? "Creating account..." : "Create Account"}
                <ArrowRight size={17} />
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: 20 }}>
              Already have an account?{" "}
              <button
                onClick={() => go("login")}
                style={textLink}
              >
                Login
              </button>
            </p>
          </section>
        )}

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
                onChange={e =>
                  setForm({ ...form, email: e.target.value })
                }
                required
              />

              <label className="st-label">Password</label>
              <input
                className={input}
                type="password"
                value={form.password}
                onChange={e =>
                  setForm({ ...form, password: e.target.value })
                }
                required
              />

              <button
                className={button}
                disabled={loading}
                style={{ width: "100%" }}
              >
                {loading ? "Logging in..." : "Login"}
                <ArrowRight size={17} />
              </button>
            </form>

            <p style={{ textAlign: "center", marginTop: 20 }}>
              New here?{" "}
              <button
                onClick={() => go("register")}
                style={textLink}
              >
                Create an account
              </button>
            </p>
          </section>
        )}

        {page === "dashboard" && session && (
          <>
            <div className="st-dashboard-top">
              <div>
                <div className="st-eyebrow">
                  <LayoutDashboard size={14} />
                  CUSTOMER DASHBOARD
                </div>

                <h1>My Dashboard</h1>

                <p className="st-muted">
                  Welcome back, {profile?.full_name || "Customer"}.
                </p>
              </div>

              <button
                className="st-btn st-btn-light"
                onClick={() => loadAccount(session.user)}
              >
                <RefreshCw size={16} /> Refresh
              </button>
            </div>

            <div
              className="st-grid"
              style={{
                gridTemplateColumns:
                  "repeat(auto-fit,minmax(260px,1fr))"
              }}
            >
              <div className="st-card">
                <div className="st-profile-row">
                  <div className="st-avatar">
                    <User size={25} />
                  </div>

                  <div>
                    <h3>
                      {profile?.full_name || session.user.email}
                    </h3>
                    <p>{session.user.email}</p>
                  </div>
                </div>

                <p
                  className="st-muted"
                  style={{ marginTop: 18, fontSize: 13 }}
                >
                  Username: {profile?.username || "Customer"}
                </p>

                {profile?.role === "admin" && (
                  <span className="st-admin-label">
                    Administrator
                  </span>
                )}
              </div>

              <div className="st-card st-wallet">
                <div className="st-wallet-top">
                  <Wallet size={28} />
                  <button
                    className="st-eye-button"
                    onClick={() => setShowBalance(!showBalance)}
                    aria-label="Toggle wallet balance visibility"
                  >
                    {showBalance ? (
                      <Eye size={20} />
                    ) : (
                      <EyeOff size={20} />
                    )}
                  </button>
                </div>

                <p style={{ marginBottom: 0, color: "#b9c0ce" }}>
                  AVAILABLE WALLET BALANCE
                </p>

                <h2>
                  {showBalance ? money(balance) : "₦ ••••••"}
                </h2>

                <button
                  className={button}
                  onClick={() => go("deposit")}
                >
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
                <button
                  className="st-action"
                  onClick={() => go("deposit")}
                >
                  <Wallet size={25} />
                  Fund Wallet
                </button>

                <button
                  className="st-action"
                  onClick={() =>
                    document
                      .getElementById("deposit-history")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  <History size={25} />
                  Deposit History
                </button>

                {profile?.role === "admin" && (
                  <button
                    className="st-action"
                    onClick={() => go("admin")}
                  >
                    <ShieldCheck size={25} />
                    Admin Panel
                  </button>
                )}
              </div>
            </section>

            <section className="st-section" id="deposit-history">
              <div className="st-section-head">
                <div>
                  <h2>Deposit History</h2>
                  <p>Review your wallet funding requests.</p>
                </div>
              </div>

              {deposits.length === 0 ? (
                <div className="st-empty">
                  <History size={32} />
                  <p>No deposits yet.</p>
                </div>
              ) : (
                deposits.map(deposit => (
                  <div
                    className="st-card"
                    key={deposit.id}
                    style={{ marginBottom: 12 }}
                  >
                    <div className="st-history">
                      <div>
                        <strong>{money(deposit.amount)}</strong>

                        <p
                          className="st-muted"
                          style={{ fontSize: 12 }}
                        >
                          Reference:{" "}
                          {deposit.payment_reference || "N/A"}
                        </p>
                      </div>

                      <span className="st-status">
                        {deposit.status}
                      </span>
                    </div>

                    <small className="st-muted">
                      {new Date(
                        deposit.created_at
                      ).toLocaleString()}
                    </small>
                  </div>
                ))
              )}
            </section>
          </>
        )}

        {page === "deposit" && session && (
          <section className="st-form-wrap">
            <div className="st-eyebrow">
              <Wallet size={14} /> WALLET FUNDING
            </div>

            <h2>Fund your wallet</h2>

            <p>
              Transfer to the account below and submit your payment
              reference.
            </p>

            <div
              className="st-card"
              style={{
                background: "#171e2b",
                borderColor: "rgba(245,196,81,.3)"
              }}
            >
              <span className="st-admin-label">OPay Transfer</span>

              <h2
                style={{
                  color: "#f5c451",
                  marginBottom: 5
                }}
              >
                8114095631
              </h2>

              <h3 style={{ margin: "5px 0" }}>
                Ogunlowo Sodiq Ayomiposi
              </h3>

              <p className="st-muted">Bank: OPay</p>
            </div>

            <form onSubmit={submitDeposit}>
              <label className="st-label">Amount (₦)</label>

              <input
                className={input}
                type="number"
                min="1"
                value={depositForm.amount}
                onChange={e =>
                  setDepositForm({
                    ...depositForm,
                    amount: e.target.value
                  })
                }
                required
              />

              <label className="st-label">
                OPay Transfer Reference
              </label>

              <input
                className={input}
                value={depositForm.reference}
                onChange={e =>
                  setDepositForm({
                    ...depositForm,
                    reference: e.target.value
                  })
                }
                required
              />

              <button
                className={button}
                disabled={loading}
                style={{ width: "100%" }}
              >
                {loading ? "Submitting..." : "Submit Deposit Request"}
                <ArrowRight size={17} />
              </button>
            </form>
          </section>
        )}

        {page === "admin" &&
          session &&
          profile?.role === "admin" && (
            <>
              <div className="st-dashboard-top">
                <div>
                  <div className="st-eyebrow">
                    <ShieldCheck size={14} />
                    ADMINISTRATION
                  </div>

                  <h1>Admin Panel</h1>

                  <p className="st-muted">
                    Manage deposit requests and check the provider
                    connection.
                  </p>
                </div>

                <button
                  className="st-btn st-btn-light"
                  onClick={loadPendingDeposits}
                  disabled={loading}
                >
                  <RefreshCw size={16} /> Refresh Requests
                </button>
              </div>

              <div className="st-card">
                <h3>
                  Pending Deposits ({pendingDeposits.length})
                </h3>

                {pendingDeposits.length === 0 ? (
                  <div className="st-empty">
                    No pending deposits.
                  </div>
                ) : (
                  pendingDeposits.map(deposit => (
                    <div
                      className="st-card"
                      key={deposit.id}
                      style={{ marginTop: 13 }}
                    >
                      <h3 style={{ color: "#f5c451" }}>
                        {money(deposit.amount)}
                      </h3>

                      <p>
                        Customer:{" "}
                        {deposit.customer?.full_name || "Unknown"}
                      </p>

                      <p>
                        Username:{" "}
                        {deposit.customer?.username || "N/A"}
                      </p>

                      <p>
                        Phone:{" "}
                        {deposit.customer?.phone || "N/A"}
                      </p>

                      <p>
                        Reference:{" "}
                        {deposit.payment_reference || "N/A"}
                      </p>

                      <p className="st-muted">
                        {new Date(
                          deposit.created_at
                        ).toLocaleString()}
                      </p>

                      <div
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 10
                        }}
                      >
                        <button
                          className={button}
                          onClick={() =>
                            processDeposit(deposit.id, "approve")
                          }
                          disabled={loading}
                        >
                          <CheckCircle size={16} /> Approve
                        </button>

                        <button
                          className="st-btn"
                          style={{
                            background: "#9f3434",
                            borderColor: "#9f3434",
                            color: "white"
                          }}
                          onClick={() =>
                            processDeposit(deposit.id, "reject")
                          }
                          disabled={loading}
                        >
                          <XCircle size={16} /> Reject
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="st-card" style={{ marginTop: 22 }}>
                <div className="st-eyebrow">
                  <Activity size={14} /> API CONNECTION
                </div>

                <h2>AutoSyncNG Provider</h2>

                <p className="st-muted">
                  Check the connection and retrieve the provider
                  catalogue.
                </p>

                <button
                  className={button}
                  onClick={testAutoSyncCatalog}
                  disabled={catalogLoading}
                >
                  <RefreshCw
                    size={16}
                    className={
                      catalogLoading ? "st-spinner" : ""
                    }
                  />

                  {catalogLoading
                    ? "Testing Connection..."
                    : "Test AutoSyncNG Connection"}
                </button>

                {catalogResult && (
                  <div style={{ marginTop: 20 }}>
                    <h3>Provider Response</h3>

                    <p>
                      Provider:{" "}
                      {catalogResult.provider || "AutoSyncNG"}
                    </p>

                    <p>
                      API Version:{" "}
                      {catalogResult.api_version || "Unknown"}
                    </p>

                    <pre className="st-provider-output">
                      {JSON.stringify(catalogResult, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </>
          )}

        {!session &&
          ["dashboard", "deposit", "admin"].includes(page) && (
            <div className="st-form-wrap">
              <h2>Login required</h2>

              <p>Please log in to access this section.</p>

              <button
                className={button}
                onClick={() => go("login")}
              >
                Login
              </button>
            </div>
          )}

        {session &&
          page === "admin" &&
          profile?.role !== "admin" && (
            <div className="st-form-wrap">
              <h2>Access restricted</h2>
              <p>This section is only available to administrators.</p>

              <button
                className={button}
                onClick={() => go("dashboard")}
              >
                Return to Dashboard
              </button>
            </div>
          )}
      </main>

      {session && (
        <nav className="st-bottom-nav">
          <button
            className={page === "home" ? "active" : ""}
            onClick={() => go("home")}
          >
            <Home size={20} />
            Home
          </button>

          <button
            className={page === "dashboard" ? "active" : ""}
            onClick={() => go("dashboard")}
          >
            <LayoutDashboard size={20} />
            Dashboard
          </button>

          <button
            className={page === "deposit" ? "active" : ""}
            onClick={() => go("deposit")}
          >
            <Wallet size={20} />
            Wallet
          </button>

          <button
            onClick={() => {
              window.location.href = WHATSAPP;
            }}
          >
            <Headphones size={20} />
            Support
          </button>
        </nav>
      )}

      <footer className="st-footer">
        <strong>SODIQ TELECOM SERVICES</strong>

        <p>Reliable digital services. Simple connectivity.</p>

        <a href={WHATSAPP}>
          <Headphones
            size={16}
            style={{ verticalAlign: "middle" }}
          />{" "}
          Contact Support
        </a>

        <p style={{ fontSize: 12, marginTop: 20 }}>
          © 2026 Sodiq Telecom Services. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

const textLink = {
  border: 0,
  background: "transparent",
  color: "#f5c451",
  fontWeight: 750,
  cursor: "pointer"
};
