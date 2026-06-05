const axios = require("axios");

const LOG_API_URL = "http://4.224.186.213/evaluation-service/logs";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwcmFuYXZpLmhhYXNpbmlAZ21haWwuY29tIiwiZXhwIjoxNzgwNjQxMzI5LCJpYXQiOjE3ODA2NDA0MjksImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiI1ZDA1MWJmNi00MzZkLTRjNzktODg0My00OWU1YjNkMWJiMGEiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJnYWpqYWxhIHZlbmthdGEgbmFnYSBzYWkgcHJhbmF2aSBoYXNpbmkiLCJzdWIiOiJkZDlhYjBmMC1mNTI2LTRiOTEtOGVjYi0yMDVlNTcwOTJkZDQifSwiZW1haWwiOiJwcmFuYXZpLmhhYXNpbmlAZ21haWwuY29tIiwibmFtZSI6ImdhamphbGEgdmVua2F0YSBuYWdhIHNhaSBwcmFuYXZpIGhhc2luaSIsInJvbGxObyI6IjIzYnExYTEyMzEiLCJhY2Nlc3NDb2RlIjoiUVFkRVl5IiwiY2xpZW50SUQiOiJkZDlhYjBmMC1mNTI2LTRiOTEtOGVjYi0yMDVlNTcwOTJkZDQiLCJjbGllbnRTZWNyZXQiOiJkZ0t3WXlxWUJ2ZkVxZ1JlIn0.N1r7f6BjAykDFkuZffcPHJvwIIVTc9v6v3VYipbTF3w";

async function Log(stack, level, packageName, message) {
  try {
    const response = await axios.post(
      LOG_API_URL,
      {
        stack,
        level,
        package: packageName,
        message,
      },
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(response.data);
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
}

module.exports = { Log };