import React from "react"
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import Post from "../components/Post"

describe("Post", () => {
  it("renders Post", () => {
    render(
      <Post
        post={{
          id: "",
          category: "",
          title: "",
          imageUrl: "",
          author: "",
          comment: "",
          creator: null,
        }}
      />
    )
    expect(screen.getByText("A voix haute"))
  })
})
