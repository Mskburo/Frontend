<template>
    <div class="popup-wrapper">
        <form class="popup" @submit.prevent="makeRequest">
            <button class="popup__close" @click="$emit('close')" type="button">
                X
            </button>
            <div>
                <p class="popup__title">
                    Оформление: {{ excursionInfo.excursion.name }}
                </p>
                <p class="popup__subtitle">Этап: {{ step }}/3</p>
            </div>
            <fieldset v-if="step === 1">
                <div class="input-wrapper">
                    <label>Выберите дату:</label>
                    <input
                        type="date"
                        v-model="selectedDate"
                        :min="minDate"
                        :max="maxDate"
                        ref="dateInput"
                        @click="this.$refs.dateInput.showPicker()"
                        required />
                </div>
                <div class="input-wrapper" v-if="selectedDate">
                    <label>Выберите время:</label>
                    <p v-if="errorMessage" class="red-warning">
                        {{ errorMessage }}
                    </p>
                    <div class="order-select-row track" v-else>
                        <button
                            v-for="time in availableTimes"
                            type="button"
                            @click="selectedTime = time"
                            :class="{ active: selectedTime === time }">
                            <p>{{ time }}</p>
                        </button>
                    </div>
                </div>
                <div
                    class="tickets-loader-wrapper"
                    v-if="selectedTime && availableNow === null">
                    <div class="tickets-loader"></div>
                </div>
                <div
                    class="input-wrapper"
                    v-if="selectedTime && availableNow !== null">
                    <label
                        >Выберите билеты (максимум
                        {{ ticketsOrderLimit }}):</label
                    >
                    <div class="order-tickets indent">
                        <div
                            class="ticket"
                            v-for="ticket in excursionInfo.tickets">
                            <p class="ticket__info">
                                {{ ticket.customers_type_name }}:<span
                                    class="dots"></span
                                ><span>{{ ticket.cost }}₽</span>
                            </p>
                            <div class="ticket__control">
                                <button
                                    @click="setTicket(ticket.id, -1)"
                                    type="button">
                                    -
                                </button>
                                <span class="ticket__count">{{
                                    getTicketCount(ticket.id)
                                }}</span>
                                <button
                                    @click="setTicket(ticket.id, 1)"
                                    type="button">
                                    +
                                </button>
                            </div>
                        </div>
                        <div class="ticket free">
                            <p class="ticket__info">
                                Льготный:<span class="dots"></span
                                ><span>0 ₽</span>
                            </p>
                            <div class="ticket__control">
                                <button
                                    class="tooltip"
                                    type="button"
                                    @click="freeTicketAlert">
                                    ?
                                </button>
                                <button
                                    type="button"
                                    @click="freeTicketRequest">
                                    Оформить
                                </button>
                            </div>
                        </div>
                    </div>
                    <p class="red-warning">
                        {{
                            availableNow === 0
                                ? `Билетов не осталось`
                                : `Осталось билетов: ${availableNow}`
                        }}
                    </p>
                </div>
                <p class="popup__p" v-if="availableNow !== null">
                    <span>Итого: </span>{{ total.toLocaleString() }}₽
                </p>
            </fieldset>
            <fieldset v-if="step === 2">
                <div class="input-wrapper">
                    <label>Ваше имя:</label>
                    <input
                        :class="[isNameValid ? 'valid' : 'notValid']"
                        type="text"
                        @input="checkInputsValid"
                        v-model="name"
                        required
                        placeholder="Чтобы знать, как к вам обращаться" />
                </div>
                <div class="input-wrapper">
                    <label>Ваш телефон:</label>
                    <input
                        :class="[isTelValid ? 'valid' : 'notValid']"
                        type="tel"
                        @input="checkInputsValid"
                        inputmode="numeric"
                        v-model="tel"
                        required
                        placeholder="+7 (777) 777-77-77" />
                </div>
                <div class="input-wrapper">
                    <label>Ваша почта:</label>
                    <input
                        :class="[isEmailValid ? 'valid' : 'notValid']"
                        type="email"
                        @input="checkInputsValid"
                        v-model="email"
                        required
                        placeholder="На эту почту придёт чек" />
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
                            Дата и время:
                            {{ selectedDate.split("-").reverse().join(".") }} в
                            {{ selectedTime }}
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
                    type="submit"
                    :class="[isPayBtnDisabled ? 'disabled' : 'animated-btn']">
                    {{ isPayBtnDisabled ? "Ожидайте..." : "Оплатить" }}
                </button>
            </div>
            <div v-if="step === 3" class="popup__warning-wrapper">
                <p class="popup__warning">
                    Нажимая на кнопку, вы даете согласие на обработку
                    персональных данных и соглашаетесь с
                    <a
                        href="files/test.pdf"
                        type="application/pdf"
                        target="_blank"
                        class="blue"
                        >политикой конфиденциальности</a
                    >
                </p>
                <p class="popup__warning">
                    ВНИМАНИЕ! При оформлении билета для студента, пенсионера,
                    многодетного или любого другого льготного билета при себе
                    необходимо иметь подтверждающий документ на льготу
                    (пенсионное, студентческий билет и т.д. соответственно.)
                </p>
            </div>
        </form>
    </div>
