require("dotenv").config();
const express = require("express");
const cors = require('cors');
const routes = require('./routes');

const app = express();
// cors
app.use(cors());
// Express body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);
app.get("/", (req, res) => {
    res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));