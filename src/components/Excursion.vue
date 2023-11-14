<template>
    <div class="excursion-wrapper">
        <article class="excursion">
            <img
                :src="'/img/' + excursion_photo"
                :alt="excursion_name"
                class="excursion__img" />
            <div class="title-wrapper">
                <p class="title">{{ excursion_name }}</p>
                <p class="type">
                    {{ excursion_type_name }}
                </p>
            </div>
            <div class="info">
                <p class="row">
                    <img src="@/assets/img/map.svg" alt="Маршрут" />
                    {{ excursion_short_route }}
                </p>
                <p class="row">
                    <img src="@/assets/img/clock.svg" alt="Время" />
                    {{ excursion_time }}
                </p>
                <p class="row">
                    <img src="@/assets/img/calendar.svg" alt="Время" />
                    {{ excursion_week_days }}
                </p>
            </div>
            <p class="description">
                {{ excursion_short_description }}
            </p>
            <div class="buttons">
                <button
                    class="accent-btn"
                    @click="
                        this.$store.commit('OPEN_POPUP', {
                            name: 'ExcursionMore',
                            info: excursionObject,
                        })
                    ">
                    Подробнее
                </button>
                <button
                    v-if="excursion_is_active"
                    class="accent-btn active animated-btn"
                    @click="
                        this.$store.commit('OPEN_POPUP', {
                            name: 'Order',
                            info: excursionObject,
                        })
                    ">
                    Записаться
                </button>
            </div>
        </article>
    </div>
</template>
<script>
export default {
    name: "ExcursionCard",
    props: {
        excursionObject: Object,
    },
    computed: {
        excursion_photo() {
            return this.excursionObject.excursion.photo;
        },
        excursion_name() {
            return this.excursionObject.excursion.name;
        },
        excursion_type_name() {
            return this.excursionObject.excursion.type_name;
        },
        excursion_short_route() {
            return this.excursionObject.excursion.short_route;
        },
        excursion_time() {
            return this.excursionObject.excursion.time;
        },
        excursion_week_days() {
            let days = this.excursionObject.excursion.week_days;
            return this.$store.getters.getWeekendDays(days)
        },
        excursion_short_description() {
            return this.excursionObject.excursion.short_description;
        },
        excursion_is_active() {
            return this.excursionObject.excursion.is_active;
        },
    },
};
</script>
<style lang=""></style>
