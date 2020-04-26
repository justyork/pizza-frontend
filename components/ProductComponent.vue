<template>
    <article :class="'product '+(!product.text ? 'product--small' : '')">
        <div class="product__content">
            <h3 class="product__title" v-if="!product.text">{{product.title}}</h3>
            <div class="product__image">
                <img :src="product.image" alt="">
            </div>
            <div class="product__data" v-if="product.text">
                <h3 class="product__title">{{product.title}}</h3>
                <p class="product__text">{{product.text}}</p>
            </div>
            <div v-if="product.items" class="product__params">
                <div class="btn__group">
                    <button v-for="subproduct in product.items"
                            :class="'btn btn-gray '+(currentItem && (subproduct.id === currentItem.id) ? 'active' : '')"
                            @click="setCurrent(subproduct)" >
                        {{subproduct.size}} {{subproduct.size_unit}}
                    </button>
                </div>
            </div>
            <div class="product__bottom">
                <div class="product__price">{{currentItem ? currentItem.price_usd : product.price_usd}}</div>
                <button class="product__button btn" @click="addToCart">In cart</button>
            </div>
        </div>
    </article>
</template>

<script>
    export default {
        name: "ProductComponent",
        props: {
            product: Object
        },
        data: function() {
            return {
                currentItem: null
            };
        },
        methods: {
            addToCart() {
                this.$store.commit('addToCart', this.currentItem);
                this.$store.commit('cartMessage', 'Product added');
            },
            setCurrent(product) {
                this.currentItem = product
            }
        },
        mounted() {
            this.currentItem = this.product.items.length ? this.product.items[0] : this.product;
        }
    }
</script>

<style scoped>
    .product {
        display: flex;
        -webkit-box-pack: justify;
        justify-content: space-between;
        margin-bottom: 60px;
        width: 292px;
        margin-right: 37.3333px;
        flex-flow: column;
    }

    .product__image img {
        width: 100%;
        position: relative;
        top: 0px;
        image-rendering: auto;
        margin: 0px;
        border-radius: 12px;
        transition: top 150ms ease-out 0s;
    }
    .product:hover .product__image img {
        top: 3px;
    }

    .product__title {
        color: rgb(0, 0, 0);
        font-size: 20px;
        line-height: 24px;
        font-weight: 500;
        margin: 8px 0px;
    }
    @media only screen and (min-width: 1280px) {
        .product:nth-child(4n+4) {
            margin-right: 0px;
        }
    }
    .product__bottom {
        font-weight: bold;
    }
    .product__button {
        float: right;
    }
    .product__price {
        line-height: 45px;
        float: left;
        font-weight: bold;
        font-size: 22px;
    }
    .product__text {
        height: 40px;
        line-height: 22px;
    }
    .product--small {
        width: 16%;
        text-align: center;
    }
    .product--small .product__price, .product--small .product__button{
        float: none;
    }

    .product__params{
        margin-bottom: 15px;
    }
</style>
