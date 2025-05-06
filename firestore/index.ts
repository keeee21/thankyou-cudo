import admin from "npm:firebase-admin";

let firestore;

try {
  if (!admin.apps.length) {
    const serviceAccountPath = Deno.env.get("GOOGLE_APPLICATION_CREDENTIALS");
    if (!serviceAccountPath) {
      throw new Error("環境変数 GOOGLE_APPLICATION_CREDENTIALS が設定されていません。");
    }
    
    try {
      const serviceAccount = JSON.parse(
        Deno.readTextFileSync(serviceAccountPath)
      );

      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log("Firebase アプリが正常に初期化されました");
    } catch (fileError) {
      throw new Error(`サービスアカウントファイルの読み込みまたは解析に失敗しました: ${fileError.message}`);
    }
  }

  firestore = admin.firestore();
  console.log("Firestore データベースに接続しました");
} catch (error) {
  console.error("Firebase/Firestore 初期化エラー:", error);
  throw error; // エラーを上位に伝播させる
}

export const db = firestore;
