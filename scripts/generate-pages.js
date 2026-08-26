const fs = require("fs");
const path = require("path");
const ROOT = path.join(__dirname, "..");

const ARROW = `<svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" stroke="currentColor" stroke-width="1.2"/></svg>`;

const FONTS = `https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600;700&display=swap`;

const SITE = "https://aurelia.dental";
const OG_IMAGE = `${SITE}/assets/images/hero-clinic.jpg`;

const SOCIAL_LINKS = `
        <a href="https://instagram.com/aureliadental" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://t.me/aureliadental" target="_blank" rel="noopener noreferrer">Telegram</a>
        <a href="https://wa.me/74950000000" target="_blank" rel="noopener noreferrer">WhatsApp</a>`;

function beforeAfterBlock(extraAttrs = "") {
  return `
      <div class="ba ba--premium" data-ba tabindex="0" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-label="Сравнение до и после лечения"${extraAttrs}>
        <div class="ba__layer ba__layer--before">
          <img src="assets/images/ba-case.jpg" alt="Улыбка до эстетического лечения винирами" width="1200" height="900" loading="lazy" decoding="async">
        </div>
        <div class="ba__layer ba__after">
          <img src="assets/images/ba-case.jpg" alt="Улыбка после эстетического лечения винирами" width="1200" height="900" loading="lazy" decoding="async">
        </div>
        <div class="ba__handle" aria-hidden="true">
          <span class="ba__knob">
            <svg class="ba__knob-arrow ba__knob-arrow--left" viewBox="0 0 8 12" aria-hidden="true"><path d="M6 1 1 6l5 5" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>
            <span class="ba__knob-line"></span>
            <svg class="ba__knob-arrow ba__knob-arrow--right" viewBox="0 0 8 12" aria-hidden="true"><path d="M2 1l5 5-5 5" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>
          </span>
        </div>
        <span class="ba__label ba__label--before">До</span>
        <span class="ba__label ba__label--after">После</span>
      </div>`;
}

const SCRIPTS = `
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.18/dist/lenis.min.js" defer></script>
<script src="js/data.js" defer></script>
<script src="js/scroll-lock.js" defer></script>
<script src="js/main.js" defer></script>
<script src="js/navigation.js" defer></script>
<script src="js/booking.js" defer></script>
<script src="js/faq.js" defer></script>
<script src="js/filters.js" defer></script>
<script src="js/lightbox.js" defer></script>
<script src="js/animations.js" defer></script>`;

function navLinks(active) {
  const items = [
    ["services.html", "Услуги"],
    ["doctors.html", "Врачи"],
    ["clinic.html", "Клиника"],
    ["prices.html", "Цены"],
    ["journal.html", "Журнал"]
  ];
  return items.map(([href, label]) =>
    `<a href="${href}"${active === href ? ' class="is-active"' : ""}>${label}</a>`
  ).join("");
}

function chrome(active, overHero) {
  return `
<a class="skip-link" href="#main">Перейти к содержимому</a>
<div class="grain" aria-hidden="true"></div>
<div class="scroll-progress" aria-hidden="true"></div>
<div class="cursor" data-cursor aria-hidden="true"><span class="cursor__ring"></span><span class="cursor__dot"></span></div>
<div class="preloader" data-preloader>
  <div class="preloader__brand"><span>Aurelia</span><span>Dental</span></div>
  <div class="preloader__bar"><span data-preloader-bar></span></div>
</div>
<header class="header${overHero ? " header--over-hero" : " is-solid"}" data-header>
  <div class="header__inner">
    <a class="logo" href="index.html" aria-label="Aurelia Dental — на главную">
      <span class="logo__mark">A</span>
      <span class="logo__text">urelia</span>
    </a>
    <nav class="nav" aria-label="Основная навигация">${navLinks(active)}</nav>
    <div class="header__actions">
      <a class="header__phone" href="tel:+74950000000">+7 495 000-00-00</a>
      <button class="btn btn--primary btn--sm" type="button" data-open-booking>Записаться ${ARROW}</button>
      <button class="nav-toggle" type="button" data-nav-toggle aria-label="Открыть меню" aria-expanded="false"><span></span><span></span></button>
    </div>
  </div>
</header>
${mobileNav()}`;
}

function mobileNav() {
  return `
<nav class="mobile-nav" data-mobile-nav aria-hidden="true" aria-label="Мобильное меню">
  <div class="mobile-nav__header">
    <a class="logo" href="index.html" aria-label="Aurelia Dental — на главную">
      <span class="logo__mark">A</span>
      <span class="logo__text">urelia</span>
    </a>
    <button class="mobile-nav__close" type="button" data-nav-close aria-label="Закрыть меню">✕</button>
  </div>
  <div class="mobile-nav__scroll">
    <ul class="mobile-nav__list">
      <li><a href="services.html">Услуги</a></li>
      <li><a href="doctors.html">Врачи</a></li>
      <li><a href="clinic.html">Клиника</a></li>
      <li><a href="prices.html">Цены</a></li>
      <li><a href="journal.html">Журнал</a></li>
      <li><a href="about.html">О клинике</a></li>
      <li><a href="contacts.html">Контакты</a></li>
    </ul>
    <div class="mobile-nav__meta">
      <div>
        <p>Большая Никитская, 21</p>
        <p>Москва</p>
      </div>
      <div class="mobile-nav__meta-row">
        <a href="tel:+74950000000">+7 495 000-00-00</a>
        <button class="btn btn--primary btn--sm" type="button" data-open-booking>Записаться</button>
      </div>
    </div>
  </div>
</nav>`;
}

function doctorCard(id, img, num, name, role, spec, years) {
  return `
    <a class="doctor-card" href="doctor.html?id=${id}">
      <div class="doctor-card__media">
        <div class="media reveal-img"><img src="assets/images/${img}" alt="${name}, ${role}" width="800" height="1000" loading="lazy"></div>
      </div>
      <div class="doctor-card__body">
        <span class="doctor-card__num">${num}</span>
        <h3>${name}</h3>
        <p class="doctor-card__role">${role}</p>
        <p class="doctor-card__years">Стаж ${years}</p>
        <p class="doctor-card__cred">${spec}</p>
        <span class="doctor-card__link">Подробнее ${ARROW}</span>
      </div>
    </a>`;
}

function footer() {
  return `
<section class="cta-final">
  <div class="container" data-reveal>
    <p class="eyebrow">Консультация</p>
    <p class="display">Ваша улыбка заслуживает<br>продуманного плана.</p>
    <button class="btn btn--light" type="button" data-open-booking>Записаться на консультацию ${ARROW}</button>
  </div>
</section>
<footer class="footer">
  <div class="container">
    <div class="footer__top">
      <div>
        <p class="display">Aurelia Dental</p>
        <p class="muted" style="margin-top:16px;max-width:28ch">Современная стоматология нового уровня. Частная клиника в центре Москвы.</p>
      </div>
      <nav aria-label="Подвал">
        <p class="caption">Клиника</p>
        <a href="services.html">Услуги</a>
        <a href="doctors.html">Врачи</a>
        <a href="clinic.html">Клиника</a>
        <a href="prices.html">Цены</a>
        <a href="journal.html">Журнал</a>
        <a href="about.html">О клинике</a>
        <a href="contacts.html">Контакты</a>
      </nav>
      <address>
        <p class="caption">Адрес</p>
        <p>Большая Никитская, 21, стр. 2<br>Москва, 125009</p>
        <a href="tel:+74950000000">+7 (495) 000-00-00</a>
        <a href="mailto:hello@aurelia-dental.ru">hello@aurelia-dental.ru</a>
        <p>Пн–Сб 09:00–21:00</p>
      </address>
      <div class="social">
        <p class="caption">Соцсети</p>${SOCIAL_LINKS}
      </div>
    </div>
    <div class="footer__bottom">
      <p>© <span data-year></span> Aurelia Dental. Все права защищены.</p>
      <p><a href="privacy.html">Конфиденциальность</a> · <a href="terms.html">Условия</a></p>
    </div>
  </div>
</footer>
<button class="back-top" type="button" data-back-top aria-label="Наверх">↑</button>
<button class="mobile-cta btn btn--primary" type="button" data-open-booking>Записаться на консультацию</button>`;
}

