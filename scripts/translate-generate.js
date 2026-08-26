/**
 * Applies Russian translations to generate-pages.js remaining English strings.
 * Run: node scripts/translate-generate.js && node scripts/generate-pages.js
 */
const fs = require("fs");
const path = require("path");
const file = path.join(__dirname, "..", "scripts", "generate-pages.js");
let s = fs.readFileSync(file, "utf8");

const pairs = [
  ["03 — Featured", "03 — Избранное"],
  ["Ceramic veneers, without the costume smile.", "Керамические виниры без «театральной» улыбки."],
  ["Photography first, a reversible mock-up second. Only then ceramics. From ₽35,000 per unit after diagnostics.", "Сначала фотография, затем обратимый mock-up. И только потом керамика. От 35 000 ₽ за единицу после диагностики."],
  ["Read about veneers", "О винирах"],
  ["Editorial portrait illustrating aesthetic dentistry", "Естественная улыбка после эстетического лечения"],
  ["04 — People", "04 — Врачи"],
  ["The doctors behind the work.", "Специалисты за каждым результатом."],
  ["All doctors", "Все врачи"],
  ["Dr. Alexander Volkov", "Александр Волков"],
  ["Dr. Elena Morozova", "Елена Морозова"],
  ["Dr. Dmitry Sokolov", "Дмитрий Соколов"],
  ["Implantology", "Имплантация"],
  ["Aesthetics", "Эстетика"],
  ["Orthodontics", "Ортодонтия"],
  ["17 years", "17 лет"],
  ["14 years", "14 лет"],
  ["12 years", "12 лет"],
  ["05 — Space", "05 — Пространство"],
  ["Designed around your comfort.", "Интерьер, созданный для вашего комфорта."],
  ["Private rooms and a quiet pace.", "Приватные кабинеты и спокойный ритм."],
  ["See the clinic", "Посмотреть клинику"],
  ["Clinic reception", "Ресепшн клиники"],
  ["Waiting lounge", "Зона ожидания"],
  ["Treatment room", "Лечебный кабинет"],
  ["Daylight in the clinic", "Дневной свет в клинике"],
  ["06 — Results", "06 — Результаты"],
  ["Before, after — and the work in between.", "До, после — и работа между ними."],
  ["Illustrative portraits. Individual outcomes depend on enamel, gums and the plan we build together.", "Иллюстративные портреты. Индивидуальный результат зависит от эмали, дёсен и согласованного плана."],
  ["Before and after comparison", "Сравнение до и после"],
  ["Before treatment, illustrative", "До лечения, иллюстрация"],
  ["After treatment, illustrative", "После лечения, иллюстрация"],
  [">Before<", ">До<"],
  [">After<", ">После<"],
  ["07 — Technology", "07 — Технологии"],
  ["Quiet instruments. Loud standards.", "Тихие инструменты. Высокие стандарты."],
  ["CBCT, intraoral scanning and guided implantology — used when they change the plan, not as decoration.", "КЛКТ, внутриротовое сканирование и навигационная имплантация — когда они меняют план, а не как декор."],
  ["Surgical lights", "Хирургическое освещение"],
  ["Digital diagnostics", "Цифровая диагностика"],
  ["Clinical interior", "Клинический интерьер"],
  ["08 — Voices", "08 — Отзывы"],
  ["What patients notice first.", "Что пациенты замечают в первую очередь."],
  ["All reviews", "Все отзывы"],
  ["09 — Fees", "09 — Цены"],
  ["Transparent starting prices.", "Прозрачные стартовые цены."],
  ["Full list", "Полный прайс"],
  ["Primary consultation", "Первичная консультация"],
  ["Professional hygiene", "Профессиональная гигиена"],
  ["Professional whitening", "Профессиональное отбеливание"],
  ["Ceramic veneer, per unit", "Керамический винир"],
  ["Dental implant placement", "Установка импланта"],
  ["The final cost is determined after diagnostics and an individual treatment plan.", "Итоговая стоимость определяется после диагностики и индивидуального плана лечения."],
  ["10 — Journal", "10 — Журнал"],
  ["Reading before the appointment.", "Читать перед визитом."],
  ["All essays", "Все статьи"],
  ["How to choose veneers without losing what makes a smile yours", "Как выбрать виниры, не потеряв свою улыбку"],
  ["What to expect from dental implantation", "Чего ожидать от имплантации зубов"],
  ["Professional whitening, explained without the myths", "Профессиональное отбеливание без мифов"],
  ["Precision", "Точность"],
  ["Your smile.<br>Our precision.", "Ваша улыбка.<br>Наша точность."],
  ["Dental instruments in soft light", "Стоматологические инструменты в мягком свете"],
  ['aria-label="Breadcrumb"><a href="index.html">Home</a>', 'aria-label="Хлебные крошки"><a href="index.html">Главная</a>'],
  ['<a href="index.html">Home</a>', '<a href="index.html">Главная</a>'],
  [">Services<", ">Услуги<"],
  [">Doctors<", ">Врачи<"],
  [">Clinic<", ">Клиника<"],
  [">Prices<", ">Цены<"],
  [">Journal<", ">Журнал<"],
  [">About<", ">О клинике<"],
  [">Contacts<", ">Контакты<"],
  [">Gallery<", ">Галерея<"],
  [">Reviews<", ">Отзывы<"],
  [">Terms<", ">Условия<"],
  [">Privacy<", ">Конфиденциальность<"],
  ["Treatment", "Лечение"],
  [">From<", ">От<"],
  [">Time<", ">Срок<"],
  [">Doctor<", ">Врач<"],
  ["Book a consultation", "Записаться на консультацию"],
  ["Book with this doctor", "Записаться к врачу"],
  ["01 — Overview", "01 — Обзор"],
  ["A clear clinical idea.", "Понятная клиническая задача."],
  ["02 — Who it is for", "02 — Кому подходит"],
  ["03 — Process", "03 — Процесс"],
  ["How the work unfolds.", "Как проходит лечение."],
  ["04 — Technology", "04 — Технологии"],
  ["05 — Results", "05 — Результаты"],
  ["What we look for.", "На что мы ориентируемся."],
  ["Before and after", "До и после"],
  ["Before, illustrative", "До, иллюстрация"],
  ["After, illustrative", "После, иллюстрация"],
  ["Photographs are illustrative. Your result depends on diagnostics and the agreed plan.", "Фотографии иллюстративны. Ваш результат зависит от диагностики и согласованного плана."],
  ["06 — Fee", "06 — Стоимость"],
  ["The final cost is confirmed after examination, imaging and a written plan.", "Итоговая стоимость подтверждается после осмотра, снимков и письменного плана."],
  ["View the team", "Вся команда"],
  ["Ceramic veneers", "Керамические виниры"],
  ["Dental implantation", "Имплантация зубов"],
  ["Professional whitening", "Профессиональное отбеливание"],
  ["Clear aligners & bite correction", "Элайнеры и коррекция прикуса"],
  ["Therapy under the microscope", "Терапия под микроскопом"],
  ["Dental treatments — Aurelia Dental", "Стоматологические услуги — Aurelia Dental"],
  ["Treatments designed around you.", "Лечение, разработанное вокруг вас."],
  ["Care", "Услуги"],
  ["Each plan starts with diagnostics. The pages below describe how we work — not a promise of a particular smile.", "Каждый план начинается с диагностики. Страницы ниже описывают наш подход — не обещание конкретной улыбки."],
  ["Aesthetic dentistry", "Эстетическая стоматология"],
  ["Veneers", "Виниры"],
  ["Teeth whitening", "Отбеливание зубов"],
  ["Dental implants", "Имплантация"],
  ["Clear aligners & braces", "Элайнеры и брекеты"],
  ["Restorative & general", "Реставрация и терапия"],
  ["Therapy & root canal treatment", "Терапия и лечение каналов"],
  ["Hygiene & prevention", "Гигиена и профилактика"],
  ["Crowns & bridges", "Коронки и мосты"],
  ["Details", "Подробнее"],
  ["Dental treatment prices — Aurelia Dental", "Цены на лечение — Aurelia Dental"],
  ["Fees", "Цены"],
  ["Dental treatment prices", "Цены на лечение"],
  ["Figures below are starting prices in ₽. The final cost is determined after diagnostics and an individual treatment plan.", "Цены ниже указаны в ₽ как стартовые. Итоговая стоимость определяется после диагностики и индивидуального плана."],
  ["All", "Все"],
  ["Diagnostics", "Диагностика"],
  ["Hygiene", "Гигиена"],
  ["Therapy", "Терапия"],
  ["Surgery", "Хирургия"],
  ["Implants", "Импланты"],
  ["Prosthetics", "Протезирование"],
  ["Discuss a plan", "Обсудить план"],
  ["Our doctors — Aurelia Dental", "Наши врачи — Aurelia Dental"],
  ["Team", "Команда"],
  ["Our doctors", "Наши врачи"],
  ["Specialists who still sit in the same conference about your case. Training is listed on each profile.", "Специалисты, которые обсуждают ваш случай вместе. Обучение указано в каждом профиле."],
  ["Lead implantologist", "Ведущий имплантолог"],
  ["Aesthetic dentist", "Врач эстетической стоматологии"],
  ["Orthodontist", "Ортодонт"],
  ["Endodontist", "Эндодонт"],
  ["Prosthodontist", "Ортопед"],
  ["Periodontist", "Пародонтолог"],
  ["Implantology · Oral surgery", "Имплантация · Хирургия"],
  ["Veneers · Smile design", "Виниры · Дизайн улыбки"],
  ["Aligners · Bite correction", "Элайнеры · Коррекция прикуса"],
  ["Therapy · Root canal treatment", "Терапия · Лечение каналов"],
  ["Crowns · Restorative dentistry", "Коронки · Реставрация"],
  ["Hygiene · Periodontology", "Гигиена · Пародонтология"],
  ["17 years of practice", "17 лет практики"],
  ["Education", "Образование"],
  ["Training", "Обучение"],
  ["Conferences", "Конференции"],
  ["Focus", "Фокус"],
  ["Professional interests", "Профессиональные интересы"],
  ["Certificates", "Сертификаты"],
  ["Continuing education", "Непрерывное образование"],
  ["Certificate", "Сертификат"],
  ["Our clinic — Aurelia Dental", "Наша клиника — Aurelia Dental"],
  ["Space", "Пространство"],
  ["Our clinic", "Наша клиника"],
  ["Designed around your comfort: private rooms, measured light, and equipment that stays in the background until it is needed.", "Создано для вашего комфорта: приватные кабинеты, продуманный свет и оборудование, которое не отвлекает, пока не нужно."],
  ["Reception", "Ресепшн"],
  ["Daylight interior", "Интерьер с дневным светом"],
  ["How it feels", "Атмосфера"],
  ["Privacy as a clinical tool.", "Приватность как клинический инструмент."],
  ["Each treatment room is private. Consultations are not held in a corridor. Sterilisation follows a documented cycle. Digital scans replace many analogue impressions.", "Каждый кабинет приватный. Консультации не проводятся в коридоре. Стерилизация по документированному циклу. Цифровые сканы заменяют многие аналоговые слепки."],
  ["Architecture around the clinic", "Архитектура клиники"],
  ["Interior detail", "Деталь интерьера"],
  ["Circulation", "Коридор"],
  ["About Aurelia Dental", "О клинике Aurelia Dental"],
  ["Studio", "Клиника"],
  ["A clinic with a long attention span.", "Клиника с длинным вниманием к деталям."],
  ["Aurelia opened in 2014 as a small private practice. The rooms have changed. The idea has not: fewer patients per day, more time per plan.", "Aurelia открылась в 2014 как небольшая частная практика. Кабинеты менялись. Идея — нет: меньше пациентов в день, больше времени на план."],
  ["We do not sell a smile. We sell a plan you can live with.", "Мы не продаём улыбку. Мы продаём план, с которым можно жить."],
  ["Gallery — Aurelia Dental", "Галерея — Aurelia Dental"],
  ["Archive", "Галерея"],
  ["Still rooms. Working light.", "Тихие пространства. Рабочий свет."],
  ["Team", "Команда"],
  ["Technology", "Технологии"],
  ["Details", "Детали"],
  ["Architecture", "Архитектура"],
  ["Lounge", "Зона ожидания"],
  ["Instruments", "Инструменты"],
  ["Facade light", "Свет фасада"],
  ["Patient reviews — Aurelia Dental", "Отзывы пациентов — Aurelia Dental"],
  ["Voices", "Отзывы"],
  ["What people remember.", "Что люди запоминают."],
  ["These notes are editorial reconstructions of typical feedback. We do not display invented star ratings as medical claims.", "Эти тексты — редакционные реконструкции типичных отзывов. Мы не выдаём выдуманные рейтинги за медицинские утверждения."],
  ["Journal — Aurelia Dental", "Журнал — Aurelia Dental"],
  ["Reading", "Журнал"],
  ["Prevention", "Профилактика"],
  ["Visit", "Визит"],
  ["How to choose veneers — Aurelia Journal", "Как выбрать виниры — Журнал Aurelia"],
  ["7 min read", "7 мин чтения"],
  ["Related", "Похожие статьи"],
  ["First consultation", "Первая консультация"],
  ["Contact Aurelia Dental", "Контакты Aurelia Dental"],
  ["Let's make your next visit different.", "Сделаем ваш следующий визит особенным."],
  ["Monday–Saturday", "Понедельник–суббота"],
  ["Sunday", "Воскресенье"],
  ["Closed", "Выходной"],
  ["Privacy policy — Aurelia Dental", "Политика конфиденциальности — Aurelia Dental"],
  ["Privacy policy", "Политика конфиденциальности"],
  ["Terms of use — Aurelia Dental", "Условия использования — Aurelia Dental"],
  ["Terms of use", "Условия использования"],
  ["Page not found — Aurelia Dental", "Страница не найдена — Aurelia Dental"],
  ["This page doesn't exist.", "Такой страницы нет."],
  ["Return home", "На главную"],
  ["Book a visit", "Записаться"],
  ["Dr. Anna Petrova", "Анна Петрова"],
  ["Dr. Mikhail Orlov", "Михаил Орлов"],
  ["Dr. Sofia Ivanova", "София Иванова"],
  ["11 years", "11 лет"],
  ["15 years", "15 лет"],
  ["9 years", "9 лет"]
];

