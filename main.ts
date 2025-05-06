import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { logThankYou } from "./firestore/logThank.ts";

serve(async (req) => {
  try {
    const url = new URL(req.url);

    if (url.pathname === "/slack/thankyou" && req.method === "POST") {
      const bodyText = await req.text();
      const params = new URLSearchParams(bodyText);
      const message = params.get("text") ?? "(no message)";
      const user = params.get("user_id") ?? "unknown";

      console.log(`✨ Logging thanks: ${user} => ${message}`);
      try {
        await logThankYou(user, message);
        console.log("データが正常に保存されました");
        return new Response("Thanks logged!", { status: 200 });
      } catch (error) {
        console.error("保存エラー:", error);
        return new Response(`Error: ${error.message}`, { status: 500 });
      }
    }
    return new Response("Not Found", { status: 404 });
  } catch (error) {
    console.error("サーバーエラー:", error);
    return new Response(`Server error: ${error.message}`, { status: 500 });
  }
});
