<template>
    <form class="popup" @submit.prevent="makeRequest">
        <button class="popup__close" @click="$emit('close')" type="button">
            X
        </button>
        <div>
            <p class="popup__title">Оформление: {{ excursionInfo.excursion.name }}</p>
            <p class="popup__subtitle">Этап: {{ step }}/3</p>
        </div>
        <fieldset v-if="step === 1">
            <div class="input-wrapper">
                <label>Выберите дату:</label>
                <input
                    type="date"
                    v-model="selectedDate"
                    :min="getDateLimitation().min"
                    :max="getDateLimitation().max"
                    required />
            </div>
            <div class="input-wrapper" v-if="selectedDate">
                <label>Выберите время:</label>
                <div class="order-select-row track">
                    <button
                        v-for="time in excursionInfo.excursion.times"
                        type="button"
                        @click="selectedTime = time"
                        :class="{ active: selectedTime === time }">
                        <p>{{ time }}</p>
                    </button>
                </div>
            </div>

            <div class="input-wrapper" v-if="selectedTime">
                <label>Выберите билеты:</label>
                <div class="order-tickets indent">
                    <div class="ticket" v-for="ticket in excursionInfo.tickets">
                        <p class="ticket__info">
                            {{ ticket.customers_type_name }}:<span class="dots"></span
                            ><span>{{ ticket.cost }}₽</span>
                        </p>
                        <div class="ticket__control">
                            <button
                                @click="setTicket(ticket.id, -1)"
                                type="button">
                                -
                            </button>
                            <span>{{ getTicketCount(ticket.id) }}</span>
                            <button
                                @click="setTicket(ticket.id, 1)"
                                type="button">
                                +
                            </button>
                        </div>
                    </div>
                </div>
                <p class="tickets-available" v-if="selectedTime">
                    {{
                        availableNow === 0
                            ? `Билетов не осталось`
                            : `Осталось ${availableNow} билета(ов)`
                    }}
                </p>
            </div>
            <p class="popup__p" v-if="selectedTime">
                <span>Итого: </span>{{ total }}₽
            </p>
        </fieldset>

        <fieldset v-if="step === 2">
            <div class="input-wrapper">
                <label>Ваше имя:</label>
                <input
                    type="text"
                    @keyup="checkInputsValid"
                    v-model="name"
                    required
                    placeholder="Чтобы знать, как к вам обращаться" />
            </div>
            <div class="input-wrapper">
                <label>Ваш телефон:</label>
                <input
                    type="tel"
                    @keyup="checkInputsValid"
                    v-model="tel"
                    required
                    placeholder="+7 (777) 777-77-77" />
            </div>
            <div class="input-wrapper">
                <label>Ваша почта:</label>
                <input
                    type="email"
                    @keyup="checkInputsValid"
                    v-model="email"
                    required
                    placeholder="Указывайте настоящую почту, на неё придёт чек" />
            </div>
        </fieldset>

        <fieldset v-if="step === 3">
            <p class="popup__p"><span>Имя: </span>{{ name }}</p>
            <p class="popup__p"><span>Телефон: </span>{{ tel }}</p>
            <p class="popup__p"><span>Почта: </span> {{ email }}</p>
            <div class="input-wrapper">
                <label>Ваш заказ:</label>
                <div class="indent">
                    <p class="popup__p mb10">
                        Дата и время: {{ selectedDate.split("-").reverse().join(".") }} в {{ selectedTime }}
                    </p>
                    <p class="popup__p">Билеты: {{ getOrderString() }}</p>
                </div>
            </div>
            <p class="popup__p"><span>Итого: </span>{{ total }}₽</p>
        </fieldset>
        <div class="popup__buttons">
            <button
                class="empty"
                @click="step--"
                v-if="step !== 1"
                type="button">
                Назад
            </button>
            <button
                type="button"
                @click="step++"
                v-if="step === 1"
                :class="{
                    disabled: total === 0,
                }">
                Далее
            </button>
            <button
                type="button"
                @click="step++"
                v-if="step === 2"
                :class="{
                    disabled: !isInputsValid,
                }">
                Далее
            </button>
            <button
                v-if="step === 3"
                class="animated-btn">
                Оплатить
            </button>
        </div>
        <p class="popup__warning" v-if="step === 3">
            Нажимая на кнопку, вы даете согласие на обработку персональных
            данных и соглашаетесь с
            <a
                href="files/CV.pdf"
                type="application/pdf"
                target="_blank"
                class="blue"
                >политикой конфиденциальности</a
            >
        </p>
    </form>
