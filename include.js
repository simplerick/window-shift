document.querySelectorAll("[data-markdown]").forEach(element => {
  fetch(element.dataset.markdown)
    .then(r => r.text())
    .then(text => element.textContent = text);
});

document.querySelectorAll("[data-include]").forEach(element => {
  fetch(element.dataset.include)
    .then(r => r.text())
    .then(html => element.innerHTML = html);
});