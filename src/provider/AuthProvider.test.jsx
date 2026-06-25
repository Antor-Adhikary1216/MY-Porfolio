import { act, render, screen } from "@testing-library/react";
import { useContext } from "react";
import { describe, expect, it, vi } from "vitest";
import AuthProvider from "./AuthProvider";
import AuthContext from "./auth-context";

const authMocks = vi.hoisted(() => ({
  callback: null,
  onAuthStateChanged: vi.fn((_auth, callback) => {
    authMocks.callback = callback;
    return vi.fn();
  }),
  signInWithEmailAndPassword: vi.fn(),
  signInWithPopup: vi.fn(),
  signOut: vi.fn(),
}));

vi.mock("firebase/auth", () => ({
  GoogleAuthProvider: vi.fn(),
  onAuthStateChanged: authMocks.onAuthStateChanged,
  signInWithEmailAndPassword: authMocks.signInWithEmailAndPassword,
  signInWithPopup: authMocks.signInWithPopup,
  signOut: authMocks.signOut,
}));

vi.mock("../firebase/firebase.config", () => ({
  auth: { name: "test-auth" },
  isFirebaseConfigured: true,
}));

function Consumer() {
  const { user, loading } = useContext(AuthContext);
  return <p>{loading ? "Checking session" : user?.email || "Signed out"}</p>;
}

describe("AuthProvider", () => {
  it("tracks Firebase user state with onAuthStateChanged", async () => {
    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    );

    expect(screen.getByText("Checking session")).toBeInTheDocument();

    await act(async () => {
      authMocks.callback({ email: "admin@example.com" });
    });

    expect(screen.getByText("admin@example.com")).toBeInTheDocument();
  });
});
