const recipeData = require('data-store')({ path: process.cwd() + '/data/recipe.json' });
class Recipe {
    constructor(id, name, ingredients, allergens, vegetarian, vegan) {
        this.id = id;
        this.name = name;
        this.ingredients = ingredients;
        this.allergens = allergens;
        this.vegetarian = vegetarian;
        this.vegan = vegan;
    }

    update() {
        recipeData.set(this.id.toString(), this);
    }

    delete() {
        recipeData.del(this.id.toString());
    }
}

Recipe.getAllIDs = () => {
    // Return an array of all recipe IDs
    return Object.keys(recipeData.data).map((id => { return parseInt(id); }));
}

Recipe.findByID = (id) => {
    let rdata = recipeData.get(id);
    if (rdata != null) {
        return new Recipe(rdata.id, rdata.name, rdata.ingredients, rdata.allergens, rdata.vegetarian, rdata.vegan);
    }
    return null;
}

Recipe.nextID = Recipe.getAllIDs().reduce((max, nextID) => {
    if (max < nextID) {
        return nextID;
    }
    return max;
}, -1) + 1;

Recipe.create = (name, ingredients, allergens, vegetarian, vegan) => {
    let id = Recipe.nextID;
    Recipe.nextID += 1;
    let r = new Recipe(id, name, ingredients, allergens, vegetarian, vegan);
    recipeData.set(r.id.toString(), r);
    return r;
}

// let r1 = new Recipe(0, ["peanut butter", "jelly", "bread"], ["peanuts", "gluten"], true, true);
// recipeData.set(r1.id.toString(), r1);

module.exports = Recipe;