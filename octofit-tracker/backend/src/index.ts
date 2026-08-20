import { connectDatabase } from './config/database.js';
import { app, baseUrl, port } from './server.js';

app.listen(port, () => {
  console.log(`OctoFit API listening at ${baseUrl}`);
  void connectDatabase();
});