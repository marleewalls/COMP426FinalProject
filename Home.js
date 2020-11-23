let currUser = "";

const searchFunc = function () {
    let recipeElems = document.getElementsByClassName('card-title');
    let recipeNames = []
    for (let i = 0; i < recipeElems.length; i++) {
        recipeNames.push(recipeElems[i].innerText);
    }
    debounce(autocomplete(document.getElementById("myInput"), recipeNames), 250);
}

const debounce = (func, wait) => {
    console.log("debounce!");
    let timeout;

    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };

        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

function autocomplete(inp, arr) {
    // From w3schools https://www.w3schools.com/howto/howto_js_autocomplete.asp
    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    var currentFocus;
    /*execute a function when someone writes in the text field:*/
    inp.addEventListener("input", function (e) {
        var a, b, i, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();
        if (!val) { return false; }
        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/
        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");
        /*append the DIV element as a child of the autocomplete container:*/
        this.parentNode.appendChild(a);
        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            let recipeElems = document.getElementsByClassName('card mb-3');
            recipeElems[i].style.display = "block";
            /*check if the item starts with the same letters as the text field value:*/
            if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");
                /*make the matching letters bold:*/
                b.innerHTML = "<strong>" + arr[i].substr(0, val.length) + "</strong>";
                b.innerHTML += arr[i].substr(val.length);
                /*insert a input field that will hold the current array item's value:*/
                b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
                /*execute a function when someone clicks on the item value (DIV element):*/
                b.addEventListener("click", function (e) {
                    /*insert the value for the autocomplete text field:*/
                    inp.value = this.getElementsByTagName("input")[0].value;
                    /*close the list of autocompleted values,
                    (or any other open lists of autocompleted values:*/
                    closeAllLists();
                });
                a.appendChild(b);
            } else {
                recipeElems[i].style.display = "none";
            }
        }
    });
    /*execute a function presses a key on the keyboard:*/
    inp.addEventListener("keydown", function (e) {
        var x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode == 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode == 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });
    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }
    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (var i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }
    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        var x = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < x.length; i++) {
            if (elmnt != x[i] && elmnt != inp) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }
    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        closeAllLists(e.target);
    });
}




