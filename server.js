// dependincies
const express = require("express");
const apiRoutes = require('./routing/apiRoutes');
const htmlRoutes = require('./routing/htmlRoutes');

// create an express server on port 3000
const app = express();
const PORT = process.env.PORT || 3000;

// handle data parsing and routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static("public"))
app.use("/api", apiRoutes);
app.use("/", htmlRoutes);

// starts server
app.listen(PORT, function(){
    console.log("App listening on PORT: " + PORT);
});
