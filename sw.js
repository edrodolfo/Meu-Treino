// Aumente a versão sempre que mudar algum arquivo, para o app atualizar no celular.
const VERSAO = "meutreino-v2";

const IMGS = [
  ...[
    "abdutora", "bulgaro", "desenvolvimento", "extensora", "flexora_sentada", "hack",
    "hip_thrust", "lateral_polia", "leg_press", "leg_unilateral", "pulldown_corda", "puxada",
    "remada", "remada_alta", "rosca_martelo", "rosca_polia", "stiff", "sumo_kb", "supino",
    "supino_declinado", "terra_sumo", "triceps_maquina", "triceps_polia"
  ].map((n) => `img/${n}.webp`),
  ...[
    "goblet", "afundo", "remada_halter", "abdominal", "supino_halteres", "desenvolvimento_halteres",
    "elevacao_lateral", "face_pull", "step_up", "coice_polia"
  ].map((n) => `img/${n}.svg`)
];

const ARQUIVOS = [
  "./", "index.html", "styles.css", "app.js", "data.js", "manifest.webmanifest",
  "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png",
  ...IMGS
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(VERSAO).then((c) => c.addAll(ARQUIVOS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== VERSAO).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Imagens e ícones: cache primeiro. Páginas, CSS e JS: rede primeiro (pega atualizações),
// com o cache como reserva para funcionar offline na academia.
self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  const guardar = (resp) => {
    if (resp.ok) { const copia = resp.clone(); caches.open(VERSAO).then((c) => c.put(req, copia)); }
    return resp;
  };
  if (/\.(webp|png|svg)$/.test(new URL(req.url).pathname)) {
    e.respondWith(caches.match(req).then((r) => r || fetch(req).then(guardar)));
  } else {
    e.respondWith(fetch(req).then(guardar).catch(() => caches.match(req, { ignoreSearch: true })));
  }
});
