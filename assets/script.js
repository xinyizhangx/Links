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

const WELCOME_KEY = "wno-welcomed";
const remember = (k) => { try { localStorage.setItem(k, "1"); } catch (_) {} };
const seen = (k) => { try { return !!localStorage.getItem(k); } catch (_) { return true; } };

// after the card closes, light up the circles in view one after another
const cueCircles = () => {
  const inView = [...document.querySelectorAll(".w")].filter((el) => {
    const r = el.getBoundingClientRect();
    return r.bottom > 0 && r.top < innerHeight;
  });
  inView.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add("is-cue");
      setTimeout(() => el.classList.remove("is-cue"), 500);
    }, 120 + i * 70);
  });
};

const openDialog = () => {
  if (document.querySelector(".warning")) return;

  const backdrop = document.createElement("div");
  backdrop.className = "warning-backdrop";

  const dialog = document.createElement("div");
  dialog.className = "warning";
  // start the card from the button's centre so it grows out of it
  const b = button.getBoundingClientRect();
  dialog.style.setProperty("--dx", `${b.left + b.width / 2 - innerWidth / 2}px`);
  dialog.style.setProperty("--dy", `${b.top + b.height / 2 - innerHeight / 2}px`);
  dialog.setAttribute("role", "dialog");
  dialog.innerHTML = `
    <button class="close-btn" type="button" aria-label="Close">&times;</button>
    <p class="textAlert">
      <strong>White Noise Oasis</strong>
      Every circle hides a sound.<br>Pick one and drift away.
    </p>
    <button class="enter-btn" type="button">listen</button>
    ${ripple}`;

  const close = () => {
    dialog.classList.add("is-leaving");
    backdrop.classList.add("is-leaving");
    document.removeEventListener("keydown", onKey);
    setTimeout(() => {
      dialog.remove();
      backdrop.remove();
      cueCircles();
    }, 400);
    remember(WELCOME_KEY);
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

button.onclick = openDialog;

if (!seen(WELCOME_KEY)) {
  setTimeout(openDialog, 700);
}
