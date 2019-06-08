const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const poems = require('./routes/api/poems');

app.use('/api/poems', poems);

//Handle production
if (process.env.NODE_ENV === "production") {
  //Set Static Folder
  app.use(express.static(__dirname + './public/'))

  //Handle SPA
  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));