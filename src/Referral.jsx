import React, { useEffect, useState } from "react";
import { Copy, Users, Wallet, RefreshCw } from "lucide-react";
import { supabase } from "./supabase";

export default function Referral({ user }) {
const [summary, setSummary] = useState({
referral_code: "",
total_referrals: 0,
approved_referrals: 0,
total_earned: 0,
available_balance: 0
});
const [loading, setLoading] = useState(true);
const [message, setMessage] = useState("");

async function loadReferral() {
setLoading(true);
setMessage("");

const { data, error } = await supabase.functions.invoke(
  "referral-system",
  { body: { action: "summary" } }
);

if (error || data?.error) {
  setMessage(error?.message || data.error);
} else {
  setSummary(data);
}

setLoading(false);

}

async function copyCode() {
if (!summary.referral_code) return;

try {
  await navigator.clipboard.writeText(summary.referral_code);
  setMessage("Referral code copied!");
} catch {
  setMessage("Could not copy. Please copy the code manually.");
}

}

useEffect(() => {
if (user) loadReferral();
}, [user]);

const money = value =>
"₦" + Number(value || 0).toLocaleString("en-NG");

if (!user) {
return <div className="st-form-wrap">Please log in to access referrals.</div>;
}

return (
<section className="st-section">
<div className="st-dashboard-top">
<div>
<div className="st-eyebrow">
<Users size={14} /> REFERRAL PROGRAM
</div>
<h1>Invite & Earn</h1>
<p className="st-muted">
Invite friends and earn ₦100 for every verified referral.
</p>
</div>

    <button
      className="st-btn st-btn-light"
      onClick={loadReferral}
      disabled={loading}
    >
      <RefreshCw size={16} />
      Refresh
    </button>
  </div>

  {message && <div className="st-message">{message}</div>}

  <div className="st-card">
    <h3>Your Referral Code</h3>

    {loading ? (
      <p>Loading referral details...</p>
    ) : (
      <>
        <div style={{
          display: "flex",
          gap: 10,
          alignItems: "center",
          flexWrap: "wrap"
        }}>
          <strong style={{
            fontSize: 24,
            color: "#15803d",
            letterSpacing: 2
          }}>
            {summary.referral_code || "Not available"}
          </strong>

          <button
            className="st-btn"
            onClick={copyCode}
            disabled={!summary.referral_code}
          >
            <Copy size={16} /> Copy Code
          </button>
        </div>
      </>
    )}
  </div>

  <div className="st-grid" style={{ marginTop: 18 }}>
    <div className="st-card">
      <Users size={25} color="#16a34a" />
      <p className="st-muted">Total Referrals</p>
      <h2>{summary.total_referrals}</h2>
    </div>

    <div className="st-card">
      <Users size={25} color="#16a34a" />
      <p className="st-muted">Verified Referrals</p>
      <h2>{summary.approved_referrals}</h2>
    </div>

    <div className="st-card">
      <Wallet size={25} color="#16a34a" />
      <p className="st-muted">Total Earned</p>
      <h2>{money(summary.total_earned)}</h2>
    </div>

    <div className="st-card">
      <Wallet size={25} color="#16a34a" />
      <p className="st-muted">Available Referral Balance</p>
      <h2>{money(summary.available_balance)}</h2>
    </div>
  </div>

  <div className="st-card" style={{ marginTop: 20 }}>
    <h3>How it works</h3>
    <p>1. Copy your unique referral code.</p>
    <p>2. Share it with friends.</p>
    <p>3. They register using your code.</p>
    <p>4. Once their referral is verified, you earn ₦100.</p>
    <p><strong>Minimum withdrawal: ₦500.</strong></p>
  </div>
</section>

);
}
