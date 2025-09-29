import mongoose from "mongoose";
import Appointment from "./models/potholes.js"; // adjust path to your model
import { faker } from "@faker-js/faker"; // install this first: npm install @faker-js/faker

// Connect to MongoDB Atlas
mongoose.connect("mongodb+srv://botme2121_db_user:iWrq8G2fxhHBSN8J@cluster0.vg86grm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedAppointments = async () => {
  const dummyAppointments = [];

  for (let i = 1; i <= 10000; i++) {
    dummyAppointments.push({
      fullName: faker.person.fullName(),
      email: faker.internet.email(),
      phone: faker.phone.number("##########"),
      date: faker.date.soon(),
      address: {
        area: faker.location.street(),
        city: faker.location.city(),
        state: faker.location.state(),
        postCode: faker.location.zipCode(),
      },
    });
  }

  try {
    await Appointment.insertMany(dummyAppointments);
    console.log("✅ 10000 dummy appointments inserted into Atlas!");
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

seedAppointments();
