const addItems = document.querySelector('.add-items'); // form
const itemsList = document.querySelector('.plates'); // ul
const items = []; // store data in an array of objects, name and done status

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

addItems.addEventListener('submit', addItem); // click the button

