const express = require("express");
const path = require("path");
const chalk = require("chalk");

const app = express();

// Import the contact router
const contactRouter = require('./routes/contact');  // Adjust the path if needed

// Set view engine to EJS and views directory
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware for parsing form data
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Use the contact router
app.use(contactRouter); // This will handle POST requests for /contact

// GET route for the index page
app.get('/', (req, res) => {
    res.render('index'); // Render the index view
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(chalk.green.bold.inverse(`Server running on port ${PORT} `));
   
});
