const firstNameInput = document.getElementById("firstName");
const middleNameInput = document.getElementById("middleName");
const lastNameInput = document.getElementById("lastName");
const ageInput = document.getElementById("age");

const mainButton = document.getElementById("mainButton");
const clearInputButton = document.getElementById("clearInputButton");
const clearRecordsButton = document.getElementById("clearRecordsButton");
const saveButton = document.getElementById("saveButton");

const sortField = document.getElementById("sortField");
const sortOrder = document.getElementById("sortOrder");

const tblRecords = document.getElementById("recordsTable");
const noRecords = document.getElementById("noRecords");


let records = JSON.parse(localStorage.getItem("studentRecords")) || [];

let editIndex = -1;


function displayRecords() {

    
    tblRecords.innerHTML = "";

    
    if (records.length === 0) {
        tblRecords.style.display = "none";
        noRecords.style.display = "block";
        return;
    }

    tblRecords.style.display = "table";
    noRecords.style.display = "none";

    const table = document.createElement("table");

    table.style.borderCollapse = "collapse";
    table.style.width = "100%";

    const tblHeader = document.createElement("thead");
    const tblHeaderRow = document.createElement("tr");

    const headers = [
        "First Name",
        "Middle Name",
        "Last Name",
        "Age",
        "Actions"
    ];

    headers.forEach(function(headerText) {

        const th = document.createElement("th");

        th.textContent = headerText;

        // LINE / BORDER
        th.style.border = "1px solid black";
        th.style.padding = "8px";

        tblHeaderRow.appendChild(th);
    });

    // Header Row → Header
    tblHeader.appendChild(tblHeaderRow);

    // Header → Table
    table.appendChild(tblHeader);

    const tblBody = document.createElement("tbody");

    records.forEach(function(record, index) {

        const row = document.createElement("tr");

        const firstNameCell = document.createElement("td");

        firstNameCell.textContent = record.firstName;

        firstNameCell.style.border = "1px solid black";
        firstNameCell.style.padding = "8px";


        const middleNameCell = document.createElement("td");

        middleNameCell.textContent = record.middleName;

        middleNameCell.style.border = "1px solid black";
        middleNameCell.style.padding = "8px";

        const lastNameCell = document.createElement("td");

        lastNameCell.textContent = record.lastName;

        lastNameCell.style.border = "1px solid black";
        lastNameCell.style.padding = "8px";

        const ageCell = document.createElement("td");

        ageCell.textContent = record.age;

        ageCell.style.border = "1px solid black";
        ageCell.style.padding = "8px";

        const actionCell = document.createElement("td");

        actionCell.style.border = "1px solid black";
        actionCell.style.padding = "8px";


        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";

        deleteButton.onclick = function() {
            deleteRecord(index);
        };

        const editButton = document.createElement("button");

        editButton.textContent = "Edit";

        editButton.onclick = function() {
            editRecord(index);
        };

        actionCell.appendChild(deleteButton);
        actionCell.appendChild(editButton);

        row.appendChild(firstNameCell);
        row.appendChild(middleNameCell);
        row.appendChild(lastNameCell);
        row.appendChild(ageCell);
        row.appendChild(actionCell);

        tblBody.appendChild(row);

    });

    table.appendChild(tblBody);

    tblRecords.appendChild(table);

}

mainButton.addEventListener("click", function() {

    const firstName = firstNameInput.value.trim();
    const middleName = middleNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const age = ageInput.value.trim();


    if (
        firstName === "" ||
        middleName === "" ||
        lastName === "" ||
        age === ""
    ) {

        alert("Please fill in all fields.");

        return;
    }

    if (editIndex !== -1) {

        records[editIndex] = {

            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            age: age

        };

        alert("Record updated successfully.");

        editIndex = -1;

        mainButton.textContent = "Insert";

    }

    else {

        const newRecord = {

            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            age: age

        };

        records.push(newRecord);

    }


    localStorage.setItem(
        "studentRecords",
        JSON.stringify(records)
    );


    clearInputs();

    displayRecords();

});

function editRecord(index) {

    const record = records[index];

    firstNameInput.value = record.firstName;
    middleNameInput.value = record.middleName;
    lastNameInput.value = record.lastName;
    ageInput.value = record.age;

    editIndex = index;

    mainButton.textContent = "Update";

    firstNameInput.focus();

}

function deleteRecord(index) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this record?"
    );

    if (!confirmDelete) {
        return;
    }

    records.splice(index, 1);

    localStorage.setItem(
        "studentRecords",
        JSON.stringify(records)
    );

    displayRecords();

}

function clearInputs() {

    firstNameInput.value = "";
    middleNameInput.value = "";
    lastNameInput.value = "";
    ageInput.value = "";

    editIndex = -1;

    mainButton.textContent = "Insert";

}

clearInputButton.addEventListener("click", function() {

    clearInputs();

    firstNameInput.focus();

});

clearRecordsButton.addEventListener("click", function() {

    if (records.length === 0) {
        return;
    }

    const confirmClear = confirm(
        "Are you sure you want to clear all records?"
    );

    if (!confirmClear) {
        return;
    }

    records = [];

    localStorage.removeItem("studentRecords");

    clearInputs();

    displayRecords();
});
saveButton.addEventListener("click", function() {

    localStorage.setItem(
        "studentRecords",
        JSON.stringify(records)
    );

    alert("Records saved to Local Storage.");

});

function sortRecords() {

    const field = sortField.value;
    const order = sortOrder.value;

    records.sort(function(a, b) {

        let valueA = a[field];
        let valueB = b[field];

        if (field === "age") {

            valueA = Number(valueA);
            valueB = Number(valueB);

            return order === "asc"
                ? valueA - valueB
                : valueB - valueA;

        }

        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();


        if (valueA < valueB) {
            return order === "asc" ? -1 : 1;
        }

        if (valueA > valueB) {
            return order === "asc" ? 1 : -1;
        }

        return 0;

    });


    displayRecords();

}

sortField.addEventListener("change", sortRecords);
sortOrder.addEventListener("change", sortRecords);

displayRecords();