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

UI.prototype.showAlert = function (message, className) {
  const div = document.createElement("div");
  div.className = `alert ${className}`;
  div.appendChild(document.createTextNode(message));

  const container = document.querySelector(".container");
  const formBody = document.querySelector("#book-form");

  container.insertBefore(div, formBody);

  setTimeout(function () {
    document.querySelector(".alert").remove();
  }, 3000);
};

UI.prototype.clearFields = function () {
  document.getElementById("book-title").value = "";
  document.getElementById("book-author").value = "";
  document.getElementById("book-isbn").value = "";
};

UI.prototype.deleteRecord = function (target) {
  if (target.classList.contains("delete")) {
    target.parentElement.parentElement.remove();
  }
};

//Event Lisner
const form = document.getElementById("book-form");
form.addEventListener("submit", formSubmit);

function formSubmit(e) {
  const title = document.getElementById("book-title").value,
    author = document.getElementById("book-author").value,
    isbn = document.getElementById("book-isbn").value;

  const newBook = new Book(title, author, isbn);
  const ui = new UI();

  if (title === "" || author === "" || isbn === "") {
    ui.showAlert("Please fill all fields", "error");
  } else {
    ui.showAlert("Book Added", "success");
    ui.addBookToList(newBook);
    ui.clearFields();
  }

  e.preventDefault();
}

//event listner for delete
document.querySelector("#table-list").addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteRecord(e.target);
  ui.showAlert("Book Deleted", "success");
  e.preventDefault();
});
