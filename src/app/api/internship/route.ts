import { db } from "@/db";
import { JobInternshipTable } from "@/db/schema";
import { NextResponse } from "next/server";


export async function GET(){
    try{
        const data = await db.select().from(JobInternshipTable);
        return NextResponse.json({data});
        
    }catch(error){
        console.log("cannot fetch data from career table: ", error)
    }
}

