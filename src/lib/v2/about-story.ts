export type AboutStoryMode = "active" | "static";

const STATIC_STORY_VALUES = new Set(["static", "0", "off", "false"]);

export type AboutStoryControls = {
  forceStatic: boolean;
};

type ResolveAboutStoryModeOptions = {
  desktop: boolean;
  reduceMotion: boolean;
  forceStatic?: boolean;
};

export function parseAboutStoryControls(value: string): AboutStoryControls {
  return {
    forceStatic: STATIC_STORY_VALUES.has(value.trim().toLowerCase()),
  };
}

export function resolveAboutStoryMode({
  desktop,
  reduceMotion,
  forceStatic = false,
}: ResolveAboutStoryModeOptions): AboutStoryMode {
  return desktop && !reduceMotion && !forceStatic ? "active" : "static";
}
