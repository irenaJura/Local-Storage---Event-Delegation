const addItems = document.querySelector('.add-items'); // form
const itemsList = document.querySelector('.plates'); // ul
//const items = []; // store data in an array of objects, name and done status
// try to get items from local storage or fall back to empyt array
const items = JSON.parse(localStorage.getItem('items')) || []; // parse will change them back into objects
const deleteButton = document.querySelector('.delete');
const helpButtons = document.querySelectorAll('.help-buttons');


// function to add an item and make an object to put in array
function addItem(e) {
    e.preventDefault(); // prevent reloading and sending the data 
    // console.log(e.target);
    // grab the input box, this is the actual form we're typing in
    // in case there's more forms on the page
    const text = (this.querySelector('[name=item]')).value; // input.value
    // take the text from this box and put it in an object
    // first make an item
    const item = {
        text,
        done: false // not checked by default
    };
    //console.log(item);
    // push item into array
    items.push(item);
    console.log(items);
    // every time we add an item, we call populateList
    // which creates an li with a label
    populateList(items, itemsList);
    // when we populate the list,
    // we need to set items array into local storage
    localStorage.setItem('items', JSON.stringify(items)); // key value store, both must be strings strings!
    this.reset(); // resets input
}

// function to create html
// needs a list of plates to populate, stored in items array
// plates is an empty array in case we forget to pass in smt
// it's going to loop over an empty array, it wont break our JS
// second thing we need, is a place to put the HTML
function populateList(plates = [], platesList) {
    // map over every plate (item) and give it an index number
    // map will take an array of raw data and return an array of other data
    // in this case it will take an object and return a string
    // we need to stick it in a variable or directly into html
    platesList.innerHTML = plates.map((plate, i) => {
        // input id has to be the same as label for
        // ternary operator to check done status
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
                <label for="item${i}">${plate.text}</label>
            </li>
        `;
    }).join(''); // map returns an array, but we need a string, .join('') turns everything into a big string
}

// function to toggle done status
// inputs with checkboxes not on the page on page load
// so we add the event listener to parent elemet
// and inside it we check if it's the actual thing we want
// that's called event delegation
function toggleDone(e) {
    // check if the target matches what we're looking for
    if (!e.target.matches('input')) return; // skip unless it's an input
    // console.log(e.target);
    // we wanna find the item that is checked 
    // and change done to true and vise versa
    // get data-index value
    const el = e.target;
    // console.log(el.dataset.index);
    const index = el.dataset.index;
    items[index].done = !items[index].done; 
    // access done property
    // set it to the opposite of itself
    // again update local storage and run populateList
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

// function that deletes the whole list
// from local storage and the html
function deleteList(e) {
    localStorage.clear();
    populateList([], itemsList);
}

// function to toggle all items to checked or unchecked,
// depending on whick button was clicked
function handleButtons(e) {  
    // console.log(e.target.name);
    // we need to know the index
    items.forEach((item, index) => {
      e.target.name === 'checkAll'
        ? (items[index].done = true)
        : (items[index].done = false)
    })
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
  }

addItems.addEventListener('submit', addItem); // click the button
itemsList.addEventListener('click', toggleDone); // listen for the click on items list (ul)
deleteButton.addEventListener('click', deleteList); // click on delete button
helpButtons.forEach(button => button.addEventListener('click', handleButtons)); // add listener on both check and uncheck buttons
// localStorage is an object in the browser
// list of things saved in domain you're working on
// after we have stringified items, we need to put it back into array of objects
// on page load we need to populateList as very last thing
populateList(items, itemsList);
// items does not exist yet, so go back to const items = [] and fix it