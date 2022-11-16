import React from "react"
import { describe, expect, it } from "vitest"
import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"

function App() {
  return <div> app </div>
}

describe("App", () => {
  it("it should be rendered", () => {
    render(<App />)
    expect(screen.getByText("app")).toBeInTheDocument()
  })
})
