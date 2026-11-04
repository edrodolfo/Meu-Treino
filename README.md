# Meu Treino

PWA simples com o plano semanal de musculação (seg–sex), ilustrações dos exercícios,
marcação de séries, registro de carga, timer de descanso e histórico. Funciona offline
depois do primeiro acesso. Os dados ficam salvos apenas no celular (localStorage).

## Publicar no GitHub Pages

1. Envie este repositório para o GitHub.
2. Em **Settings → Pages**, escolha **Deploy from a branch**, branch `main`, pasta `/ (root)`.
3. Acesse `https://<seu-usuario>.github.io/<repositorio>/` no celular e use
   **Adicionar à tela inicial** (Safari) ou **Instalar app** (Chrome).

## Editar o treino

Exercícios, séries e repetições ficam em [`data.js`](data.js). Ao mudar qualquer arquivo,
aumente `VERSAO` em [`sw.js`](sw.js) para garantir que o celular baixe a atualização.
