const overlay = document.querySelector(".overlay");
const modal = document.querySelector(".modal");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnOpenModal = document.querySelectorAll(".btn--open-modal");
const scroll = document.querySelector(".btn--scroll-to");
const section1 = document.getElementById("section--1");
const pageNavigation = document.querySelector(".nav__links");
const tabs = document.querySelector(".operations__tab-container");
const operationTabs = document.querySelectorAll(".operations__tab");
const operationsContent = document.querySelectorAll(".operations__content");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const section = document.querySelectorAll(".section");
///////////////////////////////

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function (e) {
  e.preventDefault();
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

btnOpenModal.forEach((btn) => {
  btn.addEventListener("click", openModal);
});
//Page scrolling
scroll.addEventListener("click", (e) => {
  e.preventDefault();
  section1.scrollIntoView({ behavior: "smooth" });
});

pageNavigation.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//tabs content changes
tabs.addEventListener("click", (e) => {
  e.preventDefault();
  const tab = e.target.closest(".operations__tab");
  if (!tab) return;
  operationTabs.forEach((tabs) =>
    tabs.classList.remove("operations__tab--active")
  );
  tab.classList.add("operations__tab--active");
  console.log(tab.dataset);
  const tabNo = tab.dataset.tab;

  operationsContent.forEach((content) =>
    content.classList.remove("operations__content--active")
  );
  document
    .querySelector(`.operations__content--${tabNo}`)
    .classList.add("operations__content--active");
});

//Menu fade animation

nav.addEventListener("mouseover", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const link = e.target;

    const main = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    main.forEach((element) => {
      console.log(element, link);
      if (element !== link) element.style.opacity = 0.5;
      logo.style.opacity = 0.5;
    });
  }
});

nav.addEventListener("mouseout", (e) => {
  e.preventDefault();

  if (e.target.classList.contains("nav__link")) {
    const link = e.target;

    const main = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    main.forEach((element) => {
      if (element !== link) element.style.opacity = 1;
      logo.style.opacity = 1;
    });
  }
});

//stick navigation

const stickNav = (entries, observe) => {
  const [entry] = entries;
  if (!entry?.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const option = {
  root: null,
  threshold: 0,
  rootMargin: "-90px",
};

const observe = new IntersectionObserver(stickNav, option);
observe.observe(header);

//effect

const sectionObserve = (entries, observe) => {
  const [entry] = entries;
  if (entry?.isIntersecting) {
    entry?.target.classList.remove("section--hidden");
    observe.unobserve(entry?.target);
  } else {
    return;
  }
};

const sectionOption = {
  root: null,
  threshold: 0.15,
};

const sectionObserveView = new IntersectionObserver(
  sectionObserve,
  sectionOption
);

section.forEach((sec) => {
  sectionObserveView.observe(sec);
});
