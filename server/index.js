const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
require("dotenv").config();
const { connectToDatabase } = require("./db");
// const routes = require("./routes");

const app = express();
const port = process.env.PORT || 8082;

app.use(compression());
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));


// Define routes below
app.get("/", (req, res) => {
    res.send("<h1>👋🏻 Hello from the Lern server!</h1>");
});

// app.use("/api", routes);

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`🗄️  Express server listening on port ${port}`);
    });
});

// app.listen(port, () => {
//     console.log(`Server listening on port ${port}`);
// });