import express, { Request, Response, RequestHandler } from 'express';
import bodyParser from 'body-parser';
import { Storage } from '@google-cloud/storage';
import { BigQuery } from '@google-cloud/bigquery';

const app = express();
const port = process.env.PORT || 8080;

// Google Cloudクライアントの初期化
const storage = new Storage();
const bigquery = new BigQuery();

app.use(bodyParser.json());

// 修正箇所1: 型アサーション追加
app.post('/upload', (async (req: Request, res: Response) => {
  try {
    const { bucketName, fileName, fileContent } = req.body;
    if (!bucketName || !fileName || !fileContent) {
      return res.status(400).send('Missing required fields');
    }

    const buffer = Buffer.from(fileContent, 'base64');
    const bucket = storage.bucket(bucketName);
    const file = bucket.file(fileName);

    await file.save(buffer);

    res.status(200).send('File uploaded successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error uploading file');
  }
}) as RequestHandler);

// 修正箇所2: 型アサーション追加
app.post('/log', (async (req: Request, res: Response) => {
  try {
    const { datasetId, tableId, logData } = req.body;
    if (!datasetId || !tableId || !logData) {
      return res.status(400).send('Missing required fields');
    }

    const dataset = bigquery.dataset(datasetId);
    const table = dataset.table(tableId);

    await table.insert(logData);

    res.status(200).send('Log inserted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error inserting log');
  }
}) as RequestHandler);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
