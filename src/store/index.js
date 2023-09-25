import { createStore } from "vuex";

export default createStore({
    state: {
        API_URL: "http://localhost:8090/api/v1",
        popupName: "",
        popupInfo: "",
        excursions: [
            {
                excursion_info: {
                    id: 1,
                    is_active: true,
                    photo: "excursion.png",
                    name: "Экскурсия 1",
                    type: "Автобусные",
                    short_route: "Короткий путь",
                    route: "Долгий путь",
                    time: "1 час",
                    short_description: "Короткое описание 1",
                    description: "Длинное описание 1",
                    times: ["12:00", "16:00", "19:00"],
                    available: 50,
                },
                tickets: [
                    {
                        id: 1,
                        name: "Детский",
                        price: 100,
                    },
                    {
                        id: 2,
                        name: "Взрослый",
                        price: 500,
                    },
                    {
                        id: 3,
                        name: "Пенсионер",
                        price: 300,
                    },
                ],
                availableNow: 11,
            },
            {
                excursion_info: {
                    id: 2,
                    is_active: true,
                    photo: "excursion.png",
                    name: "Экскурсия 2",
                    type: "Речные",
                    short_route: "Короткий путь",
                    route: "Долгий путь",
                    time: "2 час",
                    short_description: "Короткое описание 2",
                    description: "Длинное описание 2",
                    times: ["22:00", "22:22", "00:22"],
                    available: 50,
                },
                tickets: [
                    {
                        id: 1,
                        name: "Детский",
                        price: 100,
                    },
                    {
                        id: 2,
                        name: "Взрослый",
                        price: 500,
                    },
                    {
                        id: 3,
                        name: "Пенсионер",
                        price: 300,
                    },
                ],
                availableNow: 22,
            },
        ],
    },
    getters: {},
    mutations: {
        OPEN_POPUP(state, { name, info }) {
            document.body.style.overflowY = "hidden";
            state.popupName = name;
            state.popupInfo = info;
        },
        CLOSE_POPUP(state) {
            document.body.style.overflowY = "";
            state.popupName = "";
            state.popupInfo = "";
        },
    },
    actions: {},
    modules: {},
});
