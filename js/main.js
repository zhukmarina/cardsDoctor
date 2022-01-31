const BASE_URL = "https://ajax.test-danit.com/api/v2";

const routes = new Map([
  ["LOGIN", () => `${BASE_URL}/cards/login`],
  ["CARDS", () => `${BASE_URL}/cards`],
  ["CARD", (id) => `${BASE_URL}/cards/${id}`],
]);

const loginButton = document.getElementById("js-login");
const createVisitButton = document.getElementById("js-create");
const cardsContainer = document.getElementById("cards-container");
const form = document.getElementById("js-form");
const modalContainer = document.querySelector(".container-modal");
const closeModalButton = document.getElementById("close-button");
// let modal = new Modal();
let cardListData = [];
// console.log(inputsContainer);

function getToken(email, password) {
  const getRoute = routes.get("LOGIN");
  const route = getRoute();
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  };
  return fetch(route, config);
}

function getCards() {
  const getRoute = routes.get("CARDS");
  const route = getRoute();
  const config = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
  return fetch(route, config);
}

function createCard(body) {
  const getRoute = routes.get("CARDS");
  const route = getRoute();
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body,
  };
  return fetch(route, config);
}

function updateCard(id, body) {
  const getRoute = routes.get("CARD");
  const route = getRoute(id);
  const config = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
    body,
  };
  return fetch(route, config);
}
function deleteCard(id) {
  const getRoute = routes.get("CARD");
  const route = getRoute(id);
  const config = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    },
  };
  return fetch(route, config);
}
class Visit {
  constructor(title, target, description, urgency, name, id) {
    this.title = title;
    this.target = target;
    this.description = description;
    this.urgency = urgency;
    this.name = name;
    this.id = id;
  }
  showMore() {
    const showMoreButton = document.querySelector(".more");
    // const card = document.querySelector(".card_discription");
    const visitDiscription = document.querySelector(".show-more");
    cardsContainer.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target == showMoreButton)
        visitDiscription.style.display =
          visitDiscription.style.display == "block" ? "none" : "block";
      console.log(e.target);
    });
  }
}

class VisitCardiologist extends Visit {
  constructor(
    title,
    target,
    description,
    urgency,
    name,
    id,
    pressure,
    weightIndex,
    diseases,
    age
  ) {
    super(title, target, description, urgency, name, id);
    this.pressure = pressure;
    this.weightIndex = weightIndex;
    this.diseases = diseases;
    this.age = age;
  }
  renderCardiologistCard(
    title,
    target,
    description,
    urgency,
    name,
    id,
    pressure,
    weightIndex,
    diseases,
    age
  ) {
    let cardItem = document.createElement("div");

    cardItem.innerHTML = `<div class="card_discription ${urgency} ${title}">
  <h2>${title}</h2>
  <h3>${name}</h3>
  <a class="more" href="#">Показать больше</a>
  <ul class="show-more">
      <li>цель визита: ${target}</li>
      <li>краткое описание визита: ${description}</li>
         <li>срочность: ${urgency} </li>
      <li>обычное давление: ${pressure}</li>
      <li>Индекс массы тела: ${weightIndex}</li>
      <li>перенесенные заболевания сердечно-сосудистой системы: ${diseases}</li>
      <li>возраст: ${age} </li>
  </ul>
  <div>
    <button id='edit' class="card_create_btn button"  data-card-id="${id}">Редактировать</button>
    <button class="card_create_btn del button" data-card-id="${id}">Удалить карту</button>
  </div>
  </div>`;
    return cardItem;
  }
}
class VisitDentist extends Visit {
  constructor(title, target, description, urgency, name, id, lastVisit) {
    super(title, target, description, urgency, name, id);
    this.lastVisit = lastVisit;
  }
  renderDentistCard(title, target, description, urgency, name, id, lastVisit) {
    let cardItem = document.createElement("div");

    cardItem.innerHTML = `<div class="card_discription ${urgency} ${title}">
  <h2>${title}</h2>
  <h3>${name}</h3>
  <a class="more" href="#">Показать больше</a>
  <ul class="show-more">
      <li>цель визита: ${target}</li>
      <li>краткое описание визита: ${description}</li>
         <li>срочность: ${urgency} </li>
      <li>Последний визит: ${lastVisit} </li>
  </ul>
  <div>
    <button id='edit' class="card_create_btn button"   data-card-id="${id}">Редактировать</button>
    <button class="card_create_btn del button" data-card-id="${id}">Удалить карту</button>
  </div>
  </div>`;
    return cardItem;
  }
}

