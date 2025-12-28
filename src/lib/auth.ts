const API_URL = "http://127.0.0.1:8000";

export const auth = {
    async login(email: string, password: string) {
        const res = await fetch(`${API_URL}/auth/jwt/create/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                username: email, // Backend expects 'username' field even for email login
                password
            }),
        });

        if (!res.ok) {
            const data = await res.json();
            throw new Error(data.detail || "Login failed");
        }

        const data = await res.json();
        // data.access and data.refresh are returned
        localStorage.setItem("access_token", data.access);
        if (data.refresh) {
            localStorage.setItem("refresh_token", data.refresh);
        }
        return data;
    },

    async signup(userData: any) {
        const res = await fetch(`${API_URL}/auth/users/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!res.ok) {
            const data = await res.json();
            // Format errors for display
            const errorMsg = Object.entries(data)
                .map(([key, val]) => `${key}: ${val}`)
                .join(", ");
            throw new Error(errorMsg || "Signup failed");
        }

        return await res.json();
    },

    logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login";
    },

    getToken() {
        if (typeof window !== "undefined") {
            return localStorage.getItem("access_token");
        }
        return null;
    },

    isAuthenticated() {
        return !!this.getToken();
    },

    async getCurrentUser() {
        const token = this.getToken();
        if (!token) return null;

        try {
            const res = await fetch(`${API_URL}/auth/users/me/`, {
                headers: {
                    "Authorization": `JWT ${token}`
                }
            });
            if (res.ok) {
                return await res.json();
            }
            return null;
        } catch (error) {
            return null;
        }
    }
};