const FAQ = `
<section class="section" data-faq>
  <div class="container split">
    <div data-reveal>
      <p class="eyebrow">FAQ</p>
      <h2>Ответы на частые вопросы.</h2>
    </div>
    <div>
      ${[
        ["Как определяется стоимость лечения?", "Итоговый план составляется после консультации и диагностики. Цены на сайте — стартовые и могут измениться в зависимости от клинической ситуации."],
        ["Сколько длится имплантация?", "Установка одного импланта может занять один визит. Приживление и финальная коронка обычно занимают несколько месяцев. Немедленная нагрузка возможна только при достаточной стабильности кости и прикуса."],
        ["Безопасно ли профессиональное отбеливание?", "При предварительной оценке эмали и дёсен отбеливание в клинике — контролируемая процедура. Чувствительность, если появляется, обычно кратковременна."],
        ["Выглядят ли виниры естественно?", "Да, если оттенок, текстура и прозрачность подобраны под ваше лицо. Мы начинаем с mock-up, и только потом изготавливаем керамику."],
        ["Можно ли лечиться поэтапно?", "Да. Сложные планы можно разбить на этапы. Координатор опишет этапы и оплату после диагностики."],
        ["Как подготовиться к первому визиту?", "Возьмите предыдущие снимки, список лекарств и вопросы о сроках. Первый визит — это разговор, а не процедура по умолчанию."],
        ["Что происходит на первом приёме?", "Мы слушаем, осматриваем и фотографируем. При необходимости делаем скан или КЛКТ. Вы уходите с понятным следующим шагом."]
      ].map(([q, a]) => `
      <div class="faq-item">
        <button type="button">${q} <span class="icon-plus"></span></button>
        <div class="faq-item__body"><div><p>${a}</p></div></div>
      </div>`).join("")}
    </div>
  </div>
</section>`;

function wrap({ file, title, desc, canonical, active, overHero = false, jsonld, body }) {
  const schema = jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : "";
  return `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${desc}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${SITE}/${canonical}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${desc}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${SITE}/${canonical}">
  <meta property="og:locale" content="ru_RU">
  <meta property="og:site_name" content="Aurelia Dental">
  <meta property="og:image" content="${OG_IMAGE}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${desc}">
  <meta name="twitter:image" content="${OG_IMAGE}">
  <link rel="icon" href="assets/icons/favicon.svg" type="image/svg+xml">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${FONTS}" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="css/responsive.css">
  ${schema}
</head>
<body>
${chrome(active, overHero)}
<main id="main">
${body}
</main>
${footer()}
${SCRIPTS}
</body>
</html>
`;
}

const clinicSchema = {
  "@context": "https://schema.org",
  "@type": "Dentist",
  name: "Aurelia Dental",
  url: "https://aurelia.dental/",
  image: "https://aurelia.dental/assets/images/hero-clinic.jpg",
  logo: "https://aurelia.dental/assets/icons/favicon.svg",
  telephone: "+74950000000",
  email: "hello@aurelia-dental.ru",
  priceRange: "₽₽₽",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Большая Никитская, 21, стр. 2",
    addressLocality: "Москва",
    postalCode: "125009",
    addressCountry: "RU"
  },
  openingHours: "Mo-Sa 09:00-21:00"
};

const pages = [];