class VisitTherapist extends Visit {
  constructor(title, target, description, urgency, name, id, age) {
    super(title, target, description, urgency, name, id);
    this.age = age;
  }
  renderTherapistCard(title, target, description, urgency, name, id, age) {
    let cardItem = document.createElement("div");

    cardItem.innerHTML = `<div class="card_discription ${urgency} ${title} ">
  <h2>${title}</h2>
  <h3>${name}</h3>
  <a class="more" href="#">Показать больше</a>
  <ul class="show-more">
      <li>цель визита: ${target}</li>
      <li>краткое описание визита: ${description}</li>
         <li>срочность: ${urgency} </li>
      <li>возраст: ${age} </li>
  </ul>
  <div>
    <button id='edit' class="card_create_btn button"   data-card-id="${id}">Редактировать</button>
    <button class="card_create_btn del button" data-card-id="${id}">Удалить карту</button>
  </div>
  </div>`;
    return cardItem;
  }
}

class Modal {
  constructor(title, target, description, urgency, name) {
    this.title = title;
    this.target = target;
    this.description = description;
    this.urgency = urgency;
    this.name = name;
  }
  renderForm(visitData = {}, isUpdate) {
    const {
      title = "cardiologist",
      target = "",
      description = "",
      urgency = "",
      name = "",
      pressure = "",
      weightIndex = "",
      diseases = "",
      age = "",
      lastVisit = "",
      id,
    } = visitData;

    form.innerHTML = `
    <select value="${title}" name="title" id="title">
      <!-- <option value="select doctor">Select doctor</option> -->
      <option value="cardiologist">cardiologist</option>
      <option value="dentist">dentist</option>
      <option value="therapist">therapist</option>
    </select>
    <div class="input-group input-group-sm mb-3">
      <span class="input-group-text" id="inputGroup-sizing-sm"
        >Цель визита</span
      >
      <input
        id="target"
        name="target"
        value="${target}"
        type="text"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-sm"
      />
    </div>
  
    <div class="input-group input-group-sm mb-3">
      <span class="input-group-text" id="inputGroup-sizing-sm"
        >Описание визита</span
      >
      <input
        id="description"
        name="description"
        type="text"
        value="${description}"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-sm"
      />
    </div>
  
    <select
      id="urgency"
      name="urgency"
      class="form-select form-select-sm"
      value="${urgency}"
      aria-label=".form-select-sm example"
    >
    <option value="regular">regular</option>
    <option value="priority">priority</option>
    <option value="urgent">urgent</option>
    </select>
  
    <div class="input-group input-group-sm mb-3" id="modal-window">
      <span class="input-group-text" id="inputGroup-sizing-sm"
        >Ваше имя</span
      >
      <input
        id="name"
        name="name"
        type="text"
        value="${name}"
        class="form-control"
        aria-label="Sizing example input"
        aria-describedby="inputGroup-sizing-sm"
      />
    </div>
    <div class="inputs-container"></div>
    <div class="modal-buttons">
          <button type="button" class="btn btn-success" id="create-card-btn">
            ${isUpdate ? "Обновить" : "Создать"}
          </button>
          <button type="button" class="btn btn-danger" id="close-button">
            Закрыть
          </button>
        </div>
  `;

    let cardiologistModal = new CardiologistModal();
    cardiologistModal.renderCardiologistModal();
    // const form = document.getElementById("js-form");
    form.style.display = "flex";
    const selectDoctor = document.getElementById("title");
    selectDoctor.addEventListener("change", function (e) {
      //SWITСH ДЛЯ ФОРМ СОЗДАНИЯ КАРТОЧКИ
      const title = e.target.value;

      switch (title) {
        case "cardiologist":
          let cardiologistModal = new CardiologistModal();
          cardiologistModal.renderCardiologistModal(visitData);
          break;
        case "dentist":
          let dentistModal = new DentistModal();
          dentistModal.renderDentistModal(visitData);
          break;
        case "therapist":
          let therapistModal = new TherapistModal();
          therapistModal.renderTherapistModal(visitData);
          break;
      }
    });
    selectDoctor.value = title;
    switch (title) {
      case "cardiologist":
        let cardiologistModal = new CardiologistModal();
        cardiologistModal.renderCardiologistModal(visitData);
        break;
      case "dentist":
        let dentistModal = new DentistModal();
        dentistModal.renderDentistModal(visitData);

        break;
      case "therapist":
        let therapistModal = new TherapistModal();
        therapistModal.renderTherapistModal(visitData);
        break;
    }
    document
      .getElementById("create-card-btn")
      .addEventListener("click", (e) => {
        e.preventDefault();
        const token = sessionStorage.getItem("token");

        const formData = new FormData(form);
        const object = {};
        formData.forEach(function (value, key) {
          object[key] = value;
        });
        if (isUpdate) {
          updateCard(id, JSON.stringify(object));
        } else {
          createCard(JSON.stringify(object));
        }
        form.style.display = "none";
      });
  }
}
let modal = new Modal();
function renderCards(cardListData) {
  cardListData.forEach((item, index) => {
    if (item.title === "cardiologist") {
      const cardiologistCard = new VisitCardiologist();
      cardsContainer.append(
        cardiologistCard.renderCardiologistCard(
          item.title,
          item.target,
          item.description,
          item.urgency,
          item.name,
          item.id,
          item.pressure,
          item.weightIndex,
          item.diseases,
          item.age
        )
      );
    } else {
      if (item.title === "dentist") {
        const dentistCard = new VisitDentist();
        cardsContainer.append(
          dentistCard.renderDentistCard(
            item.title,
            item.target,
            item.description,
            item.urgency,
            item.name,
            item.id,
            item.lastVisit
          )
        );
      } else {
        if (item.title === "therapist") {
          const therapistCard = new VisitTherapist();
          cardsContainer.append(
            therapistCard.renderTherapistCard(
              item.title,
              item.target,
              item.description,
              item.urgency,
              item.name,
              item.id,
              item.age
            )
          );
        }
      }
    }

    const currentCard = document.querySelectorAll("#edit")[index];
    const currentCardForDelete = document.querySelectorAll(".del")[index];

    currentCardForDelete.addEventListener("click", async (e) => {
      e.preventDefault();
      const currentId = e.currentTarget.dataset.cardId;

      const delCard = await deleteCard(currentId);

      document.querySelector(".card_discription").remove();
    });
    currentCard.addEventListener("click", (event) => {
      event.preventDefault();

      const currentId = event.currentTarget.dataset.cardId;
      const currentTargetCard = cardListData.filter(
        ({ id }) => id == currentId
      );
      // let modal = new Modal();
      modal.renderForm(currentTargetCard[0], true);
      form.style.display = "flex";
      let closeModalButton = document.getElementById("close-button");
      closeModalButton.addEventListener("click", (e) => {
        e.preventDefault();

        form.style.display = "none";
      });
    });
    const showMoreButton = document.querySelector(".more");
    const visitDiscription = document.querySelector(".show-more");

    showMoreButton.addEventListener("click", (e) => {
      e.preventDefault();
      visitDiscription.style.display =
        visitDiscription.style.display == "block" ? "none" : "block";
    });
  });
}
class CardiologistModal extends Modal {
  constructor(
    title,
    target,
    description,
    urgency,
    name,
    pressure,
    weightIndex,
    diseases,
    age
  ) {
    super(title, target, description, urgency, name);
    this.pressure = pressure;
    this.weightIndex = weightIndex;
    this.diseases = diseases;
    this.age = age;
  }
  renderCardiologistModal({
    pressure = "",
    weightIndex = "",
    diseases = "",
    age = "",
  } = {}) {
    const inputsContainer = document.querySelector(
      "#js-form .inputs-container"
    );
    inputsContainer.innerHTML = `
  <div class="input-group input-group-sm mb-3">
    <span class="input-group-text" id="inputGroup-sizing-sm">Давление</span>
    <input id='pressure' name='pressure' type="number" class="form-control" aria-label="Sizing example input" value="${pressure}" aria-describedby="inputGroup-sizing-sm">
  </div>
  
  <div class="input-group input-group-sm mb-3">
    <span class="input-group-text" id="inputGroup-sizing-sm">Индекс массы тела</span>
    <input id='weightIndex' name='weightIndex' type="number" value='${weightIndex}' class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
  </div>
  
  <div class="input-group input-group-sm mb-3">
    <span class="input-group-text" id="inputGroup-sizing-sm">Хронические заболевания</span>
    <input id='diseases' name='diseases' type="text" class="form-control" value='${diseases}' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
  </div>
  
  <div class="input-group input-group-sm mb-3">
    <span class="input-group-text" id="inputGroup-sizing-sm">Возраст</span>
    <input id='age' name='age' type="number" class="form-control" value='${age}' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
  </div>
  `;
  }
}

