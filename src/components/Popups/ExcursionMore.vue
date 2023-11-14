<template>
    <div class="popup-wrapper">
        <div class="popup">
            <button class="popup__close" @click="$emit('close')">X</button>
            <div>
                <p class="popup__title">{{ excursion_name }}</p>
                <p class="popup__subtitle">
                    {{ excursion_type_name }}
                </p>
            </div>
            <fieldset>
                <p class="popup__p">
                    <span>Доступные дни: </span
                    >{{ excursion_week_days }}
                </p>
                <p class="popup__p">
                    <span>Длительность: </span
                    >{{ excursion_time }}
                </p>
                <p class="popup__p">
                    <span>Маршрут: </span>{{ excursion_route }}
                </p>
                <p class="popup__p">
                    <span>Подробное описание: </span
                    >{{ excursion_description }}
                </p>
            </fieldset>
            <div class="popup__buttons">
                <button
                    v-if="excursion_is_active"
                    class="animated-btn"
                    @click="
                        this.$store.commit('OPEN_POPUP', {
                            name: 'Order',
                            info: this.$store.state.popupInfo,
                        })
                    ">
                    Оформить заказ
                </button>
                <button v-else class="disabled">Экскурсия недоступна</button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ExcursionMorePopup",
    computed: {
        excursion_name() {
            return this.$store.state.popupInfo.excursion.name;
        },
        excursion_type_name() {
            return this.$store.state.popupInfo.excursion.type_name;
        },
        excursion_time() {
            return this.$store.state.popupInfo.excursion.time;
        },
        excursion_route() {
            return this.$store.state.popupInfo.excursion.route;
        },
        excursion_week_days() {
            let days = this.$store.state.popupInfo.excursion.week_days;
            return this.$store.getters.getWeekendDays(days);
        },
        excursion_description() {
            return this.$store.state.popupInfo.excursion.description;
        },
        excursion_is_active() {
            return this.$store.state.popupInfo.excursion.is_active;
        },
    },
};
</script>
