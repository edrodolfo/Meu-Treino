(() => {
  "use strict";

  // ---------- Ícones ----------
  const I = {
    dumbbell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 7v10M3 9.5v5M18 7v10M21 9.5v5M6 12h12"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 6-6 6 6 6"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20s-7-4.4-9.2-9A5 5 0 0 1 12 6a5 5 0 0 1 9.2 5C19 15.6 12 20 12 20Z"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3V9Z"/></svg>',
    bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z"/></svg>',
    checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 12 4 4 8-9"/></svg>',
    history: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 20V10M12 20V4M19 20v-7"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>'
  };

  // ---------- Armazenamento ----------
  const KEY = "meutreino:v1";
  const load = () => {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
  };
  let db = Object.assign({ sessoes: {}, favoritos: [], cargas: {} }, load());
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch {} };

  const hoje = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  };
  const sessaoKey = (diaId) => `${hoje()}|${diaId}`;
  const getSessao = (diaId) => db.sessoes[sessaoKey(diaId)] || { series: {} };
  const setSerie = (diaId, exId, i, patch) => {
    const k = sessaoKey(diaId);
    const s = db.sessoes[k] || { series: {} };
    const arr = s.series[exId] || Array.from({ length: SERIES }, () => ({ feito: false, kg: "" }));
    arr[i] = Object.assign({}, arr[i], patch);
    s.series[exId] = arr;
    s.atualizado = Date.now();
    db.sessoes[k] = s;
    if (patch.kg !== undefined && patch.kg !== "") {
      db.cargas[exId] = db.cargas[exId] || [];
      db.cargas[exId][i] = patch.kg;
    }
    save();
  };
  const feitasNoEx = (diaId, exId) =>
    (getSessao(diaId).series[exId] || []).filter((x) => x && x.feito).length;

  // ---------- Util ----------
  const $app = document.getElementById("app");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const diaPorId = (id) => DIAS.find((d) => d.id === id);
  const diaDeHoje = () => {
    const w = new Date().getDay(); // 0 dom ... 6 sáb
    return DIAS[w >= 1 && w <= 5 ? w - 1 : 0].id;
  };
  let diaAtual = diaDeHoje();

  const thumb = (ex, cls) =>
    ex.img
      ? `<img class="${cls}" src="${ex.img}" alt="" loading="lazy" width="250" height="250">`
      : `<div class="${cls} sem-img">${I.dumbbell}</div>`;

  const nav = (ativo) => `
    <nav class="tabbar">
      <a href="#/" class="${ativo === "treino" ? "on" : ""}">${I.dumbbell}<span>Treino</span></a>
      <a href="#/historico" class="${ativo === "historico" ? "on" : ""}">${I.history}<span>Histórico</span></a>
      <a href="#/orientacoes" class="${ativo === "orientacoes" ? "on" : ""}">${I.info}<span>Orientações</span></a>
    </nav>`;

  // ---------- Telas ----------
  function telaDia(diaId) {
    const dia = diaPorId(diaId) || DIAS[0];
    diaAtual = dia.id;
    const total = dia.exercicios.length * SERIES;
    const feitas = dia.exercicios.reduce((n, e) => n + feitasNoEx(dia.id, e.id), 0);

    $app.innerHTML = `
      <header class="topo">
        <div class="logo">${I.dumbbell}</div>
        <h1>Meu Treino</h1>
      </header>
      <div class="dias" role="tablist">
        ${DIAS.map((d) => `
          <a role="tab" href="#/d/${d.id}" class="dia ${d.id === dia.id ? "on" : ""}" aria-selected="${d.id === dia.id}">
            <b>${d.curto}</b><small>${esc(d.treino)}</small>
          </a>`).join("")}
      </div>
      <main class="conteudo">
        <p class="rotulo">Treino de ${dia.nome.toLowerCase()}${dia.id === diaDeHoje() ? " · hoje" : ""}</p>
        <div class="titulo-dia">
          <h2>${esc(dia.treino)}</h2>
          <span class="tempo">${I.clock}${dia.tempo}</span>
        </div>
        <p class="foco">${esc(dia.foco)}</p>
        <div class="barra" aria-label="Progresso de hoje"><i style="width:${(feitas / total) * 100}%"></i></div>
        <p class="barra-txt">${feitas} de ${total} séries feitas hoje</p>
        <ul class="lista">
          ${dia.exercicios.map((e, idx) => {
            const ex = EXERCICIOS[e.id];
            const ok = feitasNoEx(dia.id, e.id) >= SERIES;
            return `
            <li><a href="#/e/${dia.id}/${idx}" class="item ${ok ? "ok" : ""}">
              ${thumb(ex, "mini")}
              <div class="item-txt">
                <strong>${esc(ex.nome)}</strong>
                <span>${SERIES} séries × ${esc(e.reps)} repetições</span>
              </div>
              ${ok ? `<span class="feito">${I.check}</span>` : `<span class="seta">${I.chevron}</span>`}
            </a></li>`;
          }).join("")}
        </ul>
      </main>
      ${nav("treino")}`;
    const on = $app.querySelector(".dia.on");
    if (on) on.scrollIntoView({ inline: "center", block: "nearest" });
  }

  function telaExercicio(diaId, idx) {
    const dia = diaPorId(diaId);
    const item = dia && dia.exercicios[idx];
    if (!item) return telaDia(diaAtual);
    const ex = EXERCICIOS[item.id];
    const fav = db.favoritos.includes(item.id);
    const series = getSessao(dia.id).series[item.id] || [];
    const ultimas = db.cargas[item.id] || [];
    const prox = dia.exercicios[idx + 1];

    $app.innerHTML = `
      <header class="topo topo-ex">
        <a href="#/d/${dia.id}" class="icone" aria-label="Voltar">${I.back}</a>
        <h1>${esc(ex.nome)}</h1>
        <button class="icone fav ${fav ? "on" : ""}" aria-label="Favoritar" aria-pressed="${fav}">${I.heart}</button>
      </header>
      <main class="conteudo">
        <div class="hero">
          ${thumb(ex, "hero-img")}
          <div class="musculos"><b>Principais músculos</b>${esc(ex.musculos)}</div>
        </div>
        <div class="faixa">${I.layers}<span>${SERIES} séries × ${esc(item.reps)} repetições</span></div>

        <h3 class="sec">${I.play}Como executar</h3>
        <ol class="passos">${ex.passos.map((p) => `<li>${esc(p)}</li>`).join("")}</ol>
        <div class="dica">${I.bulb}<p><b>Dica:</b> ${esc(ex.dica)}</p></div>

        <h3 class="sec">${I.checkCircle}Séries</h3>
        <div class="series">
          ${Array.from({ length: SERIES }, (_, i) => {
            const s = series[i] || {};
            return `
            <div class="serie ${s.feito ? "ok" : ""}" data-i="${i}">
              <b>Série ${i + 1}</b>
              <span class="reps">${esc(item.reps)}</span>
              <label class="kg"><input type="number" inputmode="decimal" min="0" step="0.5"
                value="${esc(s.kg || "")}" placeholder="${esc(ultimas[i] || "–")}" aria-label="Carga da série ${i + 1} em kg">kg</label>
              <button class="chk" aria-label="Marcar série ${i + 1} como feita" aria-pressed="${!!s.feito}">${I.check}</button>
            </div>`;
          }).join("")}
        </div>
        <p class="nota">Registre a carga e marque cada série. O campo mostra a carga da última vez como referência.</p>
        ${prox ? `<a class="btn-prox" href="#/e/${dia.id}/${idx + 1}">Próximo: ${esc(EXERCICIOS[prox.id].nome)} ${I.chevron}</a>`
               : `<a class="btn-prox" href="#/d/${dia.id}">Voltar ao treino ${I.chevron}</a>`}
      </main>`;

    $app.querySelector(".fav").onclick = (ev) => {
      const b = ev.currentTarget;
      const i = db.favoritos.indexOf(item.id);
      i >= 0 ? db.favoritos.splice(i, 1) : db.favoritos.push(item.id);
      save();
      b.classList.toggle("on");
      b.setAttribute("aria-pressed", b.classList.contains("on"));
    };

    $app.querySelectorAll(".serie").forEach((row) => {
      const i = +row.dataset.i;
      const input = row.querySelector("input");
      input.addEventListener("change", () => setSerie(dia.id, item.id, i, { kg: input.value }));
      row.querySelector(".chk").onclick = (ev) => {
        const b = ev.currentTarget;
        const feito = !row.classList.contains("ok");
        if (feito && !input.value) {
          const anterior = i > 0 && row.previousElementSibling.querySelector("input").value;
          if (anterior) input.value = anterior;
          else if (input.placeholder !== "–") input.value = input.placeholder;
        }
        setSerie(dia.id, item.id, i, { feito, kg: input.value });
        row.classList.toggle("ok", feito);
        b.setAttribute("aria-pressed", feito);
        if (feito) {
          if (navigator.vibrate) navigator.vibrate(30);
          const todas = feitasNoEx(dia.id, item.id) >= SERIES;
          iniciarDescanso(todas ? "Exercício concluído! Descanse antes do próximo." : "Descanso");
        }
      };
    });
  }

  // ---------- Timer de descanso ----------
  let timerId = null;
  function iniciarDescanso(msg) {
    const el = document.getElementById("timer");
    if (!el) return;
    clearInterval(timerId);
    let resta = 90;
    const render = () => {
      const m = Math.floor(resta / 60), s = String(resta % 60).padStart(2, "0");
      el.innerHTML = `<span>${esc(msg)}</span><strong>${m}:${s}</strong>
        <button data-a="-">−15s</button><button data-a="+">+15s</button><button data-a="x">Pular</button>`;
    };
    el.hidden = false;
    render();
    el.onclick = (ev) => {
      const a = ev.target.dataset && ev.target.dataset.a;
      if (a === "+") resta += 15;
      if (a === "-") resta = Math.max(5, resta - 15);
      if (a === "x") { clearInterval(timerId); el.hidden = true; return; }
      render();
    };
    timerId = setInterval(() => {
      resta--;
      if (resta <= 0) {
        clearInterval(timerId);
        el.innerHTML = `<span>Descanso terminado</span><strong>Bora! 💪</strong><button data-a="x">OK</button>`;
        if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
        return;
      }
      render();
    }, 1000);
  }

  function telaHistorico() {
    const fmt = new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "2-digit", month: "short" });
    const itens = Object.entries(db.sessoes)
      .map(([k, s]) => {
        const [data, diaId] = k.split("|");
        const dia = diaPorId(diaId);
        if (!dia) return null;
        const feitas = Object.values(s.series).reduce((n, arr) => n + arr.filter((x) => x && x.feito).length, 0);
        return { data, dia, feitas, total: dia.exercicios.length * SERIES };
      })
      .filter((x) => x && x.feitas > 0)
      .sort((a, b) => (a.data < b.data ? 1 : -1));

    const semana = (() => {
      const d = new Date(); d.setDate(d.getDate() - 6);
      const lim = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      return new Set(itens.filter((x) => x.data >= lim).map((x) => x.data)).size;
    })();

    $app.innerHTML = `
      <header class="topo"><div class="logo">${I.history}</div><h1>Histórico</h1></header>
      <main class="conteudo">
        <div class="stats">
          <div><strong>${semana}</strong><span>treinos nos últimos 7 dias</span></div>
          <div><strong>${new Set(itens.map((x) => x.data)).size}</strong><span>dias de treino no total</span></div>
        </div>
        ${itens.length ? `<ul class="lista hist">
          ${itens.map((x) => {
            const [y, m, d] = x.data.split("-").map(Number);
            const pct = Math.round((x.feitas / x.total) * 100);
            return `<li class="item">
              <div class="item-txt"><strong>${esc(x.dia.treino)}</strong>
              <span>${fmt.format(new Date(y, m - 1, d))} · ${x.feitas}/${x.total} séries</span></div>
              <span class="pct ${pct >= 100 ? "ok" : ""}">${pct}%</span></li>`;
          }).join("")}</ul>`
        : `<p class="vazio">Nenhum treino registrado ainda. Marque as séries durante o treino e elas aparecem aqui.</p>`}
      </main>
      ${nav("historico")}`;
  }

  function telaOrientacoes() {
    $app.innerHTML = `
      <header class="topo"><div class="logo">${I.info}</div><h1>Orientações</h1></header>
      <main class="conteudo">
        <p class="rotulo">Plano semanal de musculação · 5 dias</p>
        <p class="intro">Divisão planejada: 3 dias de inferiores e 2 dias de superiores, com três séries em cada exercício.</p>
        <ul class="orient">${ORIENTACOES.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>
        <p class="nota">As ilustrações são referências. Use a orientação do treinador para confirmar posicionamento e execução na máquina da sua academia.</p>
        <button class="btn-sec" id="limpar">Apagar histórico e cargas</button>
      </main>
      ${nav("orientacoes")}`;
    document.getElementById("limpar").onclick = () => {
      if (confirm("Apagar todo o histórico e as cargas registradas?")) {
        db = { sessoes: {}, favoritos: db.favoritos, cargas: {} };
        save();
        telaOrientacoes();
      }
    };
  }

  // ---------- Rotas ----------
  function rota() {
    const p = location.hash.replace(/^#\/?/, "").split("/");
    window.scrollTo(0, 0);
    if (p[0] === "d") return telaDia(p[1]);
    if (p[0] === "e") return telaExercicio(p[1], +p[2]);
    if (p[0] === "historico") return telaHistorico();
    if (p[0] === "orientacoes") return telaOrientacoes();
    telaDia(diaAtual);
  }
  window.addEventListener("hashchange", rota);
  rota();

  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
  }
})();
