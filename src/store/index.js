import { createStore } from "vuex";

export default createStore({
    state: {
        API_URL: "http://localhost:8090/api/v1",
        popupName: "",
        popupInfo: "",
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
