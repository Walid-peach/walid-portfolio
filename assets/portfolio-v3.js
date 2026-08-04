(() => {
  const body = document.body;
  const modeButtons = Array.from(document.querySelectorAll("[data-mode-button]"));
  const modePanels = Array.from(document.querySelectorAll("[data-mode-panel]"));
  const modeNavs = Array.from(document.querySelectorAll("[data-mode-nav]"));
  const modeStatus = document.querySelector("#mode-status");
  const isFrench = document.documentElement.lang === "fr";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

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

  const setupReactivePortraits = () => {
    if (reducedMotion.matches || !finePointer.matches) return;

    document.querySelectorAll("[data-reactive-portrait]").forEach((portrait) => {
      const resetPortrait = () => {
        portrait.classList.remove("is-tracking");
        portrait.style.setProperty("--portrait-x", "0px");
        portrait.style.setProperty("--portrait-y", "0px");
        portrait.style.setProperty("--portrait-rx", "0deg");
        portrait.style.setProperty("--portrait-ry", "0deg");
      };

      portrait.addEventListener("pointermove", (event) => {
        const bounds = portrait.getBoundingClientRect();
        const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
        const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;

        portrait.classList.add("is-tracking");
        portrait.style.setProperty("--portrait-x", `${x * 5}px`);
        portrait.style.setProperty("--portrait-y", `${y * 4}px`);
        portrait.style.setProperty("--portrait-rx", `${y * -1.8}deg`);
        portrait.style.setProperty("--portrait-ry", `${x * 2.2}deg`);
      });

      portrait.addEventListener("pointerleave", resetPortrait);
      portrait.addEventListener("pointercancel", resetPortrait);
    });
  };

  const setupSystemsShelves = () => {
    document.querySelectorAll("[data-systems-shelf]").forEach((shelf) => {
      const viewport = shelf.querySelector(".systems-viewport");
      const books = Array.from(shelf.querySelectorAll("[data-system-index]"));
      const panels = Array.from(shelf.querySelectorAll("[data-system-panel]"));
      const previous = shelf.querySelector("[data-system-previous]");
      const next = shelf.querySelector("[data-system-next]");
      const inspect = shelf.querySelector("[data-system-inspect]");
      const current = shelf.querySelector("[data-system-current]");
      const status = shelf.querySelector("[data-system-status]");
      if (!viewport || !books.length || !previous || !next || !inspect) return;

      let activeIndex = 0;
      let inspected = false;
      let dragStart = null;
      let suppressClick = false;

      const caseName = (book) => book.querySelector(".sr-only")?.textContent.trim() || "Case study";

      const render = ({ announce = true, focus = false } = {}) => {
        books.forEach((book, index) => {
          const selected = index === activeIndex;
          book.classList.toggle("is-selected", selected);
          book.classList.toggle("is-inspected", selected && inspected);
          book.dataset.position = selected ? "active" : index < activeIndex ? "left" : "right";
          book.setAttribute("aria-selected", String(selected));
          book.tabIndex = selected ? 0 : -1;
        });

        panels.forEach((panel, index) => {
          const selected = index === activeIndex;
          panel.hidden = !selected;
          panel.classList.toggle("is-active", selected);
        });

        inspect.setAttribute("aria-pressed", String(inspected));
        inspect.textContent = inspected
          ? (isFrench ? "Retour" : "Return")
          : (isFrench ? "Inspecter" : "Inspect");
        if (current) current.textContent = String(activeIndex + 1).padStart(2, "0");

        if (announce && status) {
          status.textContent = isFrench
            ? `${caseName(books[activeIndex])} sélectionné, dossier ${activeIndex + 1} sur ${books.length}.`
            : `${caseName(books[activeIndex])} selected, case ${activeIndex + 1} of ${books.length}.`;
        }

        if (focus) books[activeIndex].focus({ preventScroll: true });
      };

      const select = (index, options = {}) => {
        activeIndex = (index + books.length) % books.length;
        inspected = false;
        render(options);
        trackPortfolioEvent("professional_case_viewed", {
          case: caseName(books[activeIndex]),
          index: activeIndex + 1,
        });
      };

      const toggleInspect = () => {
        inspected = !inspected;
        render({ announce: false });
        trackPortfolioEvent("professional_case_inspected", {
          case: caseName(books[activeIndex]),
          side: inspected ? "back" : "front",
        });
      };

      books.forEach((book, index) => {
        book.addEventListener("click", () => {
          if (suppressClick) {
            suppressClick = false;
            return;
          }
          if (index === activeIndex) toggleInspect();
          else select(index);
        });

        book.addEventListener("keydown", (event) => {
          if (event.key === "ArrowLeft") {
            event.preventDefault();
            select(activeIndex - 1, { focus: true });
          } else if (event.key === "ArrowRight") {
            event.preventDefault();
            select(activeIndex + 1, { focus: true });
          } else if (event.key === "Home") {
            event.preventDefault();
            select(0, { focus: true });
          } else if (event.key === "End") {
            event.preventDefault();
            select(books.length - 1, { focus: true });
          }
        });

        if (!reducedMotion.matches && finePointer.matches) {
          book.addEventListener("pointermove", (event) => {
            if (index !== activeIndex || inspected) return;
            const bounds = book.getBoundingClientRect();
            const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 2;
            const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 2;
            book.style.setProperty("--tilt-x", `${y * -4}deg`);
            book.style.setProperty("--tilt-y", `${x * 6}deg`);
          });

          book.addEventListener("pointerleave", () => {
            book.style.setProperty("--tilt-x", "0deg");
            book.style.setProperty("--tilt-y", "0deg");
          });
        }
      });

      previous.addEventListener("click", () => select(activeIndex - 1));
      next.addEventListener("click", () => select(activeIndex + 1));
      inspect.addEventListener("click", toggleInspect);

      viewport.addEventListener("keydown", (event) => {
        if (event.target !== viewport) return;
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          select(activeIndex - 1);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          select(activeIndex + 1);
        } else if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleInspect();
        } else if (event.key === "Escape" && inspected) {
          inspected = false;
          render({ announce: false });
        }
      });

      viewport.addEventListener("pointerdown", (event) => {
        dragStart = { x: event.clientX, id: event.pointerId };
        viewport.setPointerCapture?.(event.pointerId);
      });

      viewport.addEventListener("pointerup", (event) => {
        if (!dragStart || dragStart.id !== event.pointerId) return;
        const distance = event.clientX - dragStart.x;
        dragStart = null;
        if (Math.abs(distance) < 44) return;
        suppressClick = true;
        select(activeIndex + (distance < 0 ? 1 : -1));
      });

      viewport.addEventListener("pointercancel", () => {
        dragStart = null;
      });

      render({ announce: false });
    });
  };

  setupReactivePortraits();
  setupSystemsShelves();

  applyMode("pro", "initial");
})();
