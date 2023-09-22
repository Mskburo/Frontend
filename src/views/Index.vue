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
                    </div>
                </div>
                <img src="@/assets/img/about.png" alt="" class="about__img" />
            </section>
            <section class="excursions" id="excursions">
                <div class="h-row">
                    <h2>Экскурсии</h2>
                    <div class="switch">
                        <button
                            v-for="excursionType in this.$store.state
                                .excursions_types"
                            @click="changeSwitch(excursionType)"
                            :class="{ active: switchValue === excursionType }">
                            {{ excursionType }}
                        </button>
                    </div>
                </div>
                <div class="grid">
                    <div
                        class="excursion-wrapper"
                        v-for="excursion in excursionsToShow">
                        <div class="excursion" v-if="excursion.is_active">
                            <img
                                :src="'/img/' + excursion.photo"
                                :alt="excursion.name"
                                class="excursion__img" />
                            <div class="header-row">
                                <div class="title-wrapper">
                                    <p class="title">{{ excursion.name }}</p>
                                    <p class="type">{{ excursion.type }}</p>
                                </div>
                                <div class="info">
                                    <p class="row">
                                        <img
                                            src="@/assets/img/map.svg"
                                            alt="Маршрут" />
                                        {{ excursion.short_route }}
                                    </p>
                                    <p class="row">
                                        <img
                                            src="@/assets/img/clock.svg"
                                            alt="Время" />
                                        {{ excursion.time }}
                                    </p>
                                </div>
                            </div>
                            <p class="description">
                                {{ excursion.short_description }}
                            </p>
                            <div class="buttons">
                                <button
                                    class="blue-btn"
                                    @click="
                                        this.$store.commit('OPEN_POPUP', {
                                            name: 'ExcursionMore',
                                            info: excursion,
                                        })
                                    ">
                                    Подробнее
                                </button>
                                <button
                                    class="blue-btn active animated-btn"
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
                </div>
            </section>
            <section class="gallery" id="gallery">
                <h2>Галерея</h2>
                <div class="grid">
                    <img src="@/assets/img/gallery1.png" alt="Галлерея1" />
                    <img src="@/assets/img/gallery2.png" alt="Галлерея2" />
                    <img src="@/assets/img/gallery3.png" alt="Галлерея3" />
                    <img src="@/assets/img/gallery4.png" alt="Галлерея4" />
                    <img src="@/assets/img/gallery5.png" alt="Галлерея5" />
                    <img src="@/assets/img/gallery6.png" alt="Галлерея6" />
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
                        class="blue-btn active animated-btn"
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

export default {
    name: "Index",
    data() {
        return {
            switchValue: "Все",
            excursions: [],
            excursionsToShow: [],
        };
    },
    methods: {
        changeSwitch(value) {
            this.switchValue = value;
            if (value === "Все") {
                this.excursionsToShow = this.excursions;
            } else {
                this.excursionsToShow = this.excursions.filter(
                    (a) => a.type === value
                );
            }
        },
    },
    created() {
        axios
            .get(`${this.$store.state.API_URL}/excursions`)
            .then((response) => {
                this.excursions = response.data;
                this.excursionsToShow = response.data;
            });
    },
};
</script>
