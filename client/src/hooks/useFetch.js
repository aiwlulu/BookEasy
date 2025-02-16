"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async () => {
    setLoading(true);
    try {
      const apiUrl = url.startsWith("/api/v1") ? url : `/api/v1${url}`;
      const response = await axios.get(apiUrl);
      setData(response.data);
    } catch (error) {
      setError(error.response?.data || error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, loading, error };
};

export default useFetch;
