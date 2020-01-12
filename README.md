### Local storage and event delegation

This project covers the important topic of local storage, that keeps our data on the page even when we refresh it, because the information is saved to browser's local memory.

It also deals with event delegation, the act of setting an event listener to a parent element if its children are not on the page when the page first loads.

We create an items array in which we push our objects, containing the input value and status of unchecked (done: false).

When someone submits an item, we run a function addItem with an event object and immediately run e.preventDefault to stop the page from reloading and submitting data.

We also create an item object to push into items array. There are 2 keys: text value and boolean value.

The next function called populateList displays the submitted info to the page with HTML. Its first parametar is the items array, named plates and set to empty array, and platesList, that returns the html elements.

Inside populateList we map over plates (items), but since map returns another array, we need to convert it to a string. We achieve that by adding .join('') at the end.

There is also the logic to update the checked status as ternary operator inside the input element.

toggleDone function is where we use the event delegation, as our checkboxes are not on the page initially. If our target is input, we use data-index to toggle the value of done for the clicked element. 

Finally, we save the information to local storage. It is a key value store, and they both need to be strings. Hence we have to convert the value into a string using JSON.stringify method.

But when we run populateList, our data type has to be an object, so we refractor our initial items array to either get data from the local storage and parse it (switch it back to objects) or fall back to an empty array.

This will make sure the data stays on the page when the user hits refresh, and the state of checked/unchecked will also persist.

An additional task was to create delete button, that will delete data on the page and local storage.

Also, I created 2 more buttons to check or uncheck all items at once.






