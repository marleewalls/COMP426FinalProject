$(document).ready(() => {
    loadRecipes();

    // on click of button make new recipe
});

const loadRecipes = async () => {
    const recipe_id_list = await Recipe.getAllIDs();
    recipe_id_list.forEach(async (rid) => {
        const recipe = await Recipe.findByID(rid);
        new RecipeView(recipe, $('recipeList'));
    })
}