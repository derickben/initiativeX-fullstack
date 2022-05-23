import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        // if (oldProgress === 100) {
        //   return 0;
        // }
        const diff = Math.random() * 25;
        return Math.min(oldProgress + diff, 100);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress variant="determinate" value={progress} />
    </Box>
  );
}
