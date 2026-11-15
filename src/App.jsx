import React, { useEffect, useState } from "react";
import {
  Smartphone, Wifi, Tv, Zap, GraduationCap, Gift,
  ShieldCheck, Headphones, Wallet, RefreshCw,
  CheckCircle, XCircle, Menu, User
} from "lucide-react";
import { supabase } from "./supabase";

const WHATSAPP = "https://wa.me/2348114095631";

export default function App() {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [balance, setBalance] = useState(0);
  const [deposits, setDeposits] = useState([]);
  const [pendingDeposits, setPendingDeposits] = useState([]);
  const [page, setPage] = useState("home");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [showMenu, setShowMenu] = useState(false);

  const [form, setForm] = useState({
    full_name: "",
    username: "",
    gender: "",
    phone: "",
    email: "",
    password: "",
  });

  const [depositForm, setDepositForm] = useState({
    amount: "",
    reference: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      if (data.session) loadAccount(data.session.user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);

      if (newSession) {
        loadAccount(newSession.user);
      } else {
        setProfile(null);
        setBalance(0);
        setDeposits([]);
        setPendingDeposits([]);
      }
    });

    return () => subscription.unsubscribe();
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
      !form.full_name ||
      !form.username ||
      !form.gender ||
      !form.phone ||
      !form.email ||
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
          phone: form.phone.trim(),
        },
      },
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage(
        "Registration submitted! Check your email for a confirmation link if email confirmation is enabled."
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
      password: form.password,
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
  }

  async function submitDeposit(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const amount = Number(depositForm.amount);

    if (!amount || amount <= 0) {
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
      status: "pending",
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
      {
        body: { action: "list" },
      }
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
      {
        body: { action, depositId },
      }
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

  const money = (value) =>
    "₦" + Number(value || 0).toLocaleString("en-NG", {
      minimumFractionDigits: 2,
    });

  const buttonStyle = {
    background: "#d6a832",
    color: "#111",
    border: "none",
    padding: "13px 20px",
    borderRadius: "9px",
    fontWeight: "bold",
    cursor: "pointer",
  };

  const inputStyle = {
    width: "100%",
    padding: "13px",
    margin: "7px 0 14px",
    borderRadius: "8px",
    border: "1px solid #555",
    background: "#171717",
    color: "white",
    boxSizing: "border-box",
  };

  const cardStyle = {
    background: "#171717",
    border: "1px solid #393027",
    borderRadius: "13px",
    padding: "18px",
    marginBottom: "15px",
  };

  function go(destination) {
    setPage(destination);
    setMessage("");
    setShowMenu(false);
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: "#090909",
      color: "#fff",
      fontFamily: "Arial, sans-serif"
    }}>
      <header style={{
        padding: "17px 5%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottom: "1px solid #302719",
        background: "#101010",
        position: "sticky",
        top: 0,
        zIndex: 10
      }}>
        <div onClick={() => go("home")} style={{
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "19px"
        }}>
          <span style={{ color: "#d6a832" }}>SODIQ</span> TELECOM
        </div>

        <button onClick={() => setShowMenu(!showMenu)} style={{
          background: "transparent",
          color: "#d6a832",
          border: "none"
        }}>
          <Menu size={25} />
        </button>
      </header>

      {showMenu && (
        <nav style={{
          padding: "15px 5%",
          background: "#171717",
          display: "grid",
          gap: "12px"
        }}>
          <button style={navStyle} onClick={() => go("home")}>Home</button>
          {session ? (
            <>
              <button style={navStyle} onClick={() => go("dashboard")}>Dashboard</button>
              <button style={navStyle} onClick={() => go("deposit")}>Fund Wallet</button>
              {profile?.role === "admin" && (
                <button style={navStyle} onClick={() => go("admin")}>Admin Panel</button>
              )}
              <button style={navStyle} onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <button style={navStyle} onClick={() => go("login")}>Login</button>
              <button style={navStyle} onClick={() => go("register")}>Create Account</button>
            </>
          )}
        </nav>
      )}

      <main style={{ maxWidth: "950px", margin: "auto", padding: "30px 5%" }}>
        {message && (
          <div style={{
            ...cardStyle,
            borderColor: "#d6a832",
            color: "#f0c75e"
          }}>
            {message}
          </div>
        )}

        {page === "home" && (
          <>
            <section style={{ padding: "55px 0", textAlign: "center" }}>
              <div style={{ color: "#d6a832", fontWeight: "bold" }}>
                YOUR TRUSTED VTU PLATFORM
              </div>
              <h1 style={{ fontSize: "clamp(32px, 7vw, 55px)" }}>
                SODIQ <span style={{ color: "#d6a832" }}>TELECOM</span>
              </h1>
              <p style={{ color: "#bbb", lineHeight: 1.8 }}>
                Airtime, data, bill payments and digital services — all in one place.
              </p>
              <button style={buttonStyle} onClick={() => go("register")}>Get Started</button>
              <button style={{
                ...buttonStyle,
                marginLeft: "10px",
                background: "#252525",
                color: "white"
              }} onClick={() => go("login")}>Login</button>
            </section>

            <h2 style={{ color: "#d6a832" }}>Our Services</h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit,minmax(135px,1fr))",
              gap: "13px"
            }}>
              {[
                [Smartphone, "Airtime"],
                [Wifi, "Data"],
                [Tv, "Cable TV"],
                [Zap, "Electricity"],
                [GraduationCap, "Exam Pins"],
                [Gift, "Referral"]
              ].map(([Icon, title]) => (
                <div key={title} style={{ ...cardStyle, textAlign: "center" }}>
                  <Icon color="#d6a832" size={30} />
                  <p>{title}</p>
                </div>
              ))}
            </div>

            <div style={{ ...cardStyle, marginTop: "25px" }}>
              <ShieldCheck color="#d6a832" size={30} />
              <h3>Secure and Reliable</h3>
              <p style={{ color: "#bbb" }}>
                Customer deposits are manually verified before wallet credit.
              </p>
            </div>
          </>
        )}

        {page === "register" && (
          <section style={{ maxWidth: "480px", margin: "auto" }}>
            <h2 style={{ color: "#d6a832" }}>Create Your Account</h2>
            <form onSubmit={register}>
              <label>Full Name</label>
              <input style={inputStyle} value={form.full_name}
                onChange={e => setForm({ ...form, full_name: e.target.value })} required />

              <label>Username</label>
              <input style={inputStyle} value={form.username}
                onChange={e => setForm({ ...form, username: e.target.value })} required />

              <label>Gender</label>
              <select style={inputStyle} value={form.gender}
                onChange={e => setForm({ ...form, gender: e.target.value })} required>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Prefer not to say</option>
              </select>

              <label>Phone Number</label>
              <input style={inputStyle} value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })} required />

              <label>Email Address</label>
              <input style={inputStyle} type="email" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} required />

              <label>Password</label>
              <input style={inputStyle} type="password" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })} required />

              <button style={buttonStyle} disabled={loading}>
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>
            <p>Already registered? <button style={linkStyle} onClick={() => go("login")}>Login</button></p>
          </section>
        )}

        {page === "login" && (
          <section style={{ maxWidth: "450px", margin: "auto" }}>
            <h2 style={{ color: "#d6a832" }}>Login</h2>
            <form onSubmit={login}>
              <label>Email Address</label>
              <input style={inputStyle} type="email" value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })} required />
              <label>Password</label>
              <input style={inputStyle} type="password" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })} required />
              <button style={buttonStyle} disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p>No account? <button style={linkStyle} onClick={() => go("register")}>Register</button></p>
          </section>
        )}

        {page === "dashboard" && session && (
          <>
            <h2 style={{ color: "#d6a832" }}>My Dashboard</h2>
            <div style={cardStyle}>
              <User color="#d6a832" />
              <h3>Welcome, {profile?.full_name || session.user.email}</h3>
              <p style={{ color: "#aaa" }}>{session.user.email}</p>
            </div>
            <div style={{ ...cardStyle, borderColor: "#d6a832" }}>
              <Wallet color="#d6a832" size={30} />
              <p>WALLET BALANCE</p>
              <h1 style={{ color: "#d6a832" }}>{money(balance)}</h1>
              <button style={buttonStyle} onClick={() => go("deposit")}>Fund Wallet</button>
            </div>

            {profile?.role === "admin" && (
              <div style={cardStyle}>
                <h3>Administrator</h3>
                <button style={buttonStyle} onClick={() => go("admin")}>Open Admin Panel</button>
              </div>
            )}

            <h3>Deposit History</h3>
            {deposits.length === 0 ? (
              <p style={{ color: "#aaa" }}>No deposits yet.</p>
            ) : deposits.map(deposit => (
              <div key={deposit.id} style={cardStyle}>
                <strong>{money(deposit.amount)}</strong>
                <p>Reference: {deposit.payment_reference || "N/A"}</p>
                <p>Status: <span style={{ color: "#d6a832" }}>{deposit.status}</span></p>
                <small>{new Date(deposit.created_at).toLocaleString()}</small>
              </div>
            ))}

            <button style={buttonStyle} onClick={() => loadAccount(session.user)}>
              <RefreshCw size={15} /> Refresh Account
            </button>
          </>
        )}

        {page === "deposit" && session && (
          <section style={{ maxWidth: "500px", margin: "auto" }}>
            <h2 style={{ color: "#d6a832" }}>Fund Your Wallet</h2>
            <div style={cardStyle}>
              <p>Make your transfer to this OPay account:</p>
              <h3 style={{ color: "#d6a832" }}>OPay</h3>
              <h2>8114095631</h2>
              <h3>Ogunlowo Sodiq Ayomiposi</h3>
              <p style={{ color: "#aaa" }}>
                After transferring, enter your amount and payment reference below.
                Your wallet will be credited after verification.
              </p>
            </div>

            <form onSubmit={submitDeposit}>
              <label>Amount (₦)</label>
              <input style={inputStyle} type="number" min="1"
                value={depositForm.amount}
                onChange={e => setDepositForm({ ...depositForm, amount: e.target.value })} required />

              <label>OPay Transfer Reference</label>
              <input style={inputStyle} value={depositForm.reference}
                onChange={e => setDepositForm({ ...depositForm, reference: e.target.value })} required />

              <button style={buttonStyle} disabled={loading}>
                {loading ? "Submitting..." : "Submit Deposit Request"}
              </button>
            </form>
          </section>
        )}

        {page === "admin" && session && profile?.role === "admin" && (
          <>
            <h2 style={{ color: "#d6a832" }}>Admin Panel</h2>
            <button style={buttonStyle} onClick={loadPendingDeposits} disabled={loading}>
              <RefreshCw size={15} /> Refresh Requests
            </button>
            <h3>Pending Deposits ({pendingDeposits.length})</h3>

            {pendingDeposits.length === 0 ? (
              <p style={{ color: "#aaa" }}>No pending deposits.</p>
            ) : pendingDeposits.map(deposit => (
              <div key={deposit.id} style={cardStyle}>
                <h3 style={{ color: "#d6a832" }}>{money(deposit.amount)}</h3>
                <p>Customer: {deposit.customer?.full_name || "Unknown"}</p>
                <p>Username: {deposit.customer?.username || "N/A"}</p>
                <p>Phone: {deposit.customer?.phone || "N/A"}</p>
                <p>Reference: {deposit.payment_reference || "N/A"}</p>
                <p>Date: {new Date(deposit.created_at).toLocaleString()}</p>

                <button style={{ ...buttonStyle, background: "#238636", color: "white" }}
                  onClick={() => processDeposit(deposit.id, "approve")} disabled={loading}>
                  <CheckCircle size={15} /> Approve
                </button>

                <button style={{
                  ...buttonStyle,
                  background: "#b42318",
                  color: "white",
                  marginLeft: "8px"
                }} onClick={() => processDeposit(deposit.id, "reject")} disabled={loading}>
                  <XCircle size={15} /> Reject
                </button>
              </div>
            ))}
          </>
        )}

        {!session && ["dashboard", "deposit", "admin"].includes(page) && (
          <div style={cardStyle}>
            <p>Please log in to continue.</p>
            <button style={buttonStyle} onClick={() => go("login")}>Login</button>
          </div>
        )}
      </main>

      <footer style={{
        borderTop: "1px solid #302719",
        padding: "30px 5%",
        textAlign: "center",
        color: "#aaa"
      }}>
        <p><strong style={{ color: "#d6a832" }}>SODIQ TELECOM SERVICES</strong></p>
        <p>Tech • Digital • Connectivity</p>
        <a href={WHATSAPP} style={{ color: "#d6a832" }}>
          <Headphones size={15} /> Contact Support
        </a>
        <p>© 2026 Sodiq Telecom Services. All rights reserved.</p>
      </footer>
    </div>
  );
}

const navStyle = {
  background: "transparent",
  border: "none",
  color: "white",
  textAlign: "left",
  padding: "8px",
  cursor: "pointer"
};

const linkStyle = {
  background: "transparent",
  border: "none",
  color: "#d6a832",
  cursor: "pointer"
};
