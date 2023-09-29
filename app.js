// Select elements

// User input 
const input = document.getElementById("itemInput");
// ul list element
const ul = document.getElementById("list");
// Add task/item button
const add = document.getElementById("addItem");
// Clear all tasks/items button
const clear = document.getElementById("clear");
// Get dark/light mode button
const darkModeBtn = document.getElementById("darkMode");
// Get date elements
const displayDate = document.getElementById('dateText');
const dayOfWeek = document.getElementById('dayOfWeek');
// Error message element
const error = document.getElementById("errormsg");

// Create Today's Date 
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const dateObj = new Date();
const day = dateObj.getDate();
const weekday = daysOfWeek[dateObj.getDay()];
const month = dateObj.toLocaleString("default", { month: "long" });
const year = dateObj.getFullYear();

// Add st, nd and rd to date
const nthNumber = (number) => {
    if (number > 3 && number < 21) return "th";
    switch (number % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
};


// Display Date
const todayDate = `${day}${nthNumber(day)} ${month} ${year}`;
displayDate.innerText = `${todayDate}`;
dayOfWeek.innerText = `${weekday}`;

// Dark mode function
const darkMode = () => {
    let bg = document.body;
    bg.classList.toggle("dark-mode");

    let container = document.querySelector(".container");
    container.classList.toggle("dark-mode-container");

    let input = document.querySelector("input");
    input.classList.toggle("dark-mode-container");

    if (darkModeBtn.innerHTML === '<i class="fa-solid fa-moon"></i>') {
        darkModeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
    } else {
        darkModeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
    };
};


// If the toDoItems array already exists then get the items, if it doesn't create an empty array
// condition ? expression1 (true) : expression2 (false)
let itemsList = localStorage.getItem("toDoItems") ? JSON.parse(localStorage.getItem("toDoItems")) : [];

// Function to display each task in the itemsList array to the user
const showItems = (task) => {
    const li = document.createElement("li");
    const bin = document.createElement("button");
    bin.classList.add("bin");
    li.textContent = task;
    bin.textContent = "";
    li.append(bin);
    ul.appendChild(li);

    const checked = document.createElement("span");
    checked.classList.add("checked");
    checked.innerText = "";
    li.prepend(checked);

};


// Function to cross through completed items
const checked = (e) => {
    $(e.target).closest('li').toggleClass('completed');
};

// Function to delete individual items and remove them from local storage
const binItem = (e) => {

    // Find items index number in array
    let index = $(e.target).closest('li').index()

    // remove that index from to do items array
    itemsList.splice(index, 1);

    // reset items to local storage
    localStorage.setItem('toDoItems', JSON.stringify(itemsList));

    // remove it from the display
    $(e.target).closest('li').remove();
};


// Go through each task (item) in the itemsList array
itemsList.forEach(showItems);

// function to add task on 'add item' button and save item to local storage
const addItem = () => {
    if (input.value == "") {
        error.style.display = "block";
    } else {
        error.style.display = "none";
        itemsList.push(input.value); // add the input value to the task/items array
        localStorage.setItem('toDoItems', JSON.stringify(itemsList)); // save the items to local storage
        showItems(input.value); // display the input value using the showItems() function
        input.value = ''; // clear the input
    };

};


// function to clear all tasks on 'clear' button
// remove all from local storage using clear()
const clearAll = () => {
    localStorage.clear(); // clear local storage
    ul.innerHTML = ""; // remove all li (list) elements
    itemsList = []; // delete everything from the array
};


// Event listeners
add.addEventListener('click', addItem);
clear.addEventListener('click', clearAll);
darkModeBtn.addEventListener('click', darkMode);
$("#list").on("click", ".bin", binItem);
$("#list").on("click", ".checked", checked);
