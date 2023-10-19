<template>
    <main class="main">
        <div class="form-wrapper" v-if="!isAuth">
            <form @submit.prevent="checkAuth">
                <input
                    type="password"
                    v-model="password"
                    placeholder="Пароль"
                    required />
                <button type="submit">Войти</button>
            </form>
        </div>
        <section class="admin" v-else>
            <div class="container">
                <div class="admin__inner">
                    <header>
                        <button class="create-order">
                            <span>+</span> Создать заказ
                        </button>
                        <div class="sort-by">
                            <p>Сортировать по:</p>
                            <select v-model="sortBy">
                                <option value="today">Сегодняшние</option>
                                <option value="last">Последние</option>
                                <option value="excursionDate">
                                    Конкретная дата экскурсии
                                </option>
                                <option value="orderDate">
                                    Конкретная дата заказа
                                </option>
                            </select>
                        </div>
                    </header>
                    <p class="orders-title">{{ sortString }}</p>
                    <p class="errorMessage" v-if="errorMessage">
                        {{ errorMessage }}
                    </p>
                    <div class="orders">
                        <div class="order" v-for="order in orders">
                            <div>
                                <p class="title">Номер заказа:</p>
                                <p>{{ order.cart_info.id }}</p>
                            </div>
                            <div>
                                <p class="title">Дата экскурсии:</p>
                                <p>
                                    {{
                                        order.cart_info.date
                                            .split("-")
                                            .reverse()
                                            .join(".")
                                    }}
                                </p>
                            </div>
                            <div>
                                <p class="title">Время экскурси:</p>
                                <p>{{ order.cart_info.time }}</p>
                            </div>
                            <div>
                                <p class="title">Имя:</p>
                                <p>{{ order.cart_info.name }}</p>
                            </div>
                            <div>
                                <p class="title">Телефон:</p>
                                <p>
                                    <a :href="'tel:' + order.cart_info.tel">{{
                                        order.cart_info.tel
                                    }}</a>
                                </p>
                            </div>
                            <div>
                                <p class="title">Почта:</p>
                                <p>
                                    <a
                                        :href="
                                            'mailto:' + order.cart_info.email
                                        "
                                        >{{ order.cart_info.email }}</a
                                    >
                                </p>
                            </div>
                            <div class="tickets col">
                                <p class="title">Билеты:</p>
                                <div
                                    v-for="ticket in order.tickets"
                                    class="ticket indent">
                                    <p>
                                        {{
                                            customerTypeString[
                                                ticket.customer_type_cost_id
                                            ]
                                        }}
                                    </p>
                                    <p>{{ ticket.amount }} шт.</p>
                                </div>
                            </div>
                            <div>
                                <p class="title">Оплачено:</p>
                                <p>
                                    {{ order.cart_info.is_paid ? "Да" : "Нет" }}
                                </p>
                            </div>
                            <div class="col">
                                <p class="title">Заказ создан:</p>
                                <p class="indent">
                                    {{
                                        formatCreatedAt(
                                            order.cart_info.created_at
                                        )
                                    }}
                                </p>
                            </div>
                            <div v-if="order.cart_info.is_paid">
                                <p class="title">Чек:</p>
                                <p class="indent">{{ order.cart_info.bill }}</p>
                            </div>
                            <div class="pay-btn-wrapper">
                                <button
                                    v-if="!order.cart_info.is_paid"
                                    class="pay-btn">
                                    Оплатить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>
</template>
<script>
import axios from "axios";

export default {
    name: "Admin",
    data() {
        return {
            password: null,
            isAuth: false,
            sortBy: "today",
            sortString: `Заказы на сегодня (${new Date().toLocaleDateString()})`,
            orders: [],
            errorMessage: null,
            customerTypeString: {
                1: "Детский",
                2: "Взрослый",
                3: "Пенсионер",
                4: "Студент",
            },
        };
    },
    watch: {
        sortBy(newValue, oldValue) {
            switch (newValue) {
                case "today":
                    this.sortString = `Заказы на сегодня (${new Date().toLocaleDateString()})`;
                    break;
                case "last":
                    this.sortString = "Последние оформленные заказы";
                    break;
                case "date":
                    this.sortString = `Заказы на конкретную дату (${new Date().toLocaleDateString()})`;
                    break;
                default:
                    break;
            }
        },
    },
    methods: {
        checkAuth() {
            this.getOrders(this.password);
        },

        getOrders(token) {
            axios
                .get(`${this.$store.state.API_URL}/admin/carts`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
                .then((response) => {
                    this.orders = response.data;
                    this.errorMessage = null;
                    this.isAuth = true;
                    document.cookie = `token=${token};secure;max-age=43200`;
                })
                .catch((err) => {
                    console.log(err);
                    this.errorMessage = "Ошибка загрузки списка заказов";
                    this.orders = [];
                });
        },
        formatCreatedAt(string) {
            let date = string.split("T")[0];
            let time = string.split("T")[1]?.split(".")[0];
            return `${date.split("-").reverse().join(".")}, ${time}`;
        },
        getCookie(name) {
            const value = `; ${document.cookie}`;
            const parts = value.split(`; ${name}=`);
            if (parts.length === 2) return parts.pop().split(";").shift();
        },
    },
    created() {
        this.$store.commit("SET_PAGE_LOADED");
        let token = this.getCookie("token");
        if (token) {
            this.isAuth = true;
            this.getOrders(token);
        }
    },
};
</script>
<style scoped>
.main {
    padding: 30px 0;
}
form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
}
form input {
    font-size: 16px;
    padding: 10px;
    text-align: center;
    width: 300px;
    border-radius: 10px;
    border: 2px solid black;
    transition: 0.3s;
}
form input:focus {
    width: 400px;
}
form button {
    font-size: 16px;
    color: black;
    padding: 10px;
    border: 2px solid black;
    border-radius: 10px;
    transition: 0.3s;
}
form button:hover {
    color: white;
    background: black;
}
.form-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 100px;
}
header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px;
    flex-wrap: wrap;
    gap: 20px;
}
.sort-by {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
    flex-wrap: wrap;
}
.sort-by p {
    font-size: 20px;
}
.sort-by select {
    font-size: 16px;
    padding: 10px;
    border-radius: 10px;
    border: 1px solid black;
}
.create-order {
    background: green;
    color: white;
    font-weight: 600;
    font-size: 20px;
    padding: 5px 20px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    gap: 5px;
}
.create-order span {
    font-size: 30px;
}
.orders {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
    gap: 20px;
}
.orders-title {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 20px;
}
.order {
    padding: 10px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    border: 2px solid black;
}
.errorMessage {
    color: red;
    font-size: 30px;
    text-align: center;
    margin-bottom: 30px;
    font-weight: 600;
}
.order > div {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 20px;
    flex-wrap: wrap;
}
.order .title {
    font-weight: 600;
    font-size: 20px;
}
.order > div.col {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
}
.order > div.tickets .ticket {
    gap: 10px;
}
.indent {
    padding-left: 20px;
}
.pay-btn {
    background: green;
    border-radius: 10px;
    font-size: 16px;
    padding: 10px 20px;
    color: white;
}
.pay-btn-wrapper {
    flex-grow: 1;
    align-items: flex-end !important;
}
</style>
