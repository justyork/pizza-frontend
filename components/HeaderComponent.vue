<template>
    <header >
        <div class="container header">
            <a class="logo" href="#">Pizza home</a>
            <ul class="menu">
               <li v-for="category in products"><a :href="'#'+category.title">{{category.title}}</a></li>
            </ul>
            <cart-component></cart-component>
        </div>
    </header>
</template>

<script>
    export default {
        name: "HeaderComponent",
        props: {
            products: Array
        }
    }
</script>

<style scoped>
    header {
        position: fixed;
        top: 0;
        width: 100%;
        height: 50px;
        background: white;
        border-bottom: 1px solid rgb(230, 230, 230);
        z-index: 10;

    }
    .header>* {
        display: inline-block;
    }
    .menu {
        display: inline-block;
        padding: 0;
        margin: 0;
        list-style: none;
    }
    .menu li {
        display: inline-block;
    }

    .menu li a {
        line-height: 50px;
        margin-right: 30px;
        color: black;
    }
    .menu li a:hover, .menu li a.active {
        color: rgb(255, 105, 0);
        cursor: pointer;
    }

    .logo {
        text-transform: uppercase;
        font-size: 31px;
        line-height: 50px;
        color: black;
        font-weight: bold;
        margin-right: 40px;
        text-decoration: none;
    }
</style>
