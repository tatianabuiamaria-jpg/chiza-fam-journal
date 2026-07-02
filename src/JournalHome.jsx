import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import "./journal.css";

export default function JournalHome() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading posts:", error);
      } else {
        setEntries(data);
      }
      setLoading(false);
    }
    loadPosts();
  }, []);

  return (
    <>
      <div className="ribbon"></div>
      <div className="wrap">
        <header className="jr">
          <div className="masthead">
            <div className="logotype">The Chiza&nbsp;Fam</div>
            <div className="stamp">
              Windhoek, Namibia
              <br />
              Vol. 1 — Est. 2026
            </div>
          </div>
          <p className="dek">
            A running journal of what we're building, believing, and
            figuring out as a family — the book, the budget, and everything
            in between.
          </p>
        </header>
      </div>

      <div className="wrap spine-wrap">
        <div className="spine"></div>
        <div className="entries">
          {loading && (
            <p style={{ padding: "0 0 40px", fontFamily: "'Space Mono', monospace", fontSize: "13px" }}>
              Loading entries…
            </p>
          )}

          {!loading && entries.length === 0 && (
            <p style={{ padding: "0 0 40px" }}>
              No entries yet.{" "}
              <Link to="/admin/login" className="read-more">
                Write your first one →
              </Link>
            </p>
          )}

          {entries.map((entry, i) => (
            <article
              key={entry.slug}
              className={`entry ${i % 2 === 0 ? "left" : "right"}`}
            >
              <div className="entry-date">{entry.date}</div>
              <div className="entry-meta">
                <span className={`tag ${entry.tag}`}>{entry.tag_label}</span>
              </div>

              {entry.image_url && (
                <div className="tape-photo">
                  <div className="tape"></div>
                  <img src={entry.image_url} alt={entry.title} />
                  {entry.is_video && <div className="play-badge"></div>}
                </div>
              )}

              <h2>{entry.title}</h2>
              <p>{entry.excerpt}</p>
              <Link className="read-more" to={`/journal/${entry.slug}`}>
                {entry.is_video ? "Watch the entry →" : "Read the entry →"}
              </Link>
            </article>
          ))}
        </div>
      </div>

      <div className="wrap">
        <footer className="jr">
          <span>The Chiza Fam Journal</span>
          <span>Faith · Finance · Firsts</span>
        </footer>
      </div>
    </>
  );
}
