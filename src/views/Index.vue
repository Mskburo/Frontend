<template>
    <main class="main">
        <section class="hero" id="hero">
            <div class="container">
                <div class="hero__inner">
                    <p class="top-text">От Москвы до самых окраин</p>
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
                    <h2>Почему именно <span class="blue">мы?</span></h2>
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
                                включая катера и автобусы, чтобы обеспечить
                                нашим гостям максимальный комфорт и удобство.
                                Наша цель - сделать экскурсии по Москве
                                незабываемыми и интересными для всех наших
                                гостей.
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
                <img src="@/assets/img/about.webp" alt="" class="about__img" />
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
            <section class="special" id="special">
                <h2>Спец. экскурсии</h2>
                <p>
                    Наша компания предлагает услуги индивидуальных экскурсий для
                    тех, кто хочет получить уникальный опыт и узнать больше о
                    нашем городе. Мы готовы разработать маршрут, который будет
                    соответствовать вашим интересам и потребностям.
                </p>
                <p>
                    Если вы хотите посетить музеи, парки, исторические места или
                    просто прогуляться по улицам, мы можем организовать для вас
                    индивидуальную экскурсию. Мы также предлагаем экскурсии на
                    природу, чтобы вы могли насладиться красотой и свежим
                    воздухом.
                </p>
                <p>
                    Для того, чтобы ваша экскурсия была максимально комфортной и
                    интересной, мы предлагаем вам выбрать удобное время и место
                    начала экскурсии.
                </p>
                <p>
                    Мы гарантируем, что наши гиды - профессионалы своего дела с
                    многолетним опытом. Они помогут вам узнать много нового и
                    интересного о нашей культуре, истории и традициях. Не
                    упустите возможность получить незабываемые впечатления от
                    нашего города! Свяжитесь с нами и мы организуем для вас
                    индивидуальную экскурсию, которая запомнится вам на всю
                    жизнь.
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
                    this.excursions = response.data;
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
