import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { companyIds } = body;

  if (!companyIds || companyIds.length === 0) {
    return NextResponse.json({ message: 'No companies selected for deletion.' }, { status: 400 });
  }

  return NextResponse.json({
    message: `Data deletion requests for companies with IDs ${companyIds.join(', ')} have been submitted.`,
  });
}
