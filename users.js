const API_URL = "http://localhost:5050/admin";

export const usersApi = {
  async list(params = {}) {
    const res = await fetch(`${API_URL}/users`, {
      headers: { "Authorization": "test-token",
	      		 "Cache-Control": "no-cache",
    			 "Pragma": "no-cache"	
	  },
    });
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  },

  async create(data) {
    const res = await fetch(`${API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "test-token",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create user");
    return res.json();
  },

  async update(user_id, data) {
    const res = await fetch(`${API_URL}/users/${user_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "test-token",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to update user");
    return res.json();
  },

  async remove(user_id) {
    const res = await fetch(`${API_URL}/users/${user_id}`, {
      method: "DELETE",
      headers: { "Authorization": "test-token" },
    });
    if (!res.ok) throw new Error("Failed to delete user");
    return res.json();
  },
};

