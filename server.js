const express = require("express");
const eventsRouter = require("./routes/events");

const app = express();

const port = 9090;
app.listen(port, () => console.log(`Server listening on port ${port}`));

app.use("/events", eventsRouter);
