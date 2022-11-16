import React from "react"
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

function Post() {
  return <div> Post </div>
}

describe("Post", () => {
  it("it should be rendered", () => {
    render(<Post />)
    expect(screen.getByText("Post")).toBeInTheDocument()
  })
})
