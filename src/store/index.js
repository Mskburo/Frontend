import { createStore } from "vuex";

export default createStore({
    state: {
        API_URL: process.env.VUE_APP_API_URL,
        popupName: null,
        popupInfo: null,
        isPageLoaded: false,
        weekendDays: {
            1: {
                eng_day: 'Mon',
                rus_day: 'Пн',
            },
            2: {
                eng_day: 'Tue',
                rus_day: 'Вт',
            },
            3: {
                eng_day: 'Wed',
                rus_day: 'Ср',
            },
            4: {
                eng_day: 'Thu',
                rus_day: 'Чт',
            },
            5: {
                eng_day: 'Fri',
                rus_day: 'Пт',
            },
            6: {
                eng_day: 'Sat',
                rus_day: 'Сб',
            },
            7: {
                eng_day: 'Sun',
                rus_day: 'Вс',
            },
        }
    },
    getters: {
        getWeekendDays: (state) => (idString) => {
            let days = idString.toString().split("")
            return days.map(a => state.weekendDays[a].rus_day).join(", ")
        },
    },
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
        SET_PAGE_LOADED(state) {
            state.isPageLoaded = true;
        }
    },
    actions: {},
    modules: {},
});
