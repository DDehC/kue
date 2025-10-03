import { http } from "./client";

const API = "http://localhost:5050";

async function list(params = {}) { //use empty object if none are passed
  //turning the filters into a URL-encoded string, ex "dept=math&status=pending..."
  const q = new URLSearchParams();
  if (params.dept && params.dept !== "all") q.set("dept", params.dept);
  if (params.status && params.status !== "all") q.set("status", params.status);
  if (params.q) q.set("q", params.q);
  if (params.page) q.set("page", String(params.page));
  if (params.page_size) q.set("page_size", String(params.page_size));

  //make a HTTP request with the filter url
  const res = await fetch(`${API}/req/pubreqfetch?${q.toString()}`);
  //check if the request is ok (response between 200-299)
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  //parse into json
  const data = await res.json();

  if (!data || !Array.isArray(data.items)) throw new Error("Unexpected response shape");

  return data; 
}

export async function update(id, payload = {}) {
  console.log("approve() received id →", id);
  const res = await fetch(`${API}/req/pubreqchangestatus`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ id, ...payload }), // { id, status, feedback }
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const body = await res.json();
  if (!body.success) throw new Error(body.message || "Update failed");
  return body.publication; // updated document
}

//const update = (id, patch) => http.patch(`/requests/${id}`, patch);

export const requestsApi = { list, update };
