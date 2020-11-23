// const RecipeView = require('./recipeBookView.js');
$(document).ready(() => {
    fetchRecipes();

    // on click of button make new recipe
});

const fetchRecipes = function () {
    fetch('./data/recipe.json').then((response) => response.json())
        .then((responseJSON) => {
            loadRecipes(responseJSON);
        });
}

const loadRecipes = async (recipes) => {
    for (let item in recipes) {
        // console.log(recipes[item]);
        const view = new RecipeView(recipes[item]);
    }



    // let rec = new Recipe(2, "canned hotdogs", ["cans", "hotdogs"], ["none"], true, true);
    // const recc = recipes.exports;
    // const recipe_id_list = await Recipe.getAllIDs();
    // recipe_id_list.forEach(async (rid) => {
    //     const recipe = await Recipe.findByID(rid);
    //     // new RecipeView(recipe);
    // })

}

