fetch('book.xml')
  .then(response => {
    if (!response.ok)
      throw new Error('Fetch error: ' + response.status);
    else
      return response.text();
  })
  .then(xmlText => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');

    const container = document.getElementById('books');
    const books = xmlDoc.getElementsByTagName('book');

    for (let i = 0; i < books.length; i++) {
      const book = books[i];
      const id = book.getAttribute('id');
      const title = book.getElementsByTagName('title')[0].textContent;
      const author = book.getElementsByTagName('author')[0].textContent;
      const price = book.getElementsByTagName('price')[0].textContent;

      const card = document.createElement('div');
      card.className = 'book-card';
      card.innerHTML = `
        <h2>${title}</h2>
        <p><strong>ID:</strong> ${id}</p>
        <p><strong>Author:</strong> ${author}</p>
        <p><strong>Price:</strong> $${price}</p>
      `;
      container.appendChild(card);
    }
  })
  .catch(err => console.error('Fetch error: ' + err.message));