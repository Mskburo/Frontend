<template>
    <main class="main">
        <section class="hero" id="hero">
            <div class="container">
                <div class="hero__inner">
                    <p class="top-text">От Москвы до самых до окраин</p>
                    <h1>Экскурсии по Москве и туры по Золотому кольцу</h1>
                    <p class="subtitle">
                        Откройте для себя Москву на автобусе и Москва-реке:<br />
                        лучшие экскурсии для незабываемых впечатлений!
                    </p>
                    <a href="#excursions" class="hero__btn animated-btn">
                        К экскурсиям!
                    </a>
                </div>
            </div>
        </section>
        <div class="container main__inner">
            <section class="about" id="about">
                <div>
                    <h2>Почему именно <span class="accent-mark">мы?</span></h2>
                    <div class="list">
                        <div class="row">
                            <div class="num">01</div>
                            <p class="text">
                                Команда экскурсоводов Московского экскурсионного
                                бюро - это группа профессионалов, которые готовы
                                провести гостей по самым интересным местам и
                                достопримечательностям города.
                            </p>
                        </div>
                        <div class="row">
                            <div class="num">02</div>
                            <p class="text">
                                Наша команда состоит из опытных и увлеченных
                                людей, которые любят свой город и готовы
                                поделиться своими знаниями и опытом с гостями.
                                Мы предлагаем групповые экскурсии, а также
                                индивидуальные туры для компаний и семей.
                            </p>
                        </div>
                        <div class="row">
                            <div class="num">03</div>
                            <p class="text">
                                Мы работаем с различными видами транспорта,
                                включая речной транспорт и автобусы, чтобы
                                обеспечить нашим гостям максимальный комфорт и
                                удобство. Наша цель - сделать экскурсии по
                                Москве незабываемыми и интересными для всех
                                наших гостей.
                            </p>
                        </div>
                        <div class="row">
                            <div class="num">04</div>
                            <div class="about-flags">
                                <p class="text">
                                    Мы проводим экскурсии на следующих языках:
                                </p>
                                <div class="flags">
                                    <img
                                        src="@/assets/img/russia.svg"
                                        loading="lazy"
                                        alt="Россия" />
                                    <img
                                        src="@/assets/img/china.svg"
                                        loading="lazy"
                                        alt="Китай" />
                                    <img
                                        src="@/assets/img/england.svg"
                                        loading="lazy"
                                        alt="Великобритания" />
                                    <img
                                        src="@/assets/img/spain.svg"
                                        loading="lazy"
                                        alt="Испания" />
                                    <img
                                        src="@/assets/img/italy.svg"
                                        loading="lazy"
                                        alt="Италия" />
                                    <img
                                        src="@/assets/img/france.svg"
                                        loading="lazy"
                                        alt="Франция" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <img src="@/assets/img/about.jpeg" alt="" class="about__img" />
            </section>
            <section class="excursions" id="excursions">
                <h2>Экскурсии</h2>
                <!-- <div class="switch-wrapper">
                    <div class="switch" v-if="excursionsTypes.length > 1">
                        <button
                            @click="changeSwitch('Все')"
                            :class="{ active: switchValue === 'Все' }">
                            Все
                        </button>
                        <button
                            v-for="excursionType in excursionsTypes"
                            @click="changeSwitch(excursionType)"
                            :class="{ active: switchValue === excursionType }">
                            {{ excursionType }}
                        </button>
                    </div>
                </div> -->
                <div class="grid">
                    <p class="red-warning big" v-if="excursions.length === 0">
                        Ошибка загрузки списка экскурсий, попробуйте
                        перезагрузить сайт
                    </p>
                    <Excursion
                        v-for="excursionObject in excursions"
                        :excursionObject="excursionObject"
                        :key="excursionObject.excursion.id"></Excursion>
                </div>
            </section>
            <section class="gallery" id="gallery">
                <h2>Галерея</h2>
                <div class="grid">
                    <img
                        src="@/assets/img/gallery1.webp"
                        alt="Галлерея1"
                        loading="lazy" />
                    <img
                        src="@/assets/img/gallery2.webp"
                        alt="Галлерея2"
                        loading="lazy" />
                    <img
                        src="@/assets/img/gallery3.webp"
                        alt="Галлерея3"
                        loading="lazy" />
                    <img
                        src="@/assets/img/gallery4.webp"
                        alt="Галлерея4"
                        loading="lazy" />
                    <img
                        src="@/assets/img/gallery5.webp"
                        alt="Галлерея5"
                        loading="lazy" />
                    <img
                        src="@/assets/img/gallery6.webp"
                        alt="Галлерея6"
                        loading="lazy" />
                </div>
            </section>
            <section class="faq" id="faq">
                <h2>Вопрос-<span class="accent-mark">ответ</span></h2>
                <div class="faq-list">
                    <details>
                        <summary>Как купить билеты?</summary>
                        <p>
                            Вы можете оформить билеты онлайн, для этого выберите
                            желаемую экскурсию, нажмите кнопку "Заказать" и
                            следуйте дальнейшим инструкциям. Также вы можете
                            оформить заказ, написав нам в WhatsApp
                        </p>
                    </details>
                    <details>
                        <summary>
                            Нет экскурсии, которую я хочу. Что делать?
                        </summary>
                        <p>
                            Мы постоянно работаем над улучшением и расширением
                            списка экскурсий, однако бывает такое, что желаемой
                            экскурсии нет. В таком случае вы можете уточнить
                            дополнительную информацию по телефону/в месседжере
                            или заказать индивидуальную экскурсию
                        </p>
                    </details>
                    <details>
                        <summary>Я купил билеты, что дальше?</summary>
                        <p>
                            Вся дополнительная информация придет вам на почту,
                            которую вы указывали при заказе. При возникновении
                            дополнительных вопросов пишите или звоните нам!
                        </p>
                    </details>
                    <details>
                        <summary>
                            Что делать, если я опоздал на экскурсию?
                        </summary>
                        <p>
                            Если вы опоздали на экскурсию, то свяжитесь с вашим
                            гидом или организатором экскурсии и сообщите о своей
                            задержке. Возможно, вам предложат присоединиться к
                            группе позже
                        </p>
                    </details>
                </div>
            </section>
            <section class="special" id="special">
                <h2>Спец. экскурсии</h2>
                <p>
                    Компания предлагает услуги проведения индивидуальных
                    экскурсий, состав и тематика которых определяются на основе
                    технического задания заказчика. Для обсуждения деталей и
                    оформления заказа вы можете связаться с нами по электронной
                    почте или другим удобным для вас способом.
                </p>
                <div class="centered">
                    <button
                        class="accent-btn active animated-btn"
                        @click="
                            this.$store.commit('OPEN_POPUP', {
                                name: 'Special',
                            })
                        ">
                        Хочу индивидуальную экскурсию!
                    </button>
                </div>
            </section>
        </div>
    </main>
