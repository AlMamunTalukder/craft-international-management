export const tagTypesList = [
  "programm",
] as const;

export type TagType = typeof tagTypesList[number];
