fetch("http://localhost:3000/cart/list-json", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: localStorage.getItem("cart"),
})
    .then((res) => res.json())
    .then((data) => {
        const htmlsArray = data.tours.map((item,index) => {
            return `
            <tr>
                <td>${index + 1}</td>
                <td><img src=${item.image} alt=${item.inforUser.title} width="80px"></td>
                <td><a href="/tours/detail/${item.inforUser.slug}">Tour Hạ Long</a></td>
                <td>${item.special_price.toLocaleString()}₫</td>
                <td>
                    <input type="number" 
                    name="quantity" 
                    value=${item.quantity} 
                    min="1" item-id=${item.id}
                     style="width: 60px">
                </td>
                <td>${item.total_price.toLocaleString()}</td>
                <td><button 
                    class="btn btn-sm 
                    btn-danger" 
                    btn-delete=${item.id}>Xóa
                </button></td>
            </tr>
           `
        })
       const listTour = document.querySelector("[list-tour]")
       listTour.innerHTML = htmlsArray.join("")
       // all price of tours
       const totalPriceTours = data.tours.reduce((sum, tour) => sum + tour.total_price, 0)
       console.log(totalPriceTours)
       const totalPrice = document.querySelector("[total-price]")
       totalPrice.innerHTML = totalPriceTours.toLocaleString()
    });
