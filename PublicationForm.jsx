// PublicationForm.jsx
import React from "react";
import { categories } from "./DepartmentList.js";
import "../styles/PublicationForm.css";

export default function PublicationForm({
  title, setTitle,
  description, setDescription,
  author, setAuthor,
  email, setEmail,
  org, setOrg,
  location, setLocation,
  all, setAll,
  depts, setDepts,
  files, setFiles,
  onSubmit, onReset
}) {

  // handle file selection
  function onPickFiles(e) {
    const picked = Array.from(e.target.files || []);
    setFiles(prev => [...prev, ...picked]); // append new files
  }

  // remove a file by index
  function removeFile(i) {
    setFiles(prev => prev.filter((_, idx) => idx !== i));
  }

  return (
    <form className="pr-form" onSubmit={onSubmit}>
      <input
        className="pr-input"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
      />

      <div className="pr-row">
        <input
          className="pr-input"
          placeholder="Author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          required
        />
        <input
          className="pr-input"
          placeholder="Organization"
          value={org}
          onChange={e => setOrg(e.target.value)}
          required
        />
      </div>

      <input
        className="pr-input"
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />

      <input
        className="pr-input"
        placeholder="Location"
        value={location}
        onChange={e => setLocation(e.target.value)}
        required
      />

      <textarea
        className="pr-textarea pr-textarea--tall"
        placeholder="Description (plain text)"
        value={description}
        onChange={e => setDescription(e.target.value)}
        required
      />

      <label className="pr-checkbox">
        <input
          type="checkbox"
          checked={all}
          onChange={e => setAll(e.target.checked)}
        />
        Publish to all students
      </label>

      <select
        className="pr-select"
        multiple
        disabled={all}
        value={depts}
        onChange={e =>
          setDepts(Array.from(e.target.selectedOptions).map(o => o.value))
        }
      >
        {categories.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      {/* File picker */}
      <div className="pr-file-picker">
        <input
          type="file"
          multiple
          onChange={onPickFiles}
        />
        {files.length > 0 && (
          <ul className="pr-file-list">
            {files.map((f, i) => (
              <li key={i}>
                {f.name}{" "}
                <button type="button" onClick={() => removeFile(i)}>Remove</button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="pr-actions">
        <button
          type="button"
          onClick={onReset}
          className="pr-btn pr-btn--ghost"
        >
          Reset
        </button>
        <button type="submit" className="pr-btn pr-btn--primary">
          Submit
        </button>
      </div>
    </form>
  );
}

