<template>
    <div class="category" v-if="products">
        <div class="category__item" v-for="category in products" >
            <a class="anchor" :name="category.title"></a>
            <h2 >{{category.title}}</h2>
            <section v-if="category.items" class="category__products">
                <product-component
                    v-for="product in category.items"
                    :product="product"
                ></product-component>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        name: "CategoryComponent",
        props: {
            products: Array,
        },
        methods: {

        },
        mounted() {
        }
    }
</script>

<style scoped>
    .category__products {
        display: flex;
        flex-wrap: wrap;
    }
    .anchor {
        position: absolute;
        margin-top: -60px;
    }
</style>
