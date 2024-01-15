const myLibrary = [];
let delCounter = 0;
let upCounter = 0;

// Object constructor for books
function Book(id, title, author, pages, read) {
  this.id = id;
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

// Prototype function to toggle a book's 'read' property
Book.prototype.toggleRead = function () {
  console.log(this.title);
};

function addBookToLibrary(id, title, author, pages, read) {
  myLibrary.push(new Book(id, title, author, pages, read));
}

// Populates the table and adds 'Delete' Button
function displayBook() {
  const libTable = document.querySelector("#lib-table");
  // Only update the table with the most recent entry to myLibrary array
  let lastIndex = myLibrary.length - 1;
  let lastEntry = myLibrary[lastIndex];
  const dataRow = libTable.insertRow();

  // Toggle to ensure first 'ID' property of objects isn't recorded
  let firstPropertySkipped = false;
  for (const key in lastEntry) {
    if (!firstPropertySkipped) {
      firstPropertySkipped = true;
      continue;
    }

    // Check if the property is a function, and skip it
    if (typeof lastEntry[key] === "function") {
      continue;
    }

    // Adds text content to each cell in the table
    const td = dataRow.insertCell();
    td.textContent = lastEntry[key];
  }

  // Handles the logic for the UPDATE STATUS button in the table
  const upCell = dataRow.insertCell();
  const upButton = document.createElement("button");
  upButton.setAttribute("obj-id", upCounter++);
  upButton.textContent = "Change Status";
  upButton.addEventListener("click", (event) => {
    let objectID = event.target.getAttribute("obj-id");
    let foundObject = myLibrary.find((obj) => obj.id == objectID);
    if (foundObject.read === "Yes") {
      foundObject.read = "No";
    } else if (foundObject.read === "No") {
      foundObject.read = "Yes";
    }

    let row = event.target.parentNode.parentNode;
    let completedCell = row.cells[3];
    completedCell.textContent = foundObject.read;
  });
  upCell.appendChild(upButton);
  // user clicks button
  // book object 'read' status is updated using an IF statement to yes or no
  // status cell text content is updated to reflect book object 'read' status

  // Handles the logic for the DELETE buttons in the table
  const delCell = dataRow.insertCell();
  const delButton = document.createElement("button");
  delButton.setAttribute("del-id", delCounter++);
  delButton.textContent = "X";
  delButton.addEventListener("click", (event) => {
    let row = event.target.parentNode.parentNode;
    let table = row.parentNode;
    table.deleteRow(row.rowIndex);
    // Deletes the corresponding book object from myLibrary array by searching for its ID in the array, then returning an index position to be spliced out.
    let delID = event.target.getAttribute("del-id");
    let foundDelObjectIndex = myLibrary.findIndex((obj) => obj.id == delID);
    myLibrary.splice(foundDelObjectIndex, 1);
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

  addBookToLibrary(delCounter, title, author, pages, readValue);
  displayBook();
  resetForm();
}
