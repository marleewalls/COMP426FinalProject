class RecipeView {
    constructor(recipe) {
        this.recipe = recipe;
        // this.parentDiv = $(parentDiv);
        this.createViewDiv();
    }
    createViewDiv() {
        let view_div = $(`
        <div class="card">
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4">${this.recipe.name}</p>
                        <p>Ingredients: ${this.recipe.ingredients}</p>
                        <p>Allergens: ${this.recipe.allergens}</p>
                        <p>Vegetarian: ${this.recipe.vegetarian}</p>
                        <p>Vegan: ${this.recipe.vegan}<p>
                    </div>
                </div>
            </div>
        </div> 
        `)
        $('#recipeList').append(view_div);
    }
}