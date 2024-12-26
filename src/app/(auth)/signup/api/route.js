import { connectDB } from "@/lib/connectDB";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
export const POST = async (request) => {
  const newUser = await request.json();
  const hashedPassword = bcrypt.hashSync(newUser.password, 14);

  try {
    const db = await connectDB();
    const userCollection = db.collection("users");
    const exist =await userCollection.findOne({ email: newUser.email });
    if(exist) {
      return NextResponse.json({ message: "User Exists" }, { status: 409 });
    }
    const resp = await userCollection.insertOne({...newUser, password: hashedPassword});
    
    return NextResponse.json({ message: "User Created" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something Went Wrong", error },
      { status: 500 }
    );
  }
};
