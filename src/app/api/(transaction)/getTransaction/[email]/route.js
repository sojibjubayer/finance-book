import { connectDB } from "@/lib/connectDB";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {
  try {
    const { email } = params; // Extract the email from the URL params

   

    const db = await connectDB();
    const transactionCollection = db.collection("transactions");

    // Query transactions based on the email
    const transactions = await transactionCollection.find({ email }).toArray();

    return NextResponse.json(
      { message: "Transactions retrieved successfully", transactions },
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
