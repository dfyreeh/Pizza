document.addEventListener("click", function (e) {
  if (e.target.classList.contains("size-option")) {
    const clickedOption = e.target;
    const selector = clickedOption.closest(".size-selector");
    const options = selector.querySelectorAll(".size-option");

    options.forEach((opt) => opt.classList.remove("active"));
    clickedOption.classList.add("active");

    const parent = selector.parentElement;
    const selectedTexts = parent.querySelectorAll(".selected-size");
    const selectedTexts2 = parent.querySelectorAll(".selected-size1");

    selectedTexts.forEach((selectedText) => {
      selectedText.textContent = `${clickedOption.dataset.size},`;
    });

    selectedTexts2.forEach((selectedText) => {
      selectedText.textContent = `${clickedOption.dataset.size} см,`;
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("containerCardPizza")
    .addEventListener("click", function (e) {
      if (e.target.classList.contains("size-option")) {
        const clickedOption = e.target;
        const selector = clickedOption.closest(".size-selector");
        const options = selector.querySelectorAll(".size-option");

        options.forEach((opt) => opt.classList.remove("active"));

        clickedOption.classList.add("active");

        const parent = selector.closest(".modal-container");
        const selectedTexts = parent.querySelectorAll(".selected-size");
        const selectedTexts2 = parent.querySelectorAll(".selected-size1");

        selectedTexts.forEach(
          (el) => (el.textContent = `${clickedOption.dataset.size}`)
        );
        selectedTexts2.forEach(
          (el) => (el.textContent = `${clickedOption.dataset.size} см`)
        );

        const pizzaImg = parent.querySelector(".modal-pizza-img");
        const size = clickedOption.dataset.size;

        if (pizzaImg) {
          if (size === "25") pizzaImg.style.width = "300px";
          if (size === "30") pizzaImg.style.width = "330px";
          if (size === "35") pizzaImg.style.width = "360px";
        }
      }
    });
});

const btn = document.getElementById("openSecondModalBtn");
const offcanvasEl = document.querySelector(".offcanvas");
const modalTargetEl = document.getElementById("modalOrderMap");
const modalTarget = new bootstrap.Modal(modalTargetEl);

btn.addEventListener("click", () => {
  const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
  if (offcanvasInstance) {
    offcanvasInstance.hide();

    offcanvasEl.addEventListener(
      "hidden.bs.offcanvas",
      () => {
        modalTarget.show();
      },
      { once: true }
    );
  } else {
    modalTarget.show();
  }
});

const pizzaContainer = document.getElementById("containerCardPizza");
const containerCardSnacks = document.getElementById("containerCardSnacks");
const containerCardDesserts = document.getElementById("containerCardDesserts");
const containerCardSauces = document.getElementById("containerCardSauces");
const containerCardCoffees = document.getElementById("containerCardCoffees");
const containerCardDrinks = document.getElementById("containerCardDrinks");
const sliderCard = document.getElementById("sliderTrack");
 


fetch("https://681b789317018fe5057bb776.mockapi.io/Pizza")
  .then((response) => response.json())
  .then((data) => {
    const slider = data[0].slider;
    const pizzas = data[0].pizzas;
    const snacks = data[0].snacks;
    const desserts = data[0].desserts;
    const sauces = data[0].sauces;
    const coffees = data[0].coffees;
    const drinks = data[0].drinks;

    slider.forEach((slide) => {
        sliderCard.innerHTML += `
          <div class="card-slider-item">
            <img
              src="${slide.img}"
              class="img-fluid rounded-3"
              alt="1"
            />
          </div>
        `;
      });

    pizzas.forEach((pizza, index) => {
      const modalId = `modal-${index}`;
      pizzaContainer.innerHTML += `
        <div class="cardPi">
          <div class="cardImg">
            <img src="${pizza.img}" alt="${
        pizza.name
      }" data-bs-toggle="modal" data-bs-target="#${modalId}" class="pizza-image" data-size="${
        pizza.sizes[0]
      }" />
          </div>
          <span class="nameCar">${pizza.name}</span>
          <div class="descriptionCar">${pizza.description}</div>
          <footer class="footerCar">
            <div class="priceCar">від ${pizza.prices[pizza.sizes[0]]} ₴</div>
            <button class="buttonCar" data-bs-toggle="modal" data-bs-target="#${modalId}">Вибрати</button>
          </footer>
          <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
              <div class="modal-content">
                <div class="modal-content-button">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрити"></button>
                </div>
                <div class="modal-container">
                  <div class="modalImg">
                    <img src="${pizza.img}" alt="${
        pizza.name
      }" class="img-fluid modal-pizza-img" />
                  </div>
                  <div class="modalInformation">
                    <h1>${pizza.name}</h1>
                    <div class="modalInformationDiv-1">
                      <span>
                        <span class="selected-size1">${pizza.sizes[0]}</span>
                        традиційне тісто
                        <span class="selected-size">${pizza.sizes[0]}</span>
                        ${pizza.weight[pizza.sizes[0]]}
                      </span>
                    </div>
                    <div><span>${pizza.ingredients.join(", ")}</span></div>
                    <div class="size-selector">
                      ${pizza.sizes
                        .map(
                          (size, i) => `
                        <div class="size-option ${
                          i === 0 ? "active" : ""
                        }" data-size="${size}">${size}</div>
                      `
                        )
                        .join("")}
                    </div>
                    <button class="modalInformationButton">У кошик за ${
                      pizza.prices[pizza.sizes[0]]
                    } ₴</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    snacks.forEach((snack, index) => {
      const modalId = `snack-modal-${index}`;
      containerCardSnacks.innerHTML += `
        <div class="cardPi">
          <div class="cardImg">
            <img src="${snack.img}" alt="${snack.name}" data-bs-toggle="modal" data-bs-target="#${modalId}" class="pizza-image" />
          </div>
          <span class="nameCar">${snack.name}</span>
          <div class="descriptionCar">${snack.description}</div>
          <footer class="footerCar">
            <div class="priceCar">${snack.price} ₴</div>
            <button class="buttonCar" data-bs-toggle="modal" data-bs-target="#${modalId}">Вибрати</button>
          </footer>
          <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
              <div class="modal-content">
                <div class="modal-content-button">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрити"></button>
                </div>
                <div class="modal-container">
                  <div class="modalImg">
                    <img src="${snack.img}" alt="${snack.name}" class="img-fluid modal-pizza-img" />
                  </div>
                  <div class="modalInformation">
                    <h1>${snack.name}</h1>
                    <div class="modalInformationDiv-1">
                      <span>Вага: ${snack.weight}</span>
                    </div>
                    <div><span>${snack.description}</span></div>
                    <button class="modalInformationButton">У кошик за ${snack.price} ₴</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    desserts.forEach((dessert, index) => {
      const modalId = `dessert-modal-${index}`;
      containerCardDesserts.innerHTML += `
        <div class="cardPi">
          <div class="cardImg">
            <img src="${dessert.img}" alt="${dessert.name}" data-bs-toggle="modal" data-bs-target="#${modalId}" class="pizza-image" />
          </div>
          <span class="nameCar">${dessert.name}</span>
          <div class="descriptionCar">${dessert.description}</div>
          <footer class="footerCar">
            <div class="priceCar">${dessert.price} ₴</div>
            <button class="buttonCar" data-bs-toggle="modal" data-bs-target="#${modalId}">Вибрати</button>
          </footer>
          <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
              <div class="modal-content">
                <div class="modal-content-button">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрити"></button>
                </div>
                <div class="modal-container">
                  <div class="modalImg">
                    <img src="${dessert.img}" alt="${dessert.name}" class="img-fluid modal-pizza-img" />
                  </div>
                  <div class="modalInformation">
                    <h1>${dessert.name}</h1>
                    <div class="modalInformationDiv-1">
                      <span>Вага: ${dessert.weight}</span>
                    </div>
                    <div><span>${dessert.description}</span></div>
                    <button class="modalInformationButton">У кошик за ${dessert.price} ₴</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    sauces.forEach((sauce, index) => {
      const modalId = `sauce-modal-${index}`;
      containerCardSauces.innerHTML += `
          <div class="cardPi">
            <div class="cardImg">
              <img src="${sauce.img}" alt="${sauce.name}" data-bs-toggle="modal" data-bs-target="#${modalId}" class="pizza-image" />
            </div>
            <span class="nameCar">${sauce.name}</span>
            <div class="descriptionCar">${sauce.description}</div>
            <footer class="footerCar">
              <div class="priceCar">${sauce.price} ₴</div>
              <button class="buttonCar" data-bs-toggle="modal" data-bs-target="#${modalId}">Вибрати</button>
            </footer>
            <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
              <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                  <div class="modal-content-button">
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрити"></button>
                  </div>
                  <div class="modal-container">
                    <div class="modalImg">
                      <img src="${sauce.img}" alt="${sauce.name}" class="img-fluid modal-pizza-img" />
                    </div>
                    <div class="modalInformation">
                      <h1>${sauce.name}</h1>
                      <div class="modalInformationDiv-1">
                        <span>Вага: ${sauce.weight}</span>
                      </div>
                      <div><span>${sauce.description}</span></div>
                      <button class="modalInformationButton">У кошик за ${sauce.price} ₴</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
    });
    coffees.forEach((coffee, index) => {
      const modalId = `coffee-modal-${index}`;
      containerCardCoffees.innerHTML += `
          <div class="cardPi">
          <div class="cardImg">
            <img src="${coffee.img}" alt="${coffee.name}" data-bs-toggle="modal" data-bs-target="#${modalId}" class="coffee-image" />
          </div>
          <span class="nameCar">${coffee.name}</span>
          <div class="descriptionCar">${coffee.description}</div>
          <footer class="footerCar">
            <div class="priceCar">${coffee.price} ₴</div>
            <button class="buttonCar" data-bs-toggle="modal" data-bs-target="#${modalId}">Вибрати</button>
          </footer>
          <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered modal-lg">
              <div class="modal-content">
                <div class="modal-content-button">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрити"></button>
                </div>
                <div class="modal-container">
                  <div class="modalImg">
                    <img src="${coffee.img}" alt="${coffee.name}" class="img-fluid modal-coffee-img" />
                  </div>
                  <div class="modalInformation">
                    <h1>${coffee.name}</h1>
                    <div class="modalInformationDiv-1">
                      <span>Об'єм: ${coffee.weight}</span>
                    </div>
                    <div><span>${coffee.description}</span></div>
                    <button class="modalInformationButton">У кошик за ${coffee.price} ₴</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        `;
    });
    drinks.forEach((drink, index) => {
      const modalId = `drink-modal-${index}`;
      containerCardDrinks.innerHTML += `
            <div class="cardPi">
                <div class="cardImg">
                    <img src="${drink.img}" alt="${drink.name}" data-bs-toggle="modal" data-bs-target="#${modalId}" class="drink-image" />
                </div>
                <span class="nameCar">${drink.name}</span>
                <div class="descriptionCar">${drink.size}</div>
                <footer class="footerCar">
                    <div class="priceCar">${drink.price} ₴</div>
                    <button class="buttonCar" data-bs-toggle="modal" data-bs-target="#${modalId}">Вибрати</button>
                </footer>
                <div class="modal fade" id="${modalId}" tabindex="-1" aria-hidden="true">
                    <div class="modal-dialog modal-dialog-centered modal-lg">
                        <div class="modal-content">
                            <div class="modal-content-button">
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрити"></button>
                            </div>
                            <div class="modal-container">
                                <div class="modalImg">
                                    <img src="${drink.img}" alt="${drink.name}" class="img-fluid modal-drink-img" />
                                </div>
                                <div class="modalInformation">
                                    <h1>${drink.name}</h1>
                                    <div class="modalInformationDiv-1">
                                        <span>Об'єм: ${drink.size}</span>
                                        <button class="modalInformationButton">У кошик за ${drink.price} ₴</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
  })
  .catch((error) => console.error("Error:", error));
