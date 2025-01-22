
//get data display on interf
const drawTours = () => {
    fetch("http://localhost:3000/cart/list-json", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: localStorage.getItem("cart"),
})
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        const htmlsArray = data.tours.map((item,index) => {
            return `
            <tr>
                <td>${index + 1}</td>
                <td><img src="${item.image}"alt="${item.inforUser.title}" width="80px"></td>
                <td><a href="/tours/detail/${item.inforUser.slug}">Tour Hạ Long</a></td>
                <td>${item.special_price.toLocaleString()}₫</td>
                <td>
                    <input type="number" 
                    name="quantity" 
                    value="${item.quantity}" 
                    min="1" item-id="${item.inforUser.id}"
                    style="width: 60px">
                </td>
                <td>${item.total_price.toLocaleString()}</td>
                <td><button 
                    button-delete-tour
                    class="btn btn-sm btn-danger" 
                    btn-delete="${item.inforUser.id}">Xóa
                </button></td>
            </tr>
           `
        })
       const listTour = document.querySelector("[list-tour]")
       listTour.innerHTML = htmlsArray.join("")
       // all price of tours
       const totalPriceTours = data.tours.reduce((sum, tour) => sum + tour.total_price, 0)
       const totalPrice = document.querySelector("[total-price]")
       totalPrice.innerHTML = totalPriceTours.toLocaleString()
       deleteTour()
       updateQuantityCart()
    });
}

//end get data diplay on interf
//delete tour
const deleteTour = () => {
    const listButtonDeleteTour = document.querySelectorAll("[button-delete-tour]")
       if(listButtonDeleteTour.length > 0){
            listButtonDeleteTour.forEach(button => {
                button.addEventListener("click", () => {
                    const tourId = button.getAttribute("btn-delete")
                    const cart = JSON.parse(localStorage.getItem("cart"))
                    const newCart = cart.filter(tour => tour.tourId  != tourId)
                    localStorage.setItem("cart", JSON.stringify(newCart))
                    drawTours()
                })
            })
       }
}
//end delete tour
//update tour
const updateQuantityCart = () => {
    const listInputTour = document.querySelectorAll("[list-tour] input[item-id]")
    if(listInputTour.length > 0){
        listInputTour.forEach(input => {
            input.addEventListener("change", () => {
                const tourId = input.getAttribute("item-id")
                const quantityTour = input.value
                const cart = JSON.parse(localStorage.getItem("cart"))
                const tourUpdate = cart.find(item => item.tourId == tourId)
                tourUpdate.quantity = quantityTour
                localStorage.setItem("cart", JSON.stringify(cart))
                drawTours(); 
            })
        })
    }
}
//book tour
const formBookTour = document.querySelector("[form-order]")
if(formBookTour){
    formBookTour.addEventListener("submit", (event)=> {
        event.preventDefault()
        const cart = JSON.parse(localStorage.getItem("cart"))
        const data = {
            inforUser: {
                fullName: event.target.elements.fullName.value,
                phone: event.target.elements.phone.value,
                note: event.target.elements.note.value
            },
            cart: cart
        } 
        fetch("/order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)  
        }).then(res => res.json()).then(data =>{
            console.log(data)
            if(data.code === 200){
                window.location.href = `/order/success?orderCode=${data.orderCode}`
            }else{
                alert("Đặt hàng không thành công!")
            }
        })
    } )
}
//end book tour
//end update tour
//display tours
drawTours()
//end display tours