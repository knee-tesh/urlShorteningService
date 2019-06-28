const form = document.querySelector('.url');
const result = document.querySelector('.result');
form.addEventListener('submit', event => {
  event.preventDefault();

  const input = document.querySelector('.url-input');
  fetch('/new', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      url: input.value,
    })
  })
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .then(data => {
      while (result.hasChildNodes()) {
        result.removeChild(result.lastChild);
      }

      result.insertAdjacentHTML('afterbegin', `
        <div class="resultDiv">
          <a target="_blank" class="short-url" rel="noopener" href="/${data.short_id}">
            ${location.origin}/${data.short_id}
          </a>
        </div>
      `)
    })
    .catch(console.error)
});
