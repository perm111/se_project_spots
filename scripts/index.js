const initialCards = [
  {
    name: "Igor",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
  },
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor café",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
  },
];

const cardTemplate = document.querySelector("#card-template"); // create a const to accept a card
const cardsList = document.querySelector(".cards__list");
const profileName = document.querySelector(".profile__name"); //profile name
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-btn"); // The pencil picture button

const editModal = document.querySelector("#edit-Modal");
const editProfileForm = editModal.querySelector(".modal__form");
const profileForm = document.forms["profile-form"];

const editModalCloseBtn = editModal.querySelector(".modal__close-btn"); //close button inside Modal
const editModalNameInput = editProfileForm.querySelector("#profile-name-input");
const editModalDescriptionInput = editProfileForm.querySelector(
  "#profile-description-input"
);
const editFormElement = editModal.querySelector(".modal__form");

const cardModal = document.querySelector("#add-card-Modal");
const cardForm = cardModal.querySelector(".modal__form");
const cardModalBtn = document.querySelector(".profile__add-btn");
const cardModalCloseBtn = cardModal.querySelector(".modal__close-btn");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");
const previewModalCloseBtn = previewModal.querySelector(".modal__close-btn");

function openEditModal() {
  getNameDescription();
  openModal(editModal);
}

function openModal(modal) {
  // Take the text content from the profile name
  //and assign it to the value of the text input

  modal.classList.add("modal_opened"); // add class to make modal visible
}

function closeModal(modal) {
  modal.classList.remove("modal_opened"); // remove class to make modal invisible
}

function getNameDescription() {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;

  closeModal(editModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  evt.target.reset();

  closeModal(cardModal);
}

function getCardElement(data) {
  // get the element from an array
  // access template and pull .card class
  const cardElement = cardTemplate.content
    .querySelector(".card")
    .cloneNode(true);

  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardLikeBtn = cardElement.querySelector(".card__like-btn");

  const cardDeleteBtn = cardElement.querySelector(".card__Delete-btn");
  cardTitleEl.textContent = data.name;

  cardImageEl.src = data.link;
  cardImageEl.alt = cardTitleEl.textContent;
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });

  cardDeleteBtn.addEventListener("click", (event) => {
    if (event.target.matches(".card__Delete-btn")) {
      const card = event.target.closest(".card");
      card.remove();
    }
  });

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
    //previewModalCaptionEl.style.color = "white";
    previewModalCaptionEl.classList.add("blink");
  });

  return cardElement;
}

initialCards.forEach(function (item, i) {
  const cardElement = getCardElement(item);
  cardsList.append(cardElement);
});

profileEditButton.addEventListener("click", openEditModal);

editModalCloseBtn.addEventListener("click", () => {
  closeModal(editModal);
});

cardModalBtn.addEventListener("click", () => {
  openModal(cardModal);
});

cardModalCloseBtn.addEventListener("click", () => {
  closeModal(cardModal);
});

previewModalCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

editFormElement.addEventListener("submit", handleEditFormSubmit);
cardForm.addEventListener("submit", handleAddCardSubmit);
