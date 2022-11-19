import { describe, it, expect } from "vitest"
import { checkNames } from "./getDisplayedName"

describe("checkNames", () => {
  it("should return true if firstName is a string", () => {
    expect(checkNames("Prénom", "Nom de famille")).toBe(true)
  })

  it("should return false if firstName is not a string", () => {
    expect(checkNames(15, "Nom de famille")).toBe(false)
  })
})


