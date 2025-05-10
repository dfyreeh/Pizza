document.addEventListener("click", function (e) {
  if (e.target.classList.contains("size-option")) {
    const clickedOption = e.target;
    const selector = clickedOption.closest(".size-selector");
    const options = selector.querySelectorAll(".size-option");

    // Зняти активний клас з усіх
    options.forEach((opt) => opt.classList.remove("active"));
    clickedOption.classList.add("active");

    // Знайти всі елементи .selected-size і .selected-size1 в тому ж батьківському елементі
    const parent = selector.parentElement;
    const selectedTexts = parent.querySelectorAll(".selected-size");
    const selectedTexts2 = parent.querySelectorAll(".selected-size1");

    // Оновити текст для кожного елемента .selected-size
    selectedTexts.forEach((selectedText) => {
      selectedText.textContent = `${clickedOption.dataset.size},`;
    });

    // Оновити текст для кожного елемента .selected-size1
    selectedTexts2.forEach((selectedText) => {
      selectedText.textContent = `${clickedOption.dataset.size} см,`;
    });
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("size-option")) {
    const clickedOption = e.target;
    const selector = clickedOption.closest(".size-selector");
    const options = selector.querySelectorAll(".size-option");

    // Активний клас
    options.forEach((opt) => opt.classList.remove("active"));
    clickedOption.classList.add("active");

    const parent = selector.closest(".modal-container");
    const selectedTexts = parent.querySelectorAll(".selected-size");
    const selectedTexts2 = parent.querySelectorAll(".selected-size1");

    selectedTexts.forEach(
      (el) => (el.textContent = `${clickedOption.dataset.size},`)
    );
    selectedTexts2.forEach(
      (el) => (el.textContent = `${clickedOption.dataset.size} см,`)
    );

    // Зміна розміру зображення
    const pizzaImg = parent.querySelector(".modal-pizza-img");
    const size = clickedOption.dataset.size;

    if (pizzaImg) {
      if (size === "25") pizzaImg.style.width = "300px";
      if (size === "30") pizzaImg.style.width = "330px";
      if (size === "35") pizzaImg.style.width = "360px";
    }
  }
});


const btn = document.getElementById('openSecondModalBtn');
const offcanvasEl = document.querySelector('.offcanvas'); // або byId, якщо знаєш ID
const modalTargetEl = document.getElementById('modalOrderMap');
const modalTarget = new bootstrap.Modal(modalTargetEl);

btn.addEventListener('click', () => {
  // Закриваємо оффканвас (якщо відкритий)
  const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvasEl);
  if (offcanvasInstance) {
    offcanvasInstance.hide();

    offcanvasEl.addEventListener('hidden.bs.offcanvas', () => {
      modalTarget.show();
    }, { once: true });
  } else {
    // Якщо оффканвас не відкритий — просто відкриваємо модалку
    modalTarget.show();
  }
});