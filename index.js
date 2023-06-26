const cardTitleInputNode = document.querySelector(".js-film-title-input");
const addCardBtn = document.querySelector(".js-add-film");
const cardsListNode = document.querySelector(".js-cards");
const resetFilmTitleBtn = document.querySelector(".js-card-check");
const resetFilmCardBtn = document.querySelector(".js-card-button");
const cardListTitle = document.querySelector(".card__title");
const cardItem = document.querySelector(".js-card-item");

const cards = JSON.parse(localStorage.getItem("cards")) || [];

function addNewCardHandler() {}
addCardBtn.addEventListener("click", function () {
  const card = getCardFromUser();

  addCard(card); //присваиваем значение для card, которое ввел пользователь.
  renderCards();
});

//получаем данные из поля ввода.
function getCardFromUser() {
  const title = cardTitleInputNode.value;

  if (cardTitleInputNode.value.trim() === "") {
    return;
  }

  const newCardIndex = cards.length > 0 ? cards[0].id + 1 : 0;

  clearInput();

  return {
    id: newCardIndex,
    title: title,
    done: true,
  };
}

const clearInput = () => {
  cardTitleInputNode.value = "";
};

//сохраняем карточку. Операция добавления в массив cards.
function addCard({ id, title }) {
  cards.unshift({
    id: id,
    title: title,
    done: false,
  });
  localStorage.setItem("cards", JSON.stringify(cards));
  return cards;
}

//отображаем карточку.
function renderCards() {
  let cardsHTML = "";

  //обращаемся к переменной card.
  for (let i = 0; i < cards.length; i++) {
    const cssClass = cards[i].done ? "checked" : "";
    cardsHTML += ` 
          <li id="${cards[i].id}" class="js-card-item card__item"${cssClass}>
            <div class="card__elements">
            <input id="checkbox-${cards[i].id}" class="card__check" type="checkbox" data-action="done"${cssClass}> 
            <span class="fake__checkbox"></span>
            <label class="card__title" for="checkbox-${cards[i].id}">${cards[i].title}</label> 
            <div id="${cards[i].id}" class="js-card-button card__button"></div>
            </div>
          </li>
   `;
  }

  cardsListNode.innerHTML = cardsHTML;

  // добавляем сохраненные значения из local storage
  for (let i = 0; i < cards.length; i++) {
    const checkbox = document.getElementById(`checkbox-${cards[i].id}`);
    const isChecked =
      localStorage.getItem(`checkbox-${cards[i].id}`) === "true";
    checkbox.checked = isChecked;

    if (isChecked) {
      checkbox.closest(".card__item").classList.add("checked");
      checkbox.classList.add("card__check:checked");
    }
  }
}

//удаление карточки по клику на крестик.
function removeObject(cards) {
  const cardId = event.target.parentNode.parentNode.id;
  const cardIndex = cards.findIndex((card) => card.id === Number(cardId));
  cards.splice(cardIndex, 1);
}

document
  .getElementById("movies__wrapper")
  .addEventListener("click", (event) => {
    if (event.target.className === "js-card-button card__button") {
      removeObject(cards);
      renderCards();
    }
  });

renderCards(cards, cardsListNode); //localStorage.

//чекбокс карточки. -------------------------------

//сохранение в local storage.
function updateLocalStorage() {
  const checkboxes = document.querySelectorAll(".card__check");
  checkboxes.forEach((checkbox, i) => {
    localStorage.setItem(
      `checkbox-${checkbox.id.split("-")[1]}`,
      checkbox.checked
    );
  });
}

const doneHandler = (event) => {
  if (event.target.dataset.action === "done") {
    const parentNode = event.target.closest(".card__item");
    parentNode.classList.toggle("checked");

    const cardIndex = cards.findIndex(
      (card) => card.id === Number(parentNode.id)
    );
    cards[cardIndex].done = event.target.checked;
    localStorage.setItem("cards", JSON.stringify(cards));

    updateLocalStorage();
  }
};

cardsListNode.addEventListener("click", doneHandler);

renderCards();
