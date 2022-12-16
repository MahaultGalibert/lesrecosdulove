// pages/api/post/index.ts

import { getSession } from "next-auth/react"
import prisma from "../../../lib/prisma"

// POST /api/post
// Required fields in body: category, title
// Optional fields in body: author, imageUrl, comment
export default async function handle(req, res) {
  if (req.method === "POST") {
    const { category, title, author, imageUrl, comment } = req.body

    const session = await getSession({ req })
    const result = await prisma.post.create({
      data: {
        category: category,
        title: title,
        author: author,
        imageUrl: imageUrl,
        comment: comment,
        creator: { connect: { email: session?.user?.email } },
        likedBy: { connect: { email: session?.user?.email } },
      },
    })
    res.json(result)
    // PUT /api/post
  } else if (req.method === "PUT") {
    const { targetId } = req.body
    const session = await getSession({ req })
    const result = await prisma.post.update({
      where: {
        id: targetId,
      },
      data: {
        likedBy: { connect: { email: session?.user?.email } },
      },
    })
    res.json(result)
  }
}