pages.push(["index.html", wrap({
  file: "index.html",
  title: "Aurelia Dental — Современная стоматология нового уровня",
  desc: "Частная стоматологическая клиника в Москве. Виниры, импланты, элайнеры и реставрационное лечение с учётом вашей анатомии, времени и комфорта.",
  canonical: "",
  active: "index.html",
  overHero: true,
  jsonld: clinicSchema,
  body: `
<section class="hero" data-hero>
  <div class="hero__media">
    <img src="assets/images/hero-clinic.jpg" alt="Светлый лечебный кабинет Aurelia Dental в Москве" width="1800" height="1200">
    <div class="hero__shade"></div>
  </div>
  <div class="hero__content">
    <div data-hero-copy>
      <p class="eyebrow">Aurelia Dental · Москва</p>
      <h1 class="hero__title display">Современная<br>стоматология<br>нового уровня</h1>
      <p class="lede" style="color:rgba(255,255,255,.88)">Продуманная стоматология вокруг вас — спокойные кабинеты, индивидуальные планы, естественный результат.</p>
      <div class="hero__actions">
        <a class="btn btn--light" href="services.html">Смотреть услуги ${ARROW}</a>
        <button class="btn btn--gold" type="button" data-open-booking>Записаться на консультацию</button>
      </div>
    </div>
    <aside class="hero__aside">
      <div class="hero__float">Москва · с 2014<br>Большая Никитская</div>
      <a class="header__phone" href="tel:+74950000000">+7 495 000-00-00</a>
    </aside>
  </div>
  <div class="scroll-hint" aria-hidden="true"><span class="scroll-hint__line"></span> Листайте</div>
</section>

<section class="section">
  <div class="container intro">
    <div data-reveal>
      <p class="eyebrow">01 — Философия</p>
      <h2>Стоматология с другим подходом.</h2>
    </div>
    <p class="intro__text" data-reveal>Мы объединяем клиническую точность, цифровое планирование и естественную эстетику — чтобы лечение было таким же продуманным, как и результат. Ничего не спешим. Ничего не делаем по шаблону.</p>
  </div>
</section>

<section class="section--tight">
  <div class="container">
    <div class="stats">
      <div class="stat"><strong data-counter="15" data-suffix="+">15+</strong><span>Лет практики</span></div>
      <div class="stat"><strong data-counter="12" data-suffix="k+">12k+</strong><span>Пациентов</span></div>
      <div class="stat"><strong data-counter="4.9" data-decimals="1">4.9</strong><span>Рейтинг</span></div>
      <div class="stat"><strong data-counter="32">32</strong><span>Стран обучения</span></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <div data-reveal>
        <p class="eyebrow">02 — Услуги</p>
        <h2>Лечение, разработанное вокруг вас.</h2>
      </div>
      <a class="text-link" href="services.html"><span>Все услуги</span> ${ARROW}</a>
    </div>
    <div class="svc-cards" data-reveal-stagger>
      ${[
        ["service-veneers.html", "01", "Виниры", "Тонкая керамика по mock-up, а не каталожная улыбка.", "от 35 000 ₽", "service-veneers.jpg"],
        ["service-implants.html", "02", "Имплантация", "Навигационная установка для долгой функции и тихой эстетики.", "от 85 000 ₽", "service-implants.jpg"],
        ["service-whitening.html", "03", "Отбеливание", "Контролируемое осветление после оценки эмали и дёсен.", "от 18 000 ₽", "service-whitening.jpg"],
        ["service-orthodontics.html", "04", "Элайнеры", "Ортодонтия для взрослых с уважением к прикусу.", "от 120 000 ₽", "service-ortho.jpg"],
        ["service-therapy.html", "05", "Терапия", "Микроскопная эндодонтия и реставрации на годы.", "от 8 500 ₽", "service-therapy.jpg"],
        ["prices.html", "06", "Гигиена", "Поддерживающий уход для дёсен, виниров и имплантов.", "от 5 500 ₽", "service-hygiene.jpg"]
      ].map(([href, num, name, txt, price, img]) => `
      <a class="svc-card" href="${href}">
        <div class="media reveal-img"><img src="assets/images/${img}" alt="${name}" width="800" height="600" loading="lazy"></div>
        <div class="svc-card__body">
          <span class="svc-card__num">${num}</span>
          <h3>${name}</h3>
          <p>${txt}</p>
          <p class="svc-card__price">${price}</p>
          <span class="svc-card__link">Подробнее ${ARROW}</span>
        </div>
      </a>`).join("")}
    </div>
  </div>
</section>

<section class="hscroll" data-hscroll>
  <div class="hscroll__pin">
    <div class="hscroll__track" data-hscroll-track>
      ${[
        ["01", "Имплантация", "Хирургические шаблоны, КЛКТ и ортопедическое мышление до установки импланта.", "service-implants.jpg"],
        ["02", "Эстетическая стоматология", "Виниры и реставрации вокруг света, а не стандартного белого.", "service-veneers.jpg"],
        ["03", "Ортодонтия", "Элайнеры и брекеты как медицинский план — сначала прикус, потом линия улыбки.", "service-ortho.jpg"],
        ["04", "Реставрация", "Коронки, вкладки и реконструкция стираемости на следующее десятилетие.", "service-crowns.jpg"]
      ].map(([n, t, p, img]) => `
      <article class="h-panel">
        <div class="h-panel__image"><img src="assets/images/${img}" alt="" loading="lazy"></div>
        <span class="h-panel__num">${n}</span>
        <div><h3>${t}</h3><p class="muted" style="margin-top:16px;max-width:32ch">${p}</p></div>
      </article>`).join("")}
    </div>
  </div>
</section>

<section class="section">
  <div class="container featured-treat">
    <div data-reveal>
      <p class="eyebrow">03 — Избранное</p>
      <h2>Керамические виниры без «театральной» улыбки.</h2>
      <p class="muted" style="margin:20px 0 28px;max-width:42ch">Сначала фотография, затем обратимый mock-up. И только потом керамика. От 35 000 ₽ за единицу после диагностики.</p>
      <a class="btn btn--primary" href="service-veneers.html">О винирах ${ARROW}</a>
    </div>
    <div class="media reveal-img">
      <img src="assets/images/portrait-editorial.jpg" alt="Естественная улыбка после эстетического лечения" width="900" height="1125" loading="lazy">
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <div data-reveal>
        <p class="eyebrow">04 — Врачи</p>
        <h2>Специалисты за каждым результатом.</h2>
      </div>
      <a class="text-link" href="doctors.html"><span>Все врачи</span> ${ARROW}</a>
    </div>
    <div class="doctor-grid" data-reveal-stagger>
      ${[
        ["volkov", "doctor-volkov.jpg", "01", "Александр Волков", "Ведущий имплантолог", "Имплантация · Хирургия", "17 лет"],
        ["morozova", "doctor-morozova.jpg", "02", "Елена Морозова", "Врач эстетической стоматологии", "Виниры · Дизайн улыбки", "14 лет"],
        ["sokolov", "doctor-sokolov.jpg", "03", "Дмитрий Соколов", "Ортодонт", "Элайнеры · Коррекция прикуса", "12 лет"]
      ].map(([id, img, num, name, role, spec, years]) => doctorCard(id, img, num, name, role, spec, years)).join("")}
    </div>
  </div>
</section>

<section class="section">
  <div class="container mosaic">
    <div class="media reveal-img"><img src="assets/images/clinic-reception.jpg" alt="Современный ресепшн стоматологической клиники Aurelia Dental" width="1200" height="1600" loading="lazy" data-parallax></div>
    <div class="media reveal-img"><img src="assets/images/clinic-waiting.jpg" alt="Зона ожидания" width="800" height="600" loading="lazy"></div>
    <div class="media reveal-img"><img src="assets/images/clinic-treatment.jpg" alt="Лечебный кабинет" width="800" height="600" loading="lazy"></div>
    <div class="media reveal-img"><img src="assets/images/clinic-light.jpg" alt="Дневной свет в клинике" width="1400" height="700" loading="lazy"></div>
  </div>
  <div class="container" style="margin-top:40px" data-reveal>
    <p class="eyebrow">05 — Пространство</p>
    <h2>Интерьер, созданный для вашего комфорта.</h2>
    <p class="muted" style="max-width:48ch;margin-top:16px">Приватные кабинеты и спокойный ритм. <a class="text-link" href="clinic.html"><span>Посмотреть клинику</span></a></p>
  </div>
</section>

<section class="section section--transformation">
  <div class="container transformation">
    <div class="transformation__copy" data-reveal>
      <p class="eyebrow">06 — Трансформация</p>
      <h2>Изменения, которые<br>видны и ощущаются.</h2>
      <p class="muted transformation__lede">Эстетическая стоматология — это не только зубы. Это уверенность в улыбке, которую замечают сразу. Передвиньте ползунок, чтобы увидеть разницу.</p>
    </div>
    <div class="transformation__visual" data-reveal>${beforeAfterBlock()}
      <div class="transformation__captions" aria-hidden="true">
        <span>До лечения</span>
        <span>После лечения</span>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container tech-grid">
    <div class="media reveal-img"><img src="assets/images/tech-surgery.jpg" alt="Хирургическое освещение" width="1400" height="900" loading="lazy"></div>
    <div class="media reveal-img"><img src="assets/images/tech-scanner.jpg" alt="Цифровая диагностика" width="900" height="600" loading="lazy"></div>
    <div class="media reveal-img"><img src="assets/images/tech-room.jpg" alt="Клинический интерьер" width="900" height="600" loading="lazy"></div>
  </div>
  <div class="container" style="margin-top:48px" data-reveal>
    <p class="eyebrow">07 — Технологии</p>
    <h2>Тихие инструменты. Высокие стандарты.</h2>
    <p class="muted" style="max-width:50ch;margin-top:16px">КЛКТ, внутриротовое сканирование и навигационная имплантация — когда они меняют план, а не как декор.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <p class="eyebrow" data-reveal>08 — Отзывы</p>
    <h2 data-reveal>Что пациенты замечают в первую очередь.</h2>
    <div class="reviews-track" data-reveal-stagger>
      <article class="review"><p class="stars">★★★★★</p><blockquote>«Весь опыт был невероятно продуманным. От первой консультации до финального результата.»</blockquote><footer>Мария К. · Виниры · март 2026</footer></article>
      <article class="review"><p class="stars">★★★★★</p><blockquote>«Никакого давления. Объяснили план имплантации, пока всё не стало очевидным.»</blockquote><footer>Андрей П. · Имплантация · январь 2026</footer></article>
      <article class="review"><p class="stars">★★★★★</p><blockquote>«Пришла на отбеливание, ушла с протоколом гигиены, который реально соблюдаю.»</blockquote><footer>Елена С. · Гигиена · декабрь 2025</footer></article>
    </div>
    <p style="margin-top:24px"><a class="text-link" href="reviews.html"><span>Все отзывы</span> ${ARROW}</a></p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <div data-reveal>
        <p class="eyebrow">09 — Цены</p>
        <h2>Прозрачные стартовые цены.</h2>
      </div>
      <a class="text-link" href="prices.html"><span>Полный прайс</span> ${ARROW}</a>
    </div>
    <div class="price-row"><span>Первичная консультация</span><span class="from">₽2 500</span></div>
    <div class="price-row"><span>Профессиональная гигиена</span><span class="from">от ₽5 500</span></div>
    <div class="price-row"><span>Профессиональное отбеливание</span><span class="from">от ₽18 000</span></div>
    <div class="price-row"><span>Керамический винир</span><span class="from">от ₽35 000</span></div>
    <div class="price-row"><span>Установка импланта</span><span class="from">от ₽85 000</span></div>
    <p class="price-note">Итоговая стоимость определяется после диагностики и индивидуального плана лечения.</p>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head">
      <div data-reveal>
        <p class="eyebrow">10 — Журнал</p>
        <h2>Читать перед визитом.</h2>
      </div>
      <a class="text-link" href="journal.html"><span>Все статьи</span> ${ARROW}</a>
    </div>
    <div class="journal-grid">
      <a class="journal-card journal-card--feature" href="article.html?slug=veneers">
        <div class="media reveal-img"><img src="assets/images/journal-1.jpg" alt="" width="1200" height="800" loading="lazy"></div>
        <p class="caption">Эстетика · 12 марта 2026 · 7 мин</p>
        <h3>Как выбрать виниры, не потеряв свою улыбку</h3>
      </a>
      <div>
        <a class="journal-card" href="article.html?slug=implants" style="display:block;margin-bottom:28px">
          <div class="media reveal-img"><img src="assets/images/journal-2.jpg" alt="" width="800" height="500" loading="lazy"></div>
          <p class="caption">Имплантация · 28 февраля 2026</p>
          <h3>Чего ожидать от имплантации зубов</h3>
        </a>
        <a class="journal-card" href="article.html?slug=whitening">
          <div class="media reveal-img"><img src="assets/images/journal-3.jpg" alt="" width="800" height="500" loading="lazy"></div>
          <p class="caption">Эстетика · 4 февраля 2026</p>
          <h3>Профессиональное отбеливание без мифов</h3>
        </a>
      </div>
    </div>
  </div>
</section>

<section class="band section">
  <div class="container band-split">
    <div data-reveal>
      <p class="eyebrow">Точность</p>
      <p class="quote-xl">Ваша улыбка.<br>Наша точность.</p>
    </div>
    <figure class="media reveal-img band-split__media" data-reveal>
      <img src="assets/images/hero-detail.jpg" alt="Стоматологические инструменты в мягком свете" width="1200" height="800" loading="lazy" data-parallax>
    </figure>
  </div>
</section>
${FAQ}`
})]);

