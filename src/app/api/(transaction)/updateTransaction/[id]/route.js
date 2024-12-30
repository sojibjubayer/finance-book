import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
  const { id } = params;

  try {
   

    // Parse the request body
    const body = await request.json();

    // Connect to the database
    const db = await connectDB();
    const transactionCollection = db.collection("transactions");

    // Update the transaction by its ID
    const result = await transactionCollection.updateOne(
      { _id: new ObjectId(id) }, // Filter by ObjectId
      { $set: body } // Update only the fields in the body
    );

    // Check if the transaction was found and updated
    if (result.matchedCount === 0) {
      console.error("Transaction not found with ID:", id);
      return NextResponse.json(
        { message: "Transaction not found" },
        { status: 404 }
      );
    }

    console.log("Transaction updated successfully:", result);
    return NextResponse.json(
      { message: "Transaction updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating transaction:", error.message || error);
    return NextResponse.json(
      { message: "Something went wrong", error: error.message },
      { status: 500 }
    );
  }
};
