<template>
    <div>
        <header-component :products="products"></header-component>
        <div class="container">
            <category-component
                :products="products"></category-component>

            <checkout-component></checkout-component>
        </div>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                products: [],
            };
        },
        methods: {
            loadData() {
                let that = this
                axios.get('/api/app')
                    .then(response => {
                        if (response.status === 200) {

                            let delivery = response.data.cart.delivery ? response.data.cart.delivery :response.data.delivery[0];
                            that.products = response.data.products;
                            that.$store.commit('setProducts', response.data.cart.items)
                            that.$store.commit('setDeliveries', response.data.delivery);
                            that.$store.commit('setEuroRate', response.data.euro)
                            that.$store.commit('setDelivery', delivery)
                        }
                    });
            },
        },
        mounted() {
            this.loadData();

        },

    }
</script>

<style scoped>

</style>
