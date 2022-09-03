class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const list = document.getElementById("table-list");
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
  }

  showAlert(message, className) {
    const div = document.createElement("div");
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    const container = document.querySelector(".container");
    const formBody = document.querySelector("#book-form");

    container.insertBefore(div, formBody);

    setTimeout(function () {
      document.querySelector(".alert").remove();
    }, 3000);
  }

  clearFields() {
    document.getElementById("book-title").value = "";
    document.getElementById("book-author").value = "";
    document.getElementById("book-isbn").value = "";
  }

  deleteRecord(target) {
    if (target.classList.contains("delete")) {
      target.parentElement.parentElement.remove();
    }
  }
}

// LS - Local Storage
class Store {
  static getBookFromLS() {
    let bookFromLS;
    if (localStorage.getItem("Books") === null) {
      bookFromLS = [];
    } else {
      bookFromLS = JSON.parse(localStorage.getItem("Books"));
    }
    return bookFromLS;
  }

  static addBookToLS(book) {
    let bookFromLS = Store.getBookFromLS();
    bookFromLS.push(book);
    localStorage.setItem("Books", JSON.stringify(bookFromLS));
  }

  static displayBook() {
    let bookFromLS = Store.getBookFromLS();
    bookFromLS.forEach(function (bk) {
      const ui = new UI();
      ui.addBookToList(bk);
    });
  }

  static removeBookFromLS(isbn) {
    let bookFromLS = Store.getBookFromLS();
    bookFromLS.forEach(function (book, index) {
      if (book.isbn === isbn) {
        bookFromLS.splice(index, 1);
      }
    });
    localStorage.setItem("Books", JSON.stringify(bookFromLS));
  }
}

//display from local storage
document.addEventListener("DOMContentLoaded", Store.displayBook());

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
    //add to local storage
    Store.addBookToLS(newBook);
    ui.clearFields();
  }

  e.preventDefault();
}

//event listner for delete
document.querySelector("#table-list").addEventListener("click", function (e) {
  const ui = new UI();
  ui.deleteRecord(e.target);
  //remove from local storage
  Store.removeBookFromLS(
    e.target.parentElement.previousElementSibling.textContent
  );
  ui.showAlert("Book Deleted", "success");
  e.preventDefault();
});
