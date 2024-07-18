import { Download } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DownloadAppButton = ({ theme }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);

  const handleDownload = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
    } else {
      toast.success(
        `To install the app look for "Add to Homescreen" or install in your browser's menu.`
      );
    }
  };

  useEffect(() => {
    const handleBIP = (e) => {
      e.preventDefault();

      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handleBIP);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBIP);
    };
  }, []);

  return (
    <div className="download-btn">
      <Button
        color={theme.palette.mode === "light" ? "inherit" : "error"}
        onClick={handleDownload}
        sx={{ mb: 4 }}
      >
        Download app &nbsp; <Download />
      </Button>
    </div>
  );
};

export default DownloadAppButton;
