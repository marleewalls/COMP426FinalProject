const express = require('express');
const app = express();
const Recipe = require('./Recipe.js');
const Secret = require('./Secret.js');
const User = require('./users.js');
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// export let userSession = "";

const expressSession = require('express-session');

app.get('/currentUser/:id', (req, res) => {
    console.log("here");
    currUser = req.session.user;
    console.log(currUser);
    return res.json(currUser);
});

app.use(expressSession({
    name: "kmpSessionCookie",
    secret: "express session secret",
    resave: false,
    saveUninitialized: false
}));

const login_data = require('data-store')({ path: process.cwd() + '/data/users.json' });

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

app.get('/recipe', (req, res) => {
    res.json(Recipe.getAllIDs());
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
    console.log(req.body);
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

    r.update();
    res.json(r);

})

app.delete('/recipe/:id', (req, res) => {
    // let r = Recipe.findByID(req.params.id);
    // if (r == null) {
    //     res.status(404).send("Recipe not found");
    //     return;
    // }
    // r.delete();
    // res.json(true);
    Recipe.delete();
})

// app.get('/secret', (req, res) => {
//     if (req.session.user == undefined) {
//         res.status(403).send("Unauthorized");
//         return;
//     }
//     res.json(Secret.getAllIDsForOwner(user));
//     return;
// });

// app.get('/secret/:id', (req, res) => {
//     if (req.session.user == undefined) {
//         res.status(403).send("Unauthorized");
//         return;
//     }
//     let s = Secret.findByID(req.params.id);

//     if (s == null) {
//         res.status(404).send("Not found");
//         return;
//     }
//     if (s.owner != req.session.user) {
//         res.status(403).send("Unauthorized");
//         return;
//     }
//     res.json(s);
// });

// app.post('/secret', (req, res) => {
//     if (req.session.user == undefined) {
//         res.status(403).send("Unauthorized");
//         return;
//     }
//     let s = Secret.create(req.session.user, req.body.secret);
//     if (s == null) {
//         res.status(404).send("Bad Request");
//         return;
//     }
//     return res.json(s);
// });

// app.put('/secret/:id', (req, res) => {
//     if (req.session.user == undefined) {
//         res.status(403).send("Unauthorized");
//         return;
//     }
//     let s = Secret.findByID(req.params.id);
//     if (s == null) {
//         res.status(404).send("Not found");
//         return;
//     }
//     if (s == null) {
//         res.status(404).send("Bad Request");
//         return;
//     }
//     s.update(req.body.secret);

//     res.json(s.id);
// });

// app.delete('/secret/:id', (req, res) => {
//     if (req.session.user == undefined) {
//         res.status(403).send("Unauthorized");
//         return;
//     }
//     let s = Secret.findByID(req.params.id);
//     if (s == null) {
//         res.status(404).send("Not found");
//         return;
//     }
//     if (s == null) {
//         res.status(404).send("Bad Request");
//         return;
//     }
//     s.delete();
//     res.json(true);
// })

app.get('/logout', (req, res) => {
    delete req.session.user;
    res.json(true);
})

app.get('/', function (req, res) {
    res.sendFile(path.join('./index.html'));
})

const port = 3030;
app.listen(port, () => {
    console.log("It worked!");
});







// module.exports = userSession;