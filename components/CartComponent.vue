<template>
    <div class="cart" >
        <a href="#"
           class="btn btn-small btn-fill"
           @mouseenter="showCart = true">Cart {{cartCount}}</a>
        <div :class="'alert alert-success cart__notify '+($store.state.cartMessage ? 'active' : '')">
            {{$store.state.cartMessage}}
        </div>
        <div class="cart__popup"
             v-if="$store.state.cartCount && cartItems"
             v-show="showCart"
             @mouseleave="showCart = false">
            <div class="cart__wrapper">
                <div v-for="item in cartItems">
                    <h5>{{item.title}}</h5>
                    <div class="cart__price">{{item.price_usd}}</div>
                    <a class="cart__remove" href="#" @click="remove(item)">✕</a>
                    <div class="cart__count">
                        <button @click="discrease(item)" :disabled="item.count <= 1">-</button>
                        {{item.count ?  item.count : 1}}
                        <button @click="increase(item)">+</button>
                    </div>

                    <hr>
                </div>
                <span class="cart__price cart__price-total">{{totalPrice}}</span>
                <button class="btn btn-small cart__checkout" @click="$store.commit('checkout')">Make order</button>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CartComponent",
        data: function(){
            return {
                showCart: false
            }
        },
        computed: {
            cartItems() {
                return this.$store.state.cart
            },
            cartCount() {
                return this.$store.state.cartCount ? ' | ' + this.$store.state.cartCount : ''
            },
            totalPrice() {
                return this.usd(this.$store.state.totalPrice / 100);
            }
        },
        methods: {
            usd(price){
                return new Intl.NumberFormat('en', {style:'currency', 'currency': 'USD'}).format(price);
            },
            discrease(item){
                this.$store.commit('discrease', item)
            },
            increase(item){
                this.$store.commit('increase', item)
            },
            addToCart(item) {
                this.$store.commit('addToCart', item)
            },
            remove(item) {
                this.$store.commit('remove', item)
            }
        }
    }
</script>

<style scoped>
    .cart {
        float: right;
        margin-top: 7px;
        position: relative;
    }
    .cart__popup {
        position: absolute;
        top: 0px;
        right: 0;
        padding: 40px 15px 15px 15px;
        margin-right: -15px
    }
    .cart__wrapper{
        width: 200px;
        border: 1px solid #ccc;
        border-radius: 6px;
        padding: 15px;
        background: white;
    }
    .cart__price {
        display: inline-block;
        font-weight: bold;
        font-size: 18px;
    }
    .cart__count {
        display: inline-block;
        float: right;
    }

    .cart__count button{
        background: #d6d6d6;
        height: 20px;
        width: 20px;
        border: none;
        color: white;
    }
    .cart__count button:focus{
        outline: none;
    }
    .cart__count button:hover{
        background: #ff6900;
        cursor: pointer;
    }
    .cart__count button:first-child{
        border-radius: 3px 0 0 3px;
    }
    .cart__count button:last-child{
        border-radius: 0 3px 3px 0;
    }
    .cart__count button:disabled, .cart__count button:disabled:hover {
        background: #f0f0f0;
        color: black;
        cursor: default;
    }
    .cart__checkout{
        float: right;
    }
    .cart__remove {
        float: right;
        margin-left: 10px;
    }
    .cart__notify {
        position: absolute;
        width: 200px;
        right: 0;
        margin-top: 5px;
        transition: opacity 0.1s ease;
        opacity: 0;
    }
    .cart__notify.active {
        opacity: 1;
    }
</style>
