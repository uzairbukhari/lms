import { Composition } from "remotion";
import { Spike } from "./Spike";

export const Root = () => <Composition id="Spike" component={Spike} durationInFrames={120} fps={24} width={1280} height={768} />;
