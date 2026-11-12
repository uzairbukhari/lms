// Painted backdrops (cut from the owner's artwork in assets/backgrounds, resized to 1600 wide). Any backdrop without a picture here keeps
// its drawn scenery from ../Backdrop.tsx. The plain backdrop is a lined board; every other picture is left empty in the middle so the lesson stands out.
import classroom from "./backgrounds/web/classroom.webp";
import desert from "./backgrounds/web/desert.webp";
import farm from "./backgrounds/web/farm.webp";
import forest from "./backgrounds/web/forest.webp";
import home from "./backgrounds/web/home.webp";
import kitchen from "./backgrounds/web/kitchen.webp";
import lab from "./backgrounds/web/lab.webp";
import map from "./backgrounds/web/map.webp";
import meadow from "./backgrounds/web/meadow.webp";
import mountain from "./backgrounds/web/mountain.webp";
import plain from "./backgrounds/web/plain.webp";
import pond from "./backgrounds/web/pond.webp";
import sea from "./backgrounds/web/sea.webp";
import sky from "./backgrounds/web/sky.webp";
import space from "./backgrounds/web/space.webp";
import town from "./backgrounds/web/town.webp";

export const BACKDROP_IMAGES: Partial<Record<string, string>> = { classroom, desert, farm, forest, home, kitchen, lab, map, meadow, mountain, plain, pond, sea, sky, space, town };
