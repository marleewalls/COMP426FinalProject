let currUser = "";

const searchFunc = function () {
    let input = document.getElementById('mySearch').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('media');

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
        }
        else {
            x[i].style.display = "block";
        }
    }
}




const delRecipe = function (e) {
    let currID = e.target.id;
    fetch('http://localhost:3030/currentUser/' + currID, {
        method: 'GET',
        mode: 'no-cors',
        credentials: "same-origin",
        headers: {
            // "Access-Control-Allow-Origin": "*",
            // "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PUT, DELETE",
            // "Access-Control-Allow-Headers": "Content-Type",
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

    fetch('http://localhost:3030/currentUser', {
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
    fetch('http://localhost:3030/recipe/' + currID, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
            "owner": currUser,
            "name": $('#recipeName').val(),
            "ingredients": ($('#ingredients').val()),
            "allergens": ($('#allergens').val()),
            "vegetarian": true,
            "vegan": false
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

    fetch('http://localhost:3030/currentUser', {
        method: 'GET',
        mode: 'no-cors',
        credentials: "same-origin",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then((resonse) => {
        currUser = response;
    });
    // console.log($('#recipeName').val());
    // console.log(($('#ingredients').val()).split(","));
    fetch('http://localhost:3030/recipe', {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify({
            "owner": currUser,
            "name": $('#recipeName').val(),
            "ingredients": ($('#ingredients').val()),
            "allergens": ($('#allergens').val()),
            "vegetarian": true,
            "vegan": false
        }),
        credentials: "same-origin",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/x-www-form-urlencoded"
        }
    })
}

const renderRecipeForm = function (e) {
    console.log("hello");
    let currID = e.target.id;
    return `<div>
    <form id=${currID}>
            <label for="recipeName">Recipe Name:</label>
            <input type="text" id="recipeName" name="recipeName"> <br><br>
            <label for="ingredients">Ingredients:</label>
            <input type="text" id="ingredients" name="ingredients"> <br><br>
            <label for="allergens">Allegerns:</label>
            <input type="text" id="allergens" name="allergens"> <br><br>
            <label for="vegetarian">Vegetarian:</label>
            <input type="text" id="vegetarian" name="vegetarian"> <br><br>
            <label for="vegan">Vegan:</label>
            <input type="text" id="vegan" name="vegan"> <br><br>
            <button type="button" id="addNewRecipe">Post New Recipe</button>
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
            <label for="vegetarian">Vegetarian:</label>
            <input type="text" id="vegetarian" name="vegetarian"> <br><br>
            <label for="vegan">Vegan:</label>
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
            <label for="recipeName">Recipe Name:</label>
            <input type="text" id="recipeName" name="recipeName"> <br><br>
            <label for="ingredients">Ingredients:</label>
            <input type="text" id="ingredients" name="ingredients"> <br><br>
            <label for="allergens">Allegerns:</label>
            <input type="text" id="allergens" name="allergens"> <br><br>
            <label for="vegetarian">Vegetarian:</label>
            <input type="text" id="vegetarian" name="vegetarian"> <br><br>
            <label for="vegan">Vegan:</label>
            <input type="text" id="vegan" name="vegan"> <br><br>
            <button type="button" id="editNewRecipe">Post New Recipe</button>
        </form></div>`);
}

$(function () {
    // document.getElementById("mySearch").onkeyup(searchFunc);
    document.getElementById("mySearch").addEventListener("keyup", searchFunc);
    $('body').on('click', '#createNewRecipe', newRecipeForm);
    $("body").on("click", "#addNewRecipe", getNewRecipe);

    $('body').on('click', "[data-handle='ed']", edRecipeForm);
    $('body').on('click', "[data-handle='like']", edRecipe); //change this
    $('body').on('click', "[data-handle='del']", delRecipe);
})



