let store = {
    state: {
        cart: [],
        cartCount: 0,
        totalPrice: 0,
        showCheckout: false,
        deliveries: [],
        cartDelivery: null,
        euro: 1.06,
        cartMessage: null
    },
    methods: {
        findKey(state, id) {

        }
    },
    mutations: {
        addToCart(state, item) {
            let key = state.cart.findIndex(x => x.id === item.id);

            if (key !== -1) {
                this.commit("increase", item)
            } else {
                axios.put('/api/cart/add', {id:item.id})
                    .then(response => {
                        state.cart.push(item);
                        state.cartCount++;
                        state.totalPrice += parseInt(item.price)
                    });
            }
        },
        remove(state, item) {
            let key = state.cart.findIndex(x => x.id === item.id);
            axios.delete('/api/cart/remove?id='+item.id)
                .then(response => {
                    state.cartCount -= 1;
                    state.totalPrice -= item.price * item.count
                    state.cart.splice(key, 1);
                });
        },
        setProducts(state, items) {
            state.cart = items
            state.cartCount = items.length
            items.forEach(function (item) {
                state.totalPrice += (item.price * item.count)
            })
        },
        increase(state, item) {
            let key = state.cart.findIndex(x => x.id === item.id);
            axios.post('/api/cart/increase', {id:item.id})
                .then(response => {
                    if (response.status === 200){
                        state.totalPrice += item.price
                        state.cart[key].count += 1
                    }
                });
        },
        discrease(state, item) {
            let key = state.cart.findIndex(x => x.id === item.id);
            axios.post('/api/cart/reduce', {id:item.id})
                .then(response => {
                    if (response.status === 200) {
                        state.totalPrice -= item.price
                        state.cart[key].count -= 1
                    }
                });
        },
        checkout(state) {
            state.showCheckout = !state.showCheckout;
        },
        setDeliveries(state, items) {
            state.deliveries = items;
        },
        setDelivery(state, items) {
            state.cartDelivery = items;
        },
        changeDelivery(state, item) {
            axios.post('/api/cart/delivery', {id:item.id})
                .then(response => {
                    if (response.status === 200) {
                        state.cartDelivery = item;
                    }
                });
        },
        setEuroRate(state, val) {
            state.euro = val
        },
        sendOrder(state) {
            axios.post('/api/cart/checkout')
                .then(response => {
                    state.showCheckout = false;
                    state.cart = [];
                    state.cartCount = 0;
                    state.totalPrice = 0;
                    state.sendedOrder = true;
                    this.commit('cartMessage', 'Your order was sent')
                });
        },
        cartMessage(state, text) {
            state.cartMessage = text;
            setTimeout(function () {
                state.cartMessage = null;
            }, 5000);
        }
    }
};

export default store;
