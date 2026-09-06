"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  ChevronRight,
  Clock3,
  // Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Plus,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  X,
  Zap,
} from "lucide-react";

/* =========================================================
   CONFIG
========================================================= */

const WHATSAPP_NUMBER = "917081898098";

// Paste Huffle Waffles' Google Maps URL here.
const MAP_URL = "https://maps.app.goo.gl/YEC1ecJitVjxTfWx8";

const INSTAGRAM_URL = "https://www.instagram.com/hufflewaffles.87/";

/* =========================================================
   DATA
========================================================= */

const categories = ["All", "Waffles", "Combos", "Drinks"];

const products = [
  {
    id: 1,
    name: "Classic Chocolate",
    category: "Waffles",
    price: 129,
    oldPrice: 159,
    tag: "Bestseller",
    emoji: "🍫",
    description: "Crispy golden waffle loaded with rich chocolate.",
  },
  {
    id: 2,
    name: "Oreo Crunch",
    category: "Waffles",
    price: 149,
    oldPrice: 179,
    tag: "Popular",
    emoji: "🍪",
    description: "Chocolate waffle topped with Oreo crunch.",
  },
  {
    id: 3,
    name: "Belgian Delight",
    category: "Waffles",
    price: 169,
    oldPrice: 199,
    tag: "Chef's Pick",
    emoji: "🧇",
    description: "Belgian-style waffle with creamy chocolate drizzle.",
  },
  {
    id: 4,
    name: "Nutella Dream",
    category: "Waffles",
    price: 179,
    oldPrice: 219,
    tag: "Premium",
    emoji: "🍓",
    description: "Rich chocolate spread with fresh fruity topping.",
  },
  {
    id: 5,
    name: "Waffle + Shake",
    category: "Combos",
    price: 219,
    oldPrice: 259,
    tag: "Combo",
    emoji: "🥤",
    description: "Your favourite waffle paired with a chilled shake.",
  },
  {
    id: 6,
    name: "Sweet Duo",
    category: "Combos",
    price: 249,
    oldPrice: 299,
    tag: "For Two",
    emoji: "🧇",
    description: "Two delicious waffles made for sharing.",
  },
  {
    id: 7,
    name: "Chocolate Shake",
    category: "Drinks",
    price: 99,
    oldPrice: 119,
    tag: "Fresh",
    emoji: "🥛",
    description: "Thick, creamy and seriously chocolatey.",
  },
  {
    id: 8,
    name: "Cold Coffee",
    category: "Drinks",
    price: 89,
    oldPrice: 109,
    tag: "Chilled",
    emoji: "☕",
    description: "Smooth chilled coffee for the perfect pairing.",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function formatPrice(price) {
  return `₹${price}`;
}

function orderOnWhatsApp(product) {
  const message = `Hi Huffle Waffles! 🧇

I'd like to order:
${product.name} - ${formatPrice(product.price)}

Please confirm availability.`;

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

function openWhatsApp() {
  const message = `Hi Huffle Waffles! 🧇

I'd like to know today's menu and offers.`;

  window.open(
    `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`,
    "_blank"
  );
}

/* =========================================================
   COMPONENT
========================================================= */

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.description.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, search]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#fffaf4] text-[#2a1b14]">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="fixed left-0 right-0 top-0 z-50">
        <div className="mx-auto mt-3 max-w-7xl px-4 sm:px-6">
          <nav className="rounded-2xl border border-white/60 bg-[#21150f]/95 px-4 py-3 shadow-2xl shadow-black/10 backdrop-blur-xl">
            <div className="flex items-center justify-between">

              {/* Logo */}
              <a href="#home" className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f7c873] text-2xl shadow-lg">
                  🧇
                </div>

                <div>
                  <div className="font-serif text-lg font-bold leading-none text-white">
                    Huffle
                  </div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[#e7bd72]">
                    Waffles
                  </div>
                </div>
              </a>

              {/* Desktop navigation */}
              <div className="hidden items-center gap-8 md:flex">
                <a
                  href="#home"
                  className="text-sm font-medium text-white/80 transition hover:text-white"
                >
                  Home
                </a>

                <a
                  href="#menu"
                  className="text-sm font-medium text-white/80 transition hover:text-white"
                >
                  Menu
                </a>

                <a
                  href="#about"
                  className="text-sm font-medium text-white/80 transition hover:text-white"
                >
                  About
                </a>

                <a
                  href="#visit"
                  className="text-sm font-medium text-white/80 transition hover:text-white"
                >
                  Visit Us
                </a>
              </div>

              <div className="hidden md:block">
                <button
                  onClick={openWhatsApp}
                  className="flex items-center gap-2 rounded-xl bg-[#f7c873] px-5 py-2.5 text-sm font-bold text-[#2a1b14] transition hover:-translate-y-0.5 hover:bg-[#ffd98e]"
                >
                  <MessageCircle size={17} />
                  Order Now
                </button>
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white md:hidden"
                aria-label="Toggle menu"
              >
                {mobileMenu ? <X size={21} /> : <Menu size={21} />}
              </button>
            </div>

            {/* Mobile menu */}
            {mobileMenu && (
              <div className="mt-4 border-t border-white/10 pt-4 md:hidden">
                <div className="flex flex-col gap-2">
                  {["Home", "Menu", "About", "Visit Us"].map((item) => (
                    <a
                      key={item}
                      href={`#${item === "Visit Us" ? "visit" : item.toLowerCase()}`}
                      onClick={() => setMobileMenu(false)}
                      className="rounded-xl px-4 py-3 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
                    >
                      {item}
                    </a>
                  ))}

                  <button
                    onClick={openWhatsApp}
                    className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[#f7c873] px-5 py-3 text-sm font-bold text-[#2a1b14]"
                  >
                    <MessageCircle size={17} />
                    Order on WhatsApp
                  </button>
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* =====================================================
          HERO
      ===================================================== */}

      <section
        id="home"
        className="relative flex min-h-[760px] items-center bg-[#21150f] pt-28"
      >
        {/* Background decorations */}
        <div className="absolute -left-32 top-32 h-72 w-72 rounded-full bg-[#b87535]/20 blur-3xl" />
        <div className="absolute -right-32 bottom-10 h-96 w-96 rounded-full bg-[#f7c873]/10 blur-3xl" />

        <div className="absolute inset-0 opacity-[0.04] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-6 lg:grid-cols-2 lg:gap-20">

          {/* Hero copy */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#f7c873]/20 bg-[#f7c873]/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#f7c873]">
              <Sparkles size={14} />
              Freshly Made
            </div>

            <h1 className="max-w-3xl font-serif text-5xl font-bold leading-[0.95] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Happiness,
              <br />
              <span className="text-[#f7c873]">served crispy.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/65 sm:text-lg">
              Freshly made waffles, delicious toppings and sweet little
              moments. Come hungry. Leave happy.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#menu"
                className="group flex items-center justify-center gap-2 rounded-2xl bg-[#f7c873] px-6 py-4 font-bold text-[#2a1b14] shadow-xl shadow-black/20 transition hover:-translate-y-1 hover:bg-[#ffd98e]"
              >
                Explore Menu
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </a>

              <button
                onClick={openWhatsApp}
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-6 py-4 font-bold text-white backdrop-blur transition hover:bg-white/10"
              >
                <MessageCircle size={18} />
                Order on WhatsApp
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex flex-wrap gap-8 border-t border-white/10 pt-7">
              <div>
                <div className="font-serif text-2xl font-bold text-white">
                  100%
                </div>
                <div className="mt-1 text-xs text-white/45">
                  Freshly Prepared
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1 font-serif text-2xl font-bold text-white">
                  4.9
                  <Star size={17} fill="currentColor" className="text-[#f7c873]" />
                </div>
                <div className="mt-1 text-xs text-white/45">
                  Customer Love
                </div>
              </div>

              <div>
                <div className="font-serif text-2xl font-bold text-white">
                  Fast
                </div>
                <div className="mt-1 text-xs text-white/45">
                  Fresh & Crispy
                </div>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-[500px]">

            {/* glow */}
            <div className="absolute inset-10 rounded-full bg-[#f7c873]/20 blur-3xl" />

            {/* plate */}
            <div className="relative aspect-square rounded-full border-[18px] border-white/10 bg-[#fffaf4] p-8 shadow-2xl shadow-black/30">
              <div className="flex h-full w-full items-center justify-center rounded-full border border-[#2a1b14]/10 bg-[#f4dfc0]">

                {/* waffle */}
                <div className="relative h-56 w-56 rotate-[-7deg] rounded-[42px] bg-[#b9682b] p-6 shadow-2xl sm:h-64 sm:w-64">

                  <div className="absolute inset-5 grid grid-cols-4 gap-3 opacity-50">
                    {Array.from({ length: 16 }).map((_, index) => (
                      <div
                        key={index}
                        className="rounded-md bg-[#733914]"
                      />
                    ))}
                  </div>

                  <div className="absolute left-10 top-8 text-5xl">🍓</div>
                  <div className="absolute right-8 top-16 text-4xl">🍫</div>
                  <div className="absolute bottom-8 left-16 text-4xl">🍓</div>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-5 -left-3 rounded-2xl border border-white/40 bg-white/90 p-4 shadow-2xl backdrop-blur sm:-left-8">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f7c873] text-xl">
                  🧇
                </div>

                <div>
                  <div className="text-sm font-bold text-[#2a1b14]">
                    Made fresh
                  </div>
                  <div className="mt-0.5 flex items-center gap-1 text-xs text-[#806d62]">
                    <Clock3 size={12} />
                    Every order
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -right-2 top-8 flex h-20 w-20 rotate-12 items-center justify-center rounded-full border-4 border-[#21150f] bg-[#f7c873] text-center text-[10px] font-black uppercase leading-3 text-[#2a1b14] shadow-xl sm:-right-8">
              Crispy
              <br />
              & Fresh
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MARQUEE
      ===================================================== */}

      <div className="overflow-hidden border-y border-[#e9d9c7] bg-[#f7efe4]">
        <div className="flex min-w-max animate-[marquee_20s_linear_infinite] gap-10 py-4 text-xs font-black uppercase tracking-[0.25em] text-[#8b5c3c]">
          <span>Fresh Waffles</span>
          <span>✦</span>
          <span>Made With Love</span>
          <span>✦</span>
          <span>Chocolate Dreams</span>
          <span>✦</span>
          <span>Sweet Moments</span>
          <span>✦</span>
          <span>Fresh Waffles</span>
          <span>✦</span>
          <span>Made With Love</span>
          <span>✦</span>
        </div>
      </div>

      {/* =====================================================
          MENU
      ===================================================== */}

      <section id="menu" className="px-5 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-[#a86f42]">
                Our Menu
              </div>

              <h2 className="font-serif text-4xl font-bold tracking-tight text-[#2a1b14] sm:text-5xl">
                Something sweet
                <br />
                <span className="text-[#a86f42]">for every mood.</span>
              </h2>
            </div>

            <p className="max-w-md text-sm leading-6 text-[#806d62]">
              Pick your favourite, customize your order and enjoy waffles
              prepared fresh for you.
            </p>
          </div>

          {/* Search + filters */}
          <div className="mt-12 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

            <div className="relative max-w-md flex-1">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a88d7a]"
              />

              <input
                type="text"
                placeholder="Search waffles, drinks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-[#eadbcb] bg-white py-3.5 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#b6a394] focus:border-[#b87535] focus:ring-4 focus:ring-[#b87535]/10"
              />
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`whitespace-nowrap rounded-xl px-5 py-3 text-sm font-bold transition ${activeCategory === category
                      ? "bg-[#2a1b14] text-white shadow-lg"
                      : "border border-[#eadbcb] bg-white text-[#6f594d] hover:border-[#c9a17c]"
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Products */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group overflow-hidden rounded-[28px] border border-[#eadbcb] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#5b3018]/10"
              >
                {/* Product visual */}
                <div className="relative flex h-56 items-center justify-center overflow-hidden bg-[#f5e4ce]">

                  <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-[#e2b77b]/30 blur-2xl" />

                  <div className="relative flex h-40 w-40 rotate-[-6deg] items-center justify-center rounded-[32px] bg-[#a95f2c] text-7xl shadow-2xl transition duration-500 group-hover:rotate-0 group-hover:scale-105">
                    {product.emoji}
                  </div>

                  <div className="absolute left-4 top-4 rounded-full bg-[#2a1b14] px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-[#f7c873]">
                    {product.tag}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-[#2a1b14]">
                        {product.name}
                      </h3>

                      <p className="mt-2 text-xs leading-5 text-[#8b776b]">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <span className="font-serif text-xl font-bold text-[#2a1b14]">
                        {formatPrice(product.price)}
                      </span>

                      <span className="ml-2 text-xs text-[#b4a398] line-through">
                        {formatPrice(product.oldPrice)}
                      </span>
                    </div>

                    <button
                      onClick={() => orderOnWhatsApp(product)}
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2a1b14] text-white transition hover:bg-[#b87535]"
                      aria-label={`Order ${product.name}`}
                    >
                      <Plus size={19} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="rounded-3xl border border-dashed border-[#d9c7b7] py-20 text-center">
              <div className="text-4xl">🧇</div>
              <h3 className="mt-4 font-serif text-2xl font-bold">
                Nothing found
              </h3>
              <p className="mt-2 text-sm text-[#806d62]">
                Try another waffle or category.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* =====================================================
          OFFER BANNER
      ===================================================== */}

      <section className="px-5 pb-24 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[32px] bg-[#2a1b14] px-7 py-10 sm:px-12 sm:py-14">

            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#f7c873]/15 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#b87535]/15 blur-3xl" />

            <div className="relative flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
              <div>
                <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.2em] text-[#f7c873]">
                  <Zap size={15} />
                  Today's Sweet Deal
                </div>

                <h2 className="max-w-2xl font-serif text-3xl font-bold text-white sm:text-4xl">
                  Your next favourite waffle
                  <span className="text-[#f7c873]"> is waiting.</span>
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-6 text-white/55">
                  Visit us today and treat yourself to something freshly made.
                </p>
              </div>

              <button
                onClick={openWhatsApp}
                className="group flex shrink-0 items-center justify-center gap-3 rounded-2xl bg-[#f7c873] px-7 py-4 font-bold text-[#2a1b14] transition hover:-translate-y-1 hover:bg-[#ffd98e]"
              >
                Order Now
                <ArrowRight
                  size={18}
                  className="transition group-hover:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY US
      ===================================================== */}

      <section id="about" className="bg-[#f5ecdf] px-5 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">

            <div>
              <div className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-[#a86f42]">
                Why Huffle?
              </div>

              <h2 className="font-serif text-4xl font-bold leading-tight text-[#2a1b14] sm:text-5xl">
                Simple ingredients.
                <br />
                <span className="text-[#a86f42]">Serious cravings.</span>
              </h2>

              <p className="mt-6 max-w-xl text-sm leading-7 text-[#806d62]">
                We believe good waffles don't need complicated explanations.
                Crispy outside, soft inside and loaded with flavours you love.
              </p>

              <div className="mt-8">
                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#2a1b14] px-5 py-3.5 text-sm font-bold text-white transition hover:bg-[#a86f42]"
                >
                  <MapPin size={17} />
                  Find Us
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  icon: "🧇",
                  title: "Freshly Made",
                  text: "Every waffle is prepared fresh for your order.",
                },
                {
                  icon: "🍫",
                  title: "Loaded Flavours",
                  text: "Chocolate, fruits, cookies and delicious toppings.",
                },
                {
                  icon: "⚡",
                  title: "Quick Service",
                  text: "Fresh food without making you wait forever.",
                },
                {
                  icon: "❤️",
                  title: "Made With Love",
                  text: "Because food tastes better when care goes into it.",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-3xl border border-[#e3d2c0] bg-white p-6 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f7c873]/30 text-2xl">
                    {item.icon}
                  </div>

                  <h3 className="mt-5 font-serif text-xl font-bold text-[#2a1b14]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#806d62]">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}

      <section className="px-5 py-24 sm:px-6">
        <div className="mx-auto max-w-7xl">

          <div className="text-center">
            <div className="text-xs font-black uppercase tracking-[0.25em] text-[#a86f42]">
              Customer Love
            </div>

            <h2 className="mt-3 font-serif text-4xl font-bold text-[#2a1b14] sm:text-5xl">
              Sweet words from sweet people.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              {
                name: "A Happy Customer",
                text: "Fresh, crispy and really tasty. The chocolate topping was amazing.",
              },
              {
                name: "Waffle Lover",
                text: "Loved the taste and the presentation. Definitely coming back.",
              },
              {
                name: "Dessert Fan",
                text: "Perfect place when you are craving something sweet. Perfect place when you are craving something sweet.",
              },
            ].map((review) => (
              <div
                key={review.name}
                className="rounded-3xl border border-[#eadbcb] bg-white p-7 shadow-sm"
              >
                <div className="flex gap-1 text-[#e6a928]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} size={16} fill="currentColor" />
                  ))}
                </div>

                <p className="mt-5 text-sm leading-7 text-[#6f594d]">
                  “{review.text}”
                </p>

                <div className="mt-6 flex items-center gap-3 border-t border-[#eee2d6] pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f7c873] font-bold">
                    {review.name[0]}
                  </div>

                  <div>
                    <div className="text-sm font-bold text-[#2a1b14]">
                      {review.name}
                    </div>
                    <div className="text-xs text-[#9c8879]">
                      Verified Customer
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          VISIT
      ===================================================== */}

      <section id="visit" className="px-5 pb-24 sm:px-6">
        <div className="mx-auto max-w-7xl">

          <div className="overflow-hidden rounded-[32px] bg-[#21150f]">
            <div className="grid lg:grid-cols-2">

              <div className="p-8 sm:p-12 lg:p-16">
                <div className="text-xs font-black uppercase tracking-[0.25em] text-[#f7c873]">
                  Visit Huffle
                </div>

                <h2 className="mt-4 font-serif text-4xl font-bold text-white sm:text-5xl">
                  Your waffle
                  <br />
                  <span className="text-[#f7c873]">stop is here.</span>
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-white/55">
                  Come by, grab your favourite waffle and make your evening a
                  little sweeter.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#f7c873]">
                      <MapPin size={19} />
                    </div>

                    <div>
                      <div className="text-sm font-bold text-white">
                        Our Location
                      </div>
                      <div className="mt-1 text-xs leading-5 text-white/45">
                        Tap below to open Google Maps
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#f7c873]">
                      <Clock3 size={19} />
                    </div>

                    <div>
                      <div className="text-sm font-bold text-white">
                        Opening Hours
                      </div>
                      <div className="mt-1 text-xs leading-5 text-white/45">
                        Update with actual stall timings
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href={MAP_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#f7c873] px-6 py-3.5 text-sm font-bold text-[#2a1b14] transition hover:bg-[#ffd98e]"
                >
                  Open Google Maps
                  <ChevronRight size={17} />
                </a>
              </div>

              {/* Map placeholder */}
              <div className="relative min-h-[360px] overflow-hidden bg-[#33221a]">
                <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] [background-size:50px_50px]" />

                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f7c873] text-[#2a1b14] shadow-2xl shadow-black/30">
                    <MapPin size={32} />
                  </div>

                  <div className="mt-5 font-serif text-2xl font-bold text-white">
                    Huffle Waffles
                  </div>

                  <div className="mt-1 text-xs text-white/45">
                    Your sweet spot
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-[#eadbcb] bg-[#fffaf4] px-5 py-12 sm:px-6">
        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#2a1b14] text-xl">
                🧇
              </div>

              <div>
                <div className="font-serif text-lg font-bold">
                  Huffle Waffles
                </div>
                <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#a86f42]">
                  Fresh • Crispy • Delicious
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#eadbcb] bg-white text-[#2a1b14] transition hover:bg-[#2a1b14] hover:text-white"
              >
                {/* <MessageCircle size={18} /> */}
                <Image 
                  src={"/instagram.svg"}
                  alt="Picture of the author" 
                  width={20}
                  height={20}
                  /> 
              </a>

              <button
                onClick={openWhatsApp}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#eadbcb] bg-white text-[#2a1b14] transition hover:bg-[#2a1b14] hover:text-white"
              >
                <MessageCircle size={18} />
              </button>

              <a
                href={MAP_URL}
                target="_blank"
                rel="noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#eadbcb] bg-white text-[#2a1b14] transition hover:bg-[#2a1b14] hover:text-white"
              >
                <MapPin size={18} />
              </a>
            </div>
          </div>

          <div className="mt-10 border-t border-[#eadbcb] pt-6 text-center text-xs text-[#a08b7c]">
            © {new Date().getFullYear()} Huffle Waffles. Made with 🧇 & love.
          </div>
        </div>
      </footer>

      {/* =====================================================
          MOBILE STICKY ORDER BAR
      ===================================================== */}

      <div className="fixed bottom-4 left-4 right-4 z-40 md:hidden">
        <div className="flex items-center gap-2 rounded-2xl border border-white/50 bg-[#21150f]/95 p-2 shadow-2xl backdrop-blur-xl">
          <a
            href="#menu"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white/10 py-3 text-sm font-bold text-white"
          >
            <ShoppingBag size={17} />
            Menu
          </a>

          <button
            onClick={openWhatsApp}
            className="flex flex-[1.5] items-center justify-center gap-2 rounded-xl bg-[#f7c873] py-3 text-sm font-black text-[#2a1b14]"
          >
            <MessageCircle size={17} />
            Order Now
          </button>
        </div>
      </div>
    </main>
  );
}