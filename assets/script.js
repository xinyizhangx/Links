let button = document.querySelector("#btn-enter");

button.onclick = () => {
  if (!document.querySelector(".warning")) {
    let dialog = document.createElement("div");
    let span = document.createElement("span");
    let span2 = document.createElement("span");
    span.innerHTML = `🤗 Welcome to White Noise Oasis. 🤗 Every click is an unexpected journey. Here, each circle is the key to a new world. Are you ready to explore your exclusive tranquility?`;
    span.classList.add("textAlert");
    span2.innerHTML = "➡️";
    dialog.appendChild(span);
    dialog.appendChild(span2);
    dialog.className = "warning";
    span2.className = "close-btn";
    span2.onclick = () => {
      document.body.removeChild(dialog);
    };
    document.body.appendChild(dialog);
  }
};
