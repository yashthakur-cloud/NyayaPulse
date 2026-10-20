"use client";
import { FormEvent, useState } from "react";
import { generateText } from "@/app/actions/aiActions";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSendPrompt = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedPrompt = prompt.trim();

    if (!trimmedPrompt || isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await generateText(trimmedPrompt);
      setOutput(response);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="legal-shell">
      <section className="workspace">
        <header className="workspace-header">
          <div className="brand-mark p-2" aria-hidden="true">
            <svg viewBox="0 0 32 32" fill="none">
              <path d="M16 5v20M10 26h12M7 9h18M11 9l-4 9h8l-4-9Zm10 0-4 9h8l-4-9Z" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div>
            <p className="brand-name px-2">NyayaPulse</p>
            <p className="brand-subtitle px-2">Legal research assistant</p>
          </div>
          <nav className="workspace-nav" aria-label="Workspace navigation">
            <span className="nav-item active">Research desk</span>
            <span className="nav-item">Saved work</span>
          </nav>
          <div className="secure-badge">
            <span className="secure-dot" />
            Private workspace
          </div>
        </header>

        <div className={`response-area ${output ? "has-response" : ""}`}>
          {!output ? (
            <div className="welcome-panel">
              <div className="welcome-kicker">
                <span className="welcome-rule" />
                <span>Research desk</span>
              </div>
              <h1>What would you like<br /><em>to investigate?</em></h1>
              <p className="welcome-copy">
                Get a focused starting point for case research, legal provisions,
                and the questions that matter to your practice.
              </p>
              <div className="suggestion-grid">
                <button type="button" onClick={() => setPrompt("Summarize the key principles of natural justice.")}>
                  <span className="suggestion-icon">§</span>
                  <span><strong>Summarize a principle</strong><small>Get the essentials, clearly</small></span>
                </button>
                <button type="button" onClick={() => setPrompt("Help me understand this legal provision.")}>
                  <span className="suggestion-icon">¶</span>
                  <span><strong>Explain a provision</strong><small>Break down complex language</small></span>
                </button>
                <button
                  type="button"
                  onClick={() => setPrompt("What are the latest amendments to Indian laws? Summarize the recent changes, effective dates, and practical impact, citing authoritative sources where possible.")}
                >
                  <span className="suggestion-icon">↻</span>
                  <span><strong>Show latest amendments</strong><small>Track recent legal changes</small></span>
                </button>
              </div>
            </div>
          ) : (
            <article className="response-card">
              <div className="response-heading">
                <div className="response-title">
                  <span className="response-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none">
                      <path d="M12 3v18M7 7h10M7 17h10M9 7l-3 5h6L9 7Zm6 0-3 5h6l-3-5Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <div>
                    <p className="eyebrow">NyayaPulse insight</p>
                    <h2>Legal response</h2>
                  </div>
                </div>
                <span className="response-status"><span className="secure-dot" />Research note</span>
              </div>
              <div className="response-divider" />
              <div className="response-text">
                <ReactMarkdown>{output}</ReactMarkdown>
              </div>
            </article>
          )}
        </div>

        <form className="composer" onSubmit={handleSendPrompt}>
          <div className="composer-label">
            <span className="composer-dot" />
            <span>Ask your legal question</span>
          </div>
          <div className="composer-row">
            <input
              aria-label="Ask your legal question"
              className="prompt-input"
              placeholder="e.g. What are the essentials of a valid contract?"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="send-button"
              disabled={!prompt.trim() || isLoading}
            >
              {isLoading ? "Thinking..." : "Ask NyayaPulse"}
              {!isLoading && <span aria-hidden="true">↗</span>}
            </button>
          </div>
          <p className="composer-note">For research support only · Always verify against current law and authoritative sources.</p>
        </form>
      </section>
    </main>
  );
}
