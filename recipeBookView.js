// let userSession = require('./index.js');


class RecipeView {
    constructor(recipe) {
        this.recipe = recipe;
        // this.parentDiv = $(parentDiv);
        this.createViewDiv();
    }
    createViewDiv() {
        // console.log(userSession);
        let view_div = $(`
        <div class="card">
            <div class="card-content">
                <div class="media">
                    <figure class="media-left">
                        <p class="image is-64x64">
                        <img src="https://www.pikpng.com/pngl/m/96-966854_emoji-with-sunglasses-thumbs-up-svg-file-yum.png">
                        </p>
                    </figure>
                    <div class="media-content" id=${this.recipe.id}>
                        <p>Posted by: ${this.recipe.owner}</p>
                        <p class="title is-4">${this.recipe.name}</p>
                        <p>Ingredients: ${this.recipe.ingredients}</p>
                        <p>Allergens: ${this.recipe.allergens}</p>
                        <p>Vegetarian: ${this.recipe.vegetarian}</p>
                        <p>Vegan: ${this.recipe.vegan}<p>
                    </div>
                    <div class="buttons">
                        <button class="button is-primary is-light" data-handle="ed" id=${this.recipe.id}>Edit</button>
                        <button class="button is-primary is-light" data-handle="del" id=${this.recipe.id}>Delete</button>
                    </div>
                </div>
            </div>
        </div> 
        `)
        $('#recipeList').append(view_div);
    }
}

// module.exports = RecipeView;