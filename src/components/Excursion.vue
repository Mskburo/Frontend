<template>
    <div class="excursion-wrapper">
        <div class="excursion">
            <img
                :src="'/img/' + excursion.excursion_info.photo"
                :alt="excursion.excursion_info.name"
                class="excursion__img" />
            <div class="header-row">
                <div class="title-wrapper">
                    <p class="title">{{ excursion.excursion_info.name }}</p>
                    <p class="type">
                        {{ excursion.excursion_info.type }}
                    </p>
                </div>
                <div class="info">
                    <p class="row">
                        <img src="@/assets/img/map.svg" alt="Маршрут" />
                        {{ excursion.excursion_info.short_route }}
                    </p>
                    <p class="row">
                        <img src="@/assets/img/clock.svg" alt="Время" />
                        {{ excursion.excursion_info.time }}
                    </p>
                </div>
            </div>
            <p class="description">
                {{ excursion.excursion_info.short_description }}
            </p>
            <div class="buttons">
                <button
                    class="accent-btn"
                    @click="
                        this.$store.commit('OPEN_POPUP', {
                            name: 'ExcursionMore',
                            info: excursion,
                        })
                    ">
                    Подробнее
                </button>
                <button
                    class="accent-btn active animated-btn"
                    @click="
                        this.$store.commit('OPEN_POPUP', {
                            name: 'Order',
                            info: excursion,
                        })
                    ">
                    Записаться
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "ExcursionCard",
    props: {
        excursion: Object,
    },
    created() {
        console.log(this.excursion)
    }
};
</script>
<style lang=""></style>
