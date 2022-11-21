import React from "react"
import Router from "next/router"

export type PostProps = {
  id: string
  category: string
  title: string
  imageUrl: string
  author: string
  comment: string
  creator: {
    name: string
    email: string
  }
  _count: {
    likedBy: number
  }
}

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  return (
    <div
      className="post-div"
      onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
    >
      <img className="post-img" src={post.imageUrl}></img>
      <p className="title-p">{post.title}</p>
      <small className="creator-pseudonym-small">{post.creator.name}</small>
      <small className="text-right text-xs mr-1.5">
        {post._count.likedBy}
        <img
          className="ml-0.5 float-right mt-0.5"
          src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f496.svg"
          width="13"
          height="13"
        ></img>
      </small>
      <style jsx>{`
        .post-div {
          color: inherit;
          padding: 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
        }

        .post-div:hover {
          box-shadow: 1px 1px 3px #aaa;
          cursor: pointer;
        }

        .post-img {
          height: 5.8rem;
        }

        .title-p {
          font-weight: bold;
          font-size: 0.9rem;
          margin: 0;
        }

        .creator-pseudonym-small {
          font-size: 0.7rem;
        }
      `}</style>
    </div>
  )
}

export default Post
