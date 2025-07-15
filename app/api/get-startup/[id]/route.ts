import { getStartup } from '@/lib/startup-store';
import { NextResponse } from 'next/server';

interface Params {
  params: { id: string };
}

export async function GET(_: Request, { params }: Params) {
  const { id } = params;
  if (!id) {
    return NextResponse.json({ error: 'Missing id' }, { status: 400 });
  }
    // Retrieve from in-memory store
    const data = getStartup(id);
    if (!data) {
      return NextResponse.json({ error: 'Startup not found' }, { status: 404 });
    }
    return NextResponse.json({ data }, { status: 200 });
}
