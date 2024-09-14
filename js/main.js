var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productDes = document.getElementById("productDes");
var productCat = document.getElementById("productCat");
var productImage = document.getElementById("productimage");
var productSearch = document.getElementById("productSearch");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

var allProduct;

if (localStorage.getItem("products") == null) {
  var allProduct = [];
} else {
  allProduct = JSON.parse(localStorage.getItem("products"));
  displayProduct(allProduct);
}
function addProduct() {
  var product = {
    code: productName.value,
    price: productPrice.value,
    des: productDes.value,
    cat: productCat.value,
    image: `images/${productImage.files[0].name}`,
  };
  console.log(product);

  allProduct.push(product);
  console.log(allProduct);
  clearForm();
  localStorage.setItem("products", JSON.stringify(allProduct));
  displayProduct(allProduct);
}

function displayProduct(arr) {
  var cartouna = "";
  for (var i = 0; i < arr.length; i++) {
    cartouna += ` <div class="col-md-3 text-center p-3 m-2 rounded-4">
          <img class="w-100" src="${arr[i].image}" alt="" />
          <h2>${arr[i].code}</h2>
          <h2>${arr[i].price}</h2>
          <h3>${arr[i].des}</h3>
          <h4>${arr[i].cat}</h4>
   <button class="btn btn-warning px-2 m-4" onclick="setFormForupdate(${i}) ">Update</button>

<button class="btn btn-danger px-2 my-2" onclick="deletProduct(${i})">Delete Product</button>

        </div>`;
  }
  document.getElementById("demo").innerHTML = cartouna;
}
function clearForm() {
  productName.value = null;
  productPrice.value = null;
  productDes.value = null;
  productCat.value = null;
}
function deletProduct(term) {
  allProduct.splice(term, 1);
  displayProduct(allProduct);
  localStorage.setItem("products", JSON.stringify(allProduct));
}

function searchProduct() {
  var term = productSearch.value;
  var searchContainer = [];
  for (var i = 0; i < allProduct.length; i++) {
    if (allProduct[i].code.toLowerCase().includes(term.toLowerCase())) {
      searchContainer.push(allProduct[i]);
      displayProduct(searchContainer);
    }
  }
}

var updateIndex;
function setFormForupdate(ayhaga) {
  updateIndex = ayhaga;
  productName.value = allProduct[ayhaga].code;
  productPrice.value = allProduct[ayhaga].price;
  productDes.value = allProduct[ayhaga].des;
  productCat.value = allProduct[ayhaga].cat;
  updateBtn.classList.remove("d-none");
  addBtn.classList.add("d-none");
}
function updateProduct() {
  allProduct[updateIndex].code = productName.value;
  allProduct[updateIndex].price = productPrice.value;
  allProduct[updateIndex].des = productDes.value;
  allProduct[updateIndex].cat = productCat.value;
  displayProduct(allProduct);
  localStorage.setItem("products", JSON.stringify(allProduct));
  clearForm();
  updateBtn.classList.add("d-none");
  addBtn.classList.remove("d-none");
}
function validaitProduct(element) {
  var regex = {
    productName: /[A-Z][a-z]{3,8}$/,
    productPrice: /[1-9][0-9][0-9]/,
    productDes: /.{5,9}/,
    productCat: /(tv|mobile|laptop|sports)/,
  };
  // console.log(element.value);
  // console.log(element.id);
  // console.log(regex.element.id);
  if (regex[element.id].test(element.value)) {
    console.log("match");
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    element.nextElementSibling.classList.replace("d-block", "d-none");
  } else {
    console.log("not");
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.classList.replace("d-none", "d-block");
  }
}
