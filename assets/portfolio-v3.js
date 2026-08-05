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

    document.dispatchEvent(new CustomEvent("portfolio:modechange", {
      detail: { mode: nextMode, source },
    }));
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
      const gazeBase = portrait.dataset.gazeBase;
      const layers = Array.from(portrait.querySelectorAll("[data-gaze-layer]"));
      if (!gazeBase || layers.length !== 2) return;

      const directions = [
        "center",
        "up-left",
        "up",
        "up-right",
        "left",
        "right",
        "down-left",
        "down",
        "down-right",
      ];
      const sources = Object.fromEntries(
        directions.map((direction) => [direction, `${gazeBase}-${direction}.jpg`]),
      );
      const preloadDirections = () => {
        directions.slice(1).forEach((direction) => {
          const image = new Image();
          image.src = sources[direction];
        });
      };
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(preloadDirections, { timeout: 1500 });
      } else {
        window.addEventListener("load", () => window.setTimeout(preloadDirections, 250), { once: true });
      }

      let activeLayer = 0;
      let activeDirection = "center";
      let requestedDirection = "center";
      let requestId = 0;
      let pointerFrame = 0;

      const setDirection = (direction) => {
        if (!sources[direction] || direction === requestedDirection) return;
        requestedDirection = direction;
        const nextLayerIndex = activeLayer === 0 ? 1 : 0;
        const nextLayer = layers[nextLayerIndex];
        const currentRequest = ++requestId;

        const reveal = () => {
          if (currentRequest !== requestId) return;
          layers[activeLayer].classList.remove("is-visible");
          nextLayer.classList.add("is-visible");
          activeLayer = nextLayerIndex;
          activeDirection = direction;
          portrait.dataset.gazeDirection = direction;
        };

        nextLayer.src = sources[direction];
        if (nextLayer.complete) window.requestAnimationFrame(reveal);
        else nextLayer.addEventListener("load", reveal, { once: true });
      };

      const resetPortrait = () => {
        if (pointerFrame) window.cancelAnimationFrame(pointerFrame);
        pointerFrame = 0;
        portrait.classList.remove("is-tracking");
        portrait.style.setProperty("--portrait-x", "0px");
        portrait.style.setProperty("--portrait-y", "0px");
        portrait.style.setProperty("--portrait-rx", "0deg");
        portrait.style.setProperty("--portrait-ry", "0deg");
        if (activeDirection !== "center" || requestedDirection !== "center") setDirection("center");
      };

      window.addEventListener("pointermove", (event) => {
        if (body.dataset.mode !== "pro") return;
        if (pointerFrame) window.cancelAnimationFrame(pointerFrame);

        pointerFrame = window.requestAnimationFrame(() => {
          const bounds = portrait.getBoundingClientRect();
          const centerX = bounds.left + bounds.width / 2;
          const centerY = bounds.top + bounds.height / 2;
          const deltaX = event.clientX - centerX;
          const deltaY = event.clientY - centerY;
          const horizontalThreshold = Math.max(54, bounds.width * 0.16);
          const verticalThreshold = Math.max(48, bounds.height * 0.14);
          const horizontal = deltaX < -horizontalThreshold
            ? "left"
            : deltaX > horizontalThreshold ? "right" : "";
          const vertical = deltaY < -verticalThreshold
            ? "up"
            : deltaY > verticalThreshold ? "down" : "";
          const direction = [vertical, horizontal].filter(Boolean).join("-") || "center";
          const normalizedX = Math.max(-1, Math.min(1, deltaX / (window.innerWidth * 0.5)));
          const normalizedY = Math.max(-1, Math.min(1, deltaY / (window.innerHeight * 0.5)));

          setDirection(direction);
          portrait.classList.add("is-tracking");
          portrait.style.setProperty("--portrait-x", `${normalizedX * 2.5}px`);
          portrait.style.setProperty("--portrait-y", `${normalizedY * 2}px`);
          portrait.style.setProperty("--portrait-rx", `${normalizedY * -0.8}deg`);
          portrait.style.setProperty("--portrait-ry", `${normalizedX * 1.1}deg`);
          pointerFrame = 0;
        });
      });

      document.documentElement.addEventListener("pointerleave", resetPortrait);
      window.addEventListener("blur", resetPortrait);
      modeButtons.forEach((button) => {
        button.addEventListener("click", () => {
          if (button.dataset.modeButton !== "pro") resetPortrait();
        });
      });
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
        book.addEventListener("click", (event) => {
          if (suppressClick) {
            suppressClick = false;
            return;
          }

          if (finePointer.matches && event.detail > 0) return;
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
          } else if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            if (index !== activeIndex) select(index, { focus: true });
            else toggleInspect();
          }
        });

        book.addEventListener("pointermove", (event) => {
          if (!finePointer.matches) return;
          if (index !== activeIndex) select(index);
          if (reducedMotion.matches || inspected) return;

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
        window.setTimeout(() => {
          suppressClick = false;
        }, 0);
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
