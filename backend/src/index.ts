// index.ts
import app from "./app";

const host = "0.0.0.0";
const port = 13002;

app.listen(port, host, () => {
  console.log(`Server running on ${host}:${port}`);
});
