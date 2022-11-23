import React from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
// pages/index.tsx
import prisma from "../lib/prisma"

// index.tsx
export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
    include: {
      creator: {
        select: { name: true }
      },
      _count: {
        select: { likedBy: true }
      },
      likedBy: {
        select: {name: true}
      }
    },
  })
  return {
    props: { feed },
    revalidate: 10,
  }
}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  return (
    <Layout>
      <div className="page">
        <img
          className="ml-4"
          src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f496.svg"
          width="50"
          height="50"
        ></img>
        <h1 className="ml-4 mt-2 text-3xl font-bold">Les recos du love</h1>
        <main id="feed-box-div">
          {props.feed.map((post) => (
            <div key={post.id} className="post-box-div">
              <Post post={post} />
            </div>
          ))}
        </main>
      </div>
      <style jsx>{`
        .post-box-div {
          background: white;
          margin: 1rem;
          padding: 0;
          border-style: solid;
          border-width: 0.01rem;
          border-color: rgb(220, 220, 220);
          border-radius: 0.4rem;
          height: 10rem;
          width: 15rem;
        }

        #feed-box-div {
          display: flex;
          flex-wrap: wrap;
          margin: 3rem 10rem;
          justify-content: space-evenly;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
