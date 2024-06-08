<template>
	<div></div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default {
	setup() {
		const router = useRouter()
		const route = useRoute()
		const promoId = ref(null)

		onMounted(() => {
			promoId.value = route.params.id
			localStorage.setItem('promo_id', promoId.value)
			router.push('/')
		})

		return {}
	},
}
</script>

<style lang="scss" scoped></style>
