import { db } from "@/db";
import { JobInternshipApplication } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try{
        const result = await db.select().from(JobInternshipApplication);
        if(result) {
            return NextResponse.json(result);
        }
    }
    catch(error) {
        console.log(error);
    }
}

export async function PUT(request: NextRequest){
    try{
        const data = await request.json();
        if(!data.id || !data.status) {
            return NextResponse.json({
                message: "incomplete data sent"
            })
        }
        await db.update(JobInternshipApplication).set({
            id: data.id,
            status: data.status
        }).where(eq(JobInternshipApplication.id, data.id));

        return NextResponse.json({
            message: "status updated"
        })

    }catch(error) {
        return NextResponse.json({
            message: error
        })
    }
}