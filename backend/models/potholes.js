import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date },
  address: {
    area: { type: String },
    city: { type: String },
    state: { type: String },
    postCode: { type: String }
  },
  potholePhoto: { type: String }, // store file path
  status: { 
    type: String, 
    enum: ["pending", "confirmed", "completed"], 
    default: "pending" 
  },
  createdAt: { type: Date, default: Date.now }
});

// **Text index for fast multi-field search**
appointmentSchema.index({
  fullName: "text",
  email: "text",
  phone: "text",
  "address.area": "text",
  "address.city": "text",
  "address.state": "text",
  "address.postCode": "text"
});

// **Optional single-field indexes for filtering and sorting**
appointmentSchema.index({ date: 1 });
appointmentSchema.index({ status: 1 });
appointmentSchema.index({ "address.city": 1 });

export default mongoose.model("Appointment", appointmentSchema);
