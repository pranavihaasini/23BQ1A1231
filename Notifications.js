const axios = require("axios");
const { Log } = require("./logger");

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJwcmFuYXZpLmhhYXNpbmlAZ21haWwuY29tIiwiZXhwIjoxNzgwNjM5OTQwLCJpYXQiOjE3ODA2MzkwNDAsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJlYzVjY2I3OC00YzY1LTRkOTctYTMwMC05YzY0NWViZTZjNjciLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJnYWpqYWxhIHZlbmthdGEgbmFnYSBzYWkgcHJhbmF2aSBoYXNpbmkiLCJzdWIiOiJkZDlhYjBmMC1mNTI2LTRiOTEtOGVjYi0yMDVlNTcwOTJkZDQifSwiZW1haWwiOiJwcmFuYXZpLmhhYXNpbmlAZ21haWwuY29tIiwibmFtZSI6ImdhamphbGEgdmVua2F0YSBuYWdhIHNhaSBwcmFuYXZpIGhhc2luaSIsInJvbGxObyI6IjIzYnExYTEyMzEiLCJhY2Nlc3NDb2RlIjoiUVFkRVl5IiwiY2xpZW50SUQiOiJkZDlhYjBmMC1mNTI2LTRiOTEtOGVjYi0yMDVlNTcwOTJkZDQiLCJjbGllbnRTZWNyZXQiOiJkZ0t3WXlxWUJ2ZkVxZ1JlIn0.nrQzlT1YQ740gJbNcxGNzWd7tuQ9veFPKKX6cYKeSsE";

async function getTopNotifications() {
  try {
    await Log(
      "backend",
      "info",
      "service",
      "Fetching notifications"
    );

    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    console.log("\n=== API RESPONSE ===\n");
    console.log(JSON.stringify(response.data, null, 2));

    let notifications;

    if (Array.isArray(response.data)) {
      notifications = response.data;
    } else if (Array.isArray(response.data.notifications)) {
      notifications = response.data.notifications;
    } else {
      console.log("\nResponse is not an array!");
      console.log("Keys:", Object.keys(response.data));
      return;
    }

    const priority = {
      Placement: 3,
      Result: 2,
      Event: 1,
    };

    notifications.sort((a, b) => {
      const p1 = priority[a.Type] || 0;
      const p2 = priority[b.Type] || 0;

      if (p1 !== p2) {
        return p2 - p1;
      }

      return new Date(b.Timestamp) - new Date(a.Timestamp);
    });

    const top10 = notifications.slice(0, 10);

    await Log(
      "backend",
      "info",
      "service",
      "Top 10 notifications calculated"
    );

    console.log("\n=== TOP 10 NOTIFICATIONS ===\n");
    console.log("Total Notifications:", notifications.length);
    console.table(top10);

  } catch (error) {
    console.error(
      error.response?.data || error.message
    );

    await Log(
      "backend",
      "error",
      "service",
      "Notification processing failed"
    );
  }
}

getTopNotifications();