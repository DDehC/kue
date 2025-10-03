const API = "http://localhost:5050";

async function parseJson(res) {
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();
  const text = await res.text();
  return { error: { code: "NON_JSON", message: text } };
}

// Publication request
export async function publicationRequest(payload, files = []) {
  const formData = new FormData();

  // append files first
  files.forEach(file => formData.append("attachments", file));

  // append all other fields
  Object.entries(payload).forEach(([key, value]) => {
    // if value is an object, stringify it (like departments)
    if (typeof value === "object" && value !== null) {
      formData.append(key, JSON.stringify(value));
    } else if (value !== undefined) {
      formData.append(key, value);
    }
  });

  const res = await fetch(`${API}/req/pubreqtest`, {
    method: "POST",
    credentials: "include",
    body: formData, // browser sets correct Content-Type
  });

  return parseJson(res);
}

// Publication request
export async function publicationRequestFetch() {
  const res = await fetch(`${API}/req/pubreqfetch`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // keep cookies/session
  });

  const body = await parseJson(res);
  return body;
}
