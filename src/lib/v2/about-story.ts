export type AboutStoryMode = "active" | "static";

type ResolveAboutStoryModeOptions = {
  desktop: boolean;
  reduceMotion: boolean;
};

export function resolveAboutStoryMode({
  desktop,
  reduceMotion,
}: ResolveAboutStoryModeOptions): AboutStoryMode {
  return desktop && !reduceMotion ? "active" : "static";
}