</template>
<script>
import axios from "axios";
import Excursion from "@/components/Excursion.vue";

export default {
    name: "Index",
    components: { Excursion },
    data() {
        return {
            // switchValue: "Все",
            // excursionsToShow: [],
            excursions: [],
            excursionsTypes: [],
        };
    },
    methods: {
        // changeSwitch(value) {
        //     this.switchValue = value;
        //     if (value === "Все") {
        //         this.excursionsToShow = this.excursions;
        //     } else {
        //         this.excursionsToShow = this.excursions.filter(
        //             (excursionObject) => excursionObject.excursion.type_name === value
        //         );
        //     }
        // },
        // getExcursionsTypes() {
        //     let result = [];
        //     this.excursions.forEach((excursionObject) => {
        //         result.push(excursionObject.excursion.type_name);
        //     });
        //     this.excursionsTypes = [...new Set(result)];
        // },
        getExcursions() {
            axios
                .get(`${this.$store.state.API_URL}/excursions`)
                .then((response) => {
                    // this.excursionsToShow = response.data;
                    // this.getExcursionsTypes();
                    this.excursions = response.data.sort(
                        (a, b) => b.excursion.is_active - a.excursion.is_active
                    );
                    setTimeout(() => {
                        this.$store.commit("SET_PAGE_LOADED");
                    }, 700);
                })
                .catch((err) => {
                    console.log(err);
                    this.excursions = [];
                });
        },
    },
    created() {
        this.getExcursions();
    },
};
</script>
