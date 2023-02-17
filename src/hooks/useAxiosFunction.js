import { useState, useEffect } from "react";

const useAxiosFunction = () => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState();

  const axiosFetch = async (configObj) => {
    const { axiosInstance, method, url, requestConfig = {} } = configObj;
    const token = localStorage.getItem("token");
    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);

      const res = await axiosInstance({
        method: method.toLowerCase(),
        url: url,
        data: requestConfig.data,
        signal: ctrl.signal,
        headers: {
          "access_token": token ? `${token}` : ""
        }
      });

      setResponse(res.data);
      setError(null);
    } catch (err) {
      setError(err.response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // useEffect cleanup function
    return () => controller && controller.abort();
  }, [controller]);

  return { response, error, loading, axiosFetch };
};

export default useAxiosFunction;
