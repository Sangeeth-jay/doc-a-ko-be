const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Doctor = require("./DoctorModel");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3001;

const mongoURI = process.env.MONGO_URI;

// Connect to MongoDB
mongoose.connect(mongoURI, {})
.then(() => console.log("Connected to MongoDB"))
.catch((err) => console.error("MongoDB connection error:", err));

app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
    res.status(200).send("Server is running");
})

app.get("/doctors", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch doctors" });
  }
});

app.post("/adddoctor", async (req, res) => {
    try {
        const { name, specialty, address, phone } = req.body;
        
        if (!name || !specialty || !address || !phone) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const newDoctor = new Doctor({
            name,
            specialty,
            address,
            phone,
        });
        await newDoctor.save();
        res.status(201).json({ message: "Doctor added successfully" });
        
    } catch (error) {
        console.log("Error :", error);
        res.status(500).json({ error: "Failed to add doctor" });
    }
})

app.listen(port, () => {
  console.log(`Server is running on Port:${port}`);
});
