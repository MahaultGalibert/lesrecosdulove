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
      likedBy: {
        select: { name: true },
      },
    },
  })
  return {
    props: post,
  }
}

const Post: React.FC<PostProps> = (props) => {
  return (
    <Layout>
      <div>
        <p className="">{props.category}</p>
        <br />
        <h2 className="font-bold text-xl mb-1">{props.title}</h2>
        <p className="mb-3">{props?.author}</p>
        <p className="text-sm">
          Proposé par <i>{props.creator.name}</i>
        </p>
        <img className="mt-6 w-80" src={props.imageUrl}></img>
        <ReactMarkdown className="text-sm mt-4" children={props.comment} />
        <br />
<<<<<<< HEAD
=======
        <p className="text-sm">
          Cette reco a plu à :
          <small>
            {props.likedBy.map((x: { name: any }) => (
              <p>
                <img
                  className="float-left mt-1 mr-1"
                  src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f496.svg"
                  width="13"
                  height="13"
                ></img>
                {x.name}
              </p>
            ))}
          </small>
        </p>
>>>>>>> main
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
