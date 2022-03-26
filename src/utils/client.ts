// utils/client.ts
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:13002",
});

export default client;
