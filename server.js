const express = require("express");
const { User, Event, Calendar } = require("./db");

const app = express();

const port = 9090;
app.listen(port, () => console.log(`Server listening on port ${port}`));
