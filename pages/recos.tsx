// pages/recos.tsx

import React from "react"
import { GetServerSideProps } from "next"
import { useSession, getSession } from "next-auth/react"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
import prisma from "../lib/prisma"

export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
  const session = await getSession({ req })
  if (!session) {
    res.statusCode = 403
    return { props: { recos: [] } }
  }

  const recos = await prisma.post.findMany({
    where: {
      creator: { email: session.user.email },
    },
    include: {
      creator: {
        select: { name: true },
      },
      _count: {
        select: { likedBy: true },
      },
      likedBy: {
        select: { name: true },
      },
    },
  })
  return {
    props: { recos },
  }
}

type Props = {
  recos: PostProps[]
}

const Recos: React.FC<Props> = (props) => {
  const { data: session } = useSession()

  if (!session) {
    return (
      <Layout>
        <h1 className="ml-4 mt-2 text-3xl font-bold">Mes recos</h1>
        <div className="text-sm ml-4 mt-8">
          Vous devez être connecté pour voir cette page.
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="page">
        <h1 className="ml-4 mt-2 text-3xl font-bold">Mes recos</h1>
        <main id="feed-box-div">
          {props.recos.map((post) => (
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
          border-radius: 0.3rem;
          height: 10rem;
          width: 15rem;
        }

        #feed-box-div {
          display: flex;
          flex-wrap: wrap;
          margin: 3rem 10rem;
          justify-content: space-evenly;
        }

        .post:hover {
          box-shadow: 1px 1px 3px #aaa;
        }

        .post + .post {
          margin-top: 2rem;
        }
      `}</style>
    </Layout>
  )
}

export default Recos
