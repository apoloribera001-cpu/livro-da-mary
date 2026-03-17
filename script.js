function checkPassword() {
  const pass = document.getElementById("password").value;

  if (pass === "007@Mary") {
    show("cover");
  } else {
    document.getElementById("error").innerText = "Senha errada";
  }
}

function show(id) {
  document.querySelectorAll(".screen").forEach(el => el.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

let current = 0;
let pages = [];

function abrirLivro() {
  show("book");
  initBook();
}

function initBook() {
  const container = document.getElementById("pages");

  if (container.innerHTML !== "") return;

  for (let i = 6; i <= 20; i++) {
    let div = document.createElement("div");
    div.className = "page";

    let content = document.createElement("div");
    content.className = "linha-texto";
    content.contentEditable = true;
    content.innerHTML = localStorage.getItem("p" + i) || "";

    content.oninput = () => {
      localStorage.setItem("p" + i, content.innerHTML);
    };

    let num = document.createElement("span");
    num.className = "numero";
    num.innerText = i;

    div.appendChild(content);
    div.appendChild(num);
    container.appendChild(div);
  }

  pages = document.querySelectorAll(".page");

  pages.forEach(p => p.classList.remove("active"));
  current = 0;
  pages[current].classList.add("active");

  document.getElementById("next").onclick = () => {
    pages[current].classList.remove("active");
    current = (current + 1) % pages.length;
    pages[current].classList.add("active");
  };

  document.getElementById("prev").onclick = () => {
    pages[current].classList.remove("active");
    current = (current - 1 + pages.length) % pages.length;
    pages[current].classList.add("active");
  };
}
