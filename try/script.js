let selectedCategory = "Electronics";
let rightHeading = document.querySelector("#hell");
let searchBtn = document.querySelector(".custom-search");

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
});
rightHeading.innerText = selectedCategory;

(async function () {
  const categoryDetails = document.querySelectorAll(".category");
  let a = await fetch("https://fakestoreapi.com/products/categories");
  let response = await a.text();
  const data = JSON.parse(response);
  categoryDetails.forEach((e, index) => {
    e.innerHTML =
      data[index][0].toUpperCase() +
      data[index].slice(1) +
      `<span><i class="bi bi-chevron-right">`;
  });
})();

(function () {
  const selectCategory = document.querySelectorAll(".select-category-js");
  selectCategory.forEach((e) => {
    e.addEventListener("click", () => {
      for (let i = 0; i < selectCategory.length; i++) {
        selectCategory[i].classList.replace("active", "inactive");
      }
      if (e.classList.contains("inactive")) {
        selectedCategory = e.firstElementChild.innerHTML;

        e.classList.remove("inactive");
        e.classList.add("active");
      }
      selectedCategory = selectedCategory.split("<")[0];
      rightHeading.innerText = selectedCategory;
      showcart();
    });
  });
})();

async function showcart() {
  let card = document.querySelector("#showDetails");
  card.innerHTML = "";
  let a = await fetch(
    `https://fakestoreapi.com/products/category/${selectedCategory.toLowerCase()}`
  );
  let response = await a.text();
  const data = JSON.parse(response);
  for (let i = 0; i < data.length; i++) {
    card.innerHTML =
      card.innerHTML +
      `<div class="col-12 col-lg-3 col-md-4 mb-2">
          <div class="card">
              <div style="height:350px;padding: 20px">
                 <img src="${data[i].image}" class=" img-fluid h-100 card-img-top" alt="..." />
              </div>
            <div class="card-body">
              <h5 class="card-title">${data[i].title}</h5>
              <p class="card-text">
                ${data[i].description}
              </p>
              <h4 id="price">$${data[i].price}</h4>
            </div>
          </div>
        </div>`;
  }
}
showcart();
