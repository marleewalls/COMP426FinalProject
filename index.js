const express = require('express');
const app = express();
const Recipe = require('./Recipe.js');
const bodyParser = require('body-parser');
app.use(bodyParser.json());

app.get('/recipe', (req, res) => {
    res.json(Recipe.getAllIDs());
    return;
});

app.get('/recipe/:id', (req, res) => {
    let r = Recipe.findByID(req.params.id);
    if (r == null) {
        res.status(404).send("Recipe not found");
        return;
    }
    res.json(r);
})

app.post('/recipe', (req, res) => {
    let { name, ingredients, allergens, vegetarian, vegan } = req.body;
    // add code to check validity

    let r = Recipe.create(name, ingredients, allergens, vegetarian, vegan);
    if (r == null) {
        res.status(400).send("Bad Request");
        return;
    }
    return res.json(r);
})

app.put('/recipe/:id', (req, res) => {
    let r = Recipe.findByID(req.params.id);
    if (r == null) {
        res.status(404).send("Recipe not found");
        return;
    }

    let { name, ingredients, allergens, vegetarian, vegan } = req.body;
    r.name = name;
    r.ingredients = ingredients;
    r.allergens = allergens;
    r.vegetarian = vegetarian;
    r.vegan = vegan;

    r.update();
    res.json(r);

})

app.delete('/recipe/:id', (req, res) => {
    let r = Recipe.findByID(req.params.id);
    if (r == null) {
        res.status(404).send("Recipe not found");
        return;
    }
    r.delete();
    res.json(true);
})

const port = 3030;
app.listen(port, () => {
    console.log("It worked!");
});