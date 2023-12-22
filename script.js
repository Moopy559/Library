const myLibrary = [];
let delCounter = 1;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

// Populates the table and adds 'Delete' Button
function displayBook() {
  const libTable = document.querySelector("#lib-table");
  let lastIndex = myLibrary.length - 1;
  let lastEntry = myLibrary[lastIndex];

  const dataRow = libTable.insertRow();
  for (const key in lastEntry) {
    const td = dataRow.insertCell();
    td.textContent = lastEntry[key];
  }
  // Handles the logic for the DELETE buttons in the table
  const delCell = dataRow.insertCell();
  const delButton = document.createElement("button");
  delButton.setAttribute("id", "delbut" + delCounter++);
  delButton.textContent = "X";
  delButton.addEventListener("click", (event) => {
    console.log(event.target);
    let row = event.target.parentNode.parentNode;
    console.log(row);
    let table = row.parentNode;
    console.log(table);
    console.log(row.rowIndex);
    table.deleteRow(row.rowIndex);
  });
  delCell.appendChild(delButton);
}

// Resets the form to its initial state
function resetForm() {
  const inputs = document.querySelectorAll("input");

  inputs.forEach((input) => {
    input.value = "";
    input.checked = false;
  });
}

// Submits the form data to be populated
function submitForm() {
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  let readValue = "";
  const readYes = document.getElementById("read-yes");
  if (readYes.checked) {
    readValue = "Yes";
  } else {
    readValue = "No";
  }

  addBookToLibrary(title, author, pages, readValue);
  displayBook();
  resetForm();
}
