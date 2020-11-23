const express = require('express');
const app = express();
var path = require('path');

app.use(express.static("/Users/margreen/COMP426FinalProject"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})
app.get("/signin", function (req, res) {
    res.sendFile(path.join(__dirname + '/signin.html'))
})
app.get("/signup", function (req, res) {
    res.sendFile(path.join(__dirname + '/signup.html'))
})


// const port = 3000;
app.listen(process.env.PORT || 5000, () => {
    console.log("It worked!");
});