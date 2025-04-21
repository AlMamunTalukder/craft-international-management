export const tagTypesList = [
  "student",
] as const;

export type TagType = typeof tagTypesList[number];
