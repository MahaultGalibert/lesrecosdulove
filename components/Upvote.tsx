import React from "react"
import Tippy from "@tippyjs/react"
import "tippy.js/dist/tippy.css"

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


  const Upvote = ({post}) => {
      return (
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
          </Tippy>)
  }

  export default Upvote