document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("form");

  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      // Collect user info
      const os = navigator.platform;
      const userAgent = navigator.userAgent;
      const resolution = `${window.screen.width}x${window.screen.height}`;
      const referrer = document.referrer || "Direct Visit";
      const device = /Mobi|Android/i.test(userAgent) ? "Mobile" : "Desktop";

      // Attempt to get location (Requires user permission)
      navigator.geolocation.getCurrentPosition(
        function (position) {
          sendData(
            position.coords.latitude + ", " + position.coords.longitude,
            os,
            device,
            resolution,
            referrer
          );
        },
        function () {
          sendData("Location denied", os, device, resolution, referrer);
        }
      );

      function sendData(location, os, device, resolution, referrer) {
        const formData = new FormData(loginForm);
        formData.append("os", os);
        formData.append("device", device);
        formData.append("resolution", resolution);
        formData.append("location", location);
        formData.append("referrer", referrer);

        fetch(loginForm.action, {
          method: "POST",
          body: new URLSearchParams([...formData]),
        })
          .then((response) => response.text())
          .then((html) => {
            document.body.innerHTML = html;
          })
          .catch((error) => console.error("Error:", error));
      }
    });
  }
});
