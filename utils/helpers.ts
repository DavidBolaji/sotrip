import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isNotNumber(input: string) {
  return input === "" || !/^\d+$/.test(input);
}

export function isNotText(input: string) {
  return input === "" || !/^\D+$/.test(input);
}
