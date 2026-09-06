let button = document.querySelector("#btn-enter");

const rings = Array.from({ length: 9 }, (_, i) => {
  const r = 18 + i * 24;
  return `<ellipse cx="230" cy="100" rx="${r}" ry="${(r * 0.34).toFixed(1)}"/>`;
}).join("");

const ripple = `<svg class="ripple" viewBox="0 0 460 200" aria-hidden="true">
  <g fill="none" stroke="#adb5bd" stroke-width="1" stroke-dasharray="1 4" stroke-linecap="round">${rings}</g>
  <g class="ripple-wave" fill="none" stroke="#868e96" stroke-width="1.2">
    <ellipse cx="230" cy="100" rx="20" ry="6.8"/>
    <ellipse cx="230" cy="100" rx="20" ry="6.8"/>
    <ellipse cx="230" cy="100" rx="20" ry="6.8"/>
  </g>
</svg>`;

button.onclick = () => {
  if (document.querySelector(".warning")) return;

  const backdrop = document.createElement("div");
  backdrop.className = "warning-backdrop";

  const dialog = document.createElement("div");
  dialog.className = "warning";
  dialog.setAttribute("role", "dialog");
  dialog.innerHTML = `
    <button class="close-btn" type="button" aria-label="Close">&times;</button>
    <p class="textAlert">
      <strong>White Noise Oasis</strong>
      Every circle hides a sound.<br>Pick one and drift away.
    </p>
    <button class="enter-btn" type="button">Start listening</button>
    ${ripple}`;

  const close = () => {
    dialog.classList.add("is-leaving");
    backdrop.classList.add("is-leaving");
    document.removeEventListener("keydown", onKey);
    setTimeout(() => {
      dialog.remove();
      backdrop.remove();
    }, 250);
  };
  const onKey = (e) => {
    if (e.key === "Escape") close();
  };

  dialog.querySelector(".close-btn").onclick = close;
  dialog.querySelector(".enter-btn").onclick = close;
  backdrop.onclick = close;
  document.addEventListener("keydown", onKey);

  document.body.append(backdrop, dialog);
  dialog.querySelector(".enter-btn").focus();
};
