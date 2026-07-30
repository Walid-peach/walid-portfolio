(() => {
  "use strict";

  const root = document.querySelector("[data-build-log]");
  if (!root) return;

  const isFrench = document.documentElement.lang.toLowerCase().startsWith("fr");
  const buildLog = root.closest(".build-log");
  const grid = root.querySelector("[data-contribution-grid]");
  const lanes = root.querySelector("[data-commit-lanes]");
  const detail = root.querySelector("[data-commit-detail]");
  const playhead = root.querySelector("[data-commit-playhead]");
  const repositoryButtons = [...root.querySelectorAll("[data-repository]")];
  const detailRepository = detail.querySelector("[data-detail-repository]");
  const detailDate = detail.querySelector("[data-detail-date]");
  const detailTitle = detail.querySelector("[data-detail-title]");
  const detailDescription = detail.querySelector("[data-detail-description]");
  const detailSha = detail.querySelector("[data-detail-sha]");
  const detailUrl = detail.querySelector("[data-detail-url]");

  const repositories = {
    monelu: {
      name: "MonÉlu",
      slug: "MonElu",
      commits: [
        {
          sha: "580533b",
          date: "2026-07-29",
          title: {
            en: "Redesign the navigation around Explorer and À propos",
            fr: "Repenser la navigation Explorer et À propos",
          },
          description: {
            en: "A clearer information architecture, click-driven menus, mobile parity, keyboard focus management, and interaction tests.",
            fr: "Une architecture plus claire, des menus au clic, la parité mobile, la gestion du focus clavier et des tests d’interaction.",
          },
        },
        {
          sha: "04e551c",
          date: "2026-07-28",
          title: {
            en: "Make documentation drift fail in CI",
            fr: "Faire échouer la CI lorsque la documentation dérive",
          },
          description: {
            en: "Turned documentation freshness into an automated quality gate instead of a manual promise.",
            fr: "La fraîcheur de la documentation devient un contrôle qualité automatisé plutôt qu’une promesse manuelle.",
          },
        },
        {
          sha: "46139c5",
          date: "2026-07-27",
          title: {
            en: "Publish an RGAA accessibility self-audit",
            fr: "Publier un auto-audit d’accessibilité RGAA",
          },
          description: {
            en: "Documented accessibility coverage, remaining gaps, and the concrete work required to close them.",
            fr: "Documentation de la couverture d’accessibilité, des écarts restants et du travail concret pour les corriger.",
          },
        },
        {
          sha: "24c61bd",
          date: "2026-07-22",
          title: {
            en: "Audit dark-mode contrast across civic UI",
            fr: "Auditer le contraste du mode sombre de l’interface civique",
          },
          description: {
            en: "Measured and corrected contrast where dense public data needs to remain legible in every theme.",
            fr: "Mesure et correction du contraste pour garder les données publiques denses lisibles dans chaque thème.",
          },
        },
      ],
    },
    "slide-hustle": {
      name: "Slide Hustle",
      slug: "slide-hustle",
      commits: [
        {
          sha: "4afd698",
          date: "2026-07-01",
          title: {
            en: "Close every finding from the first code reviews",
            fr: "Corriger tous les points des premières revues de code",
          },
          description: {
            en: "Converted early review feedback into a tighter, more maintainable production workflow.",
            fr: "Transformation des retours de revue en un flux de production plus robuste et maintenable.",
          },
        },
        {
          sha: "2dd2551",
          date: "2026-07-01",
          title: {
            en: "Export retina-sharp slide images",
            fr: "Exporter des slides parfaitement nettes en Retina",
          },
          description: {
            en: "Improved export density so the generated carousel remains crisp on high-resolution screens.",
            fr: "Amélioration de la densité d’export pour garder le carrousel net sur les écrans haute résolution.",
          },
        },
        {
          sha: "c7f8a6d",
          date: "2026-06-23",
          title: {
            en: "Tune a Databricks slide against its reference",
            fr: "Ajuster une slide Databricks à partir de sa référence",
          },
          description: {
            en: "Refined spacing, hierarchy, and brand fidelity through direct visual comparison.",
            fr: "Affinage des espacements, de la hiérarchie et de la fidélité de marque par comparaison visuelle directe.",
          },
        },
        {
          sha: "3370923",
          date: "2026-06-23",
          title: {
            en: "Start the Slide Hustle scaffold",
            fr: "Lancer le socle de Slide Hustle",
          },
          description: {
            en: "Established the reusable HTML, CSS, and export pipeline behind rapid slide production.",
            fr: "Mise en place du pipeline HTML, CSS et export réutilisable pour produire rapidement des slides.",
          },
        },
      ],
    },
    portfolio: {
      name: "Portfolio",
      slug: "walid-portfolio",
      commits: [
        {
          sha: "2a52771",
          date: "2026-07-19",
          title: {
            en: "Build a durable portfolio growth system",
            fr: "Construire un système durable pour faire évoluer le portfolio",
          },
          description: {
            en: "Connected owned notes, project proof, discovery files, and analytics into one maintainable publishing loop.",
            fr: "Connexion des notes, preuves projet, fichiers de découverte et analytics dans une boucle éditoriale maintenable.",
          },
        },
        {
          sha: "a782ff6",
          date: "2026-07-16",
          title: {
            en: "Notify search engines after deployment",
            fr: "Notifier les moteurs de recherche après déploiement",
          },
          description: {
            en: "Added a lightweight post-deploy discovery step so new portfolio content can be found sooner.",
            fr: "Ajout d’une étape de découverte post-déploiement pour rendre les nouveaux contenus visibles plus vite.",
          },
        },
        {
          sha: "f8a246e",
          date: "2026-07-13",
          title: {
            en: "Match CV downloads to the portfolio language",
            fr: "Adapter le téléchargement du CV à la langue du portfolio",
          },
          description: {
            en: "Kept English and French professional journeys consistent from the page through the downloaded CV.",
            fr: "Alignement des parcours professionnels anglais et français jusqu’au CV téléchargé.",
          },
        },
        {
          sha: "057ea17",
          date: "2026-07-10",
          title: {
            en: "Publish the portfolio",
            fr: "Publier le portfolio",
          },
          description: {
            en: "Shipped the first public version of the bilingual Perso and Pro portfolio.",
            fr: "Mise en ligne de la première version publique du portfolio bilingue Perso et Pro.",
          },
        },
      ],
    },
  };

  const localize = (copy) => copy[isFrench ? "fr" : "en"];
  const formatDate = (value) =>
    new Intl.DateTimeFormat(isFrench ? "fr-FR" : "en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    }).format(new Date(`${value}T12:00:00`));

  const contributionLevel = (week, day) => {
    const signal = (week * 17 + day * 29 + (week % 5) * 7) % 23;
    const seasonal = week > 38 ? 3 : week > 30 ? 2 : week > 12 ? 1 : 0;
    if (signal < 4 + seasonal) return Math.min(4, 1 + ((week + day) % 4));
    if (signal === 9 || signal === 16) return Math.min(3, seasonal);
    return 0;
  };

  const contributionCells = document.createDocumentFragment();
  for (let week = 0; week < 52; week += 1) {
    for (let day = 0; day < 7; day += 1) {
      const cell = document.createElement("span");
      const index = week * 7 + day;
      cell.className = "contribution-cell";
      cell.dataset.level = String(contributionLevel(week, day));
      cell.style.setProperty("--cell-index", String(index));
      contributionCells.append(cell);
    }
  }
  grid.replaceChildren(contributionCells);

  const rangeStart = new Date("2025-08-01T12:00:00");
  const rangeEnd = new Date("2026-07-31T12:00:00");
  const rangeDuration = rangeEnd - rangeStart;
  const positionForDate = (date) => {
    const ratio = (new Date(`${date}T12:00:00`) - rangeStart) / rangeDuration;
    return `${Math.max(2, Math.min(98, ratio * 100)).toFixed(2)}%`;
  };

  let activeRepository = "monelu";
  let selectedNode = null;

  const selectCommit = (repositoryKey, commit, node, source = "commit") => {
    const repository = repositories[repositoryKey];
    activeRepository = repositoryKey;

    repositoryButtons.forEach((button) => {
      const isActive = button.dataset.repository === repositoryKey;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    lanes.querySelectorAll(".commit-lane").forEach((lane) => {
      lane.classList.toggle("is-active", lane.dataset.repositoryLane === repositoryKey);
    });
    lanes.querySelectorAll(".commit-node").forEach((candidate) => {
      candidate.classList.toggle("is-selected", candidate === node);
    });

    selectedNode = node;
    buildLog.style.setProperty("--playhead-x", positionForDate(commit.date));
    playhead.hidden = false;
    detail.classList.add("is-changing");

    window.setTimeout(() => {
      detailRepository.textContent = repository.name;
      detailDate.textContent = formatDate(commit.date);
      detailTitle.textContent = localize(commit.title);
      detailDescription.textContent = localize(commit.description);
      detailSha.textContent = commit.sha;
      detailUrl.href = `https://github.com/Walid-peach/${repository.slug}/commit/${commit.sha}`;
      detailUrl.textContent = isFrench ? "Voir le commit" : "View commit";
      detail.classList.remove("is-changing");
    }, 120);

    window.portfolioAnalytics?.track("build_log_commit_selected", {
      repository: repositoryKey,
      commit: commit.sha,
      source,
    });
  };

  const laneFragment = document.createDocumentFragment();
  Object.entries(repositories).forEach(([repositoryKey, repository], laneIndex) => {
    const lane = document.createElement("div");
    lane.className = `commit-lane${laneIndex === 0 ? " is-active" : ""}`;
    lane.dataset.repositoryLane = repositoryKey;

    repository.commits.forEach((commit) => {
      const node = document.createElement("button");
      node.type = "button";
      node.className = "commit-node";
      node.style.setProperty("--commit-x", positionForDate(commit.date));
      node.setAttribute(
        "aria-label",
        `${repository.name}, ${formatDate(commit.date)}: ${localize(commit.title)}`,
      );
      node.addEventListener("click", () => selectCommit(repositoryKey, commit, node));
      lane.append(node);
    });
    laneFragment.append(lane);
  });
  lanes.replaceChildren(laneFragment);

  repositoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const repositoryKey = button.dataset.repository;
      const commit = repositories[repositoryKey].commits[0];
      const node = lanes.querySelector(
        `[data-repository-lane="${repositoryKey}"] .commit-node`,
      );
      selectCommit(repositoryKey, commit, node, "repository");
    });
  });

  const selectForMode = () => {
    const preferredRepository = document.body.dataset.mode === "pro" ? "portfolio" : "monelu";
    if (preferredRepository === activeRepository && selectedNode) return;
    const commit = repositories[preferredRepository].commits[0];
    const node = lanes.querySelector(
      `[data-repository-lane="${preferredRepository}"] .commit-node`,
    );
    selectCommit(preferredRepository, commit, node, "mode");
  };

  new MutationObserver(selectForMode).observe(document.body, {
    attributes: true,
    attributeFilter: ["data-mode"],
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        buildLog.classList.add("is-visible");
        observer.disconnect();
      },
      { threshold: 0.18 },
    );
    observer.observe(buildLog);
  } else {
    buildLog.classList.add("is-visible");
  }

  const firstNode = lanes.querySelector('[data-repository-lane="monelu"] .commit-node');
  selectCommit("monelu", repositories.monelu.commits[0], firstNode, "initial");
})();
