(function () {
  "use strict";

  const CLARITY_PROJECT_ID = "xp45kxu65a";
  const CONSENT_KEY = "walid-analytics-consent";
  const lang = document.documentElement.lang === "fr" ? "fr" : "en";

  function initializeClarity() {
    if (!CLARITY_PROJECT_ID) return;

    window.clarity = window.clarity || function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
    document.head.appendChild(script);
  }

  function setConsent(value) {
    if (!CLARITY_PROJECT_ID || typeof window.clarity !== "function") return;

    window.clarity("consentv2", {
      ad_Storage: "denied",
      analytics_Storage: value === "granted" ? "granted" : "denied"
    });
  }

  function renderConsent() {
    if (!CLARITY_PROJECT_ID || document.querySelector(".analytics-consent")) return;

    const copy = lang === "fr"
      ? {
          text: "Puis-je utiliser des mesures anonymes pour comprendre ce qui aide les visiteurs ? Aucun stockage publicitaire.",
          allow: "Autoriser",
          decline: "Refuser",
          privacy: "Confidentialité"
        }
      : {
          text: "May I use anonymous analytics to understand what helps visitors? No advertising storage.",
          allow: "Allow",
          decline: "Decline",
          privacy: "Privacy"
        };

    const banner = document.createElement("aside");
    banner.className = "analytics-consent";
    banner.setAttribute("aria-label", copy.privacy);
    banner.innerHTML = `
      <p>${copy.text} <a href="/privacy/">${copy.privacy}</a></p>
      <div class="analytics-consent__actions">
        <button type="button" data-consent="allow">${copy.allow}</button>
        <button type="button" data-consent="decline">${copy.decline}</button>
      </div>
    `;

    banner.addEventListener("click", function (event) {
      const button = event.target.closest("[data-consent]");
      if (!button) return;

      const value = button.dataset.consent === "allow" ? "granted" : "denied";
      localStorage.setItem(CONSENT_KEY, value);
      setConsent(value);
      banner.remove();
    });

    document.body.appendChild(banner);
  }

  function track(name, data) {
    if (!name || !CLARITY_PROJECT_ID || typeof window.clarity !== "function") return;

    const details = data || {};
    if (details.mode) window.clarity("set", "portfolio_mode", String(details.mode));
    if (details.detail) window.clarity("set", "event_detail", String(details.detail));
    window.clarity("event", name);
  }

  window.portfolioAnalytics = { track };

  initializeClarity();

  if (CLARITY_PROJECT_ID) {
    const consent = localStorage.getItem(CONSENT_KEY);
    setConsent(consent === "granted" ? "granted" : "denied");
    if (!consent) {
      window.addEventListener("DOMContentLoaded", renderConsent, { once: true });
    }
  }

  (window.portfolioEventQueue || []).forEach(function (event) {
    track(event.name, event.data);
  });
  window.portfolioEventQueue = [];

  document.addEventListener("click", function (event) {
    const element = event.target.closest("[data-analytics-event]");
    if (!element) return;

    track(element.dataset.analyticsEvent, {
      detail: element.dataset.analyticsDetail || element.textContent.trim(),
      mode: document.body.dataset.mode || "page"
    });
  });
})();
