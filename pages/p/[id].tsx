import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { PostProps } from "../../components/Post"
// pages/p/[id].tsx
import prisma from "../../lib/prisma"

// pages/p/[id].tsx
export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      creator: {
        select: { name: true },
      },
    },
  })
  return {
    props: post,
  }
}

const Post: React.FC<PostProps> = (props) => {
  let title = props.title

  return (
    <Layout>
      <div>
        <h2 className="font-bold text-xl mb-1">{title}</h2>
        <p className="mb-3">{props?.author}</p>
        <p className="text-sm">
          Proposé par <i>{props.creator.name}</i>
        </p>
        <img className="mt-4" src={props.imageUrl}></img>
        <ReactMarkdown className="text-sm mt-4" children={props.comment} />
      </div>
      <style jsx>{`
        .page {
          background: white;
          padding: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Post
