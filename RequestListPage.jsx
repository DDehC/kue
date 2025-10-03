import React, { useEffect, useState } from "react";
import { categories } from "../components/DepartmentList.js";
import "./RequestListPage.css";
import { requestsApi } from "../api/requests";
import RequestTable from "../components/RequestTable.jsx";
import RequestDrawer from "../components/RequestDrawer.jsx";

export default function RequestListPage() {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [query, setQuery] = useState("");
  const [dept, setDept] = useState("all");
  const [status, setStatus] = useState("pending");

  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const { items } = await requestsApi.list({
        dept,
        status,
        q: query,
        page: 1,
        page_size: 200,
      });
      setRows(items);
    } catch (e) {
      setError(e.message || "Failed to load requests");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [query, dept, status]);

  async function approve(id, note) {
    await requestsApi.update(id, { status: "approved", feedback: note });
    setSelected(null);
    setFeedback("");
    load();
  }
  async function deny(id, note) {
    await requestsApi.update(id, { status: "denied", feedback: note });
    setSelected(null);
    setFeedback("");
    load();
  }

  return (
    <main className="req-page container">
      {error && (
        <div
          style={{
            padding: 12,
            color: "#b91c1c",
            borderBottom: "1px solid rgba(0,0,0,.1)",
          }}
        >
          {error}
        </div>
      )}
      {loading ? (
        <div className="empty">Loading…</div>
      ) : (
        <RequestTable
          rows={rows}
          status={status}
          setStatus={setStatus}
          query={query}
          setQuery={setQuery}
          dept={dept}
          setDept={setDept}
          categories={categories}
          onSelect={(r) => {
            setSelected(r);
            setFeedback(r.feedback || "");
          }}
        />
      )}

      <RequestDrawer
        current={selected}
        feedback={feedback}
        setFeedback={setFeedback}
        onClose={() => setSelected(null)}
        onApprove={approve}
        onDeny={deny}
      />
    </main>
  );
}
