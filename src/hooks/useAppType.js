export const useAppType = () => {
  if (localStorage.getItem("type") === "tv") return "tv";

  return "movie";
};