function servicePage(opts) {
  return wrap({
    file: opts.file,
    title: opts.title + " — Aurelia Dental",
    desc: opts.lead,
    canonical: opts.file,
    active: "services.html",
    jsonld: { "@context": "https://schema.org", "@type": "MedicalProcedure", name: opts.title, description: opts.lead },
    body: `
<section class="page-hero">
  <div class="container page-hero__grid">
    <div>
      <nav class="breadcrumbs" aria-label="Хлебные крошки"><a href="index.html">Главная</a><span>/</span><a href="services.html">Услуги</a><span>/</span><span>${opts.title}</span></nav>
      <p class="eyebrow">Лечение</p>
      <h1>${opts.title}</h1>
      <p class="lede" style="margin-top:20px">${opts.lead}</p>
    </div>
    <div>
      <div class="service-meta">
        <div><span>От</span><strong>${opts.price}</strong></div>
        <div><span>Срок</span><strong>${opts.duration}</strong></div>
        <div><span>Врач</span><strong>${opts.doctor}</strong></div>
      </div>
      <p style="margin-top:24px"><button class="btn btn--primary" type="button" data-open-booking>Записаться на консультацию ${ARROW}</button></p>
    </div>
  </div>
</section>
<section class="section">
  <div class="container split">
    <div class="media reveal-img"><img src="${opts.image}" alt="${opts.title} — Aurelia Dental" width="1000" height="1250"></div>
    <div data-reveal>
      <p class="eyebrow">01 — Обзор</p>
      <h2>Понятная клиническая задача.</h2>
      <p class="muted" style="margin-top:16px">${opts.overview}</p>
      <p class="eyebrow" style="margin-top:40px">02 — Кому подходит</p>
      <p class="muted" style="margin-top:12px">${opts.who}</p>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    <p class="eyebrow">03 — Процесс</p>
    <h2>Как проходит лечение.</h2>
    <ol class="process" style="margin-top:32px">
      ${opts.steps.map((s, i) => `<li><span class="num">0${i + 1}</span> ${s}</li>`).join("")}
    </ol>
  </div>
</section>
<section class="band section">
  <div class="container" data-reveal>
    <p class="eyebrow">04 — Технологии</p>
    <p class="quote-xl">${opts.tech}</p>
  </div>
</section>
<section class="section">
  <div class="container">
    <p class="eyebrow">05 — Результаты</p>
    <h2>На что мы ориентируемся.</h2>${beforeAfterBlock(' style="margin-top:32px"')}
    <p class="price-note">Фотографии иллюстративны. Ваш результат зависит от диагностики и согласованного плана.</p>
  </div>
</section>
<section class="section">
  <div class="container split">
    <div>
      <p class="eyebrow">06 — Стоимость</p>
      <h2>${opts.price}</h2>
      <p class="muted" style="margin-top:12px">Итоговая стоимость подтверждается после осмотра, снимков и письменного плана.</p>
    </div>
    <div>
      <p class="eyebrow">Врач</p>
      <h3>${opts.doctor}</h3>
      <p style="margin-top:16px"><a class="text-link" href="doctors.html"><span>Вся команда</span> ${ARROW}</a></p>
    </div>
  </div>
</section>
${FAQ}`
  });
}

pages.push(["service-veneers.html", servicePage({
  file: "service-veneers.html", title: "Керамические виниры",
  lead: "Тонкие реставрации для света, текстуры и вашей естественной речи — не каталожная улыбка.",
  price: "от 35 000 ₽", duration: "2–4 визита", doctor: "Елена Морозова",
  image: "assets/images/service-veneers.jpg",
  overview: "Виниры — керамические накладки на подготовленную эмаль. В Aurelia мы начинаем с фотографии, цифрового дизайна и обратимого mock-up во рту. Препарирование — только после его одобрения.",
  who: "Стертые края, неравномерный цвет, который не исправляет отбеливание, небольшие ротации или желание уточнить форму после ортодонтии. Сначала лечим дёсны, если нужно.",
  steps: ["Консультация и фотография", "Диагностика и mock-up", "Препарирование и временные", "Примерка керамики", "Фиксация и контроль"],
  tech: "Mock-up first. Цифровой дизайн улыбки. Послойная керамика."
})]);

pages.push(["service-implants.html", servicePage({
  file: "service-implants.html", title: "Имплантация зубов",
  lead: "Имплантационное лечение с акцентом на долгую функцию, комфорт и естественную эстетику.",
  price: "от 85 000 ₽", duration: "от 1 визита", doctor: "Александр Волков",
  image: "assets/images/service-implants.jpg",
  overview: "Имплант — титановый корень для коронки, моста или полной реабилитации. Планируем на КЛКТ, используем хирургический шаблон, когда это повышает безопасность. Немедленная нагрузка — только при достаточной первичной стабильности.",
  who: "Один отсутствующий зуб, несколько дефектов или разрушающийся зубной ряд, когда съёмный протез больше не подходит.",
  steps: ["Консультация", "КЛКТ и планирование", "Навигационная установка", "Приживление и временная", "Постоянная реставрация"],
  tech: "КЛКТ. Хирургические шаблоны. Ортопедическое планирование."
})]);

pages.push(["service-whitening.html", servicePage({
  file: "service-whitening.html", title: "Профессиональное отбеливание",
  lead: "Контролируемое изменение оттенка после оценки эмали, дёсен и существующих реставраций.",
  price: "от 18 000 ₽", duration: "60–90 минут", doctor: "София Иванова",
  image: "assets/images/service-whitening.jpg",
  overview: "Клиническое отбеливание — профессиональный гель на изолированных зубах. Пломбы и керамика не отбеливаются — их может потребоваться заменить, если эмаль вокруг светлеет.",
  who: "Здоровая эмаль и стабильные дёсны с реалистичными ожиданиями. Тетрациклиновое окрашивание требует отдельного разговора.",
  steps: ["Осмотр", "Фиксация оттенка", "Изоляция", "Клинический цикл", "Рекомендации по уходу"],
  tech: "Изоляционный протокол. Карта оттенков. Домашние капы по показаниям."
})]);

pages.push(["service-orthodontics.html", servicePage({
  file: "service-orthodontics.html", title: "Элайнеры и коррекция прикуса",
  lead: "Ортодонтия для взрослых: сначала прикус как система, затем видимая линия улыбки.",
  price: "от 120 000 ₽", duration: "6–18 месяцев", doctor: "Дмитрий Соколов",
  image: "assets/images/service-ortho.jpg",
  overview: "Элайнеры и брекеты двигают зубы запланированными силами. Сканируем, фотографируем и оцениваем суставы, прежде чем обещать сроки.",
  who: "Скученность, промежутки, рецидив после брекетов или прикус, который неравномерно стирает зубы.",
  steps: ["Ортодонтическая консультация", "Скан и records", "Обсуждение плана", "Активное выравнивание", "Ретенция"],
  tech: "Цифровые модели. Поэтапные элайнеры. Ретенция в плане с первого дня."
})]);

pages.push(["service-therapy.html", servicePage({
  file: "service-therapy.html", title: "Терапия под микроскопом",
  lead: "Спокойная реставрационная и эндодонтическая работа — сохраняем свои зубы, когда прогноз честный.",
  price: "от 8 500 ₽", duration: "45–120 минут", doctor: "Анна Петрова",
  image: "assets/images/service-therapy.jpg",
  overview: "Кариес, текущие реставрации и воспаление пульпы лечим с изоляцией, увеличением и материалами под конкретную полость.",
  who: "Боль, чувствительность, сломанная пломба или зуб после эндодонтии, которому нужен пересмотр.",
  steps: ["Диагностика", "Анестезия и изоляция", "Лечение под микроскопом", "Восстановление или направление", "Контроль"],
  tech: "Микроскоп. Коффердам. КЛКТ при сложной анатомии."
})]);

