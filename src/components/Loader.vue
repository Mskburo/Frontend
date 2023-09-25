<template>
    <div class="loader" v-if="showLoader">
        <img src="@/assets/img/logo-extra-big.png" alt="" class="loader-logo" />
        <!-- <p>Московское экскурсионное бюро</p> -->
    </div>
</template>
<script>
export default {
    name: "Loader",
    data() {
        return {
            showLoader: true,
        };
    },
    props: {
        delay: Number,
    },
    created() {
        document.body.style.overflow = "hidden";
        setTimeout(() => {
            document.body.style.overflow = "";
            this.showLoader = false;
        }, this.delay);
    },
};
</script>
