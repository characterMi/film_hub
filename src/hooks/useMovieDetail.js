import { useMemo } from "react";
import { useAppType } from "./useAppType";

export const useMovieDetail = (data) => {
  const type = useAppType();

  const { firstRowContent, secondRowContent } = useMemo(() => {
    const firstRowContent = [
      `Language: ${data?.original_language?.toUpperCase()} | `,
    ];
    const secondRowContent = [`Status: ${data?.status}`];

    if (type === "tv") {
      const lastSeasonYear = data?.last_air_date?.split("-")[0];

      firstRowContent[0] += `Last season in: ${lastSeasonYear ?? 2000}`;

      secondRowContent.push(`Seasons: ${data?.number_of_seasons ?? 1}`);
      secondRowContent.push(`Episodes: ${data?.number_of_episodes ?? 12}`);
    } else {
      let duration = null;

      if (data?.runtime < 60) {
        duration = `${data?.runtime ?? 0}m`;
      } else {
        const minutes = data?.runtime % 60;
        const hours = (data?.runtime - minutes) / 60;
        duration = `${hours}h ${minutes}m`;
      }

      firstRowContent[0] += `Duration: ${duration}`;

      secondRowContent.push(`Budget: ${data?.budget?.toLocaleString() ?? 0}`);
      secondRowContent.push(`Revenue: ${data?.revenue?.toLocaleString() ?? 0}`);
    }

    return { firstRowContent, secondRowContent };
  }, [data]);

  return { firstRowContent, secondRowContent };
};
