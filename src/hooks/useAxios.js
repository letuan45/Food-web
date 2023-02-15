//A Cover of followed by youtuber Dave Gray
import { useState, useEffect } from "react";

//Hook này dùng cho method GET
const useAxios = (configObj) => {
  const { axiosInstance, method, url, requestConfig = {} } = configObj;

  const [response, setResponse] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);

  const refetch = () => {
    // Để chạy lại useEffect bên dưới
    setReload((prev) => !prev);
  };

  useEffect(() => {
    const controller = new AbortController(); //dùng đến khi cần dừng 1 request

    const fetchData = async () => {
      try {
        const res = await axiosInstance({
          method: method.toLowerCase(),
          url: url,
          data: requestConfig.data,
          signal: controller.signal,
        });

        setResponse(res.data);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();

    //Khi conponent unmount câu lệnh sau sẽ chạy
    //và ngăn memory leak
    return () => controller.abort();
  }, [axiosInstance, method, url, requestConfig, reload]);

  return { response, isLoading, error, refetch };
};

export default useAxios;
