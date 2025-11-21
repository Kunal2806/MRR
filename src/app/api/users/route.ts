//dummy code 

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Your logic here
    return NextResponse.json({ users: [] });
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    // Your logic here
    console.log(body);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
}