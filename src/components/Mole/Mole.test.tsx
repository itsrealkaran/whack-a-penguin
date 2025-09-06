import { renderWithProviders } from "@/test-utils";
import { screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import Mole from ".";

describe("Battlefield", () => {
  it("Renders the correct amount of moles", () => {
    const mockFn = jest.fn();
    const mockMole = { id: "testid", delay: 1, speed: 2 };
    renderWithProviders(<Mole mole={mockMole} onMoleClick={mockFn} onEmptyHoleClick={mockFn} />);
    const mole = screen.getByTestId("hole");
    act(() => {
      mole.click();
    });

    screen.debug();

    expect(mockFn).toHaveBeenCalledTimes(0);
  });
});
