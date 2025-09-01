export function getRequestInfo(req: Request | any) {
  const ip =
    req.headers.get?.("x-forwarded-for")?.split(",")[0] ||
    req.headers.get?.("x-real-ip") ||
    req.ip ||
    "127.0.0.1";

  const deviceInfo = req.headers.get?.("user-agent") || "unknown";

  return { ip, deviceInfo };
}
