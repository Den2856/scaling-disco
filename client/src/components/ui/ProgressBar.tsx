import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 1);

    window.onload = () => {
      setLoading(false);
    };

    return () => clearInterval(interval);

  }, []);

  if (!loading) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
      style={{ width: `${progress}%` }}
      initial={{ width: 0 }}
      animate={{ width: `${progress}%` }}
      transition={{ duration: 0.2 }} 
    />
  );
};

export default ProgressBar;
