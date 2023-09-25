<template>
    <div class="popup">
        <button class="popup__close" @click="$emit('close')">X</button>
        <div>
            <p class="popup__title">{{ excursionInfo.excursion_info.name }}</p>
            <p class="popup__subtitle">{{ excursionInfo.excursion_info.type.name }}</p>
        </div>
        <fieldset>
            <p class="popup__p">
                <span>Длительность: </span>{{ excursionInfo.excursion_info.time }}
            </p>
            <p class="popup__p">
                <span>Маршрут: </span>{{ excursionInfo.excursion_info.route }}
            </p>
            <p class="popup__p excursionMoreDcp">
                <span>Подробное описание: </span>{{ excursionInfo.excursion_info.description }}
            </p>
        </fieldset>
        <div class="popup__buttons">
            <button
                class="animated-btn"
                @click="
                    this.$store.commit('OPEN_POPUP', {
                        name: 'Order',
                        info: excursionInfo,
                    })
                ">
                Оформить заказ
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name: "ExcursionMorePopup",
    data() {
        return {
            excursionInfo: {},
        };
    },
    methods: {
        makeRequest() {},
    },
    created() {
        this.excursionInfo = this.$store.state.popupInfo;
    },
};
</script>
