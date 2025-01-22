
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    slidesPerView: 4,
    freeMode: true,
    watchSlidesProgress: true,
  });
  var swiper2 = new Swiper(".mySwiper2", {
    spaceBetween: 10,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    thumbs: {
      swiper: swiper,
    },
  });

//hien thi thong bao
const alertAddTourSuccess = () => {
  const elementAlert = document.querySelector("[alert-add-cart-success]")
  const closeAlert = document.querySelector("[close-alert]")
  if(closeAlert){
    closeAlert.addEventListener("click", () => {
      elementAlert.classList.add("alert-hidden")
    })
  }
    if(elementAlert){
      elementAlert.classList.remove("alert-hidden")
    setTimeout(() => {
      elementAlert.classList.add("alert-hidden")
    }, 3000);
  } 
} 

//end hien thi thong bao

//mini cart
const showMiniCart = () => {
  const cart = JSON.parse(localStorage.getItem("cart"))
  if(cart){
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0)
    const miniCart = document.querySelector("[mini-cart]")
    if(miniCart){
      miniCart.innerHTML = totalQuantity
    }
  }
  
}
//end mini cart
showMiniCart()
//cart
const cartLocalStorage = localStorage.getItem("cart")
if(!cartLocalStorage){
  localStorage.setItem("cart", JSON.stringify([]))
}
const cartForm = document.querySelector("[form-add-to-cart]")
if(cartForm){
  cartForm.addEventListener("submit", (event) => {
    event.preventDefault()  
    const tourId =parseInt(cartForm.getAttribute("tour-id")) 
    const quantity = parseInt(event.target.elements.quantity.value)
    if(quantity > 0 && tourId){
      const cart = JSON.parse(localStorage.getItem("cart"))
      const isExitTour = cart.findIndex(item => item.tourId == tourId)
      if(isExitTour == -1){
        cart.push({
          tourId: tourId,
          quantity: quantity
        })
      }else{
        cart[isExitTour].quantity = cart[isExitTour].quantity + quantity
      }
      localStorage.setItem("cart", JSON.stringify(cart))
      alertAddTourSuccess()
      showMiniCart()
    }
  })
}
//end cart

