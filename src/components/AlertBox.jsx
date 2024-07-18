import { Box, Button, Modal, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { logoutUser } from "../features/auth";

const AlertBox = ({ setAlertBox, alertBox, theme }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [_, setSearchParams] = useSearchParams();

  const logout = () => {
    setAlertBox(false);

    dispatch(logoutUser());

    setSearchParams({});

    navigate("/");

    toast.error("You Logged out !");
  };

  return (
    <Modal
      closeAfterTransition
      open={alertBox}
      onClose={() => setAlertBox(false)}
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "max-content",
          p: 2,
          backgroundColor: theme.palette.mode === "light" ? "#fff" : "#1a1a1a",
          position: "absolute",
          top: "50%",
          left: "50%",
          translate: "-50% -50%",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          borderRadius: "10px",
        }}
      >
        <Typography variant="h6">Do you really want to logout ?</Typography>
        <Box mt="10px">
          <Button
            color={theme.palette.mode === "light" ? "primary" : "error"}
            onClick={logout}
          >
            Yes
          </Button>
          <Button
            color={theme.palette.mode === "light" ? "primary" : "error"}
            onClick={() => setAlertBox(false)}
          >
            No
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AlertBox;
