let myLibrary = [
    { title: "Dark Matter", author: "Blake Crouch", pages: 245, read: true },
    { title: "A Farewell to Arms", author: "Ernest Hemingway", pages: 245, read: true },
];

let booksDisplay = document.querySelector(".books");
let newBookButton = document.querySelector("button");
let newBookForm = document.querySelector(".newBookForm");
let cancelButton = document.querySelector("#cancel");
let submitButton = document.querySelector("#submit");
let removeButtons = document.querySelectorAll(".remove");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function displayBooks() {
    booksDisplay.innerHTML = "";
    for (let book in myLibrary) {
        let newDiv = document.createElement("div");
        newDiv.innerHTML = `
        <span class="bookTitle">${myLibrary[book].title}</span> <p>by ${myLibrary[book].author}</p>
        <button class="remove" data-id="${book}">Remove from Library</button>
        `;
        newDiv.classList.add("card");
        newDiv.dataset.id = book;
        booksDisplay.appendChild(newDiv);
    }
}

function clearInputs() {
    let inputs = document.querySelectorAll("input");
    for (let input in inputs) {
        input.value = "";
    }
}

function processInputs(e) {
    e.preventDefault();
    let data = new FormData(newBookForm);
    let keys = ["title", "author", "pages", "read"];
    let attributes = { title: "", author: "", pages: "", read: "" };
    for (let i = 0; i < keys.length; i++) {
        if (data.has(keys[i])) {
            attributes[keys[i]] = data.get(keys[i]);
        } else {
            attributes[keys[i]] = false;
        }
    }
    addBookToLibrary(attributes.title, attributes.author, attributes.pages, attributes.read);
    displayBooks();
}

document.addEventListener("DOMContentLoaded", function () {
    displayBooks();
    newBookButton.addEventListener("click", function () {
        newBookForm.classList.remove("formHidden");
    });
    cancelButton.addEventListener("click", function () {
        clearInputs();
        newBookForm.classList.add("formHidden");
    });
    newBookForm.addEventListener("submit", processInputs);

    removeButtons.forEach(function (elem) {
        elem.addEventListener("click", removeBook(elem));
    });
});
