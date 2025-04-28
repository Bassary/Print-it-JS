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

// Récupération des éléments nécéssaire au fonctionnement du carrousel
let dotsContainer = document.querySelector(".dots");
let slideContainer = document.querySelector("#banner");
let leftArrow = document.querySelector("#left");
let rightArrow = document.querySelector("#right");

// variable qui corresponde à notre position actuel, c'est à dire notre première élément du tableaux, par consecance 0
let actualIndex = 0;

// Position par defaut du slider *************************
// Attention au nommage des variable, elle ne doit pas avoir le même nom que des balise, sinon elle rentre en conflit
// Pour resoudre un des problème de nommage, j'ai du ajouter une id="slide" dans les balise img pour pouvoir toutes les récupérer dans le container "banner" sans faire apppel au balise img.
slides.forEach((_, i) => {
  let imgSlide = document.createElement("img");
  let infoContent = document.createElement("p");
  let dot = document.createElement("div");

  imgSlide.src = `./assets/images/slideshow/${slides[i].image}`;
  imgSlide.classList.add("banner-img-none");
  imgSlide.id = "slide";
  dot.classList.add("dot");
  infoContent.innerHTML = slides[i].tagLine;
  infoContent.style.display = "none";

  if (i === 0) {
    imgSlide.classList.remove("banner-img-none");
    imgSlide.classList.add("banner-img");
    infoContent.style.display = "block";
    dot.classList.add("dot_selected");
  }

  slideContainer.appendChild(imgSlide);
  slideContainer.appendChild(infoContent);
  dotsContainer.appendChild(dot);
});

// funciton du slider *************
// "actuelIndex" est la propriété de la fonction, elle peut avoir le même nom que la variable déclarer correconsondante.
// Mais elle peut aussi avoir un autre nom dans la function.
// Du moment qu'une fois la fonction appeler, sa propriété correspond à notre variable souhaiter: en l'occurence dans le cas présent elle doit corespondre au première élément de notre tableau d'objet, donc 0.
function movingSlide(actualIndex) {
  let imgSlide = document.querySelectorAll("#banner #slide"); // utilisation de l'id "slide" pour récuéprer toutes les img sans intérférer avec les autre blaise img présent dans le container "banner"
  let infoContent = document.querySelectorAll("#banner p"); // je peux utislier la balise "p" car c'est la seul présent dans mon container "banner"
  let dots = document.querySelectorAll("#banner .dot");

  for (let i = 0; i < imgSlide.length; i++) {
    // utilisation d'une boucle for pour parcourir toutes mes image récupéré sous la variabel imgSlide
    imgSlide[i].classList.add("banner-img-none"); // récupération de chaque img réprésenter par la varibale imgSlide suivie de l'index [i] présent dans la boucle for
    imgSlide[i].classList.remove("banner-img"); // le [i] est tès important dans ce cas, il permet de cibler chaque élément imgSlide, sans l'index [i] le code s'appliquera à tous les imgSlide en même temps alors que nous voulons les cibler une par une.
    infoContent[i].style.display = "none"; // même logique pour toutes les autre variable qui utilise l'index [i]
    dots[i].classList.remove("dot_selected");
  }

  imgSlide[actualIndex].classList.add("banner-img");
  imgSlide[actualIndex].classList.remove("banner-img-none");
  infoContent[actualIndex].style.display = "block";
  dots[actualIndex].classList.add("dot_selected");
}

// flèches pour ce déplacer dans le slider **********************

rightArrow.addEventListener("click", () => {
  actualIndex++; // incrémentation de l'index
  if (actualIndex > slides.length - 1) {
    // condition de bouclage "si notre actualIndex est supérieur à la quantité d'élément du tableaux - 1*".
    actualIndex = 0; // si la condition est vrais
  }
  movingSlide(actualIndex); // appel de la fonction pour parcourir nos éléments afin d'ajouter ou enlever une class ou style
});

leftArrow.addEventListener("click", () => {
  actualIndex--; // décrémentation de l'index
  if (actualIndex < 0) {
    // condition de bouclage "si notre actualIndex est inferieur 0 cad au première élément à l'intérieur de notre tableau"
    actualIndex = slides.length - 1; // Nous allons directement au dernière élément à l'intérieur de notre tabelau
  }
  movingSlide(actualIndex);
});

// *attention le tableaux total appeler par la methode element.length compte les éléments à partir de 1.
// Or les élément à l'interieur du tableaux commence à 0. C'est pour cela que nous faison "slides.length - 1"
// cad la quatité d'éléments du talbeaux (4) moins - 1 ce qui donne l'élément [3] à l'interieur de notre tableaux.
// si nous ne faisont pas - 1 le navigateur croit que nous voulons atteindre l'élément [4] de notre actualIndex et non notre élément [3]
// Nous aurrion pu écrire comme condition de retour actualIndex = 3 est sela marcherai aussi mais ça n'écécite de mettre à jour notre code si le tableaux pocède un élément en plus.
// En faisant acutelIndex - 1 ça permet de toujours aller au dernier élément à l'interieur de notre tableaux.
