const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
    name: String,
    specialty: String,
    address: String,
    phone: String
}, {
    _id: true,
});

module.exports = mongoose.model("Doctor", DoctorSchema, "Doctor");