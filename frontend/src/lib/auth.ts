import { API_URL } from "../config";

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
            console.error("Login failed:", data); // Log failure
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
            console.error("Signup failed:", errorMsg); // Log failure
            throw new Error(errorMsg || "Signup failed");
        }

        return await res.json();
    },

    logout() {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        if (typeof window !== "undefined") {
            window.location.href = "/login";
        }
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

    async refreshAccessToken() {
        const refresh_token = typeof window !== "undefined" ? localStorage.getItem("refresh_token") : null;
        if (!refresh_token) return null;

        try {
            const res = await fetch(`${API_URL}/auth/jwt/refresh/`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refresh: refresh_token }),
            });

            if (res.ok) {
                const data = await res.json();
                localStorage.setItem("access_token", data.access);
                if (data.refresh) {
                    localStorage.setItem("refresh_token", data.refresh);
                }
                return data.access;
            } else {
                console.error("Token refresh failed with status:", res.status);
                this.logout(); // Logout if refresh fails
                return null;
            }
        } catch (error) {
            console.error("Token refresh error:", error);
            this.logout();
            return null;
        }
    },

    async getCurrentUser() {
        let token = this.getToken();
        if (!token) return null;

        try {
            let res = await fetch(`${API_URL}/auth/users/me/`, {
                headers: {
                    "Authorization": `JWT ${token}`
                }
            });

            if (res.status === 401) {
                // Attempt refresh
                console.log("Access token expired, attempting refresh...");
                const newToken = await this.refreshAccessToken();
                if (newToken) {
                    // Retry request
                    res = await fetch(`${API_URL}/auth/users/me/`, {
                        headers: {
                            "Authorization": `JWT ${newToken}`
                        }
                    });
                } else {
                    return null;
                }
            }

            if (res.ok) {
                return await res.json();
            }
            return null;
        } catch (error) {
            console.error("GetCurrentUser error:", error);
            return null;
        }
    }
};
