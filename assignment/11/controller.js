const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { userModel, studentModel } = require("./model");
const { JWT_SECRET } = require("./middleware");

// ==================== AUTH ====================

async function register(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email, password required!" });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long!" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered!" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({ name, email, password: hashedPassword });

    res.status(201).json({
      message: "User registered successfully!",
      user: { id: newUser._id, name: newUser.name, email: newUser.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error registering user!" });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required!" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password!" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in!" });
  }
}

// ==================== STUDENT CRUD ====================

async function createStudent(req, res) {
  try {
    const { name, email, phone, age, course } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email required!" });
    }

    const newStudent = await studentModel.create({ name, email, phone, age, course });
    res.status(201).json({ message: "Student created successfully!", student: newStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating student!" });
  }
}

async function getStudents(req, res) {
  try {
    const students = await studentModel.find();
    res.status(200).json({ message: "Students fetched successfully!", students });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching students!" });
  }
}

async function getStudent(req, res) {
  try {
    const student = await studentModel.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found!" });
    }
    res.status(200).json({ message: "Student fetched successfully!", student });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching student!" });
  }
}

async function updateStudent(req, res) {
  try {
    const updatedStudent = await studentModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedStudent) {
      return res.status(404).json({ message: "Student not found!" });
    }
    res.status(200).json({ message: "Student updated successfully!", student: updatedStudent });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating student!" });
  }
}

async function deleteStudent(req, res) {
  try {
    const deletedStudent = await studentModel.findByIdAndDelete(req.params.id);
    if (!deletedStudent) {
      return res.status(404).json({ message: "Student not found!" });
    }
    res.status(200).json({ message: "Student deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting student!" });
  }
}

module.exports = {
  register,
  login,
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent,
};
