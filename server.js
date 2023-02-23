const express = require("express");
const eventsRouter = require("./routes/events");

const app = express();

app.use(express.json());
app.use("/events", eventsRouter);

const port = 9090;
app.listen(port, () => console.log(`Server listening on port ${port}`));
