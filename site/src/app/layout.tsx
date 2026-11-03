import type { Metadata, Viewport } from "next";
import { Golos_Text, Playfair_Display } from "next/font/google";
import { ADDRESS, PHONE_DISPLAY } from "@/data/site";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin", "cyrillic"],
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
});

const golos = Golos_Text({
  variable: "--font-golos",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://domdladoma.ru"),
  // Демо для показа владельцу: закрыто от поисковиков до его согласия. Убрать при запуске на domdladoma.ru.
  robots: { index: false, follow: false },
  title: "Дом для дома: кафе и бар в Обнинске на проспекте Маркса, 61",
  description:
    "Домашняя кухня, бар и трансляции матчей на 2 этаже ТЦ «Дом для дома». Борщ с пампушками, стейки, бургеры, роллы и пицца. Бронь стола по телефону " +
    PHONE_DISPLAY +
    ".",
  openGraph: {
    title: "Дом для дома: кафе и бар в Обнинске",
    description: "Домашняя кухня, бар и трансляции. " + ADDRESS + ", 2 этаж.",
    images: [{ url: "/img/borsch.jpg", width: 2400, height: 1800 }],
    locale: "ru_RU",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#151a22",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "Дом для дома",
  url: "https://domdladoma.ru",
  telephone: "+79912150862",
  image: "https://domdladoma.ru/img/borsch.jpg",
  priceRange: "1000–1500 ₽",
  servesCuisine: ["Русская", "Европейская", "Японская"],
  address: {
    "@type": "PostalAddress",
    streetAddress: "проспект Маркса, 61, 2 этаж",
    addressLocality: "Обнинск",
    addressRegion: "Калужская область",
    addressCountry: "RU",
  },
  geo: { "@type": "GeoCoordinates", latitude: 55.118931, longitude: 36.598918 },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Sunday"],
      opens: "12:00",
      closes: "23:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Friday", "Saturday"],
      opens: "12:00",
      closes: "02:00",
    },
  ],
  sameAs: ["https://vk.com/cafeddd"],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${playfair.variable} ${golos.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
