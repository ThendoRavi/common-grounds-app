document.addEventListener("DOMContentLoaded", function () {
  var visitorCode = document.getElementById("visitorCode");
  var logout = document.getElementById("logout");
  var heading = document.getElementById("heading");
  var logo = document.getElementById("logo");
  var logIssue = document.getElementById("logIssue");
  var setUpFacialAuth = document.getElementById("setUpFacialAuth");
  const redCircle = document.getElementById("redCircle");
  const notificationList = document.getElementById("notificationList");

  var viewFines = document.getElementById("viewFines");
  var viewNotifications = document.getElementById("viewNotifications");

  let name = "";

  logIssue.addEventListener("click", function () {
    window.location.href = "/resident/manageIssues";
  });

  //url to view fines
  viewFines.addEventListener("click", function () {
    window.location.href = "/resident/viewFines";
  });

  viewNotifications.addEventListener("click", function () {
    window.location.href = "/resident/viewNotifications";
  });

  // setUpFacialAuth.addEventListener("click", function () {
  //   window.location.href = "/resident/register-face";
  // });

  const fetchNotifications = async () => {
    //get request to /api/fines/hasUnreadFines
    await fetch("/api/fines/hasUnreadFines")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.unreadFines > 0) {
          redCircle.style.display = "block";
          notificationList.innerHTML += `<li><a id="notificationFine" class="block cursor-pointer px-4 py-2 hover:bg-gray-100">You have been issued ${data.unreadFines} new fines.</a></li>`;
          document
            .getElementById("notificationFine")
            .addEventListener("click", function () {
              window.location.href = "/resident/viewFines";
            });
        }
        if (data.error) {
          notificationList.innerHTML += `<li><a class="block px-4 py-2 hover:bg-gray-100">An error occurred while fetching fines.</a></li>`;
        }
      })
      .catch((error) => {
        //append error message to notification list
        notificationList.innerHTML += `<li><a class="block px-4 py-2 hover:bg-gray-100">An error occurred while fetching fines.</a></li>`;
        console.log("Error:", error);
      });

    //get request to /api/notifications/getUnreadNotifications
    await fetch("/api/notifications/getUnreadNotifications")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.unreadNotifications > 0) {
          redCircle.style.display = "block";
          notificationList.innerHTML += `<li><a id="notificationNotification" class="block cursor-pointer px-4 py-2 hover:bg-gray-100"> You have ${data.unreadNotifications} unread notifications.</a></li>`;
          document
            .getElementById("notificationNotification")
            .addEventListener("click", function () {
              window.location.href = "/resident/viewNotifications";
            });
        }
        if (data.error) {
          notificationList.innerHTML += `<li><a class="block px-4 py-2 hover:bg-gray-100">An error occurred while fetching your notifications.</a></li>`;
        }
      })
      .catch((error) => {
        //append error message to notification list
        notificationList.innerHTML += `<li><a class="block px-4 py-2 hover:bg-gray-100">An error occurred while fetching your notifications.</a></li>`;
        console.log("Error:", error);
      });

    //get request to get extreme weather events
    await fetch("/api/notifications/getExtremeWeatherNotifications")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        if (data.extremeWeather === true) {
          redCircle.style.display = "block";
          notificationList.innerHTML += `<li><a id="weatherNotification" class="block px-4 py-2 cursor-pointer hover:bg-gray-100"> ${data.currCondition}!</a></li>`;
          document
            .getElementById("weatherNotification")
            .addEventListener("click", function () {
              window.location.href = "/resident/viewNotifications";
            });
        }
        if (data.error) {
          notificationList.innerHTML += `<li><a class="block px-4 py-2 hover:bg-gray-100">An error occurred while fetching the weather conditions.</a></li>`;
        }
      })
      .catch((error) => {
        //append error message to notification list
        notificationList.innerHTML += `<li><a class="block px-4 py-2 hover:bg-gray-100">An error occurred while fetching the weather conditions.</a></li>`;
        console.log("Error:", error);
      });

    //check if notificationList is empty
    if (notificationList.innerHTML.trim() === "") {
      notificationList.innerHTML += `<li class="block px-4 py-2 cursor-not-allowed">You have no new notifications.</li>`;
      //notificationList.innerHTML = "test";
    }
  };

  fetchNotifications();

  //get request to /api/users/getCurrentUser
  fetch("/api/users/getCurrentUser")
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      console.log(data.user);
      name = data.user[0].name;
      heading.innerText = `Welcome to your resident dashboard, ${name}!`;
    })
    .catch((error) => {
      console.log("Error:", error);
    });

  logout.addEventListener("click", function () {
    //get request to /clear
    fetch("/clear")
      .then((res) => res.text())
      .then((data) => {
        console.log(data);
        window.location.href = "/";
      });
  });

  visitorCode.addEventListener("click", function () {
    window.location.href = "/resident/generateVisitorPassword";
  });

  logo.addEventListener("click", function () {
    window.location.href = "/resident";
  });
});