pages.push(["services.html", wrap({
  file: "services.html",
  title: "Стоматологические услуги — Aurelia Dental",
  desc: "Виниры, импланты, отбеливание, ортодонтия и реставрационная стоматология в частной клинике Москвы.",
  canonical: "services.html",
  active: "services.html",
  body: `
<section class="page-hero">
  <div class="container page-hero__grid">
    <div>
      <nav class="breadcrumbs"><a href="index.html">Главная</a><span>/</span><span>Услуги</span></nav>
      <p class="eyebrow">Услуги</p>
      <h1>Лечение, разработанное вокруг вас.</h1>
    </div>
    <p class="lede">Каждый план начинается с диагностики. Страницы ниже описывают наш подход — не обещание конкретной улыбки.</p>
  </div>
</section>
<section class="section">
  <div class="container svc-index">
    ${[
      ["Эстетическая стоматология", [
        ["service-veneers.html", "service-veneers.jpg", "Виниры", "Керамика после mock-up, который можно примерить.", "2–4 визита · от 35 000 ₽"],
        ["service-whitening.html", "service-whitening.jpg", "Отбеливание зубов", "Клинический протокол после оценки эмали.", "60–90 мин · от 18 000 ₽"]
      ]],
      ["Имплантация", [
        ["service-implants.html", "service-implants.jpg", "Имплантация", "Навигационная хирургия и ортопедическое планирование на КЛКТ.", "от 1 визита · от 85 000 ₽"]
      ]],
      ["Ортодонтия", [
        ["service-orthodontics.html", "service-ortho.jpg", "Элайнеры и брекеты", "Выравнивание для взрослых с ретенцией в плане.", "6–18 мес. · от 120 000 ₽"]
      ]],
      ["Реставрация и терапия", [
        ["service-therapy.html", "service-therapy.jpg", "Терапия и лечение каналов", "Микроскопная стоматология и реставрации на годы.", "45–120 мин · от 8 500 ₽"],
        ["prices.html", "service-hygiene.jpg", "Гигиена и профилактика", "Поддерживающий уход для имплантов, виниров и дёсен.", "60 мин · от 5 500 ₽"],
        ["prices.html", "service-crowns.jpg", "Коронки и мосты", "Полностью керамические реставрации с учётом прикуса.", "2 визита · от 32 000 ₽"]
      ]]
    ].map(([cat, items]) => `<p class="cat-label">${cat}</p>` + items.map(([href, img, name, txt, meta]) => `
    <article>
      <div class="media"><img src="assets/images/${img}" alt="${name}" loading="lazy"></div>
      <div>
        <h3><a href="${href}">${name}</a></h3>
        <p class="muted">${txt}</p>
        <p class="caption" style="margin-top:8px">${meta}</p>
      </div>
      <a class="text-link" href="${href}"><span>Подробнее</span> ${ARROW}</a>
    </article>`).join("")).join("")}
  </div>
</section>`
})]);

const priceRows = [
  ["diagnostics", "Первичная консультация", "₽2 500", "45 минут"],
  ["diagnostics", "Повторная консультация", "₽1 800", "30 минут"],
  ["diagnostics", "ОПТГ", "₽2 200", ""],
  ["diagnostics", "КЛКТ, одна челюсть", "₽6 500", ""],
  ["diagnostics", "КЛКТ, обе челюсти", "₽9 800", ""],
  ["hygiene", "Профессиональная гигиена", "от ₽5 500", "Airflow + scaling"],
  ["hygiene", "Поддерживающий пародонтальный визит", "от ₽7 200", ""],
  ["therapy", "Композитная реставрация, 1 поверхность", "от ₽8 500", ""],
  ["therapy", "Лечение каналов, molar", "от ₽32 000", "Микроскоп"],
  ["surgery", "Простое удаление", "от ₽6 500", ""],
  ["surgery", "Удаление зуба мудрости", "от ₽16 000", ""],
  ["implants", "Установка импланта", "от ₽85 000", "Только имплант"],
  ["implants", "All-on-4, на челюсть", "от ₽390 000", "План после КЛКТ"],
  ["implants", "Коронка на имплант", "от ₽48 000", "Цирконий"],
  ["prosthetics", "Керамическая коронка", "от ₽32 000", "E.max / цирконий"],
  ["orthodontics", "Элайнеры, обе челюсти", "от ₽120 000", ""],
  ["orthodontics", "Брекеты керамические", "от ₽130 000", ""],
  ["aesthetics", "Профессиональное отбеливание", "от ₽18 000", "В клинике"],
  ["aesthetics", "Керамический винир", "от ₽35 000", ""],
  ["aesthetics", "Mock-up дизайна улыбки", "от ₽18 000", ""]
];

pages.push(["prices.html", wrap({
  file: "prices.html",
  title: "Цены на лечение — Aurelia Dental",
  desc: "Стартовые цены в рублях на диагностику, гигиену, терапию, импланты, ортодонтию и эстетику в Москве.",
  canonical: "prices.html",
  active: "prices.html",
  body: `
<section class="page-hero">
  <div class="container page-hero__grid">
    <div>
      <nav class="breadcrumbs"><a href="index.html">Главная</a><span>/</span><span>Цены</span></nav>
      <p class="eyebrow">Цены</p>
      <h1>Цены на лечение</h1>
    </div>
    <p class="lede">Figures below are starting prices in ₽. Итоговая стоимость определяется после диагностики и индивидуального плана лечения.</p>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="price-tabs" data-price-filters>
      ${[["all", "Все"], ["diagnostics", "Диагностика"], ["hygiene", "Гигиена"], ["therapy", "Терапия"], ["surgery", "Хирургия"], ["implants", "Импланты"], ["prosthetics", "Протезирование"], ["orthodontics", "Ортодонтия"], ["aesthetics", "Эстетика"]].map(([id, label], i) =>
        `<button type="button" data-filter="${id}" class="${i === 0 ? "is-active" : ""}">${label}</button>`
      ).join("")}
    </div>
    ${priceRows.map(([cat, name, price, note]) => `
    <div class="price-row" data-price-item data-cat="${cat}">
      <div><strong>${name}</strong>${note ? `<p class="caption">${note}</p>` : ""}</div>
      <span class="from">${price}</span>
    </div>`).join("")}
    <p class="price-note">Currency: Russian rouble. Demonstration fees for a private Moscow practice.</p>
    <p style="margin-top:32px"><button class="btn btn--primary" type="button" data-open-booking>Обсудить план ${ARROW}</button></p>
  </div>
</section>`
})]);

const docs = [
  ["volkov", "doctor-volkov.jpg", "01", "Александр Волков", "Ведущий имплантолог", "Имплантация · Хирургия", "17 лет"],
  ["morozova", "doctor-morozova.jpg", "02", "Елена Морозова", "Врач эстетической стоматологии", "Виниры · Дизайн улыбки", "14 лет"],
  ["sokolov", "doctor-sokolov.jpg", "03", "Дмитрий Соколов", "Ортодонт", "Элайнеры · Коррекция прикуса", "12 лет"],
  ["petrova", "doctor-petrova.jpg", "04", "Анна Петрова", "Эндодонт", "Терапия · Лечение каналов", "11 лет"],
  ["orlov", "doctor-orlov.jpg", "05", "Михаил Орлов", "Ортопед", "Коронки · Реставрация", "15 лет"],
  ["ivanova", "doctor-ivanova.jpg", "06", "София Иванова", "Пародонтолог", "Гигиена · Пародонтология", "9 лет"]
];

pages.push(["doctors.html", wrap({
  file: "doctors.html",
  title: "Наши врачи — Aurelia Dental",
  desc: "Имплантологи, эстетические стоматологи, ортодонты и терапевты клиники Aurelia Dental в Москве.",
  canonical: "doctors.html",
  active: "doctors.html",
  body: `
<section class="page-hero">
  <div class="container page-hero__grid">
    <div>
      <nav class="breadcrumbs"><a href="index.html">Главная</a><span>/</span><span>Врачи</span></nav>
      <p class="eyebrow">Команда</p>
      <h1>Наши врачи</h1>
    </div>
    <p class="lede">Специалисты, которые обсуждают ваш случай вместе. Обучение указано в каждом профиле.</p>
  </div>
</section>
<section class="section">
  <div class="container doctor-grid">
    ${docs.map(([id, img, num, name, role, spec, years]) => doctorCard(id, img, num, name, role, spec, years)).join("")}
  </div>
</section>`
})]);

