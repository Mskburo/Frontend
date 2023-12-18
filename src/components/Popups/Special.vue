<template>
    <div class="popup-wrapper">
        <form class="popup" @submit.prevent="makeRequest">
            <button class="popup__close" @click="$emit('close')" type="button">
                X
            </button>
            <div>
                <p class="popup__title">Индивидуальная экскурсия</p>
                <p class="popup__subtitle">
                    Заполните форму и мы свяжемся с вами в ближайшее время для
                    обсуждения деталей.
                </p>
            </div>
            <fieldset>
                <div class="input-wrapper">
                    <label>Ваше имя:</label>
                    <input
                        type="text"
                        v-model="name"
                        placeholder="Чтобы знать, как к вам обращаться" />
                </div>
                <div class="input-wrapper">
                    <label>Комментарий:</label>
                    <textarea
                        v-model="text"
                        placeholder="Опишите важи пожелания"></textarea>
                </div>
            </fieldset>
            <div class="popup__buttons">
                <button
                    :class="[
                        name === '' || text === ''
                            ? 'disabled'
                            : 'animated-btn',
                    ]">
                    Отправить заявку
                </button>
            </div>
            <p class="popup__warning">
                Нажимая на кнопку, вы даете согласие на обработку персональных
                данных и соглашаетесь с
                <a
                    href="files/PrivacyPolicy.pdf"
                    type="application/pdf"
                    target="_blank"
                    class="blue"
                    >политикой конфиденциальности</a
                >
            </p>
        </form>
    </div>
</template>
<script>
export default {
    name: "SpecialPopup",
    data() {
        return {
            name: "",
            text: "",
        };
    },
    methods: {
        makeRequest() {
            let url = `https://wa.me/79854346148?text=Здравстуйте, меня зовут ${this.name}. Хочу заказать индивидуальную экскурсию. Комментарий: ${this.text}`;

            window.open(url, "_blank").focus();

            this.$store.commit("CLOSE_POPUP");
        },
    },
};
</script>