class DentistModal extends Modal {
  constructor(title, target, description, urgency, name, lastVisit) {
    super(title, target, description, urgency, name);
    this.lastVisit = lastVisit;
  }
  renderDentistModal({ lastVisit = "" } = {}) {
    const inputsContainer = document.querySelector(
      "#js-form .inputs-container"
    );
    inputsContainer.innerHTML = `  
  <div class="input-group input-group-sm mb-3">
    <span class="input-group-text" id="inputGroup-sizing-sm">Последний визит</span>
    <input id='lastVisit' name='lastVisit' type="date" value='${lastVisit}' class="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
  </div>
  `;
  }
}

class TherapistModal extends Modal {
  constructor(title, target, description, urgency, name, age) {
    super(title, target, description, urgency, name);
    this.age = age;
  }
  renderTherapistModal({ age = "" } = {}) {
    const inputsContainer = document.querySelector(
      "#js-form .inputs-container"
    );
    inputsContainer.innerHTML = `
  <div class="input-group input-group-sm mb-3">
    <span class="input-group-text" id="inputGroup-sizing-sm">Возраст</span>
    <input id='age' name='age' type="number" class="form-control" value='${age}' aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm">
  </div>
  `;
  }
}

document.addEventListener("DOMContentLoaded", async function () {
  const token = sessionStorage.getItem("token");

  if (!!token) {
    loginButton.style.display = "none";
    createVisitButton.style.display = "block";

    const cardsResp = await getCards();
    cardListData = await cardsResp.json();

    renderCards(cardListData);
  } else {
    loginButton.addEventListener("click", (e) => {
      const emailInput = document.getElementById("exampleInputEmail1");
      const passwordInput = document.getElementById("exampleInputPassword1");
      e.preventDefault();
      document.querySelector(".authorization-form").style.display = "block";
      document
        .getElementById("confirm-auth")
        .addEventListener("click", async (e) => {
          e.preventDefault();
          const resp = await getToken(emailInput.value, passwordInput.value);

          if (resp.ok) {
            const token = await resp.text();
            sessionStorage.setItem("token", token);
            const cardsResp = await getCards();
            cardListData = await cardsResp.json();
            renderCards(cardListData);
            loginButton.style.display = "none";
            document.querySelector(".authorization-form").style.display =
              "none";
            createVisitButton.style.display = "block";
          } else {
            emailInput.value = "";
            passwordInput.value = "";
            let errorMessage = document.querySelector(".error-message");
            errorMessage.style.display = "block";
          }
        });
    });
  }
  createVisitButton.addEventListener("click", (e) => {
    e.preventDefault();
    modal.renderForm();

    let closeModalButton = document.getElementById("close-button");
    closeModalButton.addEventListener("click", (e) => {
      e.preventDefault();

      form.style.display = "none";
    });
  });
});

const cardiologist = new CardiologistModal();
// cardiologist.renderCardiologistModal();
