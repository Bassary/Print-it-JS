const slides = [
  {
    image: "slide1.jpg",
    tagLine: "Impressions tous formats <span>en boutique et en ligne</span>",
  },
  {
    image: "slide2.jpg",
    tagLine:
      "Tirages haute définition grand format <span>pour vos bureaux et events</span>",
  },
  {
    image: "slide3.jpg",
    tagLine: "Grand choix de couleurs <span>de CMJN aux pantones</span>",
  },
  {
    image: "slide4.png",
    tagLine: "Autocollants <span>avec découpe laser sur mesure</span>",
  },
];

const arrowLeft = document.querySelector("#left");
const arrowRight = document.querySelector("#right");
let i = slides.length;

arrowLeft.addEventListener("click", () => {
  i--;
  console.log(i);
});

arrowRight.addEventListener("click", () => {
  let img = document.querySelector("img");
  img.classList.add("banner-img-none");
});

slides.forEach((_, i) => {
  let slideContainer = document.querySelector("#banner");
  let img = document.createElement("img");
  let dotsContainer = document.querySelector(".dots");
  let infoContent = document.createElement("p");
  let dot = document.createElement("div");

  img.src = `./assets/images/slideshow/${slides[i].image}`;
  img.classList.add("banner-img-none");
  dot.classList.add("dot");
  infoContent.innerHTML = slides[i].tagLine;
  infoContent.style.display = "none";

  if (i === 0) {
    img.classList.remove("banner-img-none");
    img.classList.add("banner-img");
    infoContent.style.display = "block";
    dot.classList.add("dot_selected");
  }

  slideContainer.appendChild(img);
  slideContainer.appendChild(infoContent);
  dotsContainer.appendChild(dot);
});