pages.push(["doctor.html", wrap({
  file: "doctor.html",
  title: "Александр Волков — Aurelia Dental",
  desc: "Ведущий имплантолог клиники Aurelia Dental. Навигационная имплантация и полная реабилитация в Москве.",
  canonical: "doctor.html",
  active: "doctors.html",
  jsonld: { "@context": "https://schema.org", "@type": "Physician", name: "Александр Волков", jobTitle: "Ведущий имплантолог" },
  body: `
<article data-doctor-page>
<section class="page-hero">
  <div class="container doctor-hero">
    <div class="media reveal-img"><img data-d-image src="assets/images/doctor-volkov.jpg" alt="Александр Волков" width="900" height="1200"></div>
    <div>
      <nav class="breadcrumbs"><a href="index.html">Главная</a><span>/</span><a href="doctors.html">Врачи</a><span>/</span><span data-d-name>Александр Волков</span></nav>
      <p class="eyebrow" data-d-role>Ведущий имплантолог</p>
      <h1 data-d-name>Александр Волков</h1>
      <p class="meta-row" style="margin-top:20px"><span data-d-spec>Имплантация · Хирургия</span><span data-d-years>17 лет практики</span></p>
      <p class="approach" style="margin-top:32px" data-d-approach>Каждый случай имплантации — это архитектура: кость, прикус и видимая улыбка должны работать как единая система. Скорость никогда не цель. Стабильность — да.</p>
      <p style="margin-top:28px"><button class="btn btn--primary" type="button" data-open-booking>Записаться к врачу ${ARROW}</button></p>
    </div>
  </div>
</section>
<section class="section">
  <div class="container split">
    <div>
      <p class="eyebrow">Образование</p>
      <h2>Обучение</h2>
      <p class="muted" style="margin-top:12px" data-d-edu>Первый МГМУ им. Сеченова. Продвинутая имплантология, University of Bern.</p>
      <p class="eyebrow" style="margin-top:36px">Конференции</p>
      <p class="muted" data-d-conf>EAO Congress, ITI World Symposium, Московский форум цифровой имплантологии.</p>
    </div>
    <div>
      <p class="eyebrow">Фокус</p>
      <h2>Профессиональные интересы</h2>
      <p class="muted" style="margin-top:12px" data-d-interests>Протоколы немедленной нагрузки, цифровые хирургические шаблоны, полная реабилитация.</p>
    </div>
  </div>
</section>
<section class="section">
  <div class="container">
    <p class="eyebrow">Сертификаты</p>
    <h2>Непрерывное образование</h2>
    <div class="certs" data-d-certs style="margin-top:28px">
      <a href="assets/icons/certificate.svg" data-lightbox data-caption="European Association of Dental Имплантация"><span class="caption">Сертификат</span><strong class="serif" style="display:block;margin-top:12px;font-size:1.15rem">European Association of Dental Имплантация</strong></a>
    </div>
  </div>
</section>
</article>`
})]);

pages.push(["clinic.html", wrap({
  file: "clinic.html",
  title: "Наша клиника — Aurelia Dental",
  desc: "Приватные кабинеты, цифровая диагностика и спокойный интерьер на Большой Никитской в Москве.",
  canonical: "clinic.html",
  active: "clinic.html",
  body: `
<section class="page-hero">
  <div class="container page-hero__grid">
    <div>
      <nav class="breadcrumbs"><a href="index.html">Главная</a><span>/</span><span>Клиника</span></nav>
      <p class="eyebrow">Пространство</p>
      <h1>Наша клиника</h1>
    </div>
    <p class="lede">Создано для вашего комфорта: приватные кабинеты, продуманный свет и оборудование, которое не отвлекает, пока не нужно.</p>
  </div>
</section>
<section class="section">
  <div class="container mosaic">
    <a class="media" href="assets/images/clinic-reception.jpg" data-lightbox data-caption="Ресепшн клиники"><img src="assets/images/clinic-reception.jpg" alt="Современный ресепшн стоматологической клиники" loading="lazy"></a>
    <a class="media" href="assets/images/clinic-waiting.jpg" data-lightbox data-caption="Зона ожидания"><img src="assets/images/clinic-waiting.jpg" alt="Зона ожидания" loading="lazy"></a>
    <a class="media" href="assets/images/clinic-treatment.jpg" data-lightbox data-caption="Лечебный кабинет"><img src="assets/images/clinic-treatment.jpg" alt="Лечебный кабинет" loading="lazy"></a>
    <a class="media" href="assets/images/clinic-light.jpg" data-lightbox data-caption="Интерьер с дневным светом"><img src="assets/images/clinic-light.jpg" alt="Interior light" loading="lazy"></a>
  </div>
</section>
<section class="section">
  <div class="container split">
    <div data-reveal>
      <p class="eyebrow">Атмосфера</p>
      <h2>Приватность как клинический инструмент.</h2>
      <p class="muted" style="margin-top:16px">Каждый кабинет приватный. Консультации не проводятся в коридоре. Стерилизация по документированному циклу. Цифровые сканы заменяют многие аналоговые слепки.</p>
    </div>
    <div class="media reveal-img"><img src="assets/images/clinic-architecture.jpg" alt="Архитектура клиники" loading="lazy"></div>
  </div>
</section>
<section class="section">
  <div class="container tech-grid">
    <div class="media"><img src="assets/images/clinic-equipment.jpg" alt="Диагностика" loading="lazy"></div>
    <div class="media"><img src="assets/images/clinic-detail.jpg" alt="Деталь интерьера" loading="lazy"></div>
    <div class="media"><img src="assets/images/clinic-corridor.jpg" alt="Коридор" loading="lazy"></div>
  </div>
</section>`
})]);

pages.push(["about.html", wrap({
  file: "about.html",
  title: "О клинике Aurelia Dental",
  desc: "История частной московской клиники с 2014 года — цифровая диагностика, приватные кабинеты, эстетика и имплантация.",
  canonical: "about.html",
  active: "about.html",
  body: `
<section class="page-hero">
  <div class="container page-hero__grid">
    <div>
      <nav class="breadcrumbs"><a href="index.html">Главная</a><span>/</span><span>О клинике</span></nav>
      <p class="eyebrow">Клиника</p>
      <h1>Клиника с длинным вниманием к деталям.</h1>
    </div>
    <p class="lede">Aurelia открылась в 2014 как небольшая частная практика. Кабинеты менялись. Идея — нет: меньше пациентов в день, больше времени на план.</p>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="timeline">
      <div class="tl-item"><div class="tl-item__year">2014</div><div class="tl-item__dot"></div><p>Клиника открылась на Большой Никитской. Два кресла, один стандарт: неспешная диагностика.</p></div>
      <div class="tl-item"><div class="tl-item__year">2017</div><div class="tl-item__dot"></div><p>Цифровая диагностика — внутриротовое сканирование и протокол радиологии.</p></div>
      <div class="tl-item"><div class="tl-item__year">2020</div><div class="tl-item__dot"></div><p>Новые приватные кабинеты. Консультации полностью вне общих коридоров.</p></div>
      <div class="tl-item"><div class="tl-item__year">2024</div><div class="tl-item__dot"></div><p>Центр имплантологии с навигационной хирургией и временными реставрациями in-house.</p></div>
      <div class="tl-item"><div class="tl-item__year">2026</div><div class="tl-item__dot"></div><p>Новое поколение эстетики: сначала mock-up, затем керамика.</p></div>
    </div>
  </div>
</section>
<section class="band section">
  <div class="container" data-reveal>
    <p class="quote-xl">Мы не продаём улыбку. Мы продаём план, с которым можно жить.</p>
  </div>
</section>`
})]);

