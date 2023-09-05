const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Dummy database in memory
const COMMENTS_FILE_PATH = path.join(__dirname, 'comments.json');

// Middleware to log request details
app.use((req, res, next) => {
    console.log(`Received request from ${req.url}`);
    next(); // Don't forget to call next() to continue to the next middleware/route
});

// 👇️ you need this line to serve static files
app.use(express.static(__dirname + '/'));

// Route handling for the root URL
app.get('/', (req, res) => {
    const htmlPage = path.join(__dirname, 'app.html');

    fs.readFile(htmlPage, 'utf8', (error, htmlContent) => {
        if (error) {
            console.log(error);
            res.status(500).send("Internal Server Error");
            return;
        }
        res.send(htmlContent);
    });
});

// Middleware to log request details
app.use((req, res, next) => {
    console.log(`Received request from ${req.url}`);
    next(); // Don't forget to call next() to continue to the next middleware/route
});


//Read existing comments from the JSON file and store in memory
fs.readFile(COMMENTS_FILE_PATH, 'utf8', (err, data) => {
  if (!err) {
    comments = JSON.parse(data);
  }
});

app.post('/comment', (req, res) => {
    const {name, comment} = req.body;
    const commentBlock = {name,comment};

    // Read existing comments from the JSON file
    fs.readFile(COMMENTS_FILE_PATH, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
            return;
        }

        let comments = JSON.parse(data);
        comments.push(commentBlock);

        // Write updated comments back to the JSON file
        fs.writeFile(COMMENTS_FILE_PATH, JSON.stringify(comments, null, 2), 'utf8', err => {
            if (err) {
                console.error(err);
                res.status(500).send('Internal Server Error');
                return;
            }

            console.log(commentBlock);

            res.redirect('back');
        });
    });
});

/*PUT (Edit Comment)

*/

/*DELETE (Delete Comment)

*/

// Listen for incoming requests
app.listen(3000, () => console.log('Server running on port 3000'));