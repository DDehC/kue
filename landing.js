// Role -> landing mapping
export const ROLE_LANDING = {
  guest: "/",
  student: "/student",
  staff: "/staff",
  admin: "/admin",
};

// Persist the most recent landing path
export function markLanding(path) {
  localStorage.setItem("lastLanding", path);
}

// Persist the current role
export function setRole(role) {
  localStorage.setItem("role", role || "guest");
}

// Read helpers
export function getRole() {
  return localStorage.getItem("role") || "guest";
}
export function getLanding() {
  return (
    localStorage.getItem("lastLanding") ||
    ROLE_LANDING[getRole()] ||
    "/"
  );
}
