<template>
    <div class="excursion-wrapper">
        <article class="excursion">
            <img
                :src="'/img/' + excursionObject.excursion.photo"
                :alt="excursionObject.excursion.name"
                class="excursion__img" />
            <div class="title-wrapper">
                <p class="title">{{ excursionObject.excursion.name }}</p>
                <p class="type">
                    {{ excursionObject.excursion.type_name }}
                </p>
            </div>
            <div class="info">
                <p class="row">
                    <img src="@/assets/img/map.svg" alt="Маршрут" />
                    {{ excursionObject.excursion.short_route }}
                </p>
                <p class="row">
                    <img src="@/assets/img/clock.svg" alt="Время" />
                    {{ excursionObject.excursion.time }}
                </p>
                <p class="row">
                    <img src="@/assets/img/calendar.svg" alt="Время" />
                    {{ excursionObject.excursion?.days ?? "Дни недели" }}
                </p>
            </div>
            <p class="description">
                {{ excursionObject.excursion.short_description }}
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
                    v-if="excursionObject.excursion.is_active"
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
};
</script>
<style lang=""></style>
