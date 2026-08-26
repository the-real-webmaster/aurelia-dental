# Aurelia Dental

**Премиальный сайт частной стоматологической клиники** — светлая editorial-эстетика, плавные анимации, полная адаптивность и SEO-готовность.

![Главная страница Aurelia Dental](assets/images/hero-clinic.jpg)

---

## О проекте

**Aurelia Dental** — коммерческий концепт сайта стоматологии в Москве. Проект демонстрирует современный подход к медицинскому веб-дизайну: спокойная палитра, продуманная типографика, реалистичный русскоязычный контент и тонкие интерактивные детали без перегруза.

Сайт готов к демонстрации клиенту, публикации в портфолио и передаче frontend-команде.

---

## Возможности

| Раздел | Что реализовано |
|--------|-----------------|
| **Дизайн** | Светлый luxury UI, editorial-карточки, тёплая нейтральная палитра |
| **Анимации** | GSAP ScrollTrigger, stagger-reveal, parallax, плавная прокрутка Lenis |
| **Навигация** | Sticky header, мобильное меню, блокировка скролла, закрытие по ESC |
| **Формы** | Модальное окно записи, валидация полей, экран успешной отправки |
| **Интерактив** | Слайдер «до/после», lightbox галереи, FAQ-аккордеон |
| **Врачи** | Карточки и динамические страницы профилей |
| **SEO** | Meta-теги, Open Graph, Schema.org, sitemap, robots.txt |
| **Доступность** | Skip-link, focus-visible, ARIA, reduced motion, клавиатурная навигация |
| **Мобильная версия** | Touch-контролы, фиксированная CTA-кнопка, адаптация 360–430 px |

---

## Страницы

| Страница | Файл |
|----------|------|
| Главная | `index.html` |
| Услуги | `services.html` |
| Детали услуг | `service-veneers.html`, `service-implants.html`, `service-whitening.html`, `service-orthodontics.html`, `service-therapy.html` |
| Врачи | `doctors.html` |
| Профиль врача | `doctor.html?id=volkov` |
| Цены | `prices.html` |
| Клиника | `clinic.html` |
| О клинике | `about.html` |
| Галерея | `gallery.html` |
| Отзывы | `reviews.html` |
| Журнал | `journal.html` |
| Статья | `article.html?slug=veneers` |
| Контакты | `contacts.html` |
| Конфиденциальность / Условия | `privacy.html`, `terms.html` |
| 404 | `404.html` |

---

## Стек технологий

- **HTML5** — семантическая разметка
- **CSS3** — custom properties, Grid, Flexbox, responsive typography
- **JavaScript** — vanilla IIFE-модули, без сборщика
- **[GSAP 3.12](https://greensock.com/gsap/)** + ScrollTrigger
- **[Lenis 1.1](https://github.com/darkroomengineering/lenis)** — плавная прокрутка на desktop
- **Google Fonts** — Cormorant Garamond, Manrope
- **JPEG / SVG** — curated-фотографии и иконки

---

## Дизайн-система

**Стиль:** light luxury · warm ivory · editorial medical

| Токен | Значение |
|-------|----------|
| Фоны | тёплый белый, ivory, мягкий крем |
| Текст | charcoal, глубокий графит |
| Акцент | приглушённое шампанское золото |
| Скругления | 2 px (минимальные) |
| Границы | тонкие линии вместо тяжёлых теней |
| Заголовки | крупный serif (Cormorant Garamond) |
| Основной текст | Manrope |

---

## Адаптивность

Поддерживаемые breakpoints:

`360px` · `375px` · `390px` · `414px` · `430px` · `768px` · `992px` · `1024px` · `1280px` · `1440px` · `1600px` · `1920px`

---

## Запуск локально

Сборка не требуется — проект полностью статический.

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Откройте `http://localhost:8080`

### Загрузка изображений (если папка пуста)

```bash
node scripts/download-images.js
```

### Перегенерация HTML-страниц (опционально)

```bash
node scripts/generate-pages.js
```

---

## Структура проекта

```
aurelia-dental/
├── index.html
├── services.html, doctors.html, contacts.html …
├── css/
│   ├── style.css          # Дизайн-система и компоненты
│   └── responsive.css     # Breakpoints и мобильная версия
├── js/
│   ├── main.js            # Курсор, before/after, счётчики
│   ├── navigation.js      # Header и мобильное меню
│   ├── booking.js         # Форма записи
│   ├── scroll-lock.js     # Блокировка скролла
│   ├── animations.js      # GSAP + Lenis
│   ├── lightbox.js        # Галерея
│   └── data.js            # Данные врачей и статей
├── assets/
│   ├── images/
│   └── icons/
├── scripts/
│   ├── generate-pages.js
│   └── download-images.js
├── sitemap.xml
└── robots.txt
```

---

## Лицензия

Концепт / portfolio project. Название бренда и материалы используются в демонстрационных целях.
