<template>
    <footer class="footer" id="footer">
        <div class="container footer__inner">
            <div class="logo">
                <img src="@/assets/img/logo.webp" loading="lazy" alt="MskBuro" />
                <span class="text">ООО “Московское экскурсионное бюро”</span>
            </div>
            <div class="footer__top">
                <div class="column">
                    <p class="title">Контакты</p>
                    <a href="tel:+79854346148" class="text"
                        ><img src="@/assets/img/phone.svg" loading="lazy" alt="" /> +7 (985)
                        434-61-48</a
                    >
                    <a href="mailto:support@mskburo.ru" class="text"
                        ><img src="@/assets/img/mail.svg" loading="lazy" alt="" /> support@mskburo.ru</a
                    >
                </div>
                <div class="column">
                    <p class="title">О нас</p>
                    <p class="text">ОГРН: 1227700066252</p>
                    <p class="text">ИНН: 7751215066</p>
                    <p class="text">КПП: 775101001</p>
                </div>
                <div class="column">
                    <p class="title">Документы</p>
                    <a
                        href="files/test.pdf"
                        type="application/pdf"
                        target="_blank"
                        class="text"
                        >Публичная оферта</a
                    >
                    <a
                        href="files/test.pdf"
                        type="application/txt"
                        target="_blank"
                        class="text"
                        >Пользовательское соглашение</a
                    >
                    <a
                        href="files/test.pdf"
                        type="application/txt"
                        target="_blank"
                        class="text"
                        >Политика конфиденциальности</a
                    >
                    <a
                        href="files/CardCompanyMEB.pdf"
                        type="application/txt"
                        target="_blank"
                        class="text"
                        >Карточка компании</a
                    >
                    <a
                        href="files/test.pdf"
                        type="application/txt"
                        target="_blank"
                        class="text"
                        >Условия возврата</a
                    >
                </div>
            </div>
            <div class="footer__bottom">
                <div class="socials">
                    <a href="https://vk.com/moseksburo"
                        ><img src="@/assets/img/qr-vk.svg" loading="lazy" alt="ВКонтакте"
                    /></a>
                    <!-- <a href="http://"
                        ><img src="@/assets/img/tg.svg" alt="Телеграм"
                    /></a> -->
                    <a href="https://wa.me/79854346148"
                        ><img src="@/assets/img/qr-whatsapp.svg" loading="lazy" alt="Вотсап"
                    /></a>
                </div>
                <p class="copyright">
                    © 2010 — {{ new Date().getUTCFullYear() }} | Mskburo. Все
                    права защищены
                </p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: "Footer",
    props: {},
};
</script>
