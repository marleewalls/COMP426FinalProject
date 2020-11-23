const express = require('express');
const app = express();
var path = require('path');

app.use(express.static("/Users/margreen/COMP426FinalProject"));

app.get("/", function (req, res) {
    // res.send("<h1>Hello World!</h1>");
    res.sendFile(path.join('./index.html'))
})


// const port = 3000;
app.listen(process.env.PORT || 5000, () => {
    console.log("It worked!");
});