<template>
    <main>
        <h1>
            Оплата проведена успешно, чек и вся дополнительная информация придет на почту, которую вы указывали.
        </h1>
        <h1>
            При возникновении вопросов пишите нам в вотсап или звоните <br> 
            <a href="tel:88004442137">8 (800) 444-21-37</a>
        </h1>
    </main>
</template>
<script>
export default {
    name: "PaymentSuccess",
    data() {
        return {};
    },
    methods: {},
    created() {},
};
</script>

<style scoped>
h1 {
    text-align: center;
    font-size: 60px;
    max-width: 1000px;
    margin: 50px auto;
    padding: 100px 0;
    padding: 0 30px;
}
@media screen and (max-width: 800px) {
    h1 {
        font-size: 40px;
    }
}

@media screen and (max-width: 500px) {
    h1 {
        font-size: 20px;
    }
}
</style>
