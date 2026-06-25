export const getPayload = (response, fallback = null) =>
  response?.data?.data ?? response?.data ?? fallback;

export const getErrorMessage = (error, fallback = "Something went wrong. Please try again.") => {
  if (error?.code?.startsWith("auth/")) {
    const authMessages = {
      "auth/invalid-credential": "The email or password is incorrect.",
      "auth/popup-closed-by-user": "Google sign-in was cancelled.",
      "auth/popup-blocked": "Your browser blocked the Google sign-in window.",
      "auth/network-request-failed": "Network error. Check your connection and try again.",
      "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
    };
    return authMessages[error.code] || error.message || fallback;
  }

  return error?.response?.data?.message || error?.message || fallback;
};
