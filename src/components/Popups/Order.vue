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
                        ref="dateInput"
                        @click="this.$refs.dateInput.showPicker()"
                        required />
                </div>
                <div class="input-wrapper" v-if="selectedDate">
                    <label>Выберите время:</label>
                    <div class="order-select-row track">
                        <button
                            v-for="time in availableTimes"
                            type="button"
                            @click="selectedTime = time"
                            :class="{ active: selectedTime === time }">
                            <p>{{ time }}</p>
                        </button>
                        <p v-if="errorMessage" class="red-warning">
                            {{ errorMessage }}
                        </p>
                    </div>
                </div>
                <div class="tickets-loader-wrapper" v-if="selectedTime && availableNow === null">
                    <div class="tickets-loader"></div>
                </div>
                <div class="input-wrapper" v-if="selectedTime && availableNow !== null">
                    <label>Выберите билеты:</label>
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
                                <span>{{ getTicketCount(ticket.id) }}</span>
                                <button
                                    @click="setTicket(ticket.id, 1)"
                                    type="button">
                                    +
                                </button>
                            </div>
                        </div>
                    </div>
                    <p class="red-warning">
                        {{
                            availableNow === 0
                                ? `Билетов не осталось`
                                : `Осталось ${availableNow} билета(ов)`
                        }}
                    </p>
                </div>
                <p class="popup__p" v-if="availableNow !== null">
                    <span>Итого: </span>{{ total }}₽
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
                <button v-if="step === 3" class="animated-btn">Оплатить</button>
            </div>
            <p class="popup__warning" v-if="step === 3">
                Нажимая на кнопку, вы даете согласие на обработку персональных
                данных и соглашаетесь с
                <a
                    href="files/test.pdf"
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
            isInputsValid: false,
            isNameValid: false,
            isTelValid: false,
            isEmailValid: false,
            availableTimes: [],
            minDate: null,
            errorMessage: null,
        };
    },
    watch: {
        selectedTime(newValue, oldValue) {
            if (newValue !== null) {
                this.availableNow = null;
                this.selected_tickets = {};
                this.total = 0;
                this.errorMessage = null;
                this.getTicketsCount();
            }
        },
        selectedDate(newValue, oldValue) {
            this.selectedTime = null;
            this.errorMessage = null;
            let date = new Date();

            // if (this.excursionInfo.excursion.type_name === "Гибридная") {
            //     let daysOfTheWeek = {
            //         Mon: "Пн",
            //         Tue: "Вт",
            //         Wed: "Ср",
            //         Thu: "Чт",
            //         Fri: "Пт",
            //         Sat: "Сб",
            //         Sun: "Вс",
            //     };
            //     let availableDays = ["Сб", "Вс"];
            //     let selectedDayOfTheWeek =
            //         daysOfTheWeek[new Date(newValue).toString().slice(0, 3)];
            //     let isSelectedDayOfTheWeekIsValid =
            //         availableDays.includes(selectedDayOfTheWeek);

            //     if (!isSelectedDayOfTheWeekIsValid) {
            //         this.errorMessage =
            //             "Выберите выходной день, в остальные дни экскурсия не проводится";
            //         return;
            //     }
            // }

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
                        "Нет достпуных билетов на эту дату, выберите пожалуйста другую";
                }
            } else {
                this.errorMessage = null;
                this.availableTimes = [...this.excursionInfo.excursion.times];
            }
        },
    },
    methods: {
        getDateLimitation() {
            let [year, month, day] = [
                ...new Date().toLocaleDateString().split(".").reverse(),
            ];

            let min = `${year}-${month}-${day}`;
            // let max = `${+year + 1}-${month}-${day}`;

            this.minDate = min;
        },
        getTicketsCount() {
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
                            вотсап.`;
                });
        },
        checkInputsValid() {
            let validName = this.name?.length >= 2 && this.name?.length <= 20;
            let validTel =
                this.tel?.split("").length >= 8 &&
                this.tel?.split("").length <= 20;
            let validEmail = /^.+@.+\..+/.test(this.email);

            if (validName) {
                this.isNameValid = true;
            } else {
                this.isNameValid = false;
            }

            if (validTel) {
                this.isTelValid = true;
            } else {
                this.isTelValid = false;
            }

            if (validEmail) {
                this.isEmailValid = true;
            } else {
                this.isEmailValid = false;
            }

            if (this.isNameValid && this.isTelValid && this.isEmailValid) {
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
                    `${
                        this.getTicketById(ticketId).customers_type_name
                    } ${ticketCount} шт.`
                );
            });
            return result.join(", ");
        },
        makeRequest() {
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
                .catch((error) => {
                    if (error.response.status === 307) {
                        document.location.replace(error.response.data);
                    }
                    console.log(error);
                });
        },
    },
    created() {
        this.excursionInfo = this.$store.state.popupInfo;
        this.getDateLimitation();
    },
};
</script>