pages.push(["gallery.html", wrap({
  file: "gallery.html",
  title: "Галерея — Aurelia Dental",
  desc: "Фотографии клиники, команды, кабинетов и оборудования Aurelia Dental в Москве.",
  canonical: "gallery.html",
  active: "clinic.html",
  body: `
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumbs"><a href="index.html">Главная</a><span>/</span><span>Галерея</span></nav>
    <p class="eyebrow">Галерея</p>
    <h1>Тихие пространства. Рабочий свет.</h1>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="filters" data-gallery-filters>
      <button type="button" class="is-active" data-filter="all">Все</button>
      <button type="button" data-filter="clinic">Клиника</button>
      <button type="button" data-filter="team">Команда</button>
      <button type="button" data-filter="treatment">Лечение</button>
      <button type="button" data-filter="tech">Технологии</button>
      <button type="button" data-filter="details">Детали</button>
    </div>
    <div class="masonry">
      ${[
        ["clinic-reception.jpg", "clinic", "Ресепшн"],
        ["clinic-waiting.jpg", "clinic", "Зона ожидания"],
        ["clinic-treatment.jpg", "treatment", "Лечебный кабинет"],
        ["clinic-light.jpg", "clinic", "Дневной свет"],
        ["clinic-architecture.jpg", "clinic", "Архитектура"],
        ["clinic-equipment.jpg", "tech", "Оборудование"],
        ["clinic-detail.jpg", "details", "Деталь интерьера"],
        ["clinic-corridor.jpg", "clinic", "Коридор"],
        ["contact-space.jpg", "clinic", "Входная зона"],
        ["hero-clinic.jpg", "clinic", "Кабинет"],
        ["hero-detail.jpg", "details", "Инструменты"],
        ["doctor-volkov.jpg", "team", "Александр Волков"],
        ["doctor-morozova.jpg", "team", "Елена Морозова"],
        ["doctor-sokolov.jpg", "team", "Дмитрий Соколов"],
        ["doctor-petrova.jpg", "team", "Анна Петрова"],
        ["doctor-orlov.jpg", "team", "Михаил Орлов"],
        ["doctor-ivanova.jpg", "team", "София Иванова"],
        ["service-veneers.jpg", "treatment", "Эстетика"],
        ["service-implants.jpg", "treatment", "Имплантация"],
        ["service-whitening.jpg", "treatment", "Отбеливание"],
        ["tech-scanner.jpg", "tech", "Сканер"],
        ["tech-surgery.jpg", "tech", "Хирургический свет"],
        ["tech-room.jpg", "tech", "Клинический интерьер"],
        ["portrait-editorial.jpg", "details", "Естественная улыбка"],
        ["consultation.jpg", "treatment", "Консультация"],
        ["gallery-smile.jpg", "treatment", "Результат лечения"],
        ["journal-1.jpg", "details", "Журнал"],
        ["gallery-3.jpg", "clinic", "Интерьер"],
        ["gallery-4.jpg", "details", "Свет фасада"]
      ].map(([img, cat, cap]) => `
      <a href="assets/images/${img}" data-lightbox data-gallery-item data-cat="${cat}" data-caption="${cap}"><img src="assets/images/${img}" alt="${cap}" loading="lazy"></a>`).join("")}
    </div>
  </div>
</section>`
})]);

pages.push(["reviews.html", wrap({
  file: "reviews.html",
  title: "Отзывы пациентов — Aurelia Dental",
  desc: "Отзывы пациентов о лечении в клинике Aurelia Dental в Москве.",
  canonical: "reviews.html",
  active: "reviews.html",
  body: `
<section class="page-hero">
  <div class="container page-hero__grid">
    <div>
      <nav class="breadcrumbs"><a href="index.html">Главная</a><span>/</span><span>Отзывы</span></nav>
      <p class="eyebrow">Отзывы</p>
      <h1>Что люди запоминают.</h1>
    </div>
    <p class="lede">Эти тексты — редакционные реконструкции типичных отзывов. Мы не выдаём выдуманные рейтинги за медицинские утверждения.</p>
  </div>
</section>
<section class="section">
  <div class="container" style="display:grid;gap:8px">
    ${[
      ["Мария К.", "Виниры", "март 2026", "Весь опыт был невероятно продуманным. От первой консультации до финального результата — никто не торопил меня к чужой форме."],
      ["Андрей П.", "Имплантация", "январь 2026", "Никакого давления. Объяснили план имплантации, пока всё не стало очевидным — и просто сделали работу."],
      ["Елена С.", "Гигиена", "декабрь 2025", "Пришла на отбеливание, ушла с протоколом гигиены, который реально соблюдаю."],
      ["Игорь В.", "Элайнеры", "ноябрь 2025", "Ортодонтия для взрослых без школьных сценариев. Ретенция была частью плана с первого дня."],
      ["София Л.", "Коронки", "октябрь 2025", "Два визита, тихие кабинеты, коронка, о которой забываю, когда ем."],
      ["Павел Н.", "Консультация", "сентябрь 2025", "Отказали в лечении, которое я уже решил делать. Через неделю был благодарен."]
    ].map(([name, t, d, q]) => `
    <article class="review" data-reveal>
      <p class="stars">★★★★★</p>
      <blockquote>“${q}”</blockquote>
      <footer>${name} · ${t} · ${d}</footer>
    </article>`).join("")}
  </div>
</section>`
})]);

const articles = [
  ["veneers", "journal-1.jpg", "Эстетика", "12 марта 2026", "7 мин", "Как выбрать виниры, не потеряв свою улыбку"],
  ["implants", "journal-2.jpg", "Имплантация", "28 февраля 2026", "8 мин", "Чего ожидать от имплантации зубов"],
  ["whitening", "journal-3.jpg", "Эстетика", "4 февраля 2026", "5 мин", "Профессиональное отбеливание без мифов"],
  ["aligners", "journal-4.jpg", "Ортодонтия", "19 января 2026", "6 мин", "Как элайнеры реально двигают зубы"],
  ["hygiene", "journal-5.jpg", "Профилактика", "9 января 2026", "5 мин", "Гигиена, которая работает в реальной жизни"],
  ["consult", "journal-6.jpg", "Визит", "18 декабря 2025", "4 мин", "Как подготовиться к первой консультации"]
];

pages.push(["journal.html", wrap({
  file: "journal.html",
  title: "Журнал — Aurelia Dental",
  desc: "Статьи о винирах, имплантации, отбеливании, элайнерах и первом визите в клинику.",
  canonical: "journal.html",
  active: "journal.html",
  body: `
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumbs"><a href="index.html">Главная</a><span>/</span><span>Журнал</span></nav>
    <p class="eyebrow">Журнал</p>
    <h1>Журнал</h1>
  </div>
</section>
<section class="section">
  <div class="container">
    <div class="filters" data-journal-filters>
      <button type="button" class="is-active" data-filter="all">Все</button>
      <button type="button" data-filter="Эстетика">Эстетика</button>
      <button type="button" data-filter="Имплантация">Имплантация</button>
      <button type="button" data-filter="Ортодонтия">Ортодонтия</button>
      <button type="button" data-filter="Профилактика">Профилактика</button>
      <button type="button" data-filter="Визит">Визит</button>
    </div>
    <div class="journal-grid" style="grid-template-columns:1fr 1fr;gap:28px">
      ${articles.map(([slug, img, cat, date, time, title]) => `
      <a class="journal-card" href="article.html?slug=${slug}" data-journal-item data-cat="${cat}">
        <div class="media"><img src="assets/images/${img}" alt="" loading="lazy"></div>
        <p class="caption">${cat} · ${date} · ${time}</p>
        <h3>${title}</h3>
      </a>`).join("")}
    </div>
  </div>
</section>`
})]);