for (const [from, to] of pairs) {
  s = s.split(from).join(to);
}

// Fix typo from partial replace
s = s.replace("Елена Морozova", "Елена Морозова");

// servicePage Russian template
s = s.replace(
  `function servicePage(opts) {
  return wrap({
    file: opts.file,
    title: opts.title + " — Aurelia Dental",
    desc: opts.lead,
    canonical: opts.file,
    active: "services.html",
    jsonld: { "@context": "https://schema.org", "@type": "MedicalProcedure", name: opts.title, description: opts.lead },
    body: \`
<section class="page-hero">
  <div class="container page-hero__grid">
    <div>
      <nav class="breadcrumbs" aria-label="Хлебные крошки"><a href="index.html">Главная</a><span>/</span><a href="services.html">Услуги</a><span>/</span><span>\${opts.title}</span></nav>
      <p class="eyebrow">Лечение</p>
      <h1>\${opts.title}</h1>
      <p class="lede" style="margin-top:20px">\${opts.lead}</p>
    </div>
    <div>
      <div class="service-meta">
        <div><span>От</span><strong>\${opts.price}</strong></div>
        <div><span>Срок</span><strong>\${opts.duration}</strong></div>
        <div><span>Врач</span><strong>\${opts.doctor}</strong></div>
      </div>
      <p style="margin-top:24px"><button class="btn btn--primary" type="button" data-open-booking>Записаться на консультацию \${ARROW}</button></p>
    </div>
  </div>
</section>
<section class="section">
  <div class="container split">
    <div class="media reveal-img"><img src="\${opts.image}" alt="\${opts.title} — Aurelia Dental" width="1000" height="1250"></div>
    <div data-reveal>
      <p class="eyebrow">01 — Обзор</p>
      <h2>Понятная клиническая задача.</h2>
      <p class="muted" style="margin-top:16px">\${opts.overview}</p>
      <p class="eyebrow" style="margin-top:40px">02 — Кому подходит</p>
      <p class="muted" style="margin-top:12px">\${opts.who}</p>
    </div>
  </div>
</section>`,
  `function servicePage(opts) {
  return wrap({
    file: opts.file,
    title: opts.title + " — Aurelia Dental",
    desc: opts.lead,
    canonical: opts.file,
    active: "services.html",
    jsonld: { "@context": "https://schema.org", "@type": "MedicalProcedure", name: opts.title, description: opts.lead },
    body: \`
<section class="page-hero page-hero--service">
  <div class="hero__media" style="position:absolute;inset:0;max-height:520px">
    <img src="\${opts.image}" alt="\${opts.title}" width="1800" height="900" style="width:100%;height:100%;object-fit:cover">
    <div class="hero__shade"></div>
  </div>
  <div class="container page-hero__grid" style="position:relative;z-index:2;color:#fff;padding-top:calc(var(--header-h) + 48px)">
    <div>
      <nav class="breadcrumbs" aria-label="Хлебные крошки"><a href="index.html">Главная</a><span>/</span><a href="services.html">Услуги</a><span>/</span><span>\${opts.title}</span></nav>
      <p class="eyebrow">Лечение</p>
      <h1>\${opts.title}</h1>
      <p class="lede" style="margin-top:20px;max-width:48ch">\${opts.lead}</p>
    </div>
    <div>
      <div class="service-meta" style="background:rgba(255,255,255,.92);color:var(--text);padding:24px;border-radius:8px">
        <div><span>От</span><strong>\${opts.price}</strong></div>
        <div><span>Срок</span><strong>\${opts.duration}</strong></div>
        <div><span>Врач</span><strong>\${opts.doctor}</strong></div>
      </div>
      <p style="margin-top:24px"><button class="btn btn--gold" type="button" data-open-booking>Записаться на консультацию \${ARROW}</button></p>
    </div>
  </div>
</section>
<section class="section">
  <div class="container split">
    <div class="media reveal-img"><img src="\${opts.image}" alt="\${opts.title} — Aurelia Dental" width="1000" height="1250"></div>
    <div data-reveal>
      <p class="eyebrow">01 — Обзор</p>
      <h2>Понятная клиническая задача.</h2>
      <p class="muted" style="margin-top:16px">\${opts.overview}</p>
      <p class="eyebrow" style="margin-top:40px">02 — Кому подходит</p>
      <p class="muted" style="margin-top:12px">\${opts.who}</p>
    </div>
  </div>
</section>`
);

fs.writeFileSync(file, s);
console.log("Russian patch applied to generate-pages.js");
