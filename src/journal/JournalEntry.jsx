import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./journal.css";

export default function JournalEntry() {
  const { slug } = useParams();
  const [entry, setEntry] = useState(null);
  const [next, setNext] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEntry() {
      setLoading(true);
      const { data: post, error } = await supabase
        .from("posts")
        .select("*")
        .eq("slug", slug)
        .single();

      if (error || !post) {
        setEntry(null);
        setLoading(false);
        return;
      }
      setEntry(post);

      // find the next-most-recent post to link at the bottom
      const { data: nextPost } = await supabase
        .from("posts")
        .select("slug, title")
        .lt("created_at", post.created_at)
        .order("created_at", { ascending: false })
        .limit(1)
        .maybeSingle();

      setNext(nextPost || null);
      setLoading(false);
    }
    loadEntry();
  }, [slug]);

  if (loading) {
    return (
      <div className="wrap-narrow">
        <p style={{ padding: "60px 0", fontFamily: "'Space Mono', monospace", fontSize: "13px" }}>
          Loading…
        </p>
      </div>
    );
  }

  if (!entry) {
    return (
      <div className="wrap-narrow">
        <p style={{ padding: "60px 0" }}>
          This entry doesn't exist. <Link to="/">Back to the journal</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="wrap-narrow">
      <nav className="jr">
        <div className="nav-row">
          <Link className="back-link" to="/">
            ← Back to the journal
          </Link>
          <div className="logotype-small">The Chiza Fam</div>
        </div>
      </nav>

      <header className="entry-header">
        <div className="entry-date">{entry.date}</div>
        <div className="entry-meta">
          <span className={`tag ${entry.tag}`}>{entry.tag_label}</span>
          {entry.read_time && <span className="read-time">{entry.read_time}</span>}
        </div>
        <h1>{entry.title}</h1>
        {entry.dek && <p className="dek">{entry.dek}</p>}
      </header>

      {entry.is_video && entry.image_url && (
        <div className="video-block">
          <div className="tape"></div>
          <img src={entry.image_url} alt={entry.title} />
          <div className="play-badge-lg"></div>
        </div>
      )}

      <div className="entry-body">
        {(entry.paragraphs || []).map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {entry.pull_quote && <p className="pull-quote">{entry.pull_quote}</p>}
        {entry.margin_note && <p className="margin-note">{entry.margin_note}</p>}
        {entry.closing && <p>{entry.closing}</p>}
      </div>

      <div className="signoff">— The Chiza Fam</div>

      {next && (
        <div className="next-entry">
          <div className="next-label">Next in the journal</div>
          <Link className="next-title" to={`/journal/${next.slug}`}>
            {next.title} →
          </Link>
        </div>
      )}
    </div>
  );
}
