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
const editProfileForm = document.forms["editprofile"];

const editModalBtn = document.querySelector(".profile__edit-btn");
const closeButtons = document.querySelectorAll(".modal__close-btn");
const editModalNameInput = editProfileForm.querySelector("#profile-name-input");
const editModalDescriptionInput = editProfileForm.querySelector(
  "#profile-description-input"
);
const editFormElement = editModal.querySelector(getSettings().formSelector);
const editFormSubmitBtn = editFormElement.querySelector(".modal__submit-btn");
const cardModal = document.querySelector("#add-card-Modal");
//const cardForm = cardModal.querySelector(getSettings().formSelector);

const cardForm = document.forms["add-card"];


const cardSubmitBtn = cardModal.querySelector(
  getSettings().submitButtonSelector
);
const cardModalBtn = document.querySelector(".profile__add-btn");
const cardNameInput = cardModal.querySelector("#add-card-name-input");
const cardLinkInput = cardModal.querySelector("#add-card-link-input");

const previewModal = document.querySelector("#preview-modal");
const previewModalImageEl = previewModal.querySelector(".modal__image");
const previewModalCaptionEl = previewModal.querySelector(".modal__caption");

editModalBtn.addEventListener("click", () => {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;

  resetValidation(
    editFormElement,
    [editModalNameInput, editModalDescriptionInput],
    getSettings()
  );
  disableButton(editFormSubmitBtn, getSettings());
  openModal(editModal);
});

function openEditModal() {
  getNameDescription();
  openModal(editModal);
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".modal_opened");
    closeModal(openedPopup);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened"); // add class to make modal visible
  document.addEventListener("keydown", handleEscape);

  // Fixing the last review notes :
  document.addEventListener("click", overlayClickListener);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened"); // remove class to make modal invisible
  document.removeEventListener("keydown", handleEscape);
}

function getNameDescription() {
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;
}

function handleEditFormSubmit(evt, settings) {
  evt.preventDefault();
  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;
  resetValidation(
    editFormElement,
    [editModalNameInput, editModalDescriptionInput],
    settings
  );
  closeModal(editModal);
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();

  const inputValues = { name: cardNameInput.value, link: cardLinkInput.value };
  const cardElement = getCardElement(inputValues);
  cardsList.prepend(cardElement);
  evt.target.reset();
  disableButton(cardSubmitBtn, getSettings());
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
  const cardDeleteBtn = cardElement.querySelector(".card__delete-btn");
  cardTitleEl.textContent = data.name;

  cardImageEl.src = data.link;
  cardImageEl.alt = cardTitleEl.textContent;
  cardLikeBtn.addEventListener("click", () => {
    cardLikeBtn.classList.toggle("card__like-btn_liked");
  });

  cardDeleteBtn.addEventListener("click", (event) => {
    if (event.target.matches(".card__delete-btn")) {
      cardElement.remove();
    }
  });

  cardImageEl.addEventListener("click", () => {
    openModal(previewModal);
    previewModalImageEl.src = data.link;
    previewModalImageEl.alt = data.name;
    previewModalCaptionEl.textContent = data.name;
  });

  return cardElement;
}

initialCards.forEach((item) => {
  renderCard(item, "append");
});

closeButtons.forEach((button) => {
  const popup = button.closest(".modal");
  button.addEventListener("click", () => closeModal(popup));
});

profileEditButton.addEventListener("click", openEditModal);

cardModalBtn.addEventListener("click", () => {
  openModal(cardModal);
});

editFormElement.addEventListener("submit", (event) =>
  handleEditFormSubmit(event, getSettings())
);
cardForm.addEventListener("submit", handleAddCardSubmit);

// Fixing the last review notes . Commented out 3 addEventListeners below

// editModal.addEventListener("click", function (event) {
//   if (event.target === editModal) {
//     closeModal(editModal);
//   }
// });

// cardModal.addEventListener("click", function (event) {
//   if (event.target === cardModal) {
//     closeModal(cardModal);
//   }
// });

// previewModal.addEventListener("click", function (event) {
//   if (event.target === previewModal) {
//     closeModal(previewModal);
//   }
// });

// Fixing the last review notes :

const overlayClickListener = (evt) => {
  if (evt.target.classList.contains("modal")) {
       closeModal(document.querySelector(".modal_opened"));
  }
};

function renderCard(item, method = "prepend") {
  const cardElement = getCardElement(item);
  // Add the card into the section using the method
  cardsList[method](cardElement);
}
