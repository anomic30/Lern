import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import compression from "compression";
import dotenv from "dotenv";
import { connectToDatabase } from "./db.js";
import routes from "./routes/index.js";

dotenv.config();
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

app.use("/api", routes);

connectToDatabase().then(() => {
    app.listen(port, () => {
        console.log(`🗄️  Express server listening on port ${port}`);
    });
});
