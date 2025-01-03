
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
      console.log(cart)
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  })
}
//end cart