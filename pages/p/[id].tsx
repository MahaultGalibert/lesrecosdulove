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

const upvote = async (targetId: string) => {
  try {
    const body = { targetId }
    await fetch("/api/post", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  } catch (error) {
    console.error(error)
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
        <br />
        <button
          onClick={() => upvote(props.id)}
          className="bg-neutral-400 hover:bg-neutral-500 text-white py-2 px-4 rounded"
        >
          Je
          <img
            className="ml-1 mr-1 inline-block"
            src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f496.svg"
            width="15"
            height="15"
          ></img>
          pour cette reco
        </button>
        <img className="mt-6 w-80" src={props.imageUrl}></img>
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
