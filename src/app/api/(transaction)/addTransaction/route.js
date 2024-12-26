import { connectDB } from "@/lib/connectDB"
import { NextResponse } from "next/server";


export const POST = async(request) =>{
 const newTransaction = await request.json()
 console.log(newTransaction)

 try {
    const db = await connectDB();
    const transactionCollection = db.collection('transactions');
    const response =await transactionCollection.insertOne(newTransaction)
    return NextResponse.json({message:'transaction successfull added'},{status:200})
    
 } catch (error) {
    return NextResponse.json({message:'something went wrong'},{status:500})
 }

}