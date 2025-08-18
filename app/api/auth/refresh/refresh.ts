export async function apiFetch(input: RequestInfo, init?: RequestInit) {
    let res = await fetch(input, { ...init, credentials: "include" });

    if (res.status === 401) {
        // try to update the token
        const refreshRes = await fetch("/api/auth/refresh", { method: "POST", credentials: "include" });

        if (refreshRes.ok) {
            res = await fetch(input, { ...init, credentials: "include" });
        } else {
            // if the token is invalid - logout
            window.location.href = "/";
            return; // TS: res = undefined
        }
    }

    return res;
}
