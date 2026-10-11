import { FLIGHTS } from "@/lib/airport-config";

export async function GET() {
  return Response.json({ source: "demo", flights: FLIGHTS });
}
