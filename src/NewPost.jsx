import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "../journal/journal.css";

const TAGS = [
  { value: "book", label: "Book" },
  { value: "finance", label: "Finance" },
  { value: "video", label: "Video" },
  { value: "journal", label: "Journal" },
];

export default function NewPost() {
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: "",
    slug: "",
    date: "",
    tag: "journal",
    excerpt: "",
    imageUrl: "",
    isVideo: false,
    readTime: "",
    dek: "",
    body: "",       // one paragraph per line in the textarea
    pullQuote: "",
    marginNote: "",
    closing: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        navigate("/admin/login");
      } else {
        setCheckingAuth(false);
      }
    });
  }, [navigate]);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function makeSlug(title) {
    return title
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    const tagLabel = TAGS.find((t) => t.value === form.tag)?.label || form.tag;
    const slug = form.slug.trim() || makeSlug(form.title);
    const paragraphs = form.body
      .split("\n")
      .map((p) => p.trim())
      .filter(Boolean);

    const { error } = await supabase.from("posts").insert({
      slug,
      date: form.date,
      tag: form.tag,
      tag_label: tagLabel,
      title: form.title,
      excerpt: form.excerpt,
      image_url: form.imageUrl || null,
      is_video: form.isVideo,
      read_time: form.readTime || null,
      dek: form.dek || null,
      paragraphs,
      pull_quote: form.pullQuote || null,
      margin_note: form.marginNote || null,
      closing: form.closing || null,
    });

    setSaving(false);
    if (error) {
      setMessage("Something went wrong: " + error.message);
    } else {
      setMessage("Posted! Redirecting to the journal…");
      setTimeout(() => navigate("/"), 1200);
    }
  }

  if (checkingAuth) return null;

  const inputStyle = {
    padding: 10,
    fontSize: 15,
    border: "1px solid var(--line)",
    borderRadius: 4,
    fontFamily: "'Newsreader', serif",
    width: "100%",
  };
  const labelStyle = {
    fontFamily: "'Space Mono', monospace",
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "var(--ink-soft)",
    display: "block",
    marginBottom: 4,
  };

  return (
    <div className="wrap-narrow" style={{ paddingTop: 50, paddingBottom: 80 }}>
      <h1 style={{ fontFamily: "'Fraunces', serif" }}>New Entry</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div>
          <label style={labelStyle}>Title</label>
          <input style={inputStyle} value={form.title} onChange={(e) => update("title", e.target.value)} required />
        </div>

        <div>
          <label style={labelStyle}>URL slug (leave blank to auto-generate)</label>
          <input style={inputStyle} value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="e.g. sunday-mornings-in-windhoek" />
        </div>

        <div>
          <label style={labelStyle}>Date (as you want it displayed)</label>
          <input style={inputStyle} value={form.date} onChange={(e) => update("date", e.target.value)} placeholder="Tuesday, 7 July" required />
        </div>

        <div>
          <label style={labelStyle}>Category</label>
          <select style={inputStyle} value={form.tag} onChange={(e) => update("tag", e.target.value)}>
            {TAGS.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>Excerpt (shows on the homepage card)</label>
          <textarea style={{ ...inputStyle, minHeight: 60 }} value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} required />
        </div>

        <div>
          <label style={labelStyle}>Image URL (optional — for photo/video entries)</label>
          <input style={inputStyle} value={form.imageUrl} onChange={(e) => update("imageUrl", e.target.value)} placeholder="https://..." />
        </div>

        <div>
          <label style={labelStyle}>
            <input type="checkbox" checked={form.isVideo} onChange={(e) => update("isVideo", e.target.checked)} style={{ marginRight: 6 }} />
            This is a video entry
          </label>
        </div>

        <div>
          <label style={labelStyle}>Read time (optional)</label>
          <input style={inputStyle} value={form.readTime} onChange={(e) => update("readTime", e.target.value)} placeholder="4 min read" />
        </div>

        <div>
          <label style={labelStyle}>Dek (italic line under the title on the entry page)</label>
          <input style={inputStyle} value={form.dek} onChange={(e) => update("dek", e.target.value)} />
        </div>

        <div>
          <label style={labelStyle}>Body — one paragraph per line</label>
          <textarea style={{ ...inputStyle, minHeight: 180 }} value={form.body} onChange={(e) => update("body", e.target.value)} required />
        </div>

        <div>
          <label style={labelStyle}>Pull quote (optional)</label>
          <input style={inputStyle} value={form.pullQuote} onChange={(e) => update("pullQuote", e.target.value)} />
        </div>

        <div>
          <label style={labelStyle}>Margin note (optional, handwritten-style aside)</label>
          <input style={inputStyle} value={form.marginNote} onChange={(e) => update("marginNote", e.target.value)} />
        </div>

        <div>
          <label style={labelStyle}>Closing line (optional)</label>
          <input style={inputStyle} value={form.closing} onChange={(e) => update("closing", e.target.value)} />
        </div>

        {message && <p>{message}</p>}

        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "12px 18px",
            background: "var(--ink)",
            color: "var(--paper)",
            border: "none",
            borderRadius: 4,
            fontSize: 15,
            cursor: "pointer",
          }}
        >
          {saving ? "Posting…" : "Publish entry"}
        </button>
      </form>
    </div>
  );
}
