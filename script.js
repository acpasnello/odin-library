let myLibrary = [new Book("Dark Matter", "Blake Crouch", 245, true), new Book("A Farewell to Arms", "Ernest Hemingway", 245, true)];

let booksDisplay = document.querySelector(".books");
let newBookButton = document.querySelector("button");
let newBookForm = document.querySelector(".newBookForm");
let cancelButton = document.querySelector("#cancel");
let submitButton = document.querySelector("#submit");

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
        <p>${myLibrary[book].pages} pages</p>
        `;
        let removeButton = document.createElement("button");
        removeButton.innerText = `Remove from Library`;
        removeButton.classList.add("remove");
        removeButton.dataset.id = book;
        removeButton.addEventListener("click", function () {
            removeBook(removeButton.dataset.id);
        });
        let readButton = document.createElement("span");
        if (myLibrary[book].read) {
            readButton.innerText = "Read";
        } else {
            readButton.innerHTML = `<button>Mark as Read</button>`;
        }
        newDiv.appendChild(readButton);
        newDiv.appendChild(removeButton);
        newDiv.classList.add("card");
        newDiv.dataset.id = book;
        booksDisplay.appendChild(newDiv);
    }
}

function clearInputs() {
    let inputs = document.querySelectorAll("input");

    inputs.forEach((input) => {
        input.value = "";
    });
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
    clearInputs();
}

function removeBook(id) {
    console.log(id);
    myLibrary.splice(id, 1);
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
});
