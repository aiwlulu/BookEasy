"use client";
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";

const useFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const apiUrl = url.startsWith("/api/v1") ? url : `/api/v1${url}`;
      const response = await axios.get(apiUrl);
      setData(response.data);
    } catch (error: any) {
      setError(error.response?.data || error.message);
    }
    setLoading(false);
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};

export default useFetch;
