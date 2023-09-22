<template>
    <div
        :class="{ popupOpen: !checkOpenPopup('') }"
        @click="closePopup"
        ref="popup_bg">
        <div class="popup-wrapper">
                <Special
                    v-if="checkOpenPopup('Special')"
                    @close="closePopup"></Special>
                <ExcursionMore
                    v-if="checkOpenPopup('ExcursionMore')"
                    @close="closePopup"></ExcursionMore>
                <Order
                    v-if="checkOpenPopup('Order')"
                    @close="closePopup"></Order>
        </div>
    </div>
</template>
<script>
import Special from "@/components/Popups/Special.vue";
import ExcursionMore from "@/components/Popups/ExcursionMore.vue";
import Order from "@/components/Popups/Order.vue";

export default {
    name: "Popups",
    components: {
        Special,
        ExcursionMore,
        Order,
    },
    data() {
        return {};
    },
    methods: {
        checkOpenPopup(name) {
            return this.$store.state.popupName === name;
        },
        closePopup(e) {
            if (e && e.target !== this.$refs.popup_bg) return;
            this.$store.commit("CLOSE_POPUP");
        },
    },
};
</script>
=
