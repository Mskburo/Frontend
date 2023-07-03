<template>
    <h1>{{ msg }}</h1>
</template>

<script>
export default {
    name: "HelloWorld",
    props: {
        msg: String,
    },
    data() {
        return {
            list: [],
        }
    },
    async created() {
        this.list = await fetch("http://localhost:8080/api/excursions/1")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
                return data
            }).catch(error => {
                console.log(`Error^ ${error}`)
                console.log(error)
            });
    },
};
</script>

<style scoped></style>