import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server";


export const POST = async(request) =>{
 const newGoal = await request.json()
 console.log(newGoal)

 try {
    const db = await connectDB();
    const transactionCollection = db.collection('goals');
    const response =await transactionCollection.insertOne(newGoal)
    return NextResponse.json({message:'transaction successfull added'},{status:200})
    
 } catch (error) {
    return NextResponse.json({message:'something went wrong'},{status:500})
 }

}