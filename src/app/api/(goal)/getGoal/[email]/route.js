import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { email } = params; 

   

    const db = await connectDB();
    const goalCollection = db.collection("goals");

    const goals = await goalCollection.find({ email }).toArray();

    return NextResponse.json(
      { message: "Transactions retrieved successfully", goals },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error retrieving transactions:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
};
