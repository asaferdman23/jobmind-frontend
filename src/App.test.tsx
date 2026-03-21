import userEvent from "@testing-library/user-event";
import { render, screen } from "@testing-library/react";

import App from "./App";

vi.mock("./lib/auth", () => ({
  isDemoModeAvailable: () => true,
  isSupabaseEnabled: () => false,
  restoreSession: async () => null,
  signIn: vi.fn(),
  signOut: vi.fn(),
  signUp: vi.fn(),
}));

describe("App routing", () => {
  it("renders the landing page by default", async () => {
    window.history.pushState({}, "", "/");

    render(<App />);

    expect(await screen.findByText(/Is your CV good enough/i)).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /Get started free/i }).length).toBeGreaterThan(0);
  });

  it("navigates from landing to auth", async () => {
    const user = userEvent.setup();
    window.history.pushState({}, "", "/");

    render(<App />);

    const ctas = await screen.findAllByRole("button", { name: /Sign in/i });
    await user.click(ctas[0]);

    expect(await screen.findByRole("heading", { name: /Welcome back/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });
});
