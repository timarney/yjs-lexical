export const colors = [
  "#d62728",
  "#1f77b4",
  "#ff7f0e",
  "#2ca02c",
  "#9467bd",
  "#8c564b",
  "#e377c2",
  "#bcbd22",
  "#17becf",
  "#aec7e8",
  "#ffbb78",
  "#98df8a",
  "#c5b0d5",
  "#c49c94",
  "#f7b6d2",
];

export interface GoogleUserProfile {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  hd: string;
  color: string;
}

export interface ActiveUserProfile {
  userId: number;
  color: string;
  name: string;
}

export function getRandomColor(): string {
  const color = colors[Math.floor(Math.random() * colors.length)];
  return color;
}
