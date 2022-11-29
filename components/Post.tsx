import React from "react"
import Router from "next/router"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"
import { useSession } from "next-auth/react"

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
  const { data: session } = useSession()
  if (session) {
    const upvote = async (targetId: string) => {
      try {
        const body = { targetId }
        await fetch("/api/post", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        })
        alert("Merci pour le vote. Vous pouvez rafraîchir la page.")
      } catch (error) {
        console.error(error)
      }
    }
    return (
      <div className="post-div">
        <img
          className="h-20 hover:cursor-pointer mb-0.5"
          src={post.imageUrl}
          onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
        ></img>
        <p
          className="title-p hover:cursor-pointer"
          onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
        >
          {post.title}
        </p>
        <small className="creator-pseudonym-small w-50">
          {post.creator.name}
        </small>
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
          <Tippy
            content={
              <p className="text-xs">
                Je
                <img
                  className="ml-1 mr-1 inline-block"
                  src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f496.svg"
                  width="15"
                  height="15"
                ></img>
                pour cette reco
              </p>
            }
          >
            <button
              className="mr-0.5 mt-0 float-right text-gray-800 pt-0 px-0 h-3"
              onClick={() => upvote(post.id)}
            >
              +
            </button>
          </Tippy>
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
  } else {
    return (
      <div className="post-div">
        <img
          className="h-20 hover:cursor-pointer mb-0.5"
          src={post.imageUrl}
          onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
        ></img>
        <p
          className="title-p hover:cursor-pointer"
          onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}
        >
          {post.title}
        </p>
        <small className="creator-pseudonym-small w-50">
          {post.creator.name}
        </small>
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
}

export default Post
