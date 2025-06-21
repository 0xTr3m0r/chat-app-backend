import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import manageUsersRoutes from "./routes/manageUsers.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);
app.use('/api/message',messageRoutes);
app.use('/api/manageUsers',manageUsersRoutes);



app.get("/", (req, res) => {
    res.send("Server is working!");
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`running on port ${PORT}`);
    });
});