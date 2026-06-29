import { act, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { useContext } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import axiosPublic from "../api/axiosPublic";
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
  onAuthStateChanged: authMocks.onAuthStateChanged,
  signInWithEmailAndPassword: authMocks.signInWithEmailAndPassword,
  signInWithPopup: authMocks.signInWithPopup,
  signOut: authMocks.signOut,
}));

vi.mock("../firebase/firebase.config", () => ({
  auth: { name: "test-auth" },
  googleProvider: { providerId: "google.com" },
  isFirebaseConfigured: true,
}));

vi.mock("../api/axiosPublic", () => ({ default: { get: vi.fn() } }));

function Consumer() {
  const { googleLogin, user, loading } = useContext(AuthContext);
  return (
    <>
      <p>{loading ? "Checking session" : user?.email || "Signed out"}</p>
      <button type="button" onClick={googleLogin}>Google login</button>
    </>
  );
}

describe("AuthProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

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

  it("signs in with Google and synchronizes the user profile with MongoDB", async () => {
    const getIdToken = vi.fn().mockResolvedValue("firebase-id-token");
    authMocks.signInWithPopup.mockResolvedValue({
      user: { getIdToken },
    });
    axiosPublic.get.mockResolvedValue({ data: { data: { role: "user" } } });

    render(
      <AuthProvider>
        <Consumer />
      </AuthProvider>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Google login" }));

    await waitFor(() =>
      expect(authMocks.signInWithPopup).toHaveBeenCalledWith(
        { name: "test-auth" },
        { providerId: "google.com" },
      ),
    );
    expect(getIdToken).toHaveBeenCalled();
    expect(axiosPublic.get).toHaveBeenCalledWith("/auth/me", {
      headers: { Authorization: "Bearer firebase-id-token" },
    });
  });
});
