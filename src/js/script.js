const ul = document.querySelector("ul");
let showcase = document.getElementById("mainContainer");
let filteredItens = [];

function creatingCards(array) {
  for (let i = 0; i < array.length; i++) {
    const fruit = array[i];
    const imgSRC = fruit.img;
    const altCategory = fruit.category;
    const h3Title = fruit.name;
    const sectionSpan = fruit.section;
    const pPrice = fruit.price;

    const li = document.createElement("li");
    const img = document.createElement("img");
    img.classList.add("imgCard");
    const h3 = document.createElement("h3");
    const span = document.createElement("span");
    const p = document.createElement("p");
    const btn = document.createElement("button");

    img.src = imgSRC;
    img.alt = altCategory;
    h3.innerText = h3Title;
    span.innerText = sectionSpan;
    p.innerText = `R$ ${pPrice} dollars`;
    btn.innerText = "Buy it";
    li.append(img, h3, span, p, btn);
    ul.appendChild(li);

    btn.addEventListener("click", () => {
      filteredItens.push(fruit);
      addToCar(filteredItens);
      sum(filteredItens);
    });
  }
}
creatingCards(products);

let container = document.querySelector("#productsContainer");
const allProducts = document.querySelector("#allProducts");

allProducts.addEventListener("click", function () {
  container.innerHTML = "";
  creatingCards(products);
});

const fruitandvegetable = document.querySelector("#fruitandvegetable");

fruitandvegetable.addEventListener("click", function () {
  let myReturn = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].section == "Fruit & Vegetable") {
      myReturn.push(products[i]);
    }
  }
  container.innerHTML = "";
  creatingCards(myReturn);
});

const bakery = document.querySelector("#bakery");

bakery.addEventListener("click", function () {
  let myReturn = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].section == "Bakery") {
      myReturn.push(products[i]);
    }
  }
  container.innerHTML = "";
  creatingCards(myReturn);
});

const dairy = document.querySelector("#dairy");

dairy.addEventListener("click", function () {
  let myReturn = [];
  for (let i = 0; i < products.length; i++) {
    if (products[i].section == "Dairy") {
      myReturn.push(products[i]);
    }
  }
  container.innerHTML = "";
  creatingCards(myReturn);
});

const searchInput = document.querySelector(".searchByNameField");
const searchButton = document.querySelector("#searchButton");

searchButton.addEventListener("click", function () {
  let searchResult = [];
  let userSearch = searchInput.value;

  for (let i = 0; i < products.length; i++) {
    if (
      userSearch
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f\u006E-\u0303]/g, "") ==
        products[i].name
          .trim()
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f\u006E-\u0303]/g, "") ||
      userSearch
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f\u006E-\u0303]/g, "") ==
        products[i].category
          .trim()
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f\u006E-\u0303]/g, "") ||
      userSearch
        .trim()
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f\u006E-\u0303]/g, "") ==
        products[i].section
          .trim()
          .toLowerCase()
          .normalize("NFD")
          .replace(/[\u0300-\u036f\u006E-\u0303]/g, "")
    ) {
      searchResult.push(products[i]);
      container.innerHTML = "";
      creatingCards(searchResult);
    }
  }
});

function addToCar(array) {
  let car = document.querySelector("#containerCart");
  car.innerHTML = "";
  for (let i = 0; i < array.length; i++) {
    let li = document.createElement("li");
    li.classList.add("carLi");
    let img = document.createElement("img");
    let name = document.createElement("p");
    let price = document.createElement("p");
    let btn = document.createElement("button");
    let divImg = document.createElement("div");
    let divText = document.createElement("div");

    li.append(divImg, divText, btn);
    divImg.appendChild(img);
    divText.append(name, price);
    car.append(li);

    img.classList.add("carImg");
    name.classList.add("carName");
    price.classList.add("carValue");
    btn.classList.add("removeBtn");
    divImg.classList.add("divImg");
    divText.classList.add("divText");
    price.innerText = `R$ ${array[i].price} dollars`;
    img.src = array[i].img;
    name.innerText = array[i].name;
    btn.innerText = "Remove";

    btn.addEventListener("click", () => {
      array.splice(i, 1);
      addToCar(array);
      sum(array);
    });
  }
}

function sum(products) {
  let quantity = document.querySelector("#quantity");
  let total = document.querySelector("#total");
  let sum = 0;
  products.forEach((element) => {
    sum += element.price;
  });
  total.innerText = `Total: R$ ${sum} dollars`;
  quantity.innerText = `Quantity: ${products.length}`;
}
