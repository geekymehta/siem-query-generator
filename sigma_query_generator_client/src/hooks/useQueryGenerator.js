import { useState, useCallback } from "react";

const useQueryGenerator = (target, format, pipeline, rule) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const postData = {
        rule: rule,
        pipeline: pipeline,
        target: target,
        format: format,
      };

      const response = await fetch("https://localhost:3000/sigma", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      console.log(response);
      const data = await response.text();
      console.log("Response Text:", data);
      setQuery(data);
    } catch (error) {
      setError(error.message || "An error occurred");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, [target, format, pipeline, rule]);

  //   useEffect(() => {
  //     fetchData();
  //   }, [fetchData]);

  return { query, loading, error, fetchData };
};

export default useQueryGenerator;
