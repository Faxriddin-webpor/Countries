"use strict";

let search = $("#search");
let region = $("#region");
let wrapper = $(".wrapper");

let BASE_URL = "https://restcountries.com/v2";

//------------------------------ALL COUNTRIES FETCHING FUNCTION----------------------------------//

async function AllCountries() {
  wrapper.innerHTML = "<span class='loader'></span>";
  try {
    const response = await fetch(`${BASE_URL}/all`);
    const result = await response.json();

    if (response.status === 200) {
      renderCountries(result);
      options(result);
    } else {
      alert(response.status);
    }
  } catch (err) {
    console.log(err);
  }
}

AllCountries();

//----------------------------------COUNTRIES RENDER FUNCTION------------------------------------//

function renderCountries(data) {
  if (data) {
    wrapper.innerHTML = "";

    data.forEach((item) => {
      const card = createElement(
        "div",
        "card w-[267px] h-[336px] bg-white shadow-lg m-2 rounded-b-md",
        `
        <img src="${item?.flag}" alt="img" class="w-full h-[160px] rounded-t-md"/>
          <div class="card-body p-6">
            <h3 class="text-xl font-bold">${item?.name}</h3>
            <ul class="mt-2">
              <li><strong>Population: </strong>${item?.population}</li>
              <li><strong>Region: </strong>${item?.region}</li>
              <li><strong>Capital: </strong>${item?.capital}</li>
            </ul>
          </div>
        `
      );
      wrapper.append(card);
    });
  }
}

//----------------------------------DYNAMIC OPTION------------------------------------//

function options(data) {
  const option = [];
  data?.forEach((item) => {
    if (!option.includes(item.region)) {
      option.push(item.region);
    }
  });
  option.sort();
  option.forEach((el) => {
    const option = createElement("option", "item", el);
    $("#region").append(option);
  });
}

//----------------------------------REGION REQUEST FUNCTION------------------------------------//

async function getOption(e) {
  try {
    const response = await fetch(`${BASE_URL}/region/${e.target.value}`);
    const region = await response.json();
    renderCountries(region);
  } catch (err) {
    console.log(err);
  }
}

$("#region").addEventListener("change", (e) => {
  getOption(e);
});

//----------------------------------SEARCH KEY-UP FUNCTION------------------------------------//

async function searchName(name) {
  try {
    const response = await fetch(`${BASE_URL}/name/${name}`);
    const result = await response.json();
    if (response.status === 200) {
      renderCountries(result);
    } else {
      wrapper.innerHTML =
        "<h1 class='text-center text-blue-800 text-6xl mt-24'> BUNDAY DAVLAT TOPILMADI ! </h1>";
      setTimeout(() => {
        wrapper.innerHTML =
          "<h1 class='text-center text-blue-700 text-8xl mt-20'> YANGILANMOQDA ...</h1>";
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }, 1500);
    }

    console.log(result);
  } catch {
    console.log(err);
  }
}

$("#search").addEventListener("keyup", (e) => {
  searchName(e.target.value);
});
