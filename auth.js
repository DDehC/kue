// Base URL of the backend server (the one we talk to with fetch).
// When running locally, the backend is assumed to be at port 8004.
const API = "http://localhost:5050";

// Helper function that reads the response and safely turns it into JSON.
// If the server responds with JSON, parse and return it.
// If the server responds with something else (like plain text or HTML),
// wrap it into an error object so the rest of the code can handle it consistently.
async function parseJson(res) {
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();
  const text = await res.text();
  return { error: { code: "NON_JSON", message: text } };
}

// Helper function to throw an error if the response isn't "ok" (status code 200–299).
// Looks for a message in the body (from server), or falls back to generic text.
// Creates an Error object, attaches code and fieldErrors (if any), then throws it.
function throwIfError(res, body) {
  if (!res.ok) {
    const msg = body?.error?.message || body?.message || res.statusText || "Request failed";
    const err = new Error(msg);
    err.code = body?.error?.code || `HTTP_${res.status}`;
    err.fieldErrors = body?.error?.fieldErrors;
    throw err;
  }
}

// Register a new user by sending username, password, and email to the backend.
// Uses POST to /auth/register.
// Includes credentials so cookies/sessions can be tracked.
// Returns the server’s response body (e.g. { user }).
export async function registerUser({ username, password, email }) {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ username, password, email }),
  });
  const body = await parseJson(res);
  throwIfError(res, body);
  return body; // Example: { user }
}

// Log in an existing user.
// username = username.
// password = their password.
// Sends a POST to /auth/login.
// Returns the server’s response body (e.g. { user }).
export async function loginUser({ username, password, remember }) {
  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
   body: JSON.stringify({ username, password, remember }),
  });
  const body = await parseJson(res);
  throwIfError(res, body);
  return body;
}


// Log the user out.
// Sends a POST to /auth/logout with credentials.
// If the response isn’t ok (and not status 204 = no content), parse error and throw.
export async function logoutUser() {
  const res = await fetch(`${API}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok && res.status !== 204) {
    const body = await parseJson(res);
    throwIfError(res, body);
  }
}

// Get the current logged-in session (if any).
// Sends a GET to /auth/me with credentials.
// If status is 401 (not authorized), return null (no user logged in).
// Otherwise parse response, throw if error, and return the user object.
export async function getSession() {
  const res = await fetch(`${API}/auth/me`, {
    method: "GET",
    credentials: "include",
  });
  if (res.status === 401) return null;
  const body = await parseJson(res);
  throwIfError(res, body);
  return body; // Example: { user }
}

