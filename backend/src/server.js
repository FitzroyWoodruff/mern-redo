import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notesRoutes from "./routes/notesRouts.js";
import { connectDB } from "./config/db.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

app.use("/api/notes", notesRoutes);
connectDB().then(() => {
	app.listen(PORT, () => {
		console.log(`Server is running on port ${PORT}`);
	});
});
