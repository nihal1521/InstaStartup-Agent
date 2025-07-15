// Stub GraphQL-like REST handlers for plugins
import { getPlugins, runPlugin } from '@/lib/plugin-loader';

export async function GET(request: Request) {
  // Return list of available plugins
  return new Response(JSON.stringify({ plugins: getPlugins() }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(request: Request) {
  // Execute plugin by ID
  const { id, params } = await request.json();
  try {
    const result = await runPlugin(id, params || {});
    return new Response(JSON.stringify({ result }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message }), { status: 400, headers: { 'Content-Type': 'application/json' } });
  }
}

