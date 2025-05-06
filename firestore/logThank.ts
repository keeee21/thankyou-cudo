import { db } from "./index.ts";

export async function logThankYou(user: string, message: string) {
  await db.collection("thanks").add({
    user,
    message,
    createdAt: new Date(),
  });
}