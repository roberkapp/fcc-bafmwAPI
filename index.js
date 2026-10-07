import express from "express";
import helmet from "helmet";
import authRouter from './routes/auth.route.js';
import watchlistRouter from "./routes/watchlist.route.js";
import { authenticate } from "./middleware/authenticate.js";

const PORT = process.env.PORT;
const app = express();

app.use(helmet());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use("/api/watchlist", authenticate, watchlistRouter);

app.get("/", (req, res) => {
  res.send("Family Movie Watchlist API");
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
