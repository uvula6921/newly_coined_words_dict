import React, { useRef, useEffect } from "react";
import "./FetchMore.css";

const FetchMore = ({ loading, setPage }) => {
  const fetchMoreTrigger = useRef(null);
  const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) setPage((page) => page + 5);
  });

  useEffect(() => {
    fetchMoreObserver.observe(fetchMoreTrigger.current);
    return () => {
      // fetchMoreObserver.unobserve(fetchMoreTrigger.current);
    };
  }, []);

  return (
    <div
      id="fetchMore"
      className={loading ? "loading" : ""}
      ref={fetchMoreTrigger}
    />
  );
};

export default FetchMore;
