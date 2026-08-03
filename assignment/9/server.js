const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);
const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

 const MONGODB_URI = "mongodb+srv://ictabdullahsir_db_user:oC0ZqA1mN1vPJTWW@cluster0.bna5sft.mongodb.net/ostad";

async function connectToDatabase() {
  try {
    await mongoose.connect(MONGODB_URI)
    console.log("Connected to MongoDB!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: Number, required: true },
  department: { type: String, required: true },
  cgpa: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

const Student = mongoose.model("Student", studentSchema);

app.post("/students", async (req, res) => {
  const info = req.body
  try {
    const newStudent = await Student.create(info)
    res.status(201).json({ status: "success", data: newStudent })
  } catch (error) {
    console.error("Error creating student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find()
    res.status(200).json({ status: "success", data: students })
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.get("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({ status: "success", data: student });
  } catch (error) {
    console.error("Error fetching student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.delete("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  try {
    const deletedStudent = await Student.findByIdAndDelete(studentId);
    if (!deletedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({ status: "success", data: deletedStudent });
  } catch (error) {
    console.error("Error deleting student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/students/:id", async (req, res) => {
  const studentId = req.params.id;
  const info = req.body;
  try {
    const updatedStudent = await Student.findByIdAndUpdate(studentId, info, { new: true })
    if (!updatedStudent) {
      return res.status(404).json({ error: "Student not found" });
    }
    res.status(200).json({ status: "success", data: updatedStudent })
  } catch (error) {
    console.error("Error updating student:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
})

app.listen(4000, async () => {
  await connectToDatabase();
  console.log("Server is running on port 4000");
});