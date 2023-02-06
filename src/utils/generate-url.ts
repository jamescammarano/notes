import { createHash } from "crypto";

export function generateURL(user: string, title: string): string {
  const robotOrCat = Math.round(Math.random()) === 0 ? 1 : 4;
  const salt = new Date();
  const seed = JSON.stringify({ user, title, salt });
  const hash = createHash("md5").update(seed).digest("hex");

  return `https://robohash.org/${hash}?set=set${robotOrCat}`;
}