</template>
<script>
import axios from "axios";

export default {
    name: "OrderPopup",
    data() {
        return {
            excursionInfo: {},
            ticketsOrderLimit: 5,
            step: 1,
            selectedDate: null,
            selectedTime: null,
            name: "",
            tel: "",
            email: "",
            total: 0,
            selected_tickets: {},
            totalTicketsCount: 0,
            availableNow: null,
            availableLeft: null,
            isInputsValid: false,
            isNameValid: false,
            isTelValid: false,
            isEmailValid: false,
            availableTimes: [],
            minDate: null,
            maxDate: null,
            errorMessage: null,
            isPayBtnDisabled: false,
        };
    },
    watch: {
        selectedDate(newValue, oldValue) {
            this.selectedTime = null;
            this.availableNow = null;
            this.errorMessage = null;
            let date = new Date();

            let daysOfTheWeek = {
                Mon: "Пн",
                Tue: "Вт",
                Wed: "Ср",
                Thu: "Чт",
                Fri: "Пт",
                Sat: "Сб",
                Sun: "Вс",
            };
            let excursion_week_days = this.excursionInfo.excursion.week_days;
            let availableDays =
                this.$store.getters.getWeekendDays(excursion_week_days);
            let selectedDayOfTheWeek =
                daysOfTheWeek[new Date(newValue).toString().slice(0, 3)];

            if (!availableDays.split(", ").includes(selectedDayOfTheWeek)) {
                this.errorMessage = `Выберите один из следующий дней: ${availableDays}; в остальные дни экскурсия не проводится`;
                return;
            }

            let isToday =
                date.toLocaleDateString().split(".").reverse().join("-") ===
                this.selectedDate;

            if (isToday) {
                let currentHours = date.getHours();
                let currentMinutes = date.getMinutes();

                this.availableTimes = [
                    ...this.excursionInfo.excursion.times,
                ].filter((time) => {
                    let hours = parseInt(time.split(":")[0]);
                    let minutes = parseInt(time.split(":")[1]);
                    return !(
                        currentHours >= hours && currentMinutes >= minutes
                    );
                });

                if (this.availableTimes.length === 0) {
                    this.errorMessage =
                        "Нет достпуных билетов на эту дату, выберите пожалуйста другую или напишите нам на WhatsApp, мы поможем с выбором!";
                }
            } else {
                this.errorMessage = null;
                this.availableTimes = [...this.excursionInfo.excursion.times];
            }
        },
        selectedTime(newValue, oldValue) {
            if (newValue !== null) {
                this.availableNow = null;
                this.selected_tickets = {};
                this.total = 0;
                this.errorMessage = null;
                this.getAvailableCount();
            }
        },
        selected_tickets: {
            handler(newValue, oldValue) {
                let result = [0];
                Object.values(newValue).forEach((ticketCount) => {
                    result.push(ticketCount);
                });
                this.totalTicketsCount = result.reduce((a, b) => a + b);
            },
            deep: true,
        },
    },
    methods: {
        freeTicketAlert() {
            alert(
                `Ветераны ВОВ; Герои СССР и РФ (Золотая Звезда); Инвалиды 1 группы; Дети инвалиды; Дошкольники.\nПри себе обязательно иметь ПОДТВЕРЖДАЮЩИЙ ДОКУМЕНТ!`
            );
        },
        freeTicketRequest() {
            let url = `https://wa.me/+79854346148?text=Здравстуйте, хочу оформить льготный билет на экскурсию "${
                this.excursionInfo.excursion.name
            }" ${this.selectedDate.split("-").reverse().join(".")} в ${
                this.selectedTime
            }.`;

            window.open(url, "_blank").focus();

            this.$store.commit("CLOSE_POPUP");
        },
        getDateLimitation() {
            let date = new Date();

            let formatDate = (string) => {
                return string
                    .toLocaleDateString()
                    .split(".")
                    .reverse()
                    .join("-");
            };

            let min = formatDate(date);
            let max = formatDate(new Date(date.setMonth(date.getMonth() + 1)));

            this.minDate = min;
            this.maxDate = max;
        },
        getAvailableCount() {
            axios
                .get(
                    `${this.$store.state.API_URL}/excursions/?excursion_id=${this.excursionInfo.excursion.id}&time=${this.selectedTime}&date=${this.selectedDate}`
                )
                .then((response) => {
                    setTimeout(() => {
                        this.availableNow =
                            this.excursionInfo.excursion.available -
                            response.data;
                        this.availableLeft =
                            this.excursionInfo.excursion.available -
                            response.data;
                    }, 500);
                })
                .catch((error) => {
                    console.log(error);
                    this.availableNow = null;
                    this.availableLeft = null;
                    this.errorMessage = `Ошибка получения количества билетов на эту дату и время. Попробуйте
                            перезагрузить сайт или свяжитесь с нами через
                            WhatsApp.`;
                });
        },
        checkInputsValid() {
            let nameLength = this.name.length;
            let telLength = this.tel.length;

            let validName = nameLength >= 2 && nameLength <= 20;
            let validTel = telLength >= 11 && telLength <= 18;
            let validEmail = /^.+@.+\..+/.test(this.email);

            let checkValidate = (variableName, validationСondition) => {
                if (validationСondition) {
                    this[variableName] = true;
                } else {
                    this[variableName] = false;
                }
            };

            checkValidate("isNameValid", validName);
            checkValidate("isTelValid", validTel);
            checkValidate("isEmailValid", validEmail);

            let validAll =
                this.isNameValid && this.isTelValid && this.isEmailValid;

            checkValidate("isInputsValid", validAll);
        },
        setTicket(id, addValue) {
            if (this.availableNow === 0 && addValue > 0) return;
            let newCount = this.getTicketCount(id) + addValue;
            if (newCount > 0) {
                let isCanAdd =
                    addValue > 0 &&
                    this.totalTicketsCount >= this.ticketsOrderLimit;

                if (isCanAdd) return;

                this.selected_tickets[id] = newCount;
            } else {
                delete this.selected_tickets[id];
            }
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
                    `${
                        this.getTicketById(ticketId).customers_type_name
                    } ${ticketCount} шт.`
                );
            });
            return result.join(", ");
        },
        makeRequest() {
            this.isPayBtnDisabled = true;

            let tickets = [];
            Object.entries(this.selected_tickets).forEach((ticketInfo) => {
                tickets.push({
                    customer_type_cost_id: this.getTicketById(
                        parseInt(ticketInfo[0])
                    ).id,
                    amount: ticketInfo[1],
                });
            });

            axios
                .put(
                    `${this.$store.state.API_URL}/carts`,
                    {
                        cart_info: {
                            date: this.selectedDate,
                            time: this.selectedTime,
                            name: this.name,
                            tel: this.tel,
                            email: this.email,
                            bill: "",
                        },
                        tickets: tickets,
                    },
                    {}
                )
                .then((response) => {
                    window.history.pushState({}, "", new URL(location));
                    window.location.replace(response.data);
                })
                .catch((error) => {
                    console.log(error);
                    alert(`Ошибка оформления заказа №${error.response.status}`);
                });
        },
    },
    created() {
        this.excursionInfo = this.$store.state.popupInfo;
        this.getDateLimitation();
    },
};
</script>

<style scoped>
.popup__warning {
    margin-top: 0 !important;
    margin-bottom: 10px;
}

.popup__warning:last-child{
    color: red;
}

input[type="date"]::-webkit-inner-spin-button,
input[type="date"]::-webkit-calendar-picker-indicator {
    display: none;
    -webkit-appearance: none;
}
</style>
