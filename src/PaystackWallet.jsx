import React, { useEffect, useState } from "react";
import { supabase } from "./supabase";

export default function PaystackWallet({ onSuccess, onBack }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reference = params.get("reference") || params.get("trxref");

    if (reference) verifyPayment(reference);
  }, []);

  async function verifyPayment(reference) {
    setLoading(true);
    setMessage("Verifying payment...");

    const { data, error } = await supabase.functions.invoke(
      "paystack-wallet",
      { body: { action: "verify", reference } }
    );

    setLoading(false);

    if (error || data?.error || !data?.success) {
      setMessage(data?.error || error?.message || "Payment verification failed.");
      return;
    }

    window.history.replaceState(
      {},
      document.title,
      window.location.pathname
    );

    setMessage(
      data.already_credited
        ? "This payment was already credited."
        : `₦${Number(data.amount).toLocaleString("en-NG")} successfully added to your wallet.`
    );

    if (onSuccess) await onSuccess();
  }

  async function startPayment(e) {
    e.preventDefault();

    const naira = Number(amount);

    if (!Number.isSafeInteger(naira) || naira < 100) {
      setMessage("Minimum deposit is ₦100.");
      return;
    }

    setLoading(true);
    setMessage("");

    const { data, error } = await supabase.functions.invoke(
      "paystack-wallet",
      {
        body: {
          action: "initialize",
          amount: naira,
          callback_url: window.location.origin + window.location.pathname
        }
      }
    );

    setLoading(false);

    if (error || data?.error) {
      setMessage(data?.error || error?.message || "Payment could not start.");
      return;
    }

    if (!data?.authorization_url) {
      setMessage("Payment link was not returned.");
      return;
    }

    window.location.href = data.authorization_url;
  }

  return (
    <div className="st-card" style={{ marginBottom: 22 }}>
      <h3 style={{ color: "#087b36" }}>Fund with Paystack</h3>

      <p className="st-muted">
        Make a secure online payment and your wallet will be credited
        after successful verification.
      </p>

      <form onSubmit={startPayment}>
        <label className="st-label">Amount (₦)</label>

        <input
          className="st-input"
          type="number"
          min="100"
          step="1"
          placeholder="Enter amount"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          required
          disabled={loading}
        />

        <button
          className="st-btn"
          type="submit"
          disabled={loading}
          style={{ width: "100%" }}
        >
          {loading ? "Please wait..." : "Pay with Paystack"}
        </button>
      </form>

      {message && (
        <div className="st-message" style={{ marginTop: 15 }}>
          {message}
        </div>
      )}

      <button
        className="st-btn st-btn-light"
        style={{ marginTop: 12 }}
        onClick={onBack}
        disabled={loading}
      >
        Back to Dashboard
      </button>
    </div>
  );
}
