import React, { useState } from "react"
import { GetStaticProps } from "next"
import Layout from "../components/Layout"
import Post, { PostProps } from "../components/Post"
// pages/index.tsx
import prisma from "../lib/prisma"
import { useSession } from "next-auth/react"

// index.tsx
const postCategories = [
  { value: "Film", label: "Films" },
  { value: "Série", label: "Séries" },
  { value: "Livre", label: "Livres" },
  { value: "Podcast", label: "Podcasts" },
  { value: "Culture", label: "Culture" },
  { value: "Musique", label: "Musique" },
  { value: "Recette", label: "Recettes" },
]

export const getStaticProps: GetStaticProps = async () => {
  const feed = await prisma.post.findMany({
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
    props: { feed },
    revalidate: 10,
  }
}

type Props = {
  feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
  const { data: session } = useSession()
  const [selectedCategory, selectCategory] = useState(postCategories[0].value)
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
        <br />
        <select
          value={selectedCategory}
          className="mb-1 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:border-black dark:focus:ring-blue-500 dark:focus:border-black"
          onChange={(e) => selectCategory(e.target.value)}
        >
          {postCategories.map((category) => (
            <option value={category.value}>{category.label}</option>
          ))}
        </select>
        <main id="feed-box-div">
          {props.feed
            .filter((post) => post.category === selectedCategory)
            .sort((a, b) => b._count.likedBy - a._count.likedBy)
            .map((post) => (
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
          margin: 1rem 10rem;
          justify-content: space-evenly;
        }
      `}</style>
    </Layout>
  )
}

export default Blog
