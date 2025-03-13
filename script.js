document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form[name='login']");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); 

    const userAgent = navigator.userAgent;
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const referrer = document.referrer || "Direct Access";

    const formData = new FormData(form);
    formData.append("userAgent", userAgent);
    formData.append("screenResolution", screenResolution);
    formData.append("referrer", referrer);

    fetch("/.netlify/functions/submit", {
      method: "POST",
      body: new URLSearchParams(formData),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Success:", data);
        window.location.href = "/success.html"; 
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });
});
