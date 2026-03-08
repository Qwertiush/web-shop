import { cleanup } from "@testing-library/react"
import { vi } from "vitest";
import '@testing-library/jest-dom'

afterEach(()=>{
    cleanup();
    vi.clearAllMocks();
})