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
        let readButton = document.createElement("button");
        readButton.dataset.id = book;
        readButton.classList.add("read");
        if (myLibrary[book].read) {
            readButton.innerText = "Mark as Unread";
            readButton.dataset.status = true;
        } else {
            readButton.innerText = `Mark as Read`;
            readButton.dataset.status = false;
        }
        readButton.addEventListener("click", function () {
            toggleReadStatus(this, book, myLibrary[book].read);
        });
        let buttonDiv = document.createElement("div");
        buttonDiv.classList.add("bookButtons");
        newDiv.appendChild(buttonDiv);
        buttonDiv.appendChild(readButton);
        buttonDiv.appendChild(removeButton);
        newDiv.classList.add("card");
        newDiv.dataset.id = book;
        booksDisplay.appendChild(newDiv);
    }
}

function processInputs(e) {
    e.preventDefault();
    let data = new FormData(newBookForm);
    console.log(data);
    let keys = ["title", "author", "pages", "read"];
    let attributes = { title: "", author: "", pages: "", read: "" };
    for (let i = 0; i < keys.length - 1; i++) {
        if (data.has(keys[i])) {
            attributes[keys[i]] = data.get(keys[i]);
        } else {
            attributes[keys[i]] = false;
        }
    }
    if (data.has(keys[3])) {
        attributes[keys[3]] = true;
    } else {
        attributes[keys[3]] = false;
    }

    addBookToLibrary(attributes.title, attributes.author, attributes.pages, attributes.read);
    displayBooks();
    newBookForm.reset();
}

function removeBook(id) {
    myLibrary.splice(id, 1);
    displayBooks();
}

function toggleReadStatus(element, bookID, status) {
    console.log(bookID);
    if (status) {
        element.innerText = "Mark as Read";
        element.dataset.status = false;
        myLibrary[bookID].read = false;
    } else {
        element.innerText = "Mark as Unread";
        element.dataset.status = true;
        myLibrary[bookID].read = true;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    displayBooks();

    newBookButton.addEventListener("click", function () {
        newBookForm.classList.remove("formHidden");
    });

    cancelButton.addEventListener("click", function () {
        newBookForm.reset();
        newBookForm.classList.add("formHidden");
    });

    newBookForm.addEventListener("submit", processInputs);
});
