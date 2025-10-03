import React, { useState } from "react";
import { fmtDate } from "../utils/formatters.js";
import "./RequestTableSorting.css";

const STATUSES = ["pending", "approved", "denied", "all"];

export default function RequestTable({
  rows,
  status,
  setStatus,
  query,
  setQuery,
  dept,
  setDept,
  categories,
  onSelect,
}) {
  const [deptOpen, setDeptOpen] = useState(false);

  const getInitialDepts = () => {
    if (!dept || dept === "all") return [];
    if (Array.isArray(dept)) return dept;
    return [dept]; // fallback if parent still sends string
  };

  const [selectedDepts, setSelectedDepts] = useState(getInitialDepts());

  const toggleDept = (category) => {
    setSelectedDepts((prev) =>
      prev.includes(category)
        ? prev.filter((d) => d !== category)
        : [...prev, category]
    );
  };

  const handleClearDept = () => {
    setSelectedDepts([]);
    setDept([]); // empty array means "all"
    setDeptOpen(false);
  };

  const handleApplySelection = () => {
    setDept(selectedDepts); // always send array
    setDeptOpen(false);
  };

  const getDropdownLabel = () => {
    if (selectedDepts.length === 0) return "Sort Requests";
    return selectedDepts.length === 1
      ? selectedDepts[0]
      : `${selectedDepts[0]} ...`;
  };

  const renderDepartments = (departments) => {
    if (Array.isArray(departments?.departments)) {
      return departments.departments.map((d) => (
        <span key={d} className="tag">
          {d}
        </span>
      ));
    }
    if (departments?.type === "all_departments") {
      return <span className="tag">All Departments</span>;
    }
    return <span className="muted">—</span>;
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <>
      <header className="req-head">
        <h1>Publish Requests</h1>
        <div className="req-filters">
          <div className="req-tabs">
            {STATUSES.map((t) => (
              <button
                key={t}
                className={`req-tab ${status === t ? "is-active" : ""}`}
                onClick={() => setStatus(t)}
              >
                {capitalize(t)}
              </button>
            ))}
          </div>

          <div className="req-controls">
            <input
              className="inp"
              placeholder="Search title, company, email…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />

            <div className="multi-select">
              <button
                type="button"
                className={`inp multi-select-btn ${deptOpen ? "open" : ""}`}
                onClick={() => setDeptOpen((prev) => !prev)}
                title={
                  selectedDepts.length > 0
                    ? selectedDepts.join(", ")
                    : "Filter by department"
                }
                aria-expanded={deptOpen}
              >
                <span className="multi-select-text">{getDropdownLabel()}</span>
                <span className="arrow">▼</span>
              </button>

              {deptOpen && (
                <div className="multi-select-menu">
                  <label className="multi-option">
                    <input
                      type="checkbox"
                      checked={selectedDepts.length === 0}
                      onChange={handleClearDept}
                    />
                    All departments
                  </label>
                  {categories.map((c) => (
                    <label key={c} className="multi-option">
                      <input
                        type="checkbox"
                        checked={selectedDepts.includes(c)}
                        onChange={() => toggleDept(c)}
                      />
                      {c}
                    </label>
                  ))}
                  <div className="multi-actions">
                    <button onClick={handleApplySelection}>Apply</button>
                    <button onClick={handleClearDept}>Reset</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <section className="req-card">
        {rows.length > 0 ? (
          <table className="req-table">
            <thead>
              <tr>
                <th>Received</th>
                <th>Title</th>
                <th>Company</th>
                <th>Department(s)</th>
                <th>Status</th>
                <th>Open</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id}>
                  <td className="nowrap">{fmtDate(r.date)}</td>
                  <td className="strong">{r.title}</td>
                  <td>
                    <div className="stack">
                      <span>{r.organization}</span>
                      <a href={`mailto:${r.email}`} className="muted">
                        {r.email}
                      </a>
                    </div>
                  </td>
                  <td>
                    <div className="wrap">{renderDepartments(r.departments)}</div>
                  </td>
                  <td>
                    <span className={`badge badge--${r.status}`}>
                      {r.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn" onClick={() => onSelect(r)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="empty">No requests match the current filters.</div>
        )}
      </section>
    </>
  );
}
