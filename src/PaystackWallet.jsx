import React, { useEffect, useRef, useState } from "react";
import { supabase } from "./supabase";

export default function PaystackWallet({ onSuccess, onBack }) {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const verificationStarted = useRef(false);

  const showMessage = (text, type = "error") => {
    setMessage(text);
    setMessageType(type);
  };

  // Verify payment after Paystack redirects back to the website.
  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(window.location.search);
      const reference =
        params.get("reference") || params.get("trxref");

      if (!reference || verificationStarted.current) return;

      verificationStarted.current = true;
      setLoading(true);
      showMessage("Verifying your payment. Please wait...", "info");

      try {
        const { data, error } = await supabase.functions.invoke(
          "paystack-wallet-v2",
          {
            body: {
              action: "verify",
              reference,
            },
          }
        );

        if (error) throw error;

        if (!data?.success) {
          throw new Error(data?.error || "Payment verification failed.");
        }

        window.history.replaceState(
          {},
          document.title,
          window.location.pathname
        );

        showMessage(
          data.already_credited
            ? "This payment has already been credited."
            : "Payment successful! Your wallet has been credited.",
          "success"
        );

        if (onSuccess) {
          await onSuccess();
        }
      } catch (error) {
        showMessage(
          error.message || "Unable to verify payment. Contact support.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [onSuccess]);

  // Initialize a new Paystack payment.
  const handlePayment = async (e) => {
    e.preventDefault();

    const paymentAmount = Number(amount);

    if (
      !Number.isSafeInteger(paymentAmount) ||
      paymentAmount < 100 ||
      paymentAmount > 1000000
    ) {
      showMessage("Enter an amount between ₦100 and ₦1,000,000.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const { data, error } = await supabase.functions.invoke(
        "paystack-wallet-v2",
        {
          body: {
            action: "initialize",
            amount: paymentAmount,
            callback_url:
              window.location.origin + window.location.pathname,
          },
        }
      );

      if (error) throw error;

      if (!data?.success || !data?.authorization_url) {
        throw new Error(data?.error || "Could not start payment.");
      }

      window.location.href = data.authorization_url;
    } catch (error) {
      showMessage(
        error.message || "Payment could not be started. Try again."
      );
      setLoading(false);
    }
  };

  return (
    <div className="st-form-wrap">
      <div className="st-eyebrow">SECURE WALLET FUNDING</div>

      <h2>Fund Your Wallet</h2>

      <p>
        Add money to your SODIQ TELECOM SERVICES wallet
        securely using Paystack.
      </p>

      <form onSubmit={handlePayment}>
        <label htmlFor="paystack-amount">
          Amount (₦)
        </label>

        <input
          id="paystack-amount"
          type="number"
          min="100"
          max="1000000"
          step="1"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            marginTop: "8px",
            marginBottom: "15px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
            boxSizing: "border-box",
          }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "15px",
            border: "none",
            borderRadius: "10px",
            background: loading ? "#888" : "#087f45",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "PLEASE WAIT..." : "CONTINUE TO PAYSTACK"}
        </button>
      </form>

      {message && (
        <div
          role="status"
          style={{
            marginTop: "15px",
            padding: "12px",
            borderRadius: "8px",
            background:
              messageType === "success"
                ? "#e5f8ed"
                : messageType === "info"
                ? "#e8f1ff"
                : "#ffe9e9",
            color:
              messageType === "success"
                ? "#087f45"
                : messageType === "info"
                ? "#174ea6"
                : "#b42318",
          }}
        >
          {message}
        </div>
      )}

      <p style={{ fontSize: "12px", marginTop: "15px" }}>
        Payments are verified by our server before your wallet
        is credited. Do not close the page during verification.
      </p>

      {onBack && (
        <button
          type="button"
          onClick={onBack}
          disabled={loading}
          style={{
            marginTop: "15px",
            padding: "10px 15px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            background: "transparent",
            cursor: "pointer",
          }}
        >
          Go Back
        </button>
      )}
    </div>
  );
}
