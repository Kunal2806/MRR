import { db } from "@/db";
import { Faq } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try{
        const result = await db.select().from(Faq);
        if(!result){
            throw new Error("Cannot Get Faq! restlt not found")
        }
        return NextResponse.json(result);
    }
    catch(error) {
        console.log("error occured: ", error)
    }
}

export async function PUT(req: NextRequest) {
    try {
        const body = await req.json();
        
        if (!body.id || !body.question || !body.answer) {
            return NextResponse.json(
                { message: "ID, question, and answer are required" },
                { status: 400 }
            );
        }
        
        await db.update(Faq).set({
            question: body.question,  // Changed from Faq.question
            answer: body.answer        // Changed from Faq.answer
        }).where(eq(Faq.id, body.id));

        return NextResponse.json({
            message: "Updated successfully"
        });
        
    } catch (error) {
        console.log("Error occurred: ", error);
        return NextResponse.json(
            { message: "Failed to update FAQ", error: String(error) },
            { status: 500 }
        );
    }
}