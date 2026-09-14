# Cómo deployar el landing (guelux.com) — Netlify

> Este repo (`gueluxsystems/gueluxsystems.github.io`) es el que sirve **guelux.com**.
> Lo publica **Netlify**, y el sitio **está conectado a este repo de GitHub**:
> **un `git push` a `main` deploya solo.** No hace falta CLI para el flujo normal.
>
> Última verificación: **2026-09-14** — se pusheó `fd1f17c` a `main` (sin correr ningún CLI)
> y el cambio quedó vivo en `https://guelux.com` a los pocos minutos.

---

## TL;DR — el flujo normal (3 pasos)

Trabajás en el clon local: **`~/Downloads/guelux-web`** (⚠️ NO en `guelux-web-nueva`, ver abajo).

```bash
cd ~/Downloads/guelux-web
# 1. editás los archivos (index.html, styles.css, main.js, /muebleria, /gastronomia, etc.)
git add -A
git commit -m "fix(landing): descripción del cambio"
# 2. pushear a main → Netlify buildea y publica solo
git push origin main
# 3. verificar (ver sección "Cómo verificar que salió en vivo")
```

Eso es todo. En 1–3 min queda en `https://guelux.com`.

---

## Cómo verificar que salió en vivo

**Opción rápida (terminal)** — buscás un pedacito del cambio en el archivo servido:

```bash
# ej.: confirmar que el cambio de CSS ya está publicado
curl -s "https://guelux.com/styles.css" | grep "loQueCambiaste"

# confirmar que lo sirve Netlify (no GitHub Pages)
curl -sI https://guelux.com | grep -i "server\|x-nf-request-id"
# -> server: Netlify   /   x-nf-request-id: ...
```

Si ves tu cambio en el archivo servido → salió. Si ves lo viejo → el build todavía
corre o se saltó (ver "Gotcha 1").

**Opción panel:** Netlify → sitio `guelux-sistemas` → pestaña **Deploys**.
El deploy nuevo aparece como `Production: main@<hash>` y pasa por
`Building` → `Uploaded` → **`Published`**. Cuando dice **Published**, ya está en vivo.

---

## Gotchas (leer antes de asumir que algo falló)

### Gotcha 1 — Build "Skipped" por créditos (free tier)
Netlify free tiene un tope mensual de minutos de build. Cuando se agota, los deploys
aparecen como **"Skipped due to account credit usage exceeded"** y **NO publican**
(el sitio se queda en el commit anterior). Pasó el **28/8/2026** con los demos de
gastronomía y estética: quedaron trabados hasta que **se resetearon los créditos en
septiembre** y el siguiente push los publicó.

- **Se resetea solo cada mes.** Si es urgente y estás sin crédito → subir de plan,
  o usar el fallback por CLI (abajo), que no consume minutos de build de la misma bolsa.
- **Cómo detectarlo:** en Deploys el estado dice "Skipped", y tu cambio no aparece
  con `curl`.

### Gotcha 2 — Editar en la carpeta correcta
`~/Downloads/guelux-web-nueva` es un **rediseño suelto** (un solo `index.html`),
**NO es git y NO está conectado a ningún deploy.** Editar ahí NO sale en vivo.
Todo cambio que tenga que publicarse va en **`~/Downloads/guelux-web`** (este repo).

### Gotcha 3 — GitHub Pages existe pero NO es lo que ves
Este repo se llama `gueluxsystems.github.io`, así que GitHub también publica una copia
en `https://gueluxsystems.github.io` (GitHub Pages). **Pero `guelux.com` lo sirve Netlify**
(el DNS apunta a Netlify, `A 75.2.60.5`). Si dudás de qué estás mirando, mirá siempre
`https://guelux.com` — es lo que ve el cliente — y confirmá el header `server: Netlify`.

---

## Fallback: deploy manual por CLI (rara vez necesario)

Solo si el auto-deploy por git no alcanza (p. ej. sin créditos y urgente, o querés
publicar un preview del working tree sin commitear):

```bash
cd ~/Downloads/guelux-web
npx netlify-cli deploy --prod
# hay auth guardada en ~/Library/Preferences/netlify/config.json
# (el CLI no está instalado global → se corre con npx)
```

⚠️ El CLI publica el **directorio** (working tree tal cual está), así que arrastra
cambios sin commitear. Para el flujo normal, preferí `git push` (queda versionado).

---

## Datos clave

| Dato | Valor |
|---|---|
| URL en vivo | https://guelux.com (alias `guelux-sistemas.netlify.app`) |
| Netlify site | `guelux-sistemas` · site ID `5730bc72-eb87-43c0-b19d-de2abca2f4c2` |
| Repo | `gueluxsystems/gueluxsystems.github.io` (público) |
| Clon local | `~/Downloads/guelux-web` (remote = ese GitHub, tiene `CNAME=guelux.com`) |
| Branch que deploya | `main` |
| DNS | Namecheap → `A 75.2.60.5`, `www` CNAME → `guelux-sistemas.netlify.app` |

> Mapa de infra completo (dónde vive/deploya cada cosa): `guelux-os/docs/infra-map.md`.
