import React from "react"
import { GetServerSideProps } from "next"
import ReactMarkdown from "react-markdown"
import Layout from "../../components/Layout"
import { PostProps } from "../../components/Post"
// pages/p/[id].tsx
import prisma from '../../lib/prisma';

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
  });
  return {
    props: post,
  };
};


const Post: React.FC<PostProps> = (props) => {
  let title = props.title

  return (
    <Layout>
      <div>
        <h2>{title}</h2>
        <p><b>{props?.author}</b></p>
        <p>Proposé par <i>{props.creator.name}</i></p>
        <img className="post-img" src={props.imageUrl}></img>
        <ReactMarkdown children={props.comment} />
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
