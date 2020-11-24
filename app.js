const express = require('express');
const app = express();
var path = require('path');
const Recipe = require('./Recipe.js');
// const Secret = require('./Secret.js');
const User = require('./users.js');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
const expressSession = require('express-session');

// app.use(express.static("/Users/margreen/COMP426FinalProject/index.html"));
// app.use(express.static("/Users/margreen/COMP426FinalProject/sign_in.html"));
// app.use(express.static("/Users/margreen/COMP426FinalProject/sign_in.js"));
// app.use(express.static("/Users/margreen/COMP426FinalProject/sign_up.html"));
// app.use(express.static("/Users/margreen/COMP426FinalProject/sign_up.js"));
// app.use(express.static("/Users/margreen/COMP426FinalProject/profile.html"));
// app.use(express.static("/Users/margreen/COMP426FinalProject/Home.js"));
// app.use(express.static("/Users/margreen/COMP426FinalProject/recipeApp.js"));
// app.use(express.static("/Users/margreen/COMP426FinalProject/Recipe.js"));
// app.use(express.static("/Users/margreen/COMP426FinalProject/recipeBookView.js"));
// app.use(express.static("/Users/margreen/COMP426FinalProject/mapApp.js"));

app.use(express.static(__dirname));
// console.log(__dirname);
// console.log("above");
// app.use(express.static(path.join(__dirname, "user.js")));
// app.use(express.static(path.join(__dirname, "sign_in.js")));
// app.use(express.static(path.join(__dirname, "sign_up.js")));
// app.use(express.static(path.join(__dirname, "Recipe.js")));
// app.use(express.static(path.join(__dirname, "recipeBookView.js")));
// app.use(express.static(path.join(__dirname, "recipeApp.js")));
// app.use(express.static(path.join(__dirname, "mapApp.js")));
// app.use(express.static(path.join(__dirname, "Home.js")));

// app.use(express.static(path.join(__dirname, "index.html")));
// app.use(express.static(path.join(__dirname, "sign_in.html")));
// app.use(express.static(path.join(__dirname, "sign_up.html")));
// app.use(express.static(path.join(__dirname, "profile.html")));
// app.use(express.static(path.join(__dirname + "/public/data")));

// app.get("/", function (req, res) {
//     res.sendFile(path.join(__dirname, 'sign_in.html'))
// })
app.get("/home.html", function (req, res) {
    res.sendFile(path.join(__dirname, 'home.html'))
})
// app.get("/sign_in.html", function (req, res) {
//     res.sendFile(path.join(__dirname, 'sign_in.html'))
// })
// app.get("/sign_up.html", function (req, res) {
//     res.sendFile(path.join(__dirname, 'sign_up.html'))
// })
// app.get("/profile.html", function (req, res) {
//     res.sendFile(path.join(__dirname, 'profile.html'))
// })


// const port = 3000;
app.listen(process.env.PORT || 5000, () => {
    console.log("It worked!");
});

app.use(expressSession({
    name: "kmpSessionCookie",
    secret: "express session secret",
    resave: false,
    saveUninitialized: false
}));



// app.get('/currentUser/:id', (req, res) => {
//     console.log("here");
//     currUser = req.session.user;
//     console.log(currUser);
//     return res.json(currUser);
// });
app.get('/currentUser', (req, res) => {
    console.log("here");
    // console.log(req);
    // currUser = req.session.user;
    currUser = req.session.user;
    console.log(currUser);
    // console.log(json(currUser));
    // return res(currUser);
    return res.json(currUser);
});



const login_data = require('data-store')({ path: process.cwd() + '/data/users.json' });

app.get('/currentUserData', (req, res) => {
    currUser = req.session.user;
    let currUserData = login_data.get(currUser);
    return res.json(currUserData);
});




app.post('/signup', (req, res) => {
    console.log("made it to sign up backend");
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

    // console.log(username);
    // console.log(req.body);
    let user_data = login_data.get(username);
    // line above needs to change, it is not getting the correct user

    console.log(user_data);
    if (user_data == null) {
        let s = User.create(first_name, last_name, email, username, password);
        console.log("made it");
        console.log(s);
        return;
    } else {
        console.log("Account already created with that username.");
        res.status(404).send("Account already created with that username.");
    }
});

app.post('/login', (req, res) => {
    console.log(req.session.user);
    let obj = {}
    for (let first in req.body) {
        obj = first;
        break;
    }
    obj = JSON.parse(obj);
    let user = obj["user"];
    let password = obj["password"];

    let user_data = login_data.get(user);
    if (user_data == null) {
        res.status(404).send("Not Found");
        return;
    }
    if (user_data.password == password) {
        console.log("User " + user + " credentials valid");
        req.session.user = user;
        userSession = user;
        console.log(req.session.user);
        res.json(true);
        return;
    }
    res.status(403).send("Unauthorized");
});

const recipe_data = require('data-store')({ path: process.cwd() + '/data/recipe.json' });

app.get('/recipe', (req, res) => {
    // res.json(Recipe.getAllIDs());
    res.json(recipe_data);
    return;
});

app.get('/recipe/:id', (req, res) => {
    console.log(req);
    let r = Recipe.findByID(req.params.id);
    if (r == null) {
        res.status(404).send("Recipe not found");
        return;
    }
    res.json(r);
})

app.post('/recipe', (req, res) => {
    console.log("made it to backend");
    let obj1 = {}
    console.log(req.body);
    for (let first in req.body) {
        obj1 = first;
        break;
    }
    // console.log(obj);
    obj1 = JSON.parse(obj1);
    console.log(obj1);
    let name = obj1["name"];
    console.log(name);
    let ingredients = obj1["ingredients"].split(',');
    console.log(ingredients);
    let allergens = obj1["allergens"].split(',');
    let vegetarian = obj1["vegetarian"];
    let vegan = obj1["vegan"];
    let owner = obj1["owner"];
    // let { name, ingredients, allergens, vegetarian, vegan } = req.body;
    // add code to check validity

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

    // let { name, ingredients, allergens, vegetarian, vegan } = req.body;
    r.name = name;
    r.ingredients = ingredients;
    r.allergens = allergens;
    r.vegetarian = vegetarian;
    r.vegan = vegan;
    //console.log(r.name);
    r.update();
    res.json(r);

})

app.delete('/recipe/:id', (req, res) => {
    console.log("made it to backend");
    console.log(req.params.id);
    let r = Recipe.findByID(req.params.id);
    console.log(r);
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

