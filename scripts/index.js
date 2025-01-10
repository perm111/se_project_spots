const initialCards = [
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

const profileName = document.querySelector(".profile__name"); //profile name
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-btn"); // The pencil picture button

const editModal = document.querySelector("#edit-Modal"); // The whole modal
const editModalCloseBtn = editModal.querySelector(".modal__close-btn"); //close button inside Modal
const editModalNameInput = editModal.querySelector("#profile-name-input"); //modal profile name - search just the modal
const editModalDescriptionInput = editModal.querySelector(
  "#profile-description-input"
); //modal profile name - search just the modal
const editFormElement = editModal.querySelector(".modal__form");
const cardTemplate = document.querySelector("#card-template"); // create a const to accept a card
const cardsList = document.querySelector(".cards__list");


function openModal() {
  // Take the text content from the profile name
  //and assign it to the value of the text input
  editModalNameInput.value = profileName.textContent;
  editModalDescriptionInput.value = profileDescription.textContent;

  editModal.classList.add("modal_opened"); // add class to make modal visible
}

function closeModal() {
  editModal.classList.remove("modal_opened"); // remove class to make modal invisible
}

function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = editModalNameInput.value;
  profileDescription.textContent = editModalDescriptionInput.value;

  closeModal();
}

profileEditButton.addEventListener("click", openModal);
editModalCloseBtn.addEventListener("click", closeModal);
editFormElement.addEventListener("submit", handleEditFormSubmit);

function getCardElement(data) // get the element from an array
{console.log("data:",data);
  // access template and pull .card class

  const cardElement = cardTemplate.content.querySelector(".card").cloneNode(true);

  const cardNameEl = cardElement.querySelector(".card__title");
  cardNameEl.textContent = data.name;

  const cardImageEl = cardElement.querySelector(".card__image");
  cardImageEl.src = data.link;

  return cardElement;
}


for (let i = 0; i < initialCards.length; i++)
{const cardElement =  getCardElement(initialCards[i]);
cardsList.prepend(cardElement);

}