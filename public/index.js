const form = document.querySelector("form");
const response = document.getElementById("response");

form.addEventListener("submit", event => {
  event.preventDefault();
  const url = form.elements.url.value;
  const slug = form.elements.slug.value;
  const body = { url: url, slug: slug };
  fetch("/api/create", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => response.json())
    .then(json => {
      if (json.success === true) {
        response.innerHTML = `<p><a href="https://${window.location.hostname}/${json.slug}">https://${window.location.hostname}/${json.slug}</a></p>
        <p><b>Delete token:</b></p>
        <input class="copy" readonly="readonly" style="cursor:pointer" value="${json.token}" id="token" onclick="copytoken()" />
        `;
       const notyfsuc = new Notyf();
  notyfsuc.success(`URL created with success`);
      } else {
        response.innerHTML = "";
          const notyfer = new Notyf();
  notyfer.error(`An error ocurred: ${json.error}`);
      }
      form.reset();
    });
});

function copytoken() {
  document.getElementById("token").select();
  document.execCommand("copy");
  const notyf = new Notyf();
  notyf.success("Copied to Clipboard");
  window.getSelection().removeAllRanges()
}
