<template>
    <transition name="fade">
        <div class="loader" v-if="showLoader">
            <img src="@/assets/img/logo.webp" alt="" class="loader-logo" />
            <!-- <p>Московское экскурсионное бюро</p> -->
        </div>
    </transition>
</template>
<script>
export default {
    name: "Loader",
    data() {
        return {
            showLoader: true,
        };
    },
    watch: {
        "$store.state.isPageLoaded": function () {
            this.showLoader = !this.$store.state.isPageLoaded;
        },
    },
    created() {
        setTimeout(() => {
            this.$store.commit("SET_PAGE_LOADED");
        }, 5000);
    },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
}
</style>
