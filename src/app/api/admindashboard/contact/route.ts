import { db } from "@/db";
import { Contact } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try{
        const result = await db.select().from(Contact);
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
        await db.update(Contact).set({
            id: data.id,
            status: data.status
        }).where(eq(Contact.id, data.id));

        return NextResponse.json({
            message: "status updated"
        })

    }catch(error) {
        return NextResponse.json({
            message: error
        })
    }
}

export async function DELETE(request: NextRequest){
    try{
        const {id} = await request.json();
        if(!id) {
            return NextResponse.json({
                message: "id required"
            })
        }
        await db.delete(Contact).where(eq(Contact.id, id));

        return NextResponse.json({
            message: "deleted Successfully"
        })

    }catch(error) {
        return NextResponse.json({
            message: error
        })
    }
}