import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "../journal/journal.css";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setError("Wrong email or password.");
    } else {
      navigate("/admin/new");
    }
  }

  return (
    <div className="wrap-narrow" style={{ paddingTop: 60 }}>
      <h1 style={{ fontFamily: "'Fraunces', serif" }}>Journal Login</h1>
      <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 14, maxWidth: 360 }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10, fontSize: 16, border: "1px solid var(--line)", borderRadius: 4 }}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 10, fontSize: 16, border: "1px solid var(--line)", borderRadius: 4 }}
          required
        />
        {error && <p style={{ color: "var(--ribbon)" }}>{error}</p>}
        <button
          type="submit"
          style={{
            padding: "10px 16px",
            background: "var(--ink)",
            color: "var(--paper)",
            border: "none",
            borderRadius: 4,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          Log in
        </button>
      </form>
    </div>
  );
}
