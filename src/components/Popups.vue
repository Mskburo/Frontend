<template>
    <transition name="fade">
        <div v-if="currentPopupView" class="popup-bg" @mousedown.self="closePopup">
            <component
                :is="currentPopupView"
                @close="closePopup"></component>
        </div>
    </transition>
</template>
<script>
import Special from "@/components/Popups/Special.vue";
import ExcursionMore from "@/components/Popups/ExcursionMore.vue";
import Order from "@/components/Popups/Order.vue";
import MobileMenu from "@/components/Popups/MobileMenu.vue";


export default {
    name: "Popups",
    components: {
        Special,
        ExcursionMore,
        Order,
        MobileMenu
    },
    data() {
        return {
            currentPopupView: null,
        };
    },
    watch: {
        "$store.state.popupName": function () {
            this.currentPopupView = this.$store.state.popupName;
        },
    },
    methods: {
        closePopup() {
            this.$store.commit("CLOSE_POPUP");
        },
    },
};
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: 0.5s;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
