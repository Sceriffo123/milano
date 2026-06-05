/* Motore della web-app: stage, navigazione, HUD, modalità Relatore/Vetrina. */
(function () {
  const stage = document.getElementById("stage");
  const SCENES = window.SCENES || [];
  let cur = 0, mode = "relatore", autoInt = null, seconds = 0, timerInt = null;
  const DUR = 8; // secondi per scena in Vetrina

  // costruisci scene
  SCENES.forEach((sc, i) => {
    const el = document.createElement("section");
    el.className = "scene " + sc.theme;
    el.dataset.idx = i;
    el.innerHTML = sc.html;
    stage.appendChild(el);
  });

  function applyCounters(el) {
    el.querySelectorAll("[data-count]").forEach((c) => {
      const target = parseInt(c.dataset.count, 10);
      const suffix = c.dataset.suffix || "";
      if (isNaN(target)) { c.textContent = c.dataset.count; return; }
      const dur = 1100, t0 = performance.now();
      const step = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const v = Math.round(target * (1 - Math.pow(1 - p, 3)));
        c.textContent = v + (p === 1 ? suffix : "");
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    });
  }

  function show(idx) {
    const prev = stage.querySelector(".scene.active");
    if (prev) prev.classList.remove("active");
    cur = (idx + SCENES.length) % SCENES.length;
    const el = stage.children[cur];
    el.classList.add("active");
    applyCounters(el);
    document.querySelector("#hud .pos").textContent = (cur + 1) + " / " + SCENES.length;
    document.getElementById("progress").style.width = (cur / (SCENES.length - 1)) * 100 + "%";
  }

  function next() { show(cur + 1); }
  function prev() { show(cur - 1); }

  function startAuto() {
    stopAuto();
    autoInt = setInterval(() => show(cur + 1), DUR * 1000);
  }
  function stopAuto() { if (autoInt) { clearInterval(autoInt); autoInt = null; } }

  function setMode(m) {
    mode = m;
    document.body.classList.toggle("mode-vetrina", m === "vetrina");
    document.querySelector("#hud .mode").textContent = m === "vetrina" ? "VETRINA" : "RELATORE";
    document.getElementById("hint").style.display = m === "vetrina" ? "none" : "";
    m === "vetrina" ? startAuto() : stopAuto();
  }

  function startTimer() {
    stopTimer(); seconds = 0;
    const fmt = (n) => String(n).padStart(2, "0");
    timerInt = setInterval(() => {
      seconds++;
      document.querySelector("#hud .timer").textContent = fmt((seconds / 60) | 0) + ":" + fmt(seconds % 60);
    }, 1000);
  }
  function stopTimer() { if (timerInt) clearInterval(timerInt); }

  // tastiera
  document.addEventListener("keydown", (e) => {
    if (document.getElementById("start").style.display === "none") {
      switch (e.key) {
        case "ArrowRight": case " ": e.preventDefault(); next(); break;
        case "ArrowLeft": prev(); break;
        case "v": case "V": setMode(mode === "vetrina" ? "relatore" : "vetrina"); break;
        case "f": case "F": document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen(); break;
        case "Home": show(0); break;
      }
    }
  });

  // click sulle metà schermo (relatore)
  stage.addEventListener("click", (e) => {
    if (mode !== "relatore") return;
    (e.clientX > window.innerWidth / 2) ? next() : prev();
  });

  // avvio
  document.querySelectorAll("#start button").forEach((b) => {
    b.onclick = () => {
      document.getElementById("start").style.display = "none";
      show(0); startTimer(); setMode(b.dataset.mode);
    };
  });
})();
