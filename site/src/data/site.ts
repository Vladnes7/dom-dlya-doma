// Факты собраны с domdladoma.ru и карточки Яндекс.Карт (24.10.2026).

export const PHONE_DISPLAY = "+7 (991) 215-08-62";
export const PHONE_HREF = "tel:+79912150862";
export const WHATSAPP_HREF = `https://wa.me/79912150862?text=${encodeURIComponent(
  "Здравствуйте! Хочу забронировать стол. Дата и время: , гостей: ",
)}`;
export const EMAIL = "domdladoma833@gmail.com";
export const VK_HREF = "https://vk.com/cafeddd";
export const YANDEX_ORG_HREF = "https://yandex.ru/maps/org/dom_dlya_doma/1078312322/";
export const YANDEX_REVIEWS_HREF = "https://yandex.ru/maps/org/dom_dlya_doma/1078312322/reviews/";
export const YANDEX_ROUTE_HREF = "https://yandex.ru/maps/?rtext=~55.118931%2C36.598918&rtt=auto";

export const ADDRESS = "Обнинск, проспект Маркса, 61";
export const ADDRESS_NOTE = "2 этаж торгового центра «Дом для дома»";

export const RATING = { value: 4.5, votes: 2028, reviews: 579 };

// 0 = воскресенье, как в Date.getDay()
export const HOURS: { days: number[]; label: string; time: string }[] = [
  { days: [1, 2, 3, 4], label: "Пн–Чт", time: "12:00–23:00" },
  { days: [5, 6], label: "Пт–Сб", time: "12:00–02:00" },
  { days: [0], label: "Вс", time: "12:00–23:00" },
];

export const FEATURES = [
  { icon: "tv", text: "Трансляции матчей" },
  { icon: "wifi", text: "Wi‑Fi" },
  { icon: "car", text: "Парковка у ТЦ" },
  { icon: "bag", text: "Доставка и навынос" },
  { icon: "coffee", text: "Кофе с собой" },
  { icon: "gift", text: "Подарочный сертификат" },
] as const;

export type Hit = {
  title: string;
  price: string;
  note: string;
  img: string;
  w: number;
  h: number;
  quote?: { text: string; author: string };
};

// Фото: профессиональная съёмка из карточки Яндекс.Карт.
export const HITS: Hit[] = [
  {
    title: "Борщ с пампушками",
    price: "450 ₽",
    note: "С домашним салом, зелёным луком и сметаной",
    img: "/img/borsch.jpg",
    w: 2400,
    h: 1800,
    quote: { text: "Вкусный борщ и свинина под сливочно-горчичным соусом.", author: "Иван Макурин" },
  },
  {
    title: "Стейк из свинины на гриле",
    price: "640 ₽",
    note: "На кости, выход 140/90/40 г",
    img: "/img/steak.jpg",
    w: 2000,
    h: 1500,
  },
  {
    title: "Бургер с говядиной",
    price: "580 ₽",
    note: "Котлета из говядины, чеддер, бекон, соус BBQ",
    img: "/img/burger.jpg",
    w: 1800,
    h: 1350,
    quote: {
      text: "Не все знают, что и бургеры здесь готовят тоже лучшие в мире.",
      author: "Andrey",
    },
  },
  {
    title: "Бефстроганов с грибами",
    price: "750 ₽",
    note: "С пюре и маринованными огурчиками",
    img: "/img/befstroganov.jpg",
    w: 1800,
    h: 1350,
  },
  {
    title: "Свинина под сливочно-горчичным соусом",
    price: "640 ₽",
    note: "Медальоны под соусом из сливок и дижонской горчицы",
    img: "/img/svinina.jpg",
    w: 1800,
    h: 1350,
  },
  {
    title: "Винная тарелка",
    price: "650 ₽",
    note: "Пармезан, дорблю, чеддер, сыровяленое мясо, мёд, миндаль",
    img: "/img/vinnaya.jpg",
    w: 1800,
    h: 1350,
  },
  {
    title: "Солянка сборная мясная",
    price: "430 ₽",
    note: "Со сметаной, 300 г",
    img: "/img/solyanka.jpg",
    w: 1800,
    h: 1350,
  },
  {
    title: "Штрудель яблочный",
    price: "340 ₽",
    note: "Подаётся с мороженым",
    img: "/img/shtrudel.jpg",
    w: 1800,
    h: 1350,
  },
];

export type Review = { text: string; author: string; date: string };

// Отзывы с Яндекс.Карт: сокращены, поправлены только пунктуация и опечатки.
export const REVIEW_MAIN: Review = {
  text: "Наше любимое семейное кафе с 2008 года. Самая вкусная, по моему личному мнению, кухня в городе. Все праздники и гастрономические вылазки стараемся устраивать именно в ДДД.",
  author: "Андрей",
  date: "июнь 2025",
};

export const REVIEWS: Review[] = [
  {
    text: "Здесь неизменно комфортно, уютно и стабильно вкусно, из года в год. Настоящий островок тепла и надежности, куда всегда приятно возвращаться.",
    author: "Анастасия",
    date: "",
  },
  {
    text: "Ожидание по бару и кухне вообще не было, все быстро принесли. Вкусный борщ и свинина под сливочно-горчичным соусом.",
    author: "Иван Макурин",
    date: "",
  },
  {
    text: "Приятно провести время как с друзьями, так и вдвоём. Кухня порадовала: всё вкусно, красиво подано и порции хорошие.",
    author: "Артём Григорьев",
    date: "",
  },
  {
    text: "ВСЕ ОЧЕНЬ БЫСТРО готовят, как в фастфуде, только по домашнему.",
    author: "Алекс",
    date: "сентябрь 2020",
  },
  {
    text: "Сегодня думали поменять на что-то другое, но общим голосованием было принято решение опять идти в «Дом для дома».",
    author: "Анна Ежовна",
    date: "май 2024",
  },
  {
    text: "Кафе достойное, без всякой там суеты. Обстановка приятная, персонал тоже на уровне.",
    author: "Andrey",
    date: "октябрь 2024",
  },
];

export const NAV = [
  { href: "#mesto", label: "О месте" },
  { href: "#menu", label: "Меню" },
  { href: "#otzyvy", label: "Отзывы" },
  { href: "#bron", label: "Контакты" },
];
