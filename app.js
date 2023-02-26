// https://openapi.programming-hero.com/api/phones?search=iphone
// https://openapi.programming-hero.com/api/phone/apple_iphone_13_pro_max-11089
// https://openapi.programming-hero.com/api/phone/${id}

const loadPhone = async (searchPhone, dataLimit) => {
  const URL = `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`;
  const res = await fetch(URL);
  const data = await res.json();
  displayPhones(data.data, dataLimit);
};

// const loadPhone = () => {
//   fetch("https://openapi.programming-hero.com/api/phones?search=iphone")
//     .then((res) => res.json())
//     .then((data) => displayPhones(data));
// };

// display phone
const displayPhones = (phones, dataLimit) => {
  //   show 10 phones
  const showAll = document.getElementById("show-all");
  if (dataLimit && phones.length > 10) {
    phones = phones.slice(0, 10);
    showAll.classList.remove("d-none");
  } else {
    showAll.classList.add("d-none");
  }
  const phoneContainer = document.getElementById("phone-container");

  //   display no phone found

  const noPhone = document.getElementById("no-phone-found");

  if (phones.length === 0) {
    noPhone.classList.remove("d-none");
  } else {
    noPhone.classList.add("d-none");
  }

  phoneContainer.innerHTML = "";
  //   phones = phones.slice(0, 5);
  phones.forEach((phone) => {
    console.log(phone);
    const { phone_name, image, slug } = phone;
    const createDiv = document.createElement("div");
    createDiv.classList.add("col");
    createDiv.innerHTML = `
    <div class="card p-4">
      <img src=" ${image} " class="card-img-top w-50 mx-auto" alt="...">
      <div class="card-body">
        <h5 class="card-title"> ${phone_name} </h5>
        <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <button onclick="phoneDetailsLoad('${slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#showModal">Details</button>
      </div>
    </div>

    `;
    phoneContainer.appendChild(createDiv);
  });
  //   stop spinner
  loadSpinner(false);
};

// process search
const processSearch = (dataLimit) => {
  const searchPhones = document.getElementById("search-phone");
  const searchPhonesValue = searchPhones.value;
  loadPhone(searchPhonesValue, dataLimit);
  loadSpinner(true);
};

// search phone
document.getElementById("search-btn").addEventListener("click", () => {
  processSearch(10);
});

// load spinner
const loadSpinner = (isLoading) => {
  const spinner = document.getElementById("loader");
  if (isLoading) {
    spinner.classList.remove("d-none");
  } else {
    spinner.classList.add("d-none");
  }
};

// show all phones button,  this is not a right way show all button just bujhar jonni 3rd vabey kora ata
document.getElementById("show-all-btn").addEventListener("click", () => {
  processSearch();
});

// keypress enter search
document.getElementById("search-phone").addEventListener("keypress", (e) => {
  console.log(e.key);
  if (e.key === "Enter") {
    processSearch(10);
  }
});

// phone details
const phoneDetailsLoad = async (id) => {
  const URL = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(URL);
  const data = await res.json();
  displayPhoneDetails(data.data);
};

// display phone details
const displayPhoneDetails = (data) => {
  console.log(data);
  const phonetTitle = document.getElementById("exampleModalLabel");
  phonetTitle.innerText = data.name;
  const phoneBody = document.getElementById("phone-body");
  phoneBody.innerHTML = `

  <p>Release : ${data.releaseDate}</p>
  <p>Memory : ${data.mainFeatures.memory}</p>

  `;
};

loadPhone();
