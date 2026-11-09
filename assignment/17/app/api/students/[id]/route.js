import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import { errorResponse } from "@/lib/apiError";

// UPDATE — Student এডিট
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { name, email, phone, department } = await request.json();

    const student = await Student.findByIdAndUpdate(
      params.id,
      { name, email, phone, department },
      { new: true, runValidators: true }
    );

    if (!student) {
      return NextResponse.json({ error: "Student পাওয়া যায়নি" }, { status: 404 });
    }
    return NextResponse.json(student);
  } catch (error) {
    return errorResponse(error);
  }
}

// DELETE — Student ডিলিট
export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const student = await Student.findByIdAndDelete(params.id);

    if (!student) {
      return NextResponse.json({ error: "Student পাওয়া যায়নি" }, { status: 404 });
    }
    return NextResponse.json({ message: "Student ডিলিট হয়েছে" });
  } catch (error) {
    return errorResponse(error);
  }
}
