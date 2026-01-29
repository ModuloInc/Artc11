import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * GET /api/health
 * Health check for load balancers, Docker, and CI.
 * Returns 200 if the app is up; checks DB connectivity when ?db=1.
 */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const checkDb = searchParams.get("db") === "1";

  const payload: { status: "ok"; db?: "ok" | "error"; version?: string } = {
    status: "ok",
  };

  if (checkDb) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      payload.db = "ok";
    } catch {
      payload.db = "error";
      return NextResponse.json(payload, { status: 503 });
    }
  }

  return NextResponse.json(payload, { status: 200 });
}
