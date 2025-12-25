import { db } from "@/db";
import { JobInternshipTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

// GET – Fetch all internships
export async function GET() {
  try {
    const internships = await db.select().from(JobInternshipTable);

    return NextResponse.json({
      success: true,
      data: internships,
      message: "Internships fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching internships:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch internships",
        data: [],
      },
      { status: 500 }
    );
  }
}

// POST – Create new internship
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log(body)
    // ✅ Required field validation
    if (!body.title || !body.domain) {
      return NextResponse.json(
        {
          success: false,
          error: "Title and domain are required",
        },
        { status: 400 }
      );
    }

    // ✅ Insert internship
    await db.insert(JobInternshipTable).values({
      title: body.title,
      ishome: body.ishome ?? 'no',
      domain: body.domain,
      status: body.status ?? "open",
      mode: body.mode ?? null,
      level: body.level ?? null,
      stipend: body.stipend ?? null,
      certificate: body.certificate ?? null,
      deadline: body.deadline ?? null,
      bgColor: body.bgColor ?? null,
      borderColor: body.borderColor ?? null,
      overview: body.overview ?? null,
      eligibility: body.eligibility ?? [],
      tasks: body.tasks ?? [],
      technologyStack: body.technologyStack ?? [],
      submissionProcess: body.submissionProcess ?? [],
      timeline: body.timeline ?? null,
      criteria: body.criteria ?? [],
      interviewCall: body.interviewCall ?? null,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Internship created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating internship:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to create internship",
      },
      { status: 500 }
    );
  }
}
