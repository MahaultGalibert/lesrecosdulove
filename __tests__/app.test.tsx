import React, { useState } from "react"
import { describe, expect, it } from "vitest"
import { render, screen, waitFor } from "@testing-library/react"
import "@testing-library/jest-dom"
import Post from "../components/Post"

describe("Post", () => {
  it("should render posts", async () => {
    render(
      <Post
        post={{
          id: "",
          category: "",
          title: "A voix haute",
          imageUrl: "",
          author: "",
          comment: "",
          creator: {
            name: "",
            email: "",
          },
          _count: {
            likedBy: 1,
          },
          likedBy: [{ name: "Philippe Galibert" }],
          isLoggedIn: true,
        }}
      />
    )
    await waitFor(() =>
      expect(screen.getByText("A voix haute")).toBeInTheDocument()
    )
  })
})
