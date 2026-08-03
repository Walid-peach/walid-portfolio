(() => {
  const body = document.body;
  const modeButtons = Array.from(document.querySelectorAll("[data-mode-button]"));
  const modePanels = Array.from(document.querySelectorAll("[data-mode-panel]"));
  const modeNavs = Array.from(document.querySelectorAll("[data-mode-nav]"));
  const modeStatus = document.querySelector("#mode-status");
  const isFrench = document.documentElement.lang === "fr";

  const trackPortfolioEvent = (name, data = {}) => {
    if (window.portfolioAnalytics) window.portfolioAnalytics.track(name, data);
    else (window.portfolioEventQueue = window.portfolioEventQueue || []).push({ name, data });
  };

  const applyMode = (mode, source = "switch") => {
    const nextMode = mode === "lab" ? "lab" : "pro";
    body.dataset.mode = nextMode;

    modeButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.modeButton === nextMode));
    });

    modePanels.forEach((panel) => {
      panel.hidden = panel.dataset.modePanel !== nextMode;
    });

    modeNavs.forEach((nav) => {
      nav.hidden = nav.dataset.modeNav !== nextMode;
    });

    if (modeStatus) {
      if (isFrench) {
        modeStatus.textContent = nextMode === "pro"
          ? "Portfolio professionnel data engineering sélectionné."
          : "Portfolio personnel AI Lab sélectionné.";
      } else {
        modeStatus.textContent = nextMode === "pro"
          ? "Professional data engineering portfolio selected."
          : "Personal AI Lab portfolio selected.";
      }
    }

    trackPortfolioEvent("mode_viewed", {
      mode: nextMode === "lab" ? "perso" : "pro",
      source,
    });
  };

  modeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.getAttribute("aria-pressed") === "true") return;
      applyMode(button.dataset.modeButton);
    });
  });

  applyMode("pro", "initial");
})();
