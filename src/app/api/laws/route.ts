import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const where = category ? { category } : {};

    const laws = await prisma.europeanLaw.findMany({
      where,
      orderBy: { date: "desc" },
    });
    return NextResponse.json(laws, { status: 200 });
  } catch (error) {
    console.error("Erreur API laws:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id } = body as { id?: string };
    if (!id) return NextResponse.json({ error: "ID requis" }, { status: 400 });

    const law = await prisma.europeanLaw.findUnique({ where: { id } });
    if (!law) return NextResponse.json({ error: "Loi non trouvée" }, { status: 404 });
    return NextResponse.json(law, { status: 200 });
  } catch (error) {
    console.error("Erreur API laws:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
