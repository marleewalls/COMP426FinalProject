const express = require('express');
const app = express();
var path = require('path');

app.use(express.static("/Users/margreen/COMP426FinalProject"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})
app.get("/sign_in.html", function (req, res) {
    res.sendFile(path.join(__dirname + '/sign_in.html'))
})
app.get("/sign_up.html", function (req, res) {
    res.sendFile(path.join(__dirname + '/sign_up.html'))
})


// const port = 3000;
app.listen(process.env.PORT || 5000, () => {
    console.log("It worked!");
});