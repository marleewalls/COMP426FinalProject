const express = require('express');
const app = express();
var path = require('path');
const Recipe = require('./Recipe.js');
const User = require('./users.js');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const expressSession = require('express-session');


app.use(express.static(__dirname));

app.get("/home.html", function (req, res) {
    res.sendFile(path.join(__dirname, 'home.html'))
})

app.listen(process.env.PORT || 5000, () => {
    return;
});

app.use(expressSession({
    name: "kmpSessionCookie",
    secret: "express session secret",
    resave: false,
    saveUninitialized: false
}));

app.get('/currentUser', (req, res) => {
    currUser = req.session.user;
    return res.json(currUser);
});

const login_data = require('data-store')({ path: process.cwd() + '/data/users.json' });

app.get('/currentUserData', (req, res) => {
    const login_data = require('data-store')({ path: process.cwd() + '/data/users.json' });
    currUser = req.session.user;
    let currUserData = login_data.get(currUser);
    return res.json(currUserData);
});

app.post('/signup', (req, res) => {
    let obj = {}
    for (let first in req.body) {
        obj = first;
        break;
    }
    obj = JSON.parse(obj);
    let first_name = obj["first_name"];
    let last_name = obj["last_name"];
    let email = obj["email"];
    let username = obj["user"];
    let password = obj["password"];
    let user_data = login_data.get(username);
    if (user_data == null) {
        let s = User.create(first_name, last_name, email, username, password);
        res.status(200).send("Successfully created account");
    } else {
        res.status(404).send("Account already created with that username.");
    }
    return;
});

app.post('/login', (req, res) => {
    let obj = {}
    for (let first in req.body) {
        obj = first;
        break;
    }
    obj = JSON.parse(obj);
    let user = obj["user"];
    let password = obj["password"];

    const login_data = require('data-store')({ path: process.cwd() + '/data/users.json' });

    let user_data = login_data.get(user);
    if (user_data == null) {
        res.status(404).send("Not Found");
        return;
    }
    if (user_data.password == password) {
        req.session.user = user;
        userSession = user;
        res.json(true);
        return;
    }
    res.status(403).send("Unauthorized");
});

const recipe_data = require('data-store')({ path: process.cwd() + '/data/recipe.json' });

app.get('/recipe', (req, res) => {
    res.json(recipe_data);
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
    let obj1 = {}
    for (let first in req.body) {
        obj1 = first;
        break;
    }
    obj1 = JSON.parse(obj1);
    let name = obj1["name"];
    let ingredients = obj1["ingredients"].split(',');
    let allergens = obj1["allergens"].split(',');
    let vegetarian = obj1["vegetarian"];
    let vegan = obj1["vegan"];
    let owner = obj1["owner"];

    let r = Recipe.create(owner, name, ingredients, allergens, vegetarian, vegan);
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

    let obj1 = {}
    for (let first in req.body) {
        obj1 = first;
        break;
    }
    obj1 = JSON.parse(obj1);
    let name = obj1["name"];
    let ingredients = obj1["ingredients"].split(',');
    let allergens = obj1["allergens"].split(',');
    let vegetarian = obj1["vegetarian"];
    let vegan = obj1["vegan"];

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
    } else {
        r.delete();
    }
    return res.json(r);
})


app.get('/logout', (req, res) => {
    delete req.session.user;
    res.json(true);
})

