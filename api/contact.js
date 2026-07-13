const allowedHosts = new Set([
  "walidelkhoukh.com",
  "www.walidelkhoukh.com",
  "walid-portfolio-iota.vercel.app",
  "localhost",
]);

const escapeHtml = (value) =>
  value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);

module.exports = async function handler(request, response) {
  if (request.method !== "POST") {
    response.setHeader("Allow", "POST");
    return response.status(405).json({ error: "Method not allowed" });
  }

  const origin = request.headers.origin;
  if (origin) {
    try {
      if (!allowedHosts.has(new URL(origin).hostname)) {
        return response.status(403).json({ error: "Origin not allowed" });
      }
    } catch {
      return response.status(400).json({ error: "Invalid origin" });
    }
  }

  const { name, email, message, website, startedAt } = request.body || {};
  const normalizedName = typeof name === "string" ? name.trim() : "";
  const normalizedEmail = typeof email === "string" ? email.trim() : "";
  const normalizedMessage = typeof message === "string" ? message.trim() : "";
  const elapsed = Date.now() - Number(startedAt);

  if (website) return response.status(200).json({ ok: true });
  if (!Number.isFinite(elapsed) || elapsed < 2500 || elapsed > 86400000) {
    return response.status(400).json({ error: "Invalid submission timing" });
  }
  if (normalizedName.length < 2 || normalizedName.length > 80) {
    return response.status(400).json({ error: "Invalid name" });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail) || normalizedEmail.length > 160) {
    return response.status(400).json({ error: "Invalid email" });
  }
  if (normalizedMessage.length < 20 || normalizedMessage.length > 3000) {
    return response.status(400).json({ error: "Invalid message" });
  }
  if (!process.env.RESEND_API_KEY) {
    return response.status(503).json({ error: "Contact service is not configured" });
  }

  const resendResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Walid Portfolio <portfolio@walidelkhoukh.com>",
      to: [process.env.CONTACT_TO_EMAIL || "walidelkhoukh99@gmail.com"],
      reply_to: normalizedEmail,
      subject: `Portfolio message from ${normalizedName}`,
      html: `<p><strong>From:</strong> ${escapeHtml(normalizedName)} (${escapeHtml(normalizedEmail)})</p><p>${escapeHtml(normalizedMessage).replace(/\n/g, "<br>")}</p>`,
    }),
  });

  if (!resendResponse.ok) {
    return response.status(502).json({ error: "Email provider rejected the request" });
  }

  return response.status(200).json({ ok: true });
};
