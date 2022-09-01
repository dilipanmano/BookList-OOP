//Book Constructor
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI Constructor
function UI() {}

UI.prototype.addBookToList = function (book) {
  const list = document.getElementById("table-list");
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
  list.appendChild(row);
};

//Event Lisner
const form = document.getElementById("book-form");
form.addEventListener("submit", formSubmit);

function formSubmit(e) {
  const title = document.getElementById("book-title").value,
    author = document.getElementById("book-author").value,
    isbn = document.getElementById("book-isbn").value;

  const newBook = new Book(title, author, isbn);

  //console.log(newBook);

  const ui = new UI();
  ui.addBookToList(newBook);

  e.preventDefault();
}
