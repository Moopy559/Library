const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

addBookToLibrary("Lord of the Rings", "Sammo", "25", "No");
addBookToLibrary("Poo Bum", "Mumen", "46", "No");
addBookToLibrary("Captain Underpants", "Matthew", "97", "Yes");

function displayBook() {
  const libTable = document.querySelector("#lib-table");

  for (let i = 0; i < myLibrary.length; i++) {
    const dataRow = libTable.insertRow();
    for (const key in myLibrary[i]) {
      const td = dataRow.insertCell();
      td.textContent = myLibrary[i][key];
    }
  }
}

displayBook();
