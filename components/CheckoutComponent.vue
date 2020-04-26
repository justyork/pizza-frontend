<template>
    <modal class="checkout" v-if="$store.state.showCheckout" >
        <h3 slot="header">Checkout</h3>
        <div slot="body">

            <div class="delivery">
                <label v-for="delivery in $store.state.deliveries" class="delivery__item">
                    <input type="radio" @change="$store.commit('changeDelivery', delivery)" name="delivery" :checked="delivery.id === $store.state.cartDelivery.id">
                    <b>{{delivery.title}}</b>
                    <div class="delivery__info">
                        <span>{{ delivery.price === 0 ? 'Free' : delivery.price_usd}}</span>
                        <span v-if="delivery.price > 0">Free from: {{usd(delivery.free_from)}}</span>
                    </div>
                </label>
            </div>

            <div v-if="$store.state.cartCount">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Count</th>
                            <th>Price</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in $store.state.cart">
                            <td>{{item.title}}</td>
                            <td>{{item.count}}</td>
                            <td>{{item.price_usd}}</td>
                            <td>{{usd(item.price * item.count)}}</td>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td>Delivery</td>
                            <th>{{usd(deliveryPrice)}}</th>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td>USD</td>
                            <th>{{usd(total)}}</th>
                        </tr>
                        <tr>
                            <td colspan="2"></td>
                            <td>EUR</td>
                            <th>{{eur(total)}}</th>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
        <div slot="footer">
            <div v-if="!startSending">
                <button class="btn btn-gray" @click="$store.commit('checkout')">Close</button>
                <button class="btn active" @click="send">Send</button>
            </div>
            <div v-else>
                <img src="/storage/images/source.gif" alt="" style="width: 40px">
            </div>
        </div>
    </modal>
</template>

<script>
    export default {
        name: "CheckoutComponent",
        data: function(){
            return {
                startSending: false
            }
        },
        computed: {
            deliveryPrice() {
                let delivery = this.$store.state.cartDelivery;
                if (this.$store.state.totalPrice >= delivery.free_from)
                    return 0;

                return delivery.price;
            },
            total() {
                return parseInt(this.$store.state.totalPrice) + parseInt(this.deliveryPrice);
            },
        },
        methods: {
            usd(price){
                price /= 100
                return new Intl.NumberFormat('en', {style:'currency', 'currency': 'USD'}).format(price);
            },
            eur(price){
                price /= 1.08;
                price /= 100
                return new Intl.NumberFormat('en', {style:'currency', 'currency': 'EUR'}).format(price);
            },
            send() {
                let that = this;
                this.startSending = true;

                // just to show process :)
                setTimeout(function () {
                    that.$store.commit('sendOrder');
                    that.startSending = false;
                }, 2000);
            }
        }
    }
</script>

<style scoped>
    .checkout {
    }
    .delivery__item {
        display: inline-block;
        margin-right: 15px;
    }
    .delivery__info {
        font-size: 13px;
    }
</style>
