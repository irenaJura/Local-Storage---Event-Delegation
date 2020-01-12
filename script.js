const addItems = document.querySelector('.add-items'); // form
const itemsList = document.querySelector('.plates'); // ul
const items = []; // store data in an array of objects, name and done status

// function to add an item and make an object to put in array
function addItem(e) {
    e.preventDefault(); // prevent reloading and sending the data 
    // console.log(e.target);
    // grab the input box, this is the actual form we're typing in
    // in case there's more forms on the page
    const text = (this.querySelector('[name=item]')).value;
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
    this.reset(); // resets input
}

addItems.addEventListener('submit', addItem); // click the button

