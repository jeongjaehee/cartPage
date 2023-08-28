let products = [];
let cart = [];
//====================
//상품진열기능
//====================
$.get("store.json").then((data) => {
  products = data.products;
  products.forEach((a) => {
    $(".product-list").append(`
    <div class="col-md-3">
      <div class="item" draggable="true" data-id="${a.id}">
        <img src="${a.photo}">
        <h4>${a.title}</h4>
        <h4>${a.brand}</h4>
        <p>가격 : ${a.price}</p>
        <button class="add" data-id="${a.id}">담기</button>
      </div>
    </div>`);
  });
  //====================
  //장바구니 담는기능
  //====================

  function add(id) {
    let i = cart.findIndex((cart) => {
      return cart.id == id;
    });
    if (i == -1) {
      let product = products.find((a) => {
        return a.id == id;
      });
      console.log(product);
      product.count = 1;
      cart.push(product);
    } else {
      cart[i].count++;
    }
    $(".basket").html("");
    cart.forEach((a) => {
      $(".basket").append(`
      <div class="col-md-3 bg-white">
        <img src="${a.photo}">
        <h4>${a.title}</h4>
        <h4>${a.brand}</h4>
        <p>${a.price}</p>
        <input type="number" value="${a.count}" class="item-count w-100">
    </div>`);
    });

    cal();
  }
  function cal() {
    let finalPrice = 0;
    cart.forEach((a) => {
      finalPrice += a.price * a.count;
    });
    $(".final-price").text(finalPrice + "원");
  }
  $(".add").on("click", function (e) {
    let id = e.target.dataset.id;
    add(id);
  });
  //.add 버튼 클릭하면 끝
  //====================
  //드래그로 장바구니 추가기능
  //====================
  $(".item").on("dragstart", function (e) {
    e.originalEvent.dataTransfer.setData("id", e.target.dataset.id);
  });

  $(".basket").on("dragover", function (e) {
    e.preventDefault();
  });

  $(".basket").on("drop", function (e) {
    let productId = e.originalEvent.dataTransfer.getData("id");
    console.log(productId, `productId`);
    //신기한건 console.log 삭제하면 안됨
    add(productId);
  });
  //===========================
  //검색기능 + 담기기능 추가
  //===========================
  $("#search").on("input", function () {
    let searchWord = $("#search").val();
    let searchProducts = products.filter((a) => {
      return a.title.includes(searchWord) || a.brand.includes(searchWord);
    });

    $(".search_box").html("");
    if (searchWord == "") {
      $(this).removeClass("active");
    } else {
      $(this).addClass("active");
      searchProducts.forEach((a) => {
        $(".search_box").append(`
      <div class="col-md-2">
        <div class="item" draggable="true" data-id="${a.id}">
          <img src="${a.photo}">
          <h4>${a.title}</h4>
          <h4>${a.brand}</h4>
          <p>가격 : ${a.price}</p>
          <button class="add" data-id="${a.id}">담기</button>
        </div>
      </div>`);
      });
      $(".add").on("click", function (e) {
        let id = e.target.dataset.id;
        add(id);
      });
    }
  });
});
$(".buy").on("click", function () {
  $(".modal1").show();
  $(".show-receipt").on("click", function () {
    $(".modal1").hide();
    $(".modal2").show();
    let name = $("#name").val();
    let phone = $("#phone").val();
    let finalPrice = $(".final-price").text();
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.font = "20px Arial";
    ctx.fillText(`이름 : ${name}`, 10, 50);
    ctx.fillText(`연락처 : ${phone}`, 10, 100);
    ctx.fillText(`최종가격 : ${finalPrice}`, 10, 150);
  });
});
$(".close").on("click", function () {
  $(".modal1").hide();
  $(".modal2").hide();
});

//$.get 끝
