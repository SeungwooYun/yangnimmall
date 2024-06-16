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
  // const basicURL = encodeURI("https://cherrylime69.github.io/");
  const basicURL = encodeURI("http://127.0.0.1:5500/public/GA4/cross-domain.html");
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

function deleteCookie(name) {
  var domainParts = window.location.hostname.split('.');
  var pathArray = window.location.pathname.split('/');
  var date = new Date(0).toUTCString();

  // 시도할 도메인과 경로 조합 배열
  var domainCombinations = domainParts.map((part, index) => domainParts.slice(index).join('.'));
  var pathCombinations = pathArray.map((part, index) => pathArray.slice(0, index + 1).join('/'));

  // 빈 경로 추가
  pathCombinations.push('');

  // 모든 조합 시도
  domainCombinations.forEach(domain => {
    pathCombinations.forEach(path => {
      document.cookie = `${name}=; path=${path}; domain=${domain}; expires=${date};`;
    });
  });

  // 현재 도메인에 대한 최종 삭제 시도
  document.cookie = `${name}=; expires=${date}; path=/;`;
}

function getGA4Cookie() {
  const cookies = document.cookie.split(";")
    .filter(name => name.includes("_ga") || name.includes("_gl") || name.includes("_gcl"))
    .map(ele => ele.split("=")[0]);
  return cookies;
}

function deleteGA4Cookie() {
  const GA4Cookie = getGA4Cookie();
  GA4Cookie.forEach(cookie => deleteCookie(cookie))
  displayCookie();
}

function clickGA4CookieRemoveBtn() {
  document.querySelector("#cookie_remover_btn").addEventListener("click", deleteGA4Cookie);
}