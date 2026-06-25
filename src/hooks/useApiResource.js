import { useCallback, useEffect, useRef, useState } from "react";
import axiosPublic from "../api/axiosPublic";
import { getErrorMessage, getPayload } from "../api/response";

export default function useApiResource(endpoint, initialValue = null) {
  const initialValueRef = useRef(initialValue);
  const [data, setData] = useState(initialValue);
  const [loading, setLoading] = useState(Boolean(endpoint));
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    if (!endpoint) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axiosPublic.get(endpoint);
      setData(getPayload(response, initialValueRef.current));
    } catch (requestError) {
      setError(getErrorMessage(requestError, "Unable to load this content."));
    } finally {
      setLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    load();
  }, [load]);

  return { data, setData, loading, error, reload: load };
}
