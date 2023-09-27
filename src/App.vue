<template>
    <Loader :delay="3000"></Loader>
    <div>
        <Header></Header>
        <router-view></router-view>
        <Footer></Footer>
    </div>
    <Popups></Popups>
</template>

<script>
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";
import Popups from "@/components/Popups.vue";
import Loader from "@/components/Loader.vue";

export default {
    name: "MskBuro",
    components: { Header, Footer, Popups, Loader },
    data() {
        return {};
    },
    methods: {},
    created() {},
};
</script>

<style>
@import "@/assets/css/main.css";
@import "@/assets/css/media.css";
</style>
