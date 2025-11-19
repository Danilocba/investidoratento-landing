const requests = new Map<string, number>();

export function rateLimit(ip: string, limit = 10, windowMs = 60000) {
  const now = Date.now();
  const entry = requests.get(ip);

  if (!entry) {
    requests.set(ip, now);
    return false;
  }

  if (now - entry < windowMs) {
    return true; // bloqueado
  }

  requests.set(ip, now);
  return false;
}