</template>
<script>
import axios from "axios";

export default {
    name: "OrderPopup",
    data() {
        return {
            excursionInfo: {},
            step: 1,
            selectedDate: null,
            selectedTime: null,
            name: null,
            tel: null,
            email: null,
            total: 0,
            selected_tickets: {},
            availableNow: null,
            availableLeft: null,
            ticketsBought: null,
            isInputsValid: false,
        };
    },
    watch: {
        selectedTime(newValue, oldValue) {
            if (newValue !== null) this.getTicketsCount();
            // console.log(new Date().getDate())
            // console.log(new Date().get)
        },
    },
    methods: {
        getTicketsCount() {
            axios
                .get(
                    `${this.$store.state.API_URL}/excursions/?excursion_id=${this.excursionInfo.excursion.id}&time=${this.selectedTime}&date=${this.selectedDate}`
                )
                .then((response) => {
                    this.tickets_bought = response.data;
                    this.availableNow = this.excursionInfo.excursion.available - response.data;
                    this.availableLeft = this.excursionInfo.excursion.available - response.data;
                });
        },
        getDateLimitation() {
            let min = new Date()
                .toLocaleDateString()
                .split(".")
                .reverse()
                .join("-");
            let max = "";

            return { min, max };
        },
        checkInputsValid() {
            let isNameValid = false;
            let isTelValid = false;
            let isEmailValid = false;

            let validName = this.name?.length >= 2;
            let validTel = this.tel?.split("").length >= 8;
            let validEmail = /^.+@.+\..+/.test(this.email);

            if (validName) isNameValid = true;
            if (validTel) isTelValid = true;
            if (validEmail) isEmailValid = true;

            if (isNameValid && isTelValid && isEmailValid) {
                this.isInputsValid = true;
            } else {
                this.isInputsValid = false;
            }
        },
        setTicket(id, count) {
            if (this.availableNow === 0 && count > 0) return;
            let newCount = this.getTicketCount(id) + count;
            if (newCount <= 0) {
                delete this.selected_tickets[id];
                this.calcTotal();
                return;
            }
            this.selected_tickets[id] = newCount;
            this.calcTotal();
        },
        calcTotal() {
            let newTotal = 0;
            let newCount = 0;
            Object.entries(this.selected_tickets).forEach((ticketInfo) => {
                let ticketId = parseInt(ticketInfo[0]);
                let ticketCount = parseInt(ticketInfo[1]);
                newCount += ticketCount;
                newTotal += ticketCount * this.getTicketById(ticketId).cost;
            });
            this.total = newTotal;
            this.availableNow = this.availableLeft - newCount;
        },
        getTicketCount(id) {
            return this.selected_tickets[id] ?? 0;
        },
        getTicketById(id) {
            let result = {};
            Object.values(this.excursionInfo.tickets).forEach((ticket) => {
                if (ticket.id === id) {
                    result = ticket;
                }
            });
            return result;
        },
        getOrderString() {
            let result = [];
            Object.entries(this.selected_tickets).forEach((ticketInfo) => {
                let ticketId = parseInt(ticketInfo[0]);
                let ticketCount = parseInt(ticketInfo[1]);
                result.push(
                    `${this.getTicketById(ticketId).customers_type_name} ${ticketCount} шт.`
                );
            });
            return result.join(", ");
        },
        makeRequest() {
            console.log("a");
        },
    },
    created() {
        this.excursionInfo = this.$store.state.popupInfo;
        this.availableNow = this.excursionInfo.excursion.availableNow;
    },
};
</script>
