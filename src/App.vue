<template>
    <div class="container">
        <section class="admin row">
            <button @click="this.showCategories = !this.showCategories">
                скрыть\открыть Категории
            </button>
            <button @click="this.showTickets = !this.showTickets">
                скрыть\открыть билеты
            </button>
        </section>
        <section v-if="this.showCategories">
            <div class="categories row">
                <button
                    @click="changeCategory(0)"
                    :class="{ active: this.currentCategory === 0 }">
                    Все
                </button>
                <button
                    v-for="category in this.categories"
                    @click="changeCategory(category.id)"
                    :class="{ active: this.currentCategory === category.id }">
                    {{ category.name }}
                </button>
            </div>
            <div class="list column row">
                <p class="bold row">Отображено: {{ this.listToShow.length }}</p>
                <div
                    class="list__item row column"
                    v-for="item in this.listToShow">
                    <p>id: {{ item.id }}</p>
                    <p>Название: {{ item.name }}</p>
                    <p>Категория: {{ item.category.name }}</p>
                    <p>Описание: {{ item.description }}</p>
                </div>
            </div>
        </section>
        <form
            v-if="this.showTickets"
            @submit.prevent="this.createOrder"
            class="row column tickets">
            <input
                type="number"
                v-model="this.cart.id"
                placeholder="id экскурсии"
                required />
            <p class="list__item row">
                <input
                    @input="this.calcTotal"
                    type="number"
                    v-model="this.cart.child"
                    placeholder="количество детей" />
                <span>Цена: 100</span>
            </p>
            <p class="list__item row">
                <input
                    @input="this.calcTotal"
                    type="number"
                    v-model="this.cart.parents"
                    placeholder="количество взрослых" />
                <span>Цена: 300</span>
            </p>
            <p class="list__item row">
                <input
                    @input="this.calcTotal"
                    type="number"
                    v-model="this.cart.old"
                    placeholder="количество пенсионеров" />
                <span>Цена: 200</span>
            </p>
            <p class="bold row">Сумма: {{ this.cart.totalPrice }}</p>
            <button type="submit">Оформить</button>
        </form>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "MskBuro",
    components: {},
    data() {
        return {
            list: [{ id: -1, name: "Не загрузилось)" }],
            listToShow: [],
            categories: [],
            currentCategory: 0,
            showCategories: true,
            showTickets: true,
            cart: {
                totalPrice: 0,
                id: null,
                child: null,
                parents: null,
                old: null,
            },
        };
    },
    methods: {
        calcTotal() {
            this.cart.totalPrice =
                this.cart.child * 100 +
                this.cart.parents * 300 +
                this.cart.old * 200;
        },
        createOrder() {
            if (this.cart.totalPrice === 0) {
                alert("Вы ничего не выбрали");
            }
            // axios
            //     .post("https://jsonplaceholder.typicode.com/posts", {
            //         id: this.cart.id,
            //         child: this.cart.child,
            //         parents: this.cart.parents,
            //         old: this.cart.old,
            //     })
            //     .then((response) => {
            //         console.log(response);
            //     })
            //     .catch((error) => {
            //         console.log(error);
            //     });
        },
        changeCategory(categoryId) {
            if (categoryId === 0) {
                this.listToShow = this.list;
            } else {
                this.listToShow = this.list.filter(
                    (a) => a.category_id === categoryId
                );
            }
            this.currentCategory = categoryId;
        },
        loadExcursions() {
            // axios
            //     .get("https://jsonplaceholder.typicode.com/posts")
            //     .then((response) => {
            //         this.list = response.data;
            //         this.listToShow = this.list;
            //     });
        },
        loadCategories() {
            // axios
            //     .get("https://jsonplaceholder.typicode.com/posts")
            //     .then((response) => {
            //         this.categories = response.data;
            //         this.loadExcursions();
            //     });
        },
    },
    created() {
        // this.loadCategories();
        axios
            // .get("https://jsonplaceholder.typicode.com/posts")
            .get("http://127.0.0.1:8080/excursions")
            .then((response) => {
                console.log(response)
            });
    },
};
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: inherit;
}

.container {
    width: 1200px;
    padding: 0 20px;
    margin: 0 auto;
    box-sizing: content-box;
}

body {
    font-family: Roboto, sans-serif;
}

.row {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
}
.column {
    flex-direction: column;
}
.list__item {
    padding: 10px;
    border: 2px solid black;
}
.categories {
    margin-top: 50px;
    margin-bottom: 30px;
}
button {
    padding: 10px;
    border: 2px solid black;
    border-radius: 10px;
    font-size: 20px;
    background: none;
    color: black;
    transition: 0.3s;
    cursor: pointer;
}
button.active,
button:hover {
    background: black;
    color: white;
}
.bold {
    font-weight: bold;
}
.tickets {
    padding: 50px 0;
}
.tickets > * {
    font-size: 20px;
}
</style>
