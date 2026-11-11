(() => {
  "use strict";

  // ---------- Ícones ----------
  const I = {
    dumbbell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 7v10M3 9.5v5M18 7v10M21 9.5v5M6 12h12"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
    down: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 6-6 6 6 6"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 20s-7-4.4-9.2-9A5 5 0 0 1 12 6a5 5 0 0 1 9.2 5C19 15.6 12 20 12 20Z"/></svg>',
    layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 13 9 5 9-5"/></svg>',
    play: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3V9Z"/></svg>',
    bulb: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 18h6M10 21h4"/><path d="M12 3a6 6 0 0 0-3.5 10.9c.6.5 1 1.2 1 2.1h5c0-.9.4-1.6 1-2.1A6 6 0 0 0 12 3Z"/></svg>',
    checkCircle: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="m6 12 4 4 8-9"/></svg>',
    history: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 20V10M12 20V4M19 20v-7"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    swap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 4 3 8l4 4M3 8h14M17 12l4 4-4 4M21 16H7"/></svg>',
    reset: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/></svg>',
    fire: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3s5 4.5 5 10a5 5 0 0 1-10 0c0-2.5 1.5-4 1.5-4s.5 2 2 2.5C10 8 12 3 12 3Z"/></svg>',
    walk: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13" cy="4" r="2"/><path d="m9 21 2-6 3 2v4M7 12l2-4 4 1 2 3 3 1M11 15l-1-6"/></svg>'
  };

  // ---------- Armazenamento ----------
  const KEY = "meutreino:v1";
  const load = () => {
    try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch { return {}; }
  };
  let db = Object.assign({ sessoes: {}, favoritos: [], cargas: {}, plano: PLANO_PADRAO }, load());
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(db)); } catch {} };

  // Sessões antigas (antes de existir o Treino 2) eram "data|dia" e pertencem ao Treino 1.
  Object.keys(db.sessoes).forEach((k) => {
    if (k.split("|").length === 2) { db.sessoes[k.replace("|", "|t1|")] = db.sessoes[k]; delete db.sessoes[k]; }
  });

  const planoAtual = () => PLANOS.find((p) => p.id === db.plano) || PLANOS[0];
  const dataStr = (d) =>
    `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
  const hoje = () => dataStr(new Date());
  const sessaoKey = (diaId) => `${hoje()}|${planoAtual().id}|${diaId}`;
  const getSessao = (diaId) => db.sessoes[sessaoKey(diaId)] || { series: {} };
  const nSeries = (item) => item.series || SERIES_PADRAO;

  const setSerie = (diaId, item, i, patch) => {
    const k = sessaoKey(diaId);
    const s = db.sessoes[k] || { series: {} };
    const arr = s.series[item.id] || Array.from({ length: nSeries(item) }, () => ({ feito: false, kg: "" }));
    arr[i] = Object.assign({}, arr[i], patch);
    s.series[item.id] = arr;
    s.atualizado = Date.now();
    db.sessoes[k] = s;
    if (patch.kg !== undefined && patch.kg !== "") {
      db.cargas[item.id] = db.cargas[item.id] || [];
      db.cargas[item.id][i] = patch.kg;
    }
    save();
  };
  const feitasNoEx = (diaId, item) =>
    (getSessao(diaId).series[item.id] || []).slice(0, nSeries(item)).filter((x) => x && x.feito).length;
  const totalDia = (dia) => dia.exercicios.reduce((n, e) => n + nSeries(e), 0);
  const feitasDia = (dia) => dia.exercicios.reduce((n, e) => n + feitasNoEx(dia.id, e), 0);

  const resetarDia = (diaId) => {
    const s = db.sessoes[sessaoKey(diaId)];
    if (!s) return;
    Object.values(s.series).forEach((arr) => arr.forEach((x) => { if (x) x.feito = false; }));
    save();
  };

  // ---------- Util ----------
  const $app = document.getElementById("app");
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const diaPorId = (id) => planoAtual().dias.find((d) => d.id === id);
  const diaDeHoje = () => {
    const w = new Date().getDay(); // 0 dom ... 6 sáb
    return ["seg", "ter", "qua", "qui", "sex"][w >= 1 && w <= 5 ? w - 1 : 0];
  };
  let diaAtual = diaDeHoje();

  // Junta o exercício do catálogo com o que é específico do dia (nome, dica, séries).
  const montar = (item) => {
    const base = EXERCICIOS[item.id];
    return Object.assign({}, base, { nome: item.nome || base.nome, dica: item.dica || base.dica });
  };

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

  // ---------- Seletor de treino ----------
  function abrirSeletorPlano(aoTrocar) {
    const atual = planoAtual().id;
    const el = document.createElement("div");
    el.className = "sheet-fundo";
    el.innerHTML = `
      <div class="sheet" role="dialog" aria-modal="true" aria-label="Escolher treino">
        <div class="sheet-alca"></div>
        <h3>Escolher treino</h3>
        ${PLANOS.map((p) => `
          <button class="opcao ${p.id === atual ? "on" : ""}" data-p="${p.id}">
            <span><b>${esc(p.nome)}</b><small>${esc(p.descricao)}</small></span>
            ${p.id === atual ? `<i>${I.check}</i>` : ""}
          </button>`).join("")}
        <button class="btn-sec" data-fechar>Cancelar</button>
      </div>`;
    const fechar = () => el.remove();
    el.addEventListener("click", (ev) => {
      if (ev.target === el || ev.target.closest("[data-fechar]")) return fechar();
      const b = ev.target.closest("[data-p]");
      if (b) {
        db.plano = b.dataset.p;
        save();
        fechar();
        aoTrocar();
      }
    });
    document.body.appendChild(el);
  }

  // ---------- Telas ----------
  function telaDia(diaId) {
    const plano = planoAtual();
    const dia = diaPorId(diaId) || plano.dias[0];
    diaAtual = dia.id;
    const total = totalDia(dia);
    const feitas = feitasDia(dia);

    $app.innerHTML = `
      <header class="topo">
        <div class="logo">${I.dumbbell}</div>
        <h1>Meu Treino</h1>
        <button class="plano-btn" id="trocar-plano" aria-label="Trocar treino (atual: ${esc(plano.nome)})">
          ${I.swap}<span>${esc(plano.nome)}</span>
        </button>
      </header>
      <div class="dias" role="tablist">
        ${plano.dias.map((d) => `
          <a role="tab" href="#/d/${d.id}" class="dia ${d.id === dia.id ? "on" : ""}" aria-selected="${d.id === dia.id}">
            <b>${d.curto}</b><small>${esc(d.curtoTreino || d.treino)}</small>
          </a>`).join("")}
      </div>
      <main class="conteudo">
        <p class="rotulo">Treino de ${dia.nome.toLowerCase()}${dia.id === diaDeHoje() ? " · hoje" : ""}</p>
        <div class="titulo-dia">
          <h2>${esc(dia.treino)}</h2>
          <span class="tempo">${I.clock}${dia.tempo}</span>
        </div>
        <p class="foco">${esc(dia.foco)}</p>
        ${dia.aquecimento ? `<div class="info-dia">${I.fire}<p><b>Aquecimento:</b> ${esc(dia.aquecimento)}</p></div>` : ""}
        <div class="progresso">
          <div class="progresso-txt">
            <div class="barra" aria-label="Progresso de hoje"><i style="width:${(feitas / total) * 100}%"></i></div>
            <p class="barra-txt">${feitas} de ${total} séries feitas hoje</p>
          </div>
          <button class="btn-reset" id="resetar" ${feitas ? "" : "disabled"} aria-label="Resetar séries do dia">${I.reset}<span>Resetar</span></button>
        </div>
        <ul class="lista">
          ${dia.exercicios.map((e, idx) => {
            const ex = montar(e);
            const ok = feitasNoEx(dia.id, e) >= nSeries(e);
            return `
            <li><a href="#/e/${dia.id}/${idx}" class="item ${ok ? "ok" : ""}">
              ${thumb(ex, "mini")}
              <div class="item-txt">
                <strong>${esc(ex.nome)}</strong>
                <span>${nSeries(e)} séries × ${esc(e.reps)} repetições</span>
              </div>
              ${ok ? `<span class="feito">${I.check}</span>` : `<span class="seta">${I.chevron}</span>`}
            </a></li>`;
          }).join("")}
        </ul>
        ${dia.descanso ? `<p class="nota"><b>Descanso:</b> ${esc(dia.descanso)}</p>` : ""}
        ${dia.cardio ? `<div class="info-dia cardio">${I.walk}<p><b>Cardio:</b> ${esc(dia.cardio)}</p></div>` : ""}
      </main>
      ${nav("treino")}`;

    const on = $app.querySelector(".dia.on");
    if (on) on.scrollIntoView({ inline: "center", block: "nearest" });
    document.getElementById("trocar-plano").onclick = () => abrirSeletorPlano(() => telaDia(diaAtual));
    document.getElementById("resetar").onclick = () => {
      if (confirm(`Desmarcar todas as séries de ${dia.nome.toLowerCase()}? As cargas anotadas continuam salvas.`)) {
        resetarDia(dia.id);
        telaDia(dia.id);
      }
    };
  }

  function telaExercicio(diaId, idx) {
    const dia = diaPorId(diaId);
    const item = dia && dia.exercicios[idx];
    if (!item) return telaDia(diaAtual);
    const ex = montar(item);
    const n = nSeries(item);
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
        <div class="hero ${/\.jpe?g$/.test(ex.img || "") ? "largo" : ""}">
          ${thumb(ex, "hero-img")}
          <div class="musculos"><b>Principais músculos</b>${esc(ex.musculos)}</div>
        </div>
        <div class="faixa">${I.layers}<span>${n} séries × ${esc(item.reps)} repetições</span></div>

        <h3 class="sec">${I.play}Como executar</h3>
        <ol class="passos">${ex.passos.map((p) => `<li>${esc(p)}</li>`).join("")}</ol>
        <div class="dica">${I.bulb}<p><b>Dica:</b> ${esc(ex.dica)}</p></div>

        <h3 class="sec">${I.checkCircle}Séries</h3>
        <div class="series">
          ${Array.from({ length: n }, (_, i) => {
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
        ${prox ? `<a class="btn-prox" href="#/e/${dia.id}/${idx + 1}">Próximo: ${esc(montar(prox).nome)} ${I.chevron}</a>`
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
      input.addEventListener("change", () => setSerie(dia.id, item, i, { kg: input.value }));
      row.querySelector(".chk").onclick = (ev) => {
        const b = ev.currentTarget;
        const feito = !row.classList.contains("ok");
        if (feito && !input.value) {
          const anterior = i > 0 && row.previousElementSibling.querySelector("input").value;
          if (anterior) input.value = anterior;
          else if (input.placeholder !== "–") input.value = input.placeholder;
        }
        setSerie(dia.id, item, i, { feito, kg: input.value });
        row.classList.toggle("ok", feito);
        b.setAttribute("aria-pressed", feito);
        if (feito) {
          if (navigator.vibrate) navigator.vibrate(30);
          const todas = feitasNoEx(dia.id, item) >= n;
          iniciarDescanso(todas ? "Exercício concluído! Descanse antes do próximo." : "Descanso", dia.descansoSeg || 90);
        }
      };
    });
  }

  // ---------- Timer de descanso ----------
  let timerId = null;
  function iniciarDescanso(msg, segundos) {
    const el = document.getElementById("timer");
    if (!el) return;
    clearInterval(timerId);
    let resta = segundos;
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
        const [data, planoId, diaId] = k.split("|");
        const plano = PLANOS.find((p) => p.id === planoId);
        const dia = plano && plano.dias.find((d) => d.id === diaId);
        if (!dia) return null;
        const feitas = dia.exercicios.reduce(
          (n, e) => n + (s.series[e.id] || []).slice(0, nSeries(e)).filter((x) => x && x.feito).length, 0);
        return { data, plano, dia, feitas, total: totalDia(dia) };
      })
      .filter((x) => x && x.feitas > 0)
      .sort((a, b) => (a.data < b.data ? 1 : -1));

    const d7 = new Date(); d7.setDate(d7.getDate() - 6);
    const lim = dataStr(d7);
    const semana = new Set(itens.filter((x) => x.data >= lim).map((x) => x.data)).size;

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
              <span>${fmt.format(new Date(y, m - 1, d))} · ${esc(x.plano.nome)} · ${x.feitas}/${x.total} séries</span></div>
              <span class="pct ${pct >= 100 ? "ok" : ""}">${pct}%</span></li>`;
          }).join("")}</ul>`
        : `<p class="vazio">Nenhum treino registrado ainda. Marque as séries durante o treino e elas aparecem aqui.</p>`}
      </main>
      ${nav("historico")}`;
  }

  function telaOrientacoes() {
    const plano = planoAtual();
    $app.innerHTML = `
      <header class="topo">
        <div class="logo">${I.info}</div><h1>Orientações</h1>
        <button class="plano-btn" id="trocar-plano" aria-label="Trocar treino (atual: ${esc(plano.nome)})">
          ${I.swap}<span>${esc(plano.nome)}</span>
        </button>
      </header>
      <main class="conteudo">
        <p class="rotulo">${esc(plano.nome)} · ${esc(plano.descricao)}</p>
        ${plano.orientacoes.map((sec) => `
          <h3 class="sec">${esc(sec.titulo)}</h3>
          <ul class="orient">${sec.itens.map((o) => `<li>${esc(o)}</li>`).join("")}</ul>`).join("")}
        <p class="nota">As ilustrações são referências. Use a orientação da treinadora para confirmar posicionamento e execução no equipamento.</p>
        <button class="btn-sec" id="limpar">Apagar histórico e cargas</button>
      </main>
      ${nav("orientacoes")}`;
    document.getElementById("trocar-plano").onclick = () => abrirSeletorPlano(telaOrientacoes);
    document.getElementById("limpar").onclick = () => {
      if (confirm("Apagar todo o histórico e as cargas registradas?")) {
        db = { sessoes: {}, favoritos: db.favoritos, cargas: {}, plano: db.plano };
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
