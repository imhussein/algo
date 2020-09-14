import Axios from "axios";
import "regenerator-runtime";

(function () {
  Axios.get("http://localhost:3000")
    .then((res) => render(res.data))
    .catch((err) => {
      throw new Error(err);
    });
  function add() {
    const btn = document.getElementById("btn");
    btn.addEventListener("click", save);
  }

  function save(e) {
    Axios.post("http://localhost:3000", {
      name: Math.random().toString().slice(0, 7),
    })
      .then((res) => {
        render(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  add();
  function render(data) {
    let items = document.createElement("ul");
    items = !Array.isArray(data)
      ? ""
      : data
          .map(
            ({ name }, index) => `
            <li  class='list-group-item ${index == 0 ? "active" : ""}'>
              ${name}
            </li>
          `
          )
          .join("");

    document.querySelector(
      ".collection"
    ).innerHTML = `<ul class='list-group mt-5'>${items}</ul>`;
  }

  var isOnline = "onLine" in navigator ? navigator.onLine : true;
  var svcWorker;
  var usingSW = "serviceWorker" in navigator;
  var serviceWorkerRegisteration;
  document.addEventListener("DOMContentLoaded", ready, false);
  initServiceWorker();
  async function initServiceWorker() {
    serviceWorkerRegisteration = await navigator.serviceWorker.register(
      "./sw.js",
      {
        updateViaCache: "none",
      }
    );

    svcWorker =
      serviceWorkerRegisteration.installing ||
      serviceWorkerRegisteration.waiting ||
      serviceWorkerRegisteration.active;

    navigator.serviceWorker.addEventListener(
      "controllerchange",
      function ocControllerChange() {
        svcWorker = navigator.serviceWorker.controller;
      }
    );
  }
  function ready() {
    const offlineIcon = document.querySelector(".offline-icon");
    if (!isOnline) {
      offlineIcon.classList.add("offline");
      offlineIcon.classList.remove("online");
    }
    window.addEventListener("online", function () {
      console.log(isOnline);
      isOnline = true;
      offlineIcon.classList.add("online");
      offlineIcon.classList.remove("offline");
    });
    window.addEventListener("offline", function () {
      isOnline = false;
      offlineIcon.classList.add("offline");
      offlineIcon.classList.remove("online");
    });
  }
})();
