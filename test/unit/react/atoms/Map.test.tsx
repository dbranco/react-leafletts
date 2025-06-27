import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { Map } from "@react-leafletts/react";

describe("<Map />", () => {
  it("renders without crashing", () => {
    const { container } = render(<Map />);
    expect(container.querySelector("div")).toBeInTheDocument();
  });
});
