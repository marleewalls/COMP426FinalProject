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
        <div class="card mb-3" style="max-width: 540px;">
        <div class="row no-gutters">
      
          <div class="col-md-8" id=${this.recipe.id}>
            <div class="card-body" id=${this.recipe.id}>
              <h5 class="card-title">${this.recipe.name}</h5>
              <p class="card-text">
                <p>Ingredients: ${this.recipe.ingredients}</p>
                <p>Allergens: ${this.recipe.allergens}</p>
                <p>Vegetarian: ${this.recipe.vegetarian}</p>
                <p>Vegan: ${this.recipe.vegan}<p>
              </p>
              <p class="card-text"><small class="text-muted">Posted by: ${this.recipe.owner}</small></p>
            </div>
          </div>
        </div>
        <button class="btn btn-outline-secondary" data-handle="ed">Edit</button>
        <button class="btn btn-outline-secondary" data-handle="del">Delete</button>

      </div>

        `)
    $('#recipeList').append(view_div);
  }
}

// module.exports = RecipeView;
// https://www.pikpng.com/pngl/m/96-966854_emoji-with-sunglasses-thumbs-up-svg-file-yum.png

    // <div class="col-md-4">
          //   <img src="https://www.pikpng.com/pngl/m/96-966854_emoji-with-sunglasses-thumbs-up-svg-file-yum.png" class="card-img">
          // </div>