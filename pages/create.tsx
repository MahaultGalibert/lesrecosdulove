// pages/create.tsx

import React, { useState } from "react"
import Layout from "../components/Layout"
import Router from "next/router"

export type RecoProps = {
  category: string
  title: string
  imageUrl: string
  author: string
  comment: string
}

const Reco: React.FC<{ reco: RecoProps }> = ({ reco }) => {
  const [category, setCategory] = useState("")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [comment, setComment] = useState("")

  // /pages/create.tsx

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    try {
      const body = { category, title, author, imageUrl, comment }
      await fetch("/api/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })
      await Router.push("/recos")
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Layout>
      <div>
        <form onSubmit={submitData}>
          <h1 className="text-xl font-bold mb-4">Nouvelle reco</h1>
          <input
            disabled
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Film"
            type="mandatoryText"
            value={category}
          />
          <input
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titre"
            type="mandatoryText"
            value={title}
          />
          <input
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Auteur (facultatif)"
            type="optionalText"
            value={author}
          />
          <input
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="Url de l'affiche (facultatif)"
            type="optionalText"
            value={imageUrl}
          />
          <textarea
            cols={50}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Commentaire (facultatif)"
            rows={8}
            value={comment}
          />
          <input className = "hover:cursor-pointer" disabled={!title} type="submit" value="Créer" />
          <a className="text-sm hover:cursor-pointer ml-3" href="#" onClick={() => Router.push("/")}>
            Annuler
          </a>
        </form>
      </div>
      <style jsx>{`
        .page {
          background: var(--geist-background);
          padding: 3rem;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        input[type="mandatoryText"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
          font-family: sans-serif;
          font-size: 15px;
        }

        input[type="optionalText"],
        textarea {
          width: 100%;
          padding: 0.5rem;
          margin: 0.5rem 0;
          border-radius: 0.25rem;
          border: 0.125rem solid rgba(0, 0, 0, 0.2);
          font-family: sans-serif;
          font-style: italic;
          font-size: 15px;
        }

        textarea {
          font-family: sans-serif;
          font-style: italic;
          font-size: 15px;
          resize: none;
        }

        input[type="submit"] {
          background: #ececec;
          border: 0;
          padding: 1rem 2rem;
        }

      `}</style>
    </Layout>
  )
}

export default Reco
