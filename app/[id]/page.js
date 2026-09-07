"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    ArrowLeft,
    Check,
    ChevronRight,
    Clock3,
    Heart,
    Minus,
    Plus,
    ShieldCheck,
    ShoppingBag,
    Star,
    Truck,
} from "lucide-react";

import products from "../data/products";

const weights = [
    {
        label: "0.5 kg",
        multiplier: 0.7,
    },
    {
        label: "1 kg",
        multiplier: 1,
    },
    {
        label: "1.5 kg",
        multiplier: 1.45,
    },
    {
        label: "2 kg",
        multiplier: 1.85,
    },
];

const flavors = [
    "Chocolate",
    "Vanilla",
    "Strawberry",
    "Butterscotch",
];

export default function waffleDetailsPage() {
    const params = useParams();

    const waffle = useMemo(() => {
        return products.find((item) => String(item.slug) === String(params.id));
    }, [params.id]);

    const [selectedWeight, setSelectedWeight] = useState(weights[1]);
    const [selectedFlavor, setSelectedFlavor] = useState("Chocolate");
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState("");
    const [liked, setLiked] = useState(false);
    const [activeImage, setActiveImage] = useState(0);

    if (!waffle) {
        return (
            <main className="min-h-screen bg-[var(--background)]">
                <div className="container-main flex min-h-[70vh] items-center justify-center">
                    <div className="max-w-md text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[var(--primary-soft)]">
                            <ShoppingBag
                                size={26}
                                className="text-[var(--primary)]"
                            />
                        </div>

                        <h1 className="mt-5 text-2xl font-bold text-[var(--heading)]">
                            waffle not found
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                            The waffle you're looking for may have been removed or the link
                            might be incorrect.
                        </p>

                        <Link
                            href="/products"
                            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[var(--primary)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--primary-dark)]"
                        >
                            <ArrowLeft size={17} />
                            Browse All products
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    const finalPrice = Math.round(
        waffle.price * selectedWeight.multiplier
    );

    const finalOldPrice = Math.round(
        waffle.oldPrice * selectedWeight.multiplier
    );

    const discount = Math.round(
        ((finalOldPrice - finalPrice) / finalOldPrice) * 100
    );

    const galleryImages = [
        waffle.image,
        waffle.image,
        waffle.image,
    ];

    const increaseQuantity = () => {
        setQuantity((current) => current + 1);
    };

    const decreaseQuantity = () => {
        setQuantity((current) => Math.max(1, current - 1));
    };

    const addToCart = () => addItem(waffle, quantity, {
        weight: selectedWeight.label,
        flavor: selectedFlavor,
        message,
        price: finalPrice,
    });

    return (
        <main className="min-h-screen bg-[var(--background)]">
            {/* =====================================================
          BREADCRUMB
      ===================================================== */}
            <div className="border-b border-[var(--border)] bg-white">
                <div className="container-main">
                    <div className="flex h-14 items-center gap-2 overflow-x-auto whitespace-nowrap text-sm">
                        <Link
                            href="/"
                            className="text-[var(--muted)] transition hover:text-[var(--primary)]"
                        >
                            Home
                        </Link>

                        <ChevronRight
                            size={15}
                            className="shrink-0 text-[var(--muted)]"
                        />

                        <span className="max-w-[220px] truncate font-medium text-[var(--heading)]">
                            {waffle.name}
                        </span>
                    </div>
                </div>
            </div>

            {/* =====================================================
          PRODUCT DETAILS
      ===================================================== */}
            <section className="section-padding">
                <div className="container-main">
                    <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
                        {/* =================================================
                LEFT: PRODUCT IMAGES
            ================================================= */}
                        <div>
                            <div className="relative aspect-square overflow-hidden rounded-[var(--radius-large)] bg-[var(--section-soft)]">
                                <img
                                    src={galleryImages[activeImage]}
                                    alt={waffle.name}
                                    className="h-full w-full object-cover"
                                />

                                {waffle.badge && (
                                    <span className="absolute left-5 top-5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold text-[var(--primary)] shadow-sm backdrop-blur">
                                        {waffle.badge}
                                    </span>
                                )}

                                <button
                                    type="button"
                                    onClick={() => setLiked(!liked)}
                                    aria-label={
                                        liked
                                            ? "Remove from wishlist"
                                            : "Add to wishlist"
                                    }
                                    className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur transition hover:scale-105"
                                >
                                    <Heart
                                        size={19}
                                        className={
                                            liked
                                                ? "fill-[var(--primary)] text-[var(--primary)]"
                                                : "text-[var(--heading)]"
                                        }
                                    />
                                </button>
                            </div>

                            {/* Thumbnails */}
                            <div className="mt-4 grid grid-cols-3 gap-3">
                                {galleryImages.map((image, index) => (
                                    <button
                                        key={index}
                                        type="button"
                                        onClick={() => setActiveImage(index)}
                                        className={`aspect-square overflow-hidden rounded-2xl border-2 bg-[var(--section-soft)] transition ${activeImage === index
                                                ? "border-[var(--primary)]"
                                                : "border-transparent"
                                            }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${waffle.name} view ${index + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* =================================================
                RIGHT: PRODUCT INFORMATION
            ================================================= */}
                        <div className="flex flex-col">
                            <span className="section-label">
                                {waffle.category}
                            </span>

                            <h1 className="mt-3 text-3xl font-bold tracking-[-0.035em] text-[var(--heading)] sm:text-4xl">
                                {waffle.name}
                            </h1>

                            {/* Rating */}
                            <div className="mt-4 flex flex-wrap items-center gap-3">
                                <div className="flex items-center gap-1.5 rounded-lg bg-[var(--accent-soft)] px-3 py-1.5">
                                    <Star
                                        size={15}
                                        className="fill-[var(--accent)] text-[var(--accent)]"
                                    />

                                    <span className="text-sm font-bold text-[var(--heading)]">
                                        {waffle.rating}
                                    </span>
                                </div>

                                <span className="text-sm text-[var(--muted)]">
                                    {waffle.reviews} verified reviews
                                </span>

                                <span className="h-1 w-1 rounded-full bg-[var(--border)]" />

                                <span className="text-sm font-medium text-green-600">
                                    In Stock
                                </span>
                            </div>

                            <div className="my-6 h-px bg-[var(--border)]" />

                            {/* Price */}
                            <div className="flex flex-wrap items-end gap-3">
                                <span className="text-3xl font-bold text-[var(--heading)]">
                                    ₹{finalPrice.toLocaleString("en-IN")}
                                </span>

                                <span className="mb-1 text-base text-[var(--muted)] line-through">
                                    ₹{finalOldPrice.toLocaleString("en-IN")}
                                </span>

                                <span className="mb-1 rounded-md bg-[var(--primary-soft)] px-2 py-1 text-xs font-bold text-[var(--primary)]">
                                    {discount}% OFF
                                </span>
                            </div>

                            <p className="mt-2 text-xs text-[var(--muted)]">
                                Price updates automatically according to selected weight.
                            </p>

                            {/* =================================================
                  WEIGHT
              ================================================= */}
                            <div className="mt-7">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm font-bold text-[var(--heading)]">
                                        Select Weight
                                    </h2>

                                    <span className="text-xs text-[var(--muted)]">
                                        Required
                                    </span>
                                </div>

                                <div className="mt-3 grid grid-cols-4 gap-2">
                                    {weights.map((weight) => {
                                        const selected =
                                            selectedWeight.label === weight.label;

                                        return (
                                            <button
                                                key={weight.label}
                                                type="button"
                                                onClick={() => setSelectedWeight(weight)}
                                                className={`rounded-xl border px-3 py-3 text-sm font-semibold transition ${selected
                                                        ? "border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary)]"
                                                        : "border-[var(--border)] bg-white text-[var(--heading)] hover:border-[var(--primary)]"
                                                    }`}
                                            >
                                                {weight.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* =================================================
                  FLAVOR
              ================================================= */}
                            <div className="mt-7">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm font-bold text-[var(--heading)]">
                                        Choose Flavor
                                    </h2>

                                    <span className="text-xs text-[var(--muted)]">
                                        Required
                                    </span>
                                </div>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    {flavors.map((flavor) => {
                                        const selected = selectedFlavor === flavor;

                                        return (
                                            <button
                                                key={flavor}
                                                type="button"
                                                onClick={() => setSelectedFlavor(flavor)}
                                                className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition ${selected
                                                        ? "border-[var(--primary)] bg-[var(--primary-soft)] text-[var(--primary)]"
                                                        : "border-[var(--border)] bg-white text-[var(--heading)] hover:border-[var(--primary)]"
                                                    }`}
                                            >
                                                {flavor}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* =================================================
                  CUSTOM MESSAGE
              ================================================= */}
                            <div className="mt-7">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-sm font-bold text-[var(--heading)]">
                                        Special Message
                                    </h2>

                                    <span className="text-xs text-[var(--muted)]">
                                        Optional
                                    </span>
                                </div>

                                <textarea
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    maxLength={100}
                                    rows={3}
                                    placeholder="e.g. Happy Birthday Ayesha!"
                                    className="mt-3 w-full resize-none rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm text-[var(--heading)] outline-none transition placeholder:text-[var(--muted)] focus:border-[var(--primary)]"
                                />

                                <div className="mt-1 flex justify-end">
                                    <span className="text-[11px] text-[var(--muted)]">
                                        {message.length}/100
                                    </span>
                                </div>
                            </div>

                            {/* =================================================
                  QUANTITY + CART
              ================================================= */}
                            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                                <div className="flex h-13 items-center justify-between rounded-xl border border-[var(--border)] bg-white px-2 sm:w-36">
                                    <button
                                        type="button"
                                        onClick={decreaseQuantity}
                                        disabled={quantity === 1}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--heading)] transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary)] disabled:cursor-not-allowed disabled:opacity-40"
                                    >
                                        <Minus size={16} />
                                    </button>

                                    <span className="text-sm font-bold text-[var(--heading)]">
                                        {quantity}
                                    </span>

                                    <button
                                        type="button"
                                        onClick={increaseQuantity}
                                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[var(--heading)] transition hover:bg-[var(--primary-soft)] hover:text-[var(--primary)]"
                                    >
                                        <Plus size={16} />
                                    </button>
                                </div>

                                <button
                                    type="button"
                                    onClick={addToCart}
                                    className="flex h-13 flex-1 items-center justify-center gap-2 rounded-xl border border-[var(--primary)] bg-[var(--primary-soft)] px-6 text-sm font-bold text-[var(--primary)] transition hover:bg-[var(--primary)] hover:text-white"
                                >
                                    <ShoppingBag size={18} />
                                    Add to Cart
                                </button>
                            </div>

                            <button
                                type="button"
                                onClick={() => { addToCart(); window.location.href = "/checkout"; }}
                                className="mt-3 flex h-13 w-full items-center justify-center rounded-xl bg-[var(--primary)] px-6 text-sm font-bold text-white shadow-lg shadow-[var(--mainglow)] transition hover:bg-[var(--primary-dark)]"
                            >
                                Buy Now
                            </button>

                            {/* =================================================
                  DELIVERY INFO
              ================================================= */}
                            <div className="mt-7 grid gap-3 sm:grid-cols-3">
                                <div className="rounded-xl border border-[var(--border)] bg-white p-4">
                                    <Truck
                                        size={19}
                                        className="text-[var(--primary)]"
                                    />

                                    <p className="mt-2 text-xs font-bold text-[var(--heading)]">
                                        Fresh Delivery
                                    </p>

                                    <p className="mt-1 text-[11px] leading-5 text-[var(--muted)]">
                                        Delivered fresh to your door.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-[var(--border)] bg-white p-4">
                                    <Clock3
                                        size={19}
                                        className="text-[var(--primary)]"
                                    />

                                    <p className="mt-2 text-xs font-bold text-[var(--heading)]">
                                        Choose Time
                                    </p>

                                    <p className="mt-1 text-[11px] leading-5 text-[var(--muted)]">
                                        Select your preferred delivery slot.
                                    </p>
                                </div>

                                <div className="rounded-xl border border-[var(--border)] bg-white p-4">
                                    <ShieldCheck
                                        size={19}
                                        className="text-[var(--primary)]"
                                    />

                                    <p className="mt-2 text-xs font-bold text-[var(--heading)]">
                                        Secure Payment
                                    </p>

                                    <p className="mt-1 text-[11px] leading-5 text-[var(--muted)]">
                                        Safe and secure checkout.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* =====================================================
              PRODUCT INFORMATION
          ===================================================== */}
                    <div className="mt-20 border-t border-[var(--border)] pt-14">
                        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr]">
                            <div>
                                <span className="section-label">
                                    Product details
                                </span>

                                <h2 className="section-title">
                                    Made for your <span>special moments</span>
                                </h2>

                                <p className="mt-5 max-w-3xl text-sm leading-7 text-[var(--muted)] sm:text-base">
                                    Our products are freshly prepared using carefully selected
                                    ingredients and crafted with attention to every detail.
                                    Whether you're celebrating a birthday, anniversary or just
                                    treating yourself, this waffle is made to make the moment a
                                    little sweeter.
                                </p>

                                <div className="mt-7 space-y-4">
                                    {[
                                        "Freshly baked using quality ingredients",
                                        "Customizable weight and flavor",
                                        "Personalized message available",
                                        "Carefully packed for delivery",
                                    ].map((item) => (
                                        <div
                                            key={item}
                                            className="flex items-center gap-3"
                                        >
                                            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--primary-soft)]">
                                                <Check
                                                    size={15}
                                                    className="text-[var(--primary)]"
                                                />
                                            </span>

                                            <span className="text-sm font-medium text-[var(--heading)]">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Quick Info */}
                            <div className="rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--section-soft)] p-6">
                                <h3 className="text-lg font-bold text-[var(--heading)]">
                                    waffle information
                                </h3>

                                <div className="mt-5 divide-y divide-[var(--border)]">
                                    <div className="flex justify-between py-4 text-sm">
                                        <span className="text-[var(--muted)]">
                                            Category
                                        </span>

                                        <span className="font-semibold text-[var(--heading)]">
                                            {waffle.category}
                                        </span>
                                    </div>

                                    <div className="flex justify-between py-4 text-sm">
                                        <span className="text-[var(--muted)]">
                                            Selected Weight
                                        </span>

                                        <span className="font-semibold text-[var(--heading)]">
                                            {selectedWeight.label}
                                        </span>
                                    </div>

                                    <div className="flex justify-between py-4 text-sm">
                                        <span className="text-[var(--muted)]">
                                            Flavor
                                        </span>

                                        <span className="font-semibold text-[var(--heading)]">
                                            {selectedFlavor}
                                        </span>
                                    </div>

                                    <div className="flex justify-between py-4 text-sm">
                                        <span className="text-[var(--muted)]">
                                            Preparation
                                        </span>

                                        <span className="font-semibold text-[var(--heading)]">
                                            Freshly baked
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* =====================================================
              RELATED products
          ===================================================== */}
                    <div className="mt-20 border-t border-[var(--border)] pt-14">
                        <div className="flex items-end justify-between gap-5">
                            <div>
                                <span className="section-label">
                                    You may also like
                                </span>

                                <h2 className="section-title">
                                    More delicious <span>products</span>
                                </h2>
                            </div>

                            <Link
                                href="/products"
                                className="hidden text-sm font-semibold text-[var(--primary)] sm:flex sm:items-center sm:gap-1"
                            >
                                View all
                                <ChevronRight size={16} />
                            </Link>
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                            {products
                                .filter((item) => item.id !== waffle.id)
                                .slice(0, 4)
                                .map((item) => (
                                    <Link
                                        href={`/products/${item.id}`}
                                        key={item.id}
                                        className="group overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-white transition hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(45,32,34,0.10)]"
                                    >
                                        <div className="aspect-square overflow-hidden bg-[var(--section-soft)]">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                            />
                                        </div>

                                        <div className="p-4">
                                            <span className="text-xs font-medium text-[var(--primary)]">
                                                {item.category}
                                            </span>

                                            <h3 className="mt-1 line-clamp-1 text-sm font-semibold text-[var(--heading)]">
                                                {item.name}
                                            </h3>

                                            <div className="mt-3 flex items-center justify-between">
                                                <span className="font-bold text-[var(--heading)]">
                                                    ₹{item.price.toLocaleString("en-IN")}
                                                </span>

                                                <span className="flex items-center gap-1 text-xs text-[var(--muted)]">
                                                    <Star
                                                        size={13}
                                                        className="fill-[var(--accent)] text-[var(--accent)]"
                                                    />
                                                    {item.rating}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
