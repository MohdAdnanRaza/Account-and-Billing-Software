import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieparser from "cookie-parser";
import DbCon from "./utils/db.js";
import AuthRoutes from "./routes/Auth.js";
import BillRoutes from "./routes/BillRoutes.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

//mongo db connection
DbCon();
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended: true }));
const allowedOrigins = ["http://localhost:5173"];
app.use(
  cors({
    origin: allowedOrigins, // Only allow the specific frontend origin
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
    credentials: true, // Allow credentials (cookies, tokens, etc.)
    allowedHeaders: ["Content-Type", "Authorization"], // Specify allowed headers
  })
);

app.use("/api/auth", AuthRoutes);
app.use("/api/bills", BillRoutes);
// app.use("/api/cheques", ChequeRoutes);
// app.use("/api/salesman", SalesmanRoutes);
app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
