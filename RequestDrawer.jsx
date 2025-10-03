import React from "react";
import { fmtDate, humanSize } from "../utils/formatters.js";

export default function RequestDrawer({
  current,
  feedback,
  setFeedback,
  onClose,
  onApprove,
  onDeny,
}) {
  if (!current) return null;

  return (
    <div className="drawer">
      <div className="drawer-card">
        <div className="drawer-head">
          <h2>{current.title}</h2>
          <button className="icon" onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className="meta">
          <div>
            <strong>Company:</strong> {current.organization}
          </div>
          <div>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${current.email}`}>{current.email}</a>
          </div>
          <div>
            <strong>Received:</strong> {fmtDate(current.date)}
          </div>
          <div className="wrap">
            <strong>Departments:</strong>{" "}
            {Array.isArray(current.departments) ? (
              current.departments.map((d) => (
                <span key={d} className="tag">
                  {d}
                </span>
              ))
            ) : (
              <span className="muted">—</span>
            )}
          </div>
          <div>
            <strong>Status:</strong>{" "}
            <span className={`badge badge--${current.status}`}>
              {current.status}
            </span>
          </div>
        </div>

        <div className="body">
          <h3>Description</h3>
          <p className="copy">{current.body}</p>

          {current.attachments && current.attachments.length > 0 && (
            <>
              <h3>Attachments</h3>
              <ul className="files">
                {current.attachments.map((att) => (
                  <li key={att.file_id}>
                    <a
                      className="link"
                      href={att.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {att.filename}
                    </a>
                    {att.size && <span className="muted"> ({humanSize(att.size)})</span>}
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>

        <div className="feedback">
          <h3>Feedback to requester</h3>
          <textarea
            rows={4}
            placeholder="Short note that will be returned to the organization…"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </div>

        <div className="actions">
          <button className="btn btn--ghost" onClick={onClose}>
            Close
          </button>
          <div className="spacer" />
          <button
            className="btn btn--danger"
            onClick={() => onDeny(current.id, feedback)}
          >
            Deny
          </button>
          <button
            className="btn btn--primary"
            onClick={() => onApprove(current.id, feedback)}
          >
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}

