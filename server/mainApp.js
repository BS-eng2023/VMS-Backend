import express from "express";
import path from "path";
import dotenv from "dotenv";
import vehicleRoutes from "./routes/index.js";
import db from "./db/connection.js";

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

// View Engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/vehicles", vehicleRoutes);

// Server starten
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    try {
        await db.authenticate();
        console.log("Datenbank verbunden.");
        console.log(`Server läuft auf http://localhost:${PORT}`);
    } catch (err) {
        console.error("Fehler bei der Datenbankverbindung:", err);
    }
});
