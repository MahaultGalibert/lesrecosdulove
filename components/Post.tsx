import React from "react"
import Router from "next/router"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"

export type UserProps = {
  name: string
}

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
  likedBy: [UserProps]
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
      <small className="float-right">
        <Tippy
          content={
            <small>
              {post.likedBy.map((x: { name: any }) => (
                <p>{x.name}</p>
              ))}
            </small>
          }
        >
          <button className="ml-0 float-right w-3.5 text-xs align-top text-center">
            {post._count.likedBy}
          </button>
        </Tippy>
        <img
          className="mt-0.5 float-right mr-0"
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
