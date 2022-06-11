const form = document.querySelector("form");
const response = document.getElementById("response");
const notyf = new Notyf();

form.addEventListener("submit", event => {
  event.preventDefault();
  const slug = form.elements.slug.value;
  const body = { slug: slug };
  fetch("/api/stats", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .then(json => {
      if (json.success === true) {
        response.innerHTML = `<p>Slug "${json.slug}"</p><b>Clicks:</b> ${json.stats}<br><b>Redirects to:</b> <a href="${json.url}">${json.url}</a>`;
      } else {
        notyf.error(`Error: ${json.error}` );
      }
      form.reset();
    });
});
