$(document).ready(() => {
    fetchRecipes();
});

const fetchRecipes = function () {
    fetch('/data/recipe.json').then((response) => response.json())
        .then((responseJSON) => {
            loadRecipes(responseJSON);
        });
}

const loadRecipes = async (recipes) => {
    for (let item in recipes) {
        const view = new RecipeView(recipes[item]);
    }
}

