import { createStore } from "vuex";

export default createStore({
    state: {
        API_URL: process.env.VUE_APP_API_URL,
        popupName: null,
        popupInfo: null,
        isPageLoaded: false,
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
        SET_PAGE_LOADED(state) {
            state.isPageLoaded = true;
        }
    },
    actions: {},
    modules: {},
});