const delRecipe = function (e) {
    let currID = e.target.id;
    fetch('http://localhost:5000/recipe/' + currID, {
        method: 'OPTIONS',
        mode: 'no-cors',
        credentials: "same-origin",
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Request-Method": "DELETE",
            // "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
            // "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Request-Method": "DELETE",
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then((response) => {
        currUser = response;
    });
}

const edRecipe = function (e) {
    let currID = e.target.id;
    console.log("hiiiii");

    fetch('http://localhost:5000/recipe/currentUser', {
        method: 'GET',
        mode: 'no-cors',
        credentials: "same-origin",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then((response) => {
        currUser = response;
    });
    // console.log($('#recipeName').val());
    // console.log(($('#ingredients').val()).split(","));
    fetch('http://localhost:5000/recipe/' + currID, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
            "owner": currUser,
            "name": $('#recipeName').val(),
            "ingredients": ($('#ingredients').val()),
            "allergens": ($('#allergens').val()),
            "vegetarian": ($('#vegetarian').val()),
            "vegan": ($('#vegan').val())
        }),
        credentials: "same-origin",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}



const getNewRecipe = function () {
    console.log("hiiiii");

    // fetch('https://powerful-brook-12795.herokuapp.com/currentUser', {
    //     method: 'GET',
    //     //mode: 'no-cors',
    //     credentials: "same-origin",
    //     headers: {
    //         "Accept": "application/json",
    //         "Content-Type": "application/x-www-form-urlencoded"
    //     }
    // }).then((resonse) => {
    //     currUser = response;
    // });
    // console.log($('#recipeName').val());
    // console.log(($('#ingredients').val()).split(","));
    fetch('http://localhost:5000/recipe', {
        method: 'POST',
        //mode: 'no-cors',
        body: JSON.stringify({
            "owner": "margreen",
            "name": $('#recipeName').val(),
            "ingredients": ($('#ingredients').val()),
            "allergens": ($('#allergens').val()),
            "vegetarian": ($('#vegetarian').val()),
            "vegan": ($('#vegan').val())
        }),
        credentials: "same-origin",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then(console.log("congrats"));
}

const renderRecipeForm = function (e) {
    console.log("hello");
    // let currID = e.target.id;
    return `<div>
    <form>
    <div class="form-group">
      <label for="recipeName">Recipe Name</label>
      <input type="text" class="form-control" id="recipeName">
    </div>
    <div class="form-group">
        <label for="ingredients">Ingredients</label>
        <input type="text" class="form-control" id="ingredients">
        <small id="emailHelp" class="form-text text-muted">Comma separated and no spaces. ex. bread,butter,sugar</small>
    </div>
    <div class="form-group">
      <label for="allergens">Allergens</label>
      <input type="text" class="form-control" id="allergens">
    </div>
    <div class="form-group">
      <label for="vegetarian">Vegetarian</label>
      <input type="text" class="form-control" id="vegetarian">
    </div>
    <div class="form-group">
      <label for="vegan">Vegan</label>
      <input type="text" class="form-control" id="vegan">
    </div>
    <button type="submit" id="addNewRecipe" class="btn btn-primary">Post New Recipe</button>
    </form></div>`
}

const renderRecipeFormEd = function (e) {
    let currID = e.target.id;
    console.log("hello");
    return `<div id=${currID}>
    <form id="newRecipeForm">
            <label for="recipeName">Recipe Name:</label>
            <input type="text" id="recipeName" name="recipeName"> <br><br>
            <label for="ingredients">Ingredients:</label>
            <input type="text" id="ingredients" name="ingredients"> <br><br>
            <label for="allergens">Allegerns:</label>
            <input type="text" id="allergens" name="allergens"> <br><br>
            <label for="vegetarian">Vegetarian: </label>
            <input type="text" id="vegetarian" name="vegetarian"> <br><br>
            <label for="vegan">Vegan: </label>
            <input type="text" id="vegan" name="vegan"> <br><br>
            <button type="button" id="editNewRecipe">Post New Recipe</button>
        </form></div>`
}

const newRecipeForm = function () {
    const $newRecipeButton = $('#createNewRecipe');
    $newRecipeButton.replaceWith(renderRecipeForm());
}

const edRecipeForm = function (e) {
    let currID = e.target.id;
    const $edRecipeButton = $("[data-handle='ed']");
    //need to change what it replaces 
    $edRecipeButton.replaceWith(`<div>
    <form id="newRecipeForm">
    <div class="form-group">
      <label for="recipeName">Recipe Name</label>
      <input type="text" class="form-control" id="recipeName">
    </div>
    <div class="form-group">
        <label for="ingredients">Ingredients</label>
        <input type="text" class="form-control" id="ingredients">
        <small id="emailHelp" class="form-text text-muted">Comma separated and no spaces. ex. bread,butter,sugar</small>
    </div>
    <div class="form-group">
      <label for="allergens">Allergens</label>
      <input type="text" class="form-control" id="allergens">
    </div>
    <div class="form-group">
      <label for="vegetarian">Vegetarian</label>
      <input type="text" class="form-control" id="vegetarian">
    </div>
    <div class="form-group">
      <label for="vegan">Vegan</label>
      <input type="text" class="form-control" id="vegan">
    </div>
   
    <button type="submit" id="editNewRecipe" class="btn btn-primary">Post New Recipe</button>
  </form>
        </form></div><br>`);
}

$(function () {
    // document.getElementById("mySearch").onkeyup(searchFunc);
    // document.getElementById("mySearch").addEventListener("keyup", searchFunc);
    // document.getElementById("myInput").addEventListener("keyup", searchFunc);
    $('body').on('click', '#myInput', searchFunc);

    $('body').on('click', '#createNewRecipe', newRecipeForm);
    $("body").on("click", "#addNewRecipe", getNewRecipe);

    $('body').on('click', "[data-handle='ed']", edRecipeForm);
    $('body').on('click', "[data-handle='like']", edRecipe); //change this
    $('body').on('click', "[data-handle='del']", delRecipe);
})



