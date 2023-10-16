<template>
    <main class="main">
        <section class="admin" v-if="isAuth">
            <div class="container">
                <div class="admin__inner">
                    <div>Админ</div>
                </div>
            </div>
        </section>
        <div class="form-wrapper" v-else>
            <form @submit.prevent="checkAuth">
                <input
                    type="text"
                    v-model="login"
                    placeholder="Логин"
                    required />
                <input
                    type="password"
                    v-model="password"
                    placeholder="Пароль"
                    required />
                <button type="submit">Войти</button>
            </form>
        </div>
    </main>
</template>
<script>
export default {
    name: "Admin",
    data() {
        return {
            login: null,
            password: null,
            isAuth: false,
        };
    },
    methods: {
        checkAuth() {
            console.log(this.login);
            console.log(this.password);
            this.isAuth = true;
        },
    },
    created() {
        this.$store.commit("SET_PAGE_LOADED");
    },
};
</script>
<style scoped>
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
</style>
