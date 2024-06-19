import {clickGA4CookieRemoveBtn} from "./GA4-cookie-remove.js"

window.addEventListener('DOMContentLoaded', eventHandler)

function eventHandler() {
  displayCookie();
  displayHref();
  clickGA4CookieRemoveBtn();
  submitCrossDomainForm();
  clickCrossDomainBtns();
}

function displayCookie() {
  const defaultText = "업데이트 중"
  document.querySelector("#GA4_cookie").innerText = defaultText;
  document.querySelector("#GAds_cookie").innerText = defaultText;

  setTimeout(function () {
    const getGA4Cookie = document.cookie.split(";")
      .filter(name => name.includes("_ga="))
      .map(ele => ele.split("=")[1]);
    const getGAdsCookie = document.cookie.split(";")
      .filter(name => name.includes("_gcl_aw"))
      .map(ele => ele.split("=")[1]);
    document.querySelector("#GA4_cookie").innerText = getGA4Cookie;
    document.querySelector("#GAds_cookie").innerText = getGAdsCookie;
  }, 500);
}

function submitCrossDomainForm() {
  document.querySelector("form.gclid_creator").addEventListener("submit", createCrossDomainBtn);
}

function getCrossDomainFormValue() {
  const basicURL = encodeURI("https://seungwooyun.github.io/yangnimmall/public/GA4/cross-domain");
  // const basicURL = encodeURI("http://127.0.0.1:5500/public/GA4/cross-domain.html");
  let finalURL = '';
  const formValue = document.querySelector("form.gclid_creator input").value
  finalURL = formValue ? "?gclid=" + formValue : '';

  return basicURL + finalURL;
}

function createCrossDomainBtn(event) {
  event.preventDefault();
  const newURL = getCrossDomainFormValue();
  window.location.href = newURL;
}

function displayHref() {
  document.querySelector("#pure_href_a").nextElementSibling.querySelector("span").innerText = document.querySelector("#pure_href_a").href;
  document.querySelector("#click_a").nextElementSibling.querySelector("span").innerText = document.querySelector("#click_a").href;
}

function clickCrossDomainBtns() {
  document.querySelector(".cross_domain_btns button").addEventListener("click", () => {
    window.open("https://cherrylime69.github.io");
  })

  document.querySelector("#pure_href_a").addEventListener("click", (event) => {
    document.querySelector("#pure_href_a").nextElementSibling.querySelector("span").innerText = document.querySelector("#pure_href_a").href.split("?")[1];
  })

  document.querySelector("#click_a").addEventListener("click", (event) => {
    event.preventDefault();
    document.querySelector("#click_a").nextElementSibling.querySelector("span").innerText = document.querySelector("#click_a").href.split("?")[1];
    window.open("https://cherrylime69.github.io");
  })
}

