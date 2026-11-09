import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Student from "@/models/Student";
import { errorResponse } from "@/lib/apiError";

export const dynamic = "force-dynamic";

// READ — সব Student
export async function GET() {
  try {
    await connectDB();
    const students = await Student.find().sort({ createdAt: -1 });
    return NextResponse.json(students);
  } catch (error) {
    return errorResponse(error);
  }
}

// CREATE — নতুন Student
export async function POST(request) {
  try {
    await connectDB();
    const { name, email, phone, department } = await request.json();
    const student = await Student.create({ name, email, phone, department });
    return NextResponse.json(student, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
