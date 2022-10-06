let getComponentes = (data) => {
  let cardContainer = document.getElementById("cardContainer");
  data.forEach((item) => {
    cardContainer.innerHTML += `
      <div class="card-item m-5" style="width: 18rem">
          <img
          src="${item.img}"
          class="card-img-top"
          alt="..."
          />
          <div class="card-body">
          <h5 class="card-title">${item.component}</h5>
          <p class="card-text">
              ${item.price}
          </p>
          <a id=${item.id} class="btn btn-primary addBtn" >add to cart</a>
          </div>
      </div>`;
  });
};

let getChartItems = () => {
  let chart = document.getElementById("cartMenu");
  let itemsCart = document.getElementById("cartItems");
  let cartData = JSON.parse(localStorage.getItem("cart"));
  chart.innerHTML = `<span>${cartData ? cartData.length : ""}</span>`;
  itemsCart.innerHTML = "";
  cartData.forEach((item) => {
    itemsCart.innerHTML += `
        <div class="cart-container">
          <p> 1 x </p>
          <img class="image-cart" src="${item.img}" alt="${item.component}">
          <div>
          <p>${item.component}</p>
          <p>$ ${item.price * item.countStore}</p>
          </div>
        </div>
      `;
  });
};

let getItemsList = () => {
  let list = document.getElementById('cartContainer');
  let cartData = JSON.parse(localStorage.getItem("cart"));
  cartData.forEach((item) => {
    list.innerHTML += `
    <div class="cart-table">
      <div>
        <img class="image-table" src="${item.img}" alt="${item.component}">
      </div>
      <div class="data-table">
        <p>Producto: ${item.component}</p>
        <p>Precio: ${item.price}</p>
        <p>Cantidad: ${item.countStore}</p>
        <p>total: ${item.price * item.countStore}</p>
      </div>
    </div>
      `;
  });
}

let addItem = (id, data) => {
  let newItem = data.find((elem) => elem.id == id);
  let localData = localStorage.getItem("cart");
  let itemCarrito = localData ? JSON.parse(localData) : [];
  if (itemCarrito.find((elem) => elem.id == newItem.id)) {
    console.log("element already exist");
    let itemIndex = itemCarrito.findIndex((obj) => obj.id == newItem.id);
    itemCarrito[itemIndex].countStore = itemCarrito[itemIndex].countStore + 1;
  } else {
    let completeItem = { ...newItem, countStore: 1 };
    console.log(completeItem);
    itemCarrito.push(completeItem);
  }
  localStorage.setItem("cart", JSON.stringify(itemCarrito));
  Swal.fire("Componente Agregado!", `${newItem.component}`, "success");
};


(() => {
    fetch("./data.json")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        getComponentes(data);
        let cardIds = document.querySelectorAll(".addBtn");
        cardIds.forEach((addToCartButton) => {
          addToCartButton.addEventListener("click", function () {
            addItem(addToCartButton.id, data);
            getChartItems();
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });

    getChartItems();

    getChartItems();
    getItemsList();

    let btn = document.getElementById("submitCompra");
    btn.addEventListener("click", function() {
      Swal.fire("GRACIAS POR SU COMPRA!", "" ,"success")
    })
  
})();
