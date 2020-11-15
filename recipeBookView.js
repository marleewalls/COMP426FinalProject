class RecipeView {
    constructor(recipe, parentDiv) {
        this.recipe = recipe;
        this.parentDiv = $(parentDiv);
    }
    createViewDiv() {
        let view_div = $(`
        <div class="card">
            <div class="card-content">
                <div class="media">
                    <div class="media-content">
                        <p class="title is-4">${this.recipe.name}</p>
                        <p>${this.recipe.ingredients}</p>
                        <p>${this.recipe.allergens}</p>
                        <p>Vegetarian: ${this.recipe.vegetaria}</p>
                        <p>Vegan: ${this.recipe.vegan}<p>
                    </div>
                </div>
            </div>
        </div> 


        `)
    }
}