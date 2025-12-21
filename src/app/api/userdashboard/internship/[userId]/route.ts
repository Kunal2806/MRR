import { db } from "@/db";
import { JobInternshipApplication, JobInternshipTable } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { NextRequest, NextResponse , } from "next/server";

export async function GET(request: NextRequest, {params}: { params: Promise<{userId: string}> }) {
    
    const {userId} = await params;

    const application = await db.query.JobInternshipApplication.findMany({
        where: eq(JobInternshipApplication.userId, userId)
    })

    const intershipIds = application?.map(a=>a.internshipJobId);
    
    const interships = intershipIds.length ? await db.query.JobInternshipTable.findMany({
        where: inArray(JobInternshipTable.id, intershipIds)
    }) : [];

    return NextResponse.json(interships);

    // return NextResponse.json();
}