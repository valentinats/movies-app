const cardTitleInputNode = document.querySelector(".js-film-title-input");
const addCardBtn = document.querySelector(".js-add-film");
const tasksListNode = document.querySelector(".js-cards");
const resetFilmTitleBtn = document.querySelector(".js-card-check");
const resetFilmCardBtn = document.querySelector(".js-card-button");
const cardListTitle = document.querySelector(".js-card__title");
const cardItem = document.querySelector(".js-card-item");

const cards = JSON.parse(localStorage.getItem("cards")) || [];

function addNewCardHandler() {}
addCardBtn.addEventListener("click", function () {
  const card = getCardFromUser();

  addCard(card); //присваиваем значение для card, которое ввел пользователь.

  renderCards();

  //добавление id карточке.
  cards.forEach((cardItem, i) => {
    cardItem.id = i;
  });

  //добавление id чеку.
  cards.forEach((resetFilmTitleBtn, i) => {
    resetFilmTitleBtn.id = i;
  });

  //добавление id кнопке-крестик.
  cards.forEach((resetFilmCardBtn, i) => {
    resetFilmCardBtn.id = i;
  });
});

//получаем данные из поля ввода.
function getCardFromUser() {
  const title = cardTitleInputNode.value;

  if (cardTitleInputNode.value.trim() === "") {
    return;
  }

  clearInput();

  return {
    title: title,
  };
}

const clearInput = () => {
  cardTitleInputNode.value = "";
};

//расширение textarea.
function setValue(cardTextarea) {
  const textarea = document.getElementById("title");
  textarea.style.height = 0;
  textarea.value = cardTextarea;
  textarea.style.height = textarea.scrollHeight + "px";
}

//получаем DOM-элемент.
const textareaHeight = document.getElementById("title");

//обработчики событий.
textareaHeight.addEventListener("input", () => {
  textareaHeight.style.height = 0;
  textareaHeight.style.height = textareaHeight.scrollHeight + "px";
});

//сохраняем карточку. Операция добавления в массив cards.
function addCard({ title }) {
  cards.unshift({
    title: title,
  });
  localStorage.setItem("cards", JSON.stringify(cards));
  return cards;
}

//отображаем карточку.
function renderCards() {
  let cardsHTML = "";

  //обращаемся к переменной card.
  for (let i = 0; i < cards.length; i++) {
    cardsHTML += `
      <div class="cards__cont"> 
          <li id="${i}" class="card__item">
            <div class="card__elements">
            <input id="checkbox" class="card__check" type="checkbox" data-action="done">
            <label class="js-card-title card__title">${cards[i].title}</label> 
            <div id="${i}" class="js-card-button card__button"></div>
            </div>
          </li>
      </div>
   `;
  }

  tasksListNode.innerHTML = cardsHTML;
}

//удаление карточки по клику на крестик.
function removeObject(cards) {
  cards.splice(event.target.id, 1);
}

document
  .getElementById("movies__wrapper")
  .addEventListener("click", (event) => {
    if (event.target.className === "js-card-button card__button") {
      removeObject(cards);
      renderCards();
    }
  });

//чекбокс карточки.
// const cardCheck = (event) => {
//   if (event.target.dataset.action === "done") {
//     const parentNode = event.target.closest(".card__item");
//     parentNode.classList.toggle("card__check-done");
//     localStorage.setItem("cards", JSON.stringify(cards));
//   }
// }; 

// tasksListNode.addEventListener("click", cardCheck);

renderCards(cards, tasksListNode); //localStorage.