(() => {
  const GRID_SIZE = 12;
  const DURATION_MS = 10800;
  const DEFAULT_RATE = 0.45;
  const POSTER_SRC = "/assets/images/walid-ai-lab-logo-poster.jpg";
  const PIECE_CELLS = [
    [[0, 0], [1, 0], [2, 0], [1, 1]],
    [[3, 0], [2, 1], [3, 1], [3, 2]],
    [[0, 1], [0, 2], [1, 2], [2, 2]],
    [[0, 3], [1, 3], [2, 3], [3, 3]],
    [[4, 0], [4, 1], [4, 2], [4, 3]],
    [[5, 0], [5, 1], [6, 1], [5, 2]],
    [[6, 0], [7, 0], [7, 1], [7, 2]],
    [[6, 2], [5, 3], [6, 3], [7, 3]],
    [[8, 0], [8, 1], [9, 1], [10, 1]],
    [[9, 0], [10, 0], [11, 0], [11, 1]],
    [[8, 2], [9, 2], [10, 2], [8, 3]],
    [[11, 2], [9, 3], [10, 3], [11, 3]],
    [[0, 4], [0, 5], [0, 6], [0, 7]],
    [[1, 4], [2, 4], [3, 4], [2, 5]],
    [[1, 5], [1, 6], [1, 7], [2, 7]],
    [[3, 5], [2, 6], [3, 6], [3, 7]],
    [[4, 4], [4, 5], [4, 6], [4, 7]],
    [[5, 4], [6, 4], [5, 5], [5, 6]],
    [[7, 4], [7, 5], [7, 6], [7, 7]],
    [[6, 5], [6, 6], [5, 7], [6, 7]],
    [[8, 4], [9, 4], [8, 5], [9, 5]],
    [[10, 4], [11, 4], [10, 5], [11, 5]],
    [[8, 6], [8, 7], [9, 7], [10, 7]],
    [[9, 6], [10, 6], [11, 6], [11, 7]],
    [[0, 8], [0, 9], [1, 9], [0, 10]],
    [[1, 8], [2, 8], [3, 8], [2, 9]],
    [[3, 9], [1, 10], [2, 10], [3, 10]],
    [[0, 11], [1, 11], [2, 11], [3, 11]],
    [[4, 8], [5, 8], [6, 8], [7, 8]],
    [[4, 9], [5, 9], [6, 9], [5, 10]],
    [[7, 9], [6, 10], [7, 10], [7, 11]],
    [[4, 10], [4, 11], [5, 11], [6, 11]],
    [[8, 8], [9, 8], [10, 8], [11, 8]],
    [[8, 9], [9, 9], [8, 10], [8, 11]],
    [[10, 9], [9, 10], [10, 10], [9, 11]],
    [[11, 9], [11, 10], [10, 11], [11, 11]],
  ];

  const QUOTES = {
    en: [
      "Gravity already clocked in.",
      "Escaping the rat race, one clean line at a time.",
      "No race condition. Just one very committed block.",
      "Jet lag is temporary. Good alignment is forever.",
      "Move fast. Land clean. Pretend it was the plan.",
      "Almost there. The pixels have unionized.",
      "Portrait complete. Zero blocks were micromanaged.",
    ],
    fr: [
      "La gravité a déjà pointé.",
      "Sortir du métro-boulot-dodo, une ligne propre à la fois.",
      "Aucune condition de course. Juste un bloc très motivé.",
      "Le décalage horaire passe. Un bon alignement reste.",
      "Aller vite. Atterrir proprement. Faire comme si c’était prévu.",
      "Presque fini. Les pixels se sont syndiqués.",
      "Portrait terminé. Aucun bloc n’a été micromanagé.",
    ],
  };

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const mix = (from, to, amount) => from + (to - from) * amount;
  const easeOutCubic = (value) => 1 - Math.pow(1 - value, 3);

  const boundsFor = (cells) => {
    const xs = cells.map(([x]) => x);
    const ys = cells.map(([, y]) => y);
    return {
      minX: Math.min(...xs),
      minY: Math.min(...ys),
      maxX: Math.max(...xs),
      maxY: Math.max(...ys),
    };
  };

  const buildPieces = () => {
    const tiledPieces = PIECE_CELLS.map((cells, sourceIndex) => ({
      cells,
      sourceIndex,
      ...boundsFor(cells),
    }));
    const blockers = tiledPieces.map((piece) => {
      const blockedBy = new Set();
      piece.cells.forEach(([x, y]) => {
        tiledPieces.forEach((other) => {
          if (
            other.sourceIndex !== piece.sourceIndex
            && other.cells.some(([otherX, otherY]) => otherX === x && otherY < y)
          ) blockedBy.add(other.sourceIndex);
        });
      });
      return blockedBy;
    });
    const removed = new Set();
    const removalOrder = [];

    while (removalOrder.length < tiledPieces.length) {
      const next = tiledPieces
        .filter((piece) => (
          !removed.has(piece.sourceIndex)
          && [...blockers[piece.sourceIndex]].every((blocker) => removed.has(blocker))
        ))
        .sort((a, b) => (
          a.minY - b.minY
          || a.maxY - b.maxY
          || a.minX - b.minX
          || a.sourceIndex - b.sourceIndex
        ))[0];

      if (!next) throw new Error("Photo Tetris tiling has no legal drop order.");
      removed.add(next.sourceIndex);
      removalOrder.push(next);
    }

    const lockedCells = new Set();
    return removalOrder.reverse().map((piece) => {
      const ownCells = new Set(piece.cells.map(([x, y]) => `${x},${y}`));
      const crossesLockedCell = piece.cells.some(([x, y]) => (
        Array.from({ length: y }, (_, row) => row)
          .some((row) => lockedCells.has(`${x},${row}`))
      ));
      const hasSupport = piece.cells.some(([x, y]) => (
        !ownCells.has(`${x},${y + 1}`)
        && (y === GRID_SIZE - 1 || lockedCells.has(`${x},${y + 1}`))
      ));

      if (crossesLockedCell || !hasSupport) {
        throw new Error("Photo Tetris found an obstructed or unsupported drop.");
      }

      const height = piece.maxY - piece.minY + 1;
      const path = Array.from(
        { length: piece.minY + height + 1 },
        (_, index) => [piece.minX, index - height],
      );
      path.forEach(([, originY]) => {
        piece.cells.forEach(([x, y]) => {
          const cellY = originY + y - piece.minY;
          if (cellY >= 0 && lockedCells.has(`${x},${cellY}`)) {
            throw new Error("Photo Tetris straight path is obstructed.");
          }
        });
      });
      piece.cells.forEach(([x, y]) => lockedCells.add(`${x},${y}`));
      return { ...piece, path };
    });
  };

  const pointOnPath = (path, progress) => {
    if (path.length === 1) return path[0];
    const scaled = clamp(progress) * (path.length - 1);
    const index = Math.min(Math.floor(scaled), path.length - 2);
    const localProgress = scaled - index;
    const eased = localProgress * localProgress * (3 - 2 * localProgress);
    return [
      mix(path[index][0], path[index + 1][0], eased),
      mix(path[index][1], path[index + 1][1], eased),
    ];
  };

  const setupPhotoTetris = (root) => {
    const frame = root.querySelector("[data-tetris-frame]");
    const canvas = root.querySelector("[data-tetris-canvas]");
    const replayButton = root.querySelector("[data-tetris-replay]");
    const paceInput = root.querySelector("[data-tetris-pace]");
    const paceOutput = root.querySelector("[data-tetris-rate]");
    const quote = root.querySelector("[data-tetris-quote]");
    const status = root.querySelector("[data-tetris-status]");
    if (!frame || !canvas || !replayButton || !paceInput || !quote) return;

    const language = document.documentElement.lang === "fr" ? "fr" : "en";
    const quotes = QUOTES[language];
    const pieces = buildPieces();
    const rowCompletionSteps = Array.from({ length: GRID_SIZE }, (_, row) => (
      Math.max(...pieces.map((piece, index) => (
        piece.cells.some(([, y]) => y === row) ? index + 1 : 0
      )))
    ));
    const image = new Image();
    const context = canvas.getContext("2d");
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let progress = 0;
    let playbackRate = DEFAULT_RATE;
    let isReady = false;
    let isPlaying = false;
    let frameId = 0;
    let previousTime;
    let activeMode = document.body.dataset.mode === "lab";
    let lastQuoteIndex = -1;

    const updateQuote = (lockedCount) => {
      const quoteIndex = Math.min(quotes.length - 1, Math.floor((lockedCount / pieces.length) * quotes.length));
      if (quoteIndex === lastQuoteIndex) return;
      lastQuoteIndex = quoteIndex;
      quote.textContent = `“${quotes[quoteIndex]}”`;
    };

    const draw = () => {
      if (!isReady || !context) return;
      const size = Math.max(1, frame.getBoundingClientRect().width);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetSize = Math.round(size * dpr);
      if (canvas.width !== targetSize || canvas.height !== targetSize) {
        canvas.width = targetSize;
        canvas.height = targetSize;
      }

      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, size, size);
      context.fillStyle = "#080907";
      context.fillRect(0, 0, size, size);
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";

      if (progress >= 0.999) {
        context.drawImage(image, 0, 0, size, size);
        updateQuote(pieces.length);
        return;
      }

      const cell = size / GRID_SIZE;
      const sourceCell = image.naturalWidth / GRID_SIZE;
      const sequenceProgress = progress * pieces.length;
      const lockedCount = Math.floor(sequenceProgress);
      const activeIndex = Math.min(lockedCount, pieces.length - 1);
      const activeProgress = sequenceProgress - lockedCount;

      const drawPiece = (piece, pieceX, pieceY, rotation = 0, scaleX = 1, scaleY = 1, active = false) => {
        const width = (piece.maxX - piece.minX + 1) * cell;
        const height = (piece.maxY - piece.minY + 1) * cell;
        context.save();
        context.translate(pieceX + width / 2, pieceY + height / 2);
        context.rotate(rotation);
        context.scale(scaleX, scaleY);

        if (active) {
          context.shadowColor = "rgba(237, 73, 50, 0.52)";
          context.shadowBlur = Math.max(8, cell * 0.22);
        }

        piece.cells.forEach(([x, y]) => {
          const localX = (x - piece.minX) * cell - width / 2;
          const localY = (y - piece.minY) * cell - height / 2;
          context.drawImage(
            image,
            x * sourceCell,
            y * sourceCell,
            sourceCell,
            sourceCell,
            localX,
            localY,
            cell,
            cell,
          );
          context.shadowColor = "transparent";
          context.strokeStyle = active ? "rgba(8, 9, 7, 0.62)" : "rgba(8, 9, 7, 0.5)";
          context.lineWidth = Math.max(active ? 1.8 : 1.4, size / 720);
          context.strokeRect(localX + 0.5, localY + 0.5, cell - 1, cell - 1);
          context.strokeStyle = active ? "rgba(239, 234, 222, 0.72)" : "rgba(239, 234, 222, 0.25)";
          context.lineWidth = Math.max(active ? 0.95 : 0.7, size / 1180);
          context.strokeRect(localX + 0.5, localY + 0.5, cell - 1, cell - 1);
        });
        context.restore();
      };

      for (let index = 0; index < lockedCount; index += 1) {
        const piece = pieces[index];
        drawPiece(piece, piece.minX * cell, piece.minY * cell);
      }

      for (let row = 0; row < GRID_SIZE; row += 1) {
        const sinceCompletion = sequenceProgress - rowCompletionSteps[row];
        if (sinceCompletion >= 0 && sinceCompletion < 0.34) {
          const alpha = (1 - sinceCompletion / 0.34) * 0.32;
          context.fillStyle = `rgba(237, 73, 50, ${alpha})`;
          context.fillRect(0, row * cell, size, cell);
        }
      }

      if (lockedCount < pieces.length) {
        const piece = pieces[activeIndex];
        const width = (piece.maxX - piece.minX + 1) * cell;
        const height = (piece.maxY - piece.minY + 1) * cell;
        const spawnX = piece.minX * cell;
        const rotationY = -height / 2 - Math.hypot(width, height) / 2 - cell * 0.35;
        const pathStartY = piece.path[0][1] * cell;
        const alignmentProgress = clamp(activeProgress / 0.18);
        const entryProgress = clamp((activeProgress - 0.18) / 0.1);
        const pathProgress = clamp((activeProgress - 0.28) / 0.64);
        const align = easeOutCubic(alignmentProgress);
        const [, pathY] = pointOnPath(piece.path, pathProgress);
        const pieceY = activeProgress < 0.18
          ? rotationY
          : activeProgress < 0.28
            ? mix(rotationY, pathStartY, easeOutCubic(entryProgress))
            : pathY * cell;
        const turns = piece.sourceIndex % 4 === 0 ? 0 : piece.sourceIndex % 2 === 0 ? -1 : 1;
        const rotation = turns * (Math.PI / 2) * (1 - align);
        const landing = activeProgress > 0.92
          ? Math.sin(((activeProgress - 0.92) / 0.08) * Math.PI)
          : 0;
        drawPiece(piece, spawnX, pieceY, rotation, 1 + landing * 0.035, 1 - landing * 0.035, true);
      }

      updateQuote(lockedCount);
    };

    const tick = (time) => {
      if (!isPlaying || !activeMode) return;
      if (previousTime === undefined) previousTime = time;
      progress = clamp(progress + ((time - previousTime) / DURATION_MS) * playbackRate);
      previousTime = time;
      draw();
      if (progress < 1) frameId = window.requestAnimationFrame(tick);
      else {
        isPlaying = false;
        replayButton.textContent = language === "fr" ? "Rejouer" : "Replay";
        if (status) status.textContent = language === "fr" ? "Portrait terminé." : "Portrait complete.";
      }
    };

    const play = () => {
      if (!isReady || reduceMotion.matches || !activeMode) return;
      isPlaying = true;
      previousTime = undefined;
      replayButton.textContent = language === "fr" ? "Rejouer" : "Replay";
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(tick);
    };

    const replay = () => {
      progress = reduceMotion.matches ? 1 : 0;
      lastQuoteIndex = -1;
      draw();
      if (status) status.textContent = language === "fr" ? "Reconstruction du portrait." : "Rebuilding the portrait.";
      play();
    };

    replayButton.addEventListener("click", replay);
    paceInput.addEventListener("input", () => {
      playbackRate = Number(paceInput.value);
      if (paceOutput) paceOutput.textContent = `${playbackRate.toFixed(2)}×`;
    });
    document.addEventListener("portfolio:modechange", (event) => {
      activeMode = event.detail?.mode === "lab";
      if (activeMode) {
        if (progress >= 1) replay();
        else play();
      } else {
        isPlaying = false;
        previousTime = undefined;
        window.cancelAnimationFrame(frameId);
      }
    });

    const observer = new ResizeObserver(draw);
    observer.observe(frame);
    image.decoding = "async";
    image.src = POSTER_SRC;
    image.addEventListener("load", () => {
      isReady = true;
      frame.classList.add("is-tetris-ready");
      if (reduceMotion.matches) {
        progress = 1;
        replayButton.disabled = true;
        paceInput.disabled = true;
      }
      draw();
      if (activeMode && !reduceMotion.matches) replay();
    }, { once: true });
  };

  document.querySelectorAll("[data-photo-tetris]").forEach(setupPhotoTetris);
})();
