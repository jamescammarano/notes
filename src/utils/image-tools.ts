import { createHash } from "crypto";

export function generateImageURL(user: string, title: string): string {
  const salt = new Date();
  const seed = JSON.stringify({ user, title, salt });
  const hash = createHash("md5").update(seed).digest("hex");

  return `https://robohash.org/${hash}?set=set4`;
}