pages.push(["article.html", wrap({
  file: "article.html",
  title: "Как выбрать виниры — Журнал Aurelia",
  desc: "Руководство для пациентов о керамических винирах: mock-up, эмаль, оттенок и когда лечить не нужно.",
  canonical: "article.html",
  active: "journal.html",
  jsonld: { "@context": "https://schema.org", "@type": "Article", headline: "Как выбрать виниры, не потеряв свою улыбку", author: "Елена Морозова" },
  body: `
<article data-article-page>
<section class="page-hero">
  <div class="container" style="max-width:800px">
    <nav class="breadcrumbs"><a href="index.html">Главная</a><span>/</span><a href="journal.html">Журнал</a><span>/</span><span data-a-cat>Эстетика</span></nav>
    <p class="eyebrow"><span data-a-cat>Эстетика</span> · <span data-a-date>12 марта 2026</span> · <span data-a-time>7 мин чтения</span></p>
    <h1 data-a-title>Как выбрать виниры, не потеряв свою улыбку</h1>
    <p class="muted" style="margin-top:12px">Автор: <span data-a-author>Елена Морозова</span></p>
  </div>
</section>
<div class="container media article-hero__media">
  <img data-a-image src="assets/images/journal-1.jpg" alt="">
</div>
<div class="article">
  <p>Винир — тонкая керамическая накладка. И одновременно решение об идентичности. Пациенты часто приходят с чужой фотографией. Наша задача — вернуть разговор к вашей эмали, линии губ и тому, как вы уже смеётесь.</p>
  <h2>Начните с mock-up, а не с лаборатории</h2>
  <p>Прежде чем препарировать эмаль, мы создаём обратимую форму во рту. Вы должны говорить, пить и смотреть на дневной свет в этой форме. Если ощущение «костюма» — мы останавливаемся.</p>
  <blockquote>Естественность — не таблица оттенков. Естественность — как свет проходит через режущий край, когда вы не позируете.</blockquote>
  <p>Глубина препарирования следует за mock-up. Правило «один миллиметр для всех» — маркетинг, не стоматология.</p>
  <h2>Когда виниры — не тот инструмент</h2>
  <p>Активное заболевание дёсен, нестабильный прикус или нелеченый кариес — сначала. Отбеливание может быть достаточно, если нужен только цвет. Ортодонтия — если нужно только выравнивание.</p>
  <p>Цены от 35 000 ₽ за единицу после диагностики. Письменный план укажет количество зубов, тип керамики и включены ли временные реставрации.</p>
</div>
</article>
<section class="section">
  <div class="container">
    <p class="caption">Похожие статьи</p>
    <div class="related">
      <a class="journal-card" href="article.html?slug=whitening"><div class="media"><img src="assets/images/journal-3.jpg" alt="" loading="lazy"></div><h3>Профессиональное отбеливание</h3></a>
      <a class="journal-card" href="article.html?slug=implants"><div class="media"><img src="assets/images/journal-2.jpg" alt="" loading="lazy"></div><h3>Имплантация зубов</h3></a>
      <a class="journal-card" href="article.html?slug=consult"><div class="media"><img src="assets/images/journal-6.jpg" alt="" loading="lazy"></div><h3>Первая консультация</h3></a>
    </div>
  </div>
</section>`
})]);

pages.push(["contacts.html", wrap({
  file: "contacts.html",
  title: "Контакты Aurelia Dental",
  desc: "Адрес, телефон, часы работы и карта клиники Aurelia Dental на Большой Никитской в Москве.",
  canonical: "contacts.html",
  active: "contacts.html",
  body: `
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumbs"><a href="index.html">Главная</a><span>/</span><span>Контакты</span></nav>
    <p class="eyebrow">Визит</p>
    <h1 class="display" style="font-size:clamp(3rem,7vw,6.2rem)">Сделаем ваш следующий визит особенным.</h1>
  </div>
</section>
<section class="section">
  <div class="container contact-grid">
    <div>
      <p class="eyebrow">Клиника</p>
      <h2>Москва</h2>
      <address style="margin-top:20px">
        <p>Большая Никитская, 21, стр. 2<br>125009, Москва</p>
        <p style="margin-top:16px"><a href="tel:+74950000000">+7 (495) 000-00-00</a><br>
        <a href="mailto:hello@aurelia-dental.ru">hello@aurelia-dental.ru</a></p>
      </address>
      <dl class="hours" style="margin-top:28px">
        <dt>Понедельник–суббота</dt><dd>09:00–21:00</dd>
        <dt>Воскресенье</dt><dd>Выходной</dd>
      </dl>
      <div class="social-row">${SOCIAL_LINKS}
      </div>
      <p style="margin-top:32px"><button class="btn btn--primary" type="button" data-open-booking>Записаться на консультацию ${ARROW}</button></p>
    </div>
    <div>
      <div class="map">
        <iframe title="Карта — Aurelia Dental, Большая Никитская 21" src="https://maps.google.com/maps?q=Bolshaya%20Nikitskaya%2021%20Moscow&t=&z=16&ie=UTF8&iwloc=&output=embed" loading="lazy"></iframe>
      </div>
      <div class="media contact-photo"><img src="assets/images/contact-space.jpg" alt="Интерьер у входа в клинику" loading="lazy"></div>
    </div>
  </div>
</section>`
})]);

pages.push(["privacy.html", wrap({
  file: "privacy.html",
  title: "Политика конфиденциальности — Aurelia Dental",
  desc: "Политика конфиденциальности Aurelia Dental — обработка персональных данных на сайте и в клинике.",
  canonical: "privacy.html",
  active: "",
  body: `
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumbs"><a href="index.html">Главная</a><span>/</span><span>Конфиденциальность</span></nav>
    <h1>Политика конфиденциальности</h1>
    <p class="muted">Обновлено 1 марта 2026</p>
  </div>
</section>
<div class="legal">
  <h2>Кто мы</h2>
  <p>Aurelia Dental — частная стоматологическая клиника в Москве. Эта страница описывает, как мы обрабатываем данные, собранные через сайт и на приёмах.</p>
  <h2>Что мы собираем</h2>
  <p>Через форму консультации мы запрашиваем имя, телефон, услугу, дату и комментарий. В клинике также могут храниться медицинская история, снимки и записи лечения.</p>
  <h2>Зачем мы это делаем</h2>
  <ul>
    <li>Чтобы связаться с вами по поводу записи.</li>
    <li>Чтобы подготовить клинический визит.</li>
    <li>Для выполнения обязанностей по ведению медицинской документации.</li>
  </ul>
  <h2>Ваши запросы</h2>
  <p>Вы можете запросить информацию о хранимых данных и их исправление. Напишите на hello@aurelia-dental.ru.</p>
</div>`
})]);

pages.push(["terms.html", wrap({
  file: "terms.html",
  title: "Условия использования — Aurelia Dental",
  desc: "Условия использования сайта Aurelia Dental.",
  canonical: "terms.html",
  active: "",
  body: `
<section class="page-hero">
  <div class="container">
    <nav class="breadcrumbs"><a href="index.html">Главная</a><span>/</span><span>Условия</span></nav>
    <h1>Условия использования</h1>
    <p class="muted">Обновлено 1 марта 2026</p>
  </div>
</section>
<div class="legal">
  <h2>Сайт</h2>
  <p>Эти страницы представляют частную стоматологическую клинику. Контент носит информационный характер. Это не диагноз, не публичная оферта и не гарантия клинического результата.</p>
  <h2>Цены</h2>
  <p>Цены указаны в рублях как стартовые. Обязательная стоимость появляется только в индивидуальном плане после осмотра.</p>
  <h2>Запись</h2>
  <p>Онлайн-форма — заявка, а не подтверждённый слот. Координатор позвонит для подтверждения времени и специалиста.</p>
  <h2>Контакты</h2>
  <p>Большая Никитская, 21, стр. 2, Москва · hello@aurelia-dental.ru · +7 (495) 000-00-00</p>
</div>`
})]);

pages.push(["404.html", wrap({
  file: "404.html",
  title: "Страница не найдена — Aurelia Dental",
  desc: "Запрошенная страница не существует на сайте Aurelia Dental.",
  canonical: "404.html",
  active: "",
  body: `
<section class="error-page">
  <div>
    <p class="eyebrow">Ошибка</p>
    <p class="display">404</p>
    <h1 class="h2" style="margin:12px 0 28px">Такой страницы нет.</h1>
    <a class="btn btn--primary" href="index.html">На главную ${ARROW}</a>
  </div>
</section>`
})]);

pages.forEach(([name, html]) => {
  fs.writeFileSync(path.join(ROOT, name), html);
  console.log("wrote", name);
});

fs.copyFileSync(path.join(ROOT, "journal.html"), path.join(ROOT, "blog.html"));
fs.copyFileSync(path.join(ROOT, "article.html"), path.join(ROOT, "blog-article.html"));
fs.copyFileSync(path.join(ROOT, "service-implants.html"), path.join(ROOT, "service-implantation.html"));
console.log("aliases blog.html, blog-article.html, service-implantation.html");

const loc = [
  "", "services.html", "service-veneers.html", "service-implants.html", "service-whitening.html",
  "service-orthodontics.html", "service-therapy.html", "doctors.html", "doctor.html", "prices.html",
  "clinic.html", "about.html", "gallery.html", "reviews.html", "journal.html", "article.html",
  "contacts.html", "privacy.html", "terms.html"
];
fs.writeFileSync(path.join(ROOT, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${loc.map((u) => `  <url><loc>https://aurelia.dental/${u}</loc></url>`).join("\n")}
</urlset>
`);
fs.writeFileSync(path.join(ROOT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
console.log("sitemap + robots");
