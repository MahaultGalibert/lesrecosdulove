import React from "react";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

export type PostProps = {
  id: string;
  category: string;
  title: string;
  imageUrl: string;
  author: string;
  comment: string;
  creator: {
    name: string;
    email: string;
  } | null;
};

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  return (
<div className="post-div" onClick={() => Router.push("/p/[id]", `/p/${post.id}`)}>
      <img className="post-img" src={post.imageUrl}></img>
      <p className="title-p">{post.title}</p>
      <small className="creator-pseudonym-small">{post.creator.name}</small>
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
          height: 6rem;
        }

        .title-p {
          font-weight: bold;
          font-size: 0.9rem;
          margin: 0;
        }

        .creator-pseudonym-small{
          font-size: 0.7rem;
        }
      `}</style>
    </div>
  );
};

export default Post;
