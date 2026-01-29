import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: questionId } = await params;
    if (!questionId)
      return NextResponse.json(
        { error: "ID de question requis" },
        { status: 400 }
      );

    const votes = await prisma.vote.findMany({
      where: { questionId },
    });
    const total = votes.length;
    if (total === 0)
      return NextResponse.json({
        positive: 0,
        neutral: 0,
        negative: 0,
        totalVotes: 0,
      });

    const positive = votes.filter((v) => v.value === 1).length;
    const neutral = votes.filter((v) => v.value === 0).length;
    const negative = votes.filter((v) => v.value === -1).length;

    return NextResponse.json({
      positive: Math.round((positive / total) * 100),
      neutral: Math.round((neutral / total) * 100),
      negative: Math.round((negative / total) * 100),
      totalVotes: total,
    });
  } catch (error) {
    console.error("Erreur stats question:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
