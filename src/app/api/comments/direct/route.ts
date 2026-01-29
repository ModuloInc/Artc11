import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { content, postId, userEmail } = await req.json();

    if (!content || !postId)
      return NextResponse.json(
        { error: "Contenu et ID du post requis" },
        { status: 400 }
      );
    if (!userEmail)
      return NextResponse.json(
        { error: "Email utilisateur requis" },
        { status: 401 }
      );

    const user = await prisma.user.findUnique({ where: { email: userEmail } });
    if (!user)
      return NextResponse.json({ error: "Utilisateur non trouvé" }, { status: 404 });

    const post = await prisma.post.findUnique({ where: { id: postId } });
    if (!post)
      return NextResponse.json({ error: "Post non trouvé" }, { status: 404 });

    const comment = await prisma.comment.create({
      data: { content, postId, authorId: user.id },
      include: { author: true },
    });
    return NextResponse.json(comment, { status: 201 });
  } catch (error) {
    console.error("Erreur création commentaire:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
