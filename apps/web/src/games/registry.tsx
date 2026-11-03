import type { ComponentType } from "react";
import type { GameId } from "@lms/schema";
import type { GameProps } from "./common";
import { GemMaze } from "./GemMaze";
import { NumberBubbles } from "./NumberBubbles";
import { PeekAPop } from "./PeekAPop";
import { SortDash } from "./SortDash";
import { StarScoop } from "./StarScoop";
import { TwinTiles } from "./TwinTiles";

export const GAMES: Record<GameId, { Component: ComponentType<GameProps>; icon: string; how: string[] }> = {
  "star-scoop": { Component: StarScoop, icon: "🌠", how: ["Slide your finger to move the catcher.", "Catch the treats. Gold ones are worth 3!", "Dodge the baddies or you lose 2."] },
  "number-bubbles": { Component: NumberBubbles, icon: "🫧", how: ["Read the sign at the top.", "Pop only the bubbles that match it.", "The sign changes every 15 seconds!"] },
  "twin-tiles": { Component: TwinTiles, icon: "🃏", how: ["Peek at the tiles before they flip over.", "Turn over two tiles to find a pair.", "Fewer wrong guesses = more points."] },
  "peek-a-pop": { Component: PeekAPop, icon: "🐹", how: ["Critters pop out of their holes.", "Tap the friendly ones quickly.", "Leave the sleepy ones alone! 😴"] },
  "gem-maze": { Component: GemMaze, icon: "🧭", how: ["Swipe on the maze or use the arrows.", "Collect every gem.", "Clear a maze for 2 extra and a brand new maze!"] },
  "sort-dash": { Component: SortDash, icon: "🧺", how: ["Look at the thing sliding down.", "Tap (or swipe to) the right basket.", "The baskets change every 15 seconds!"] },
};
