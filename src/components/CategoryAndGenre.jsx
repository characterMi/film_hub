import { Box, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import { selectGenreOrCategory } from "../features/currentGenreOrCategory";
import { useDispatch } from "react-redux";

const CategoryAndGenre = ({ theme, value, src, text }) => {
  const dispatch = useDispatch();
  return (
    <Link
      to="/"
      style={{
        color: theme.palette.mode === "light" ? "#000" : "#fff",
        textDecoration: "none",
      }}
    >
      <ListItemButton onClick={() => dispatch(selectGenreOrCategory(value))}>
        <ListItemIcon>
          <Box
            component="img"
            src={src}
            alt={text}
            sx={{
              width: "70%",
              height: 30,
              filter: theme.palette.mode === "dark" && "invert(1)",
            }}
          />
        </ListItemIcon>
        <ListItemText
          primary={text}
          sx={{ color: theme.palette.mode === "light" ? "#000" : "#fff" }}
        ></ListItemText>
      </ListItemButton>
    </Link>
  );
};

export default CategoryAndGenre;
