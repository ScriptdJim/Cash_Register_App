$(Document).ready(function () {
    const fruitPrices = {
        Apple: 5.99,
        Pineapple: 25.99,
        Mango: 8.99,
        Watermelon: 12.99,
        Banana: 10.99,
        Pear: 12.99,
        Orange: 6.99,
        Blueberry: 6.99
    };
    let basket = [];

    function updateBasket() {
        const $basketTable = $("#basketTable tbody");
        $basketTable.empty();

        let totalPrice = 0;
        basket.forEach(item => {
            const row = `<tr>
                            <td>${item.name}</td>
                            <td>$${item.price.toFixed(2)}</td>
                            <td><input type="number" class="list-group quantity-input" value="${item.quantity}" min="1" data-fruit="${item.name}"></td>
                            <td class="subtotal">$${(item.price * item.quantity).toFixed(2)}</td>
                            <td><button class="btn btn-danger btn-sm remove-item" data-fruit="${item.name}">Remove</button></td>
                        </tr>`;
            $basketTable.append(row);
            totalPrice += item.price * item.quantity;
        })

        $("#totalPrice").text(`Total: $${totalPrice.toFixed(2)}`);

        $(".remove-item").click(function (){
            const fruitToRemove = $(this).data("fruit");
            basket = basket.filter(item => item.name !== fruitToRemove);
            updateBasket();
        });

        $(".quantity-input").change(function (){
            const fruitName = $(this).data("fruit");
            const quantity = parseInt($(this).val());
            const item = basket.find(item => item.name === fruitName);
            if (item) {
                item.quantity = quantity;
                updateBasket();
            }
        });
    }
    
    $("#addToBasket").click(function () {
        const selectedFruit = $("#fruit-list").val();
        const fruitName = $("#fruit-list option:selected").text().split('(')[0].trim();
        const price = fruitPrices[selectedFruit];

        const existingItem = basket.find(item => item.name === fruitName);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            basket.push({ name: fruitName, price: price, quantity: 1 });
        }
        updateBasket();
    });

    $("#checkout").click(function () {
        let receiptContent = "<h2> Receipt</h2><ul>";
        let totalPrice = 0;
        basket.forEach(item => {
            receiptContent += `<li>${item.name} x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}</li>`;
            totalPrice += item.price * item.quantity;
        });
        receiptContent += `</ul><h3>Total: $${totalPrice.toFixed(2)}</h3>`;

        $("#receiptBody").html(receiptContent);
        $("#receiptModal").modal("show");
    });

    updateBasket();

});