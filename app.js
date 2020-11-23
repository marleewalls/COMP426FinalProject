const express = require('express');
const app = express();
var path = require('path');

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

app.use(express.static(path.join(__dirname + "public")));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})
app.get("/index.html", function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})
app.get("/sign_in.html", function (req, res) {
    res.sendFile(path.join(__dirname + '/sign_in.html'))
})
app.get("/sign_up.html", function (req, res) {
    res.sendFile(path.join(__dirname + '/sign_up.html'))
})
app.get("/profile.html", function (req, res) {
    res.sendFile(path.join(__dirname + '/profile.html'))
})


// const port = 3000;
app.listen(process.env.PORT || 5000, () => {
    console.log("It worked!");
});




