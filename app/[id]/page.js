"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
    ArrowLeft,
    ChevronLeft,
    ChevronRight,
    MessageCircle,
    ShoppingBag,
    Sparkles,
} from "lucide-react";

import products from "../data/products";

export default function WaffleDetailsPage() {
    const params = useParams();
    const [activeImage, setActiveImage] = useState(0);

    const waffle = useMemo(() => {
        return products.find(
            (item) => String(item.slug) === String(params.id)
        );
    }, [params.id]);

    /* ---------------------------------
       PRODUCT NOT FOUND
    --------------------------------- */

    if (!waffle) {
        return (
            <main className="min-h-screen bg-[#fffaf4] px-5">
                <div className="flex min-h-screen items-center justify-center">
                    <div className="w-full max-w-md text-center">
                        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[28px] bg-[#f7c873]/20">
                            <ShoppingBag
                                size={30}
                                strokeWidth={1.8}
                                className="text-[#a86f42]"
                            />
                        </div>

                        <h1 className="mt-6 text-3xl font-bold tracking-tight text-[#2a1b14]">
                            Waffle Not Found
                        </h1>

                        <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#765f52]">
                            The waffle you're looking for may have been removed
                            or the link might be incorrect.
                        </p>

                        <Link
                            href="/"
                            className="mx-auto mt-7 inline-flex h-12 items-center gap-2 rounded-2xl bg-[#a86f42] px-6 text-sm font-bold text-white shadow-[0_12px_30px_rgba(168,111,66,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#8f5d35]"
                        >
                            <ArrowLeft size={17} />
                            Back to Menu
                        </Link>
                    </div>
                </div>
            </main>
        );
    }

    /* ---------------------------------
       GALLERY
    --------------------------------- */

    const galleryImages =
        waffle.imagesarr && waffle.imagesarr.length > 0
            ? waffle.imagesarr
            : [waffle.image];

    const nextImage = () => {
        setActiveImage((current) =>
            current === galleryImages.length - 1 ? 0 : current + 1
        );
    };

    const previousImage = () => {
        setActiveImage((current) =>
            current === 0 ? galleryImages.length - 1 : current - 1
        );
    };

    /* ---------------------------------
       WHATSAPP ORDER
    --------------------------------- */

    const handleWhatsAppOrder = () => {
        const phoneNumber = "917081898098";

        const message = `Hi Huffle Waffles! I would like to order ${waffle.name} for ₹${waffle.price}.`;

        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
            message
        )}`;

        window.open(whatsappURL, "_blank");
    };

    const discount =
        waffle.oldPrice && waffle.oldPrice > waffle.price
            ? Math.round(
                ((waffle.oldPrice - waffle.price) / waffle.oldPrice) * 100
            )
            : null;

    return (
        <main className="min-h-screen overflow-x-hidden bg-[#fffaf4] text-[#2a1b14] font-serif">
            {/* =========================================
                TOP NAVIGATION
            ========================================= */}

            <header className="sticky top-0 z-30 border-b border-[#eadfd6] bg-[#fffaf4]/90 backdrop-blur-xl">
                <div className="mx-auto flex h-16 w-full max-w-7xl items-center px-5 sm:px-8 lg:px-10">
                    <Link
                        href="/"
                        className="group inline-flex items-center gap-2 rounded-xl py-2 pr-4 text-sm font-semibold text-[#765f52] transition hover:text-[#a86f42]"
                    >
                        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-[#eadfd6] bg-white transition group-hover:border-[#c8a98d] group-hover:bg-[#fff8ef]">
                            <ArrowLeft size={16} />
                        </span>

                        <span>Back to Menu</span>
                    </Link>

                    <div className="ml-auto hidden items-center gap-2 text-xs font-medium text-[#9b8170] sm:flex">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#8fbf83]" />
                        Freshly made to order
                    </div>
                </div>
            </header>

            {/* =========================================
                PRODUCT SECTION
            ========================================= */}

            <section className="relative">
                {/* Soft decorative background */}
                <div className="pointer-events-none absolute left-[-140px] top-20 h-72 w-72 rounded-full bg-[#f7c873]/10 blur-3xl" />
                <div className="pointer-events-none absolute right-[-160px] top-[35%] h-80 w-80 rounded-full bg-[#dca67a]/10 blur-3xl" />

                <div className="relative mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 sm:py-12 lg:px-10 lg:py-16">
                    <div className="grid gap-10 lg:grid-cols-[minmax(0,1.08fr)_minmax(380px,0.92fr)] lg:items-start lg:gap-16 xl:gap-20">
                        {/* =====================================
                            IMAGE GALLERY
                        ===================================== */}

                        <div className="w-full">
                            <div className="lg:sticky lg:top-24">
                                {/* Main image */}

                                <div className="group relative aspect-square w-full overflow-hidden rounded-[30px] border border-[#eadfd6] bg-[#f5eadf] shadow-[0_20px_60px_rgba(91,55,35,0.10)] sm:rounded-[36px]">
                                    <img
                                        src={galleryImages[activeImage]}
                                        alt={waffle.name}
                                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.025]"
                                    />

                                    {/* Image overlay */}
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/10" />

                                    {/* Product badge */}
                                    {waffle.tag && (
                                        <div className="absolute left-4 top-4 sm:left-6 sm:top-6">
                                            <span className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/90 px-3.5 py-2 text-xs font-bold text-[#a86f42] shadow-lg shadow-black/5 backdrop-blur-md sm:px-4">
                                                <Sparkles size={13} />
                                                {waffle.tag}
                                            </span>
                                        </div>
                                    )}

                                    {/* Image counter */}
                                    {galleryImages.length > 1 && (
                                        <div className="absolute bottom-4 right-4 rounded-full border border-white/50 bg-black/30 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md sm:bottom-6 sm:right-6">
                                            {activeImage + 1} /{" "}
                                            {galleryImages.length}
                                        </div>
                                    )}

                                    {/* Previous button */}
                                    {galleryImages.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={previousImage}
                                            aria-label="Previous image"
                                            className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/90 text-[#2a1b14] shadow-lg backdrop-blur-md transition duration-300 hover:scale-105 hover:bg-white active:scale-95 sm:left-5 sm:h-11 sm:w-11"
                                        >
                                            <ChevronLeft size={19} />
                                        </button>
                                    )}

                                    {/* Next button */}
                                    {galleryImages.length > 1 && (
                                        <button
                                            type="button"
                                            onClick={nextImage}
                                            aria-label="Next image"
                                            className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/60 bg-white/90 text-[#2a1b14] shadow-lg backdrop-blur-md transition duration-300 hover:scale-105 hover:bg-white active:scale-95 sm:right-5 sm:h-11 sm:w-11"
                                        >
                                            <ChevronRight size={19} />
                                        </button>
                                    )}
                                </div>

                                {/* Thumbnails */}

                                {galleryImages.length > 1 && (
                                    <div className="mt-4 grid grid-cols-4 gap-2.5 sm:mt-5 sm:gap-3">
                                        {galleryImages.map((image, index) => (
                                            <button
                                                key={`${image}-${index}`}
                                                type="button"
                                                onClick={() =>
                                                    setActiveImage(index)
                                                }
                                                aria-label={`View image ${index + 1
                                                    }`}
                                                className={`group relative aspect-square overflow-hidden rounded-2xl border-2 bg-[#f5eadf] transition duration-300 ${activeImage === index
                                                        ? "border-[#a86f42] shadow-[0_8px_20px_rgba(168,111,66,0.15)]"
                                                        : "border-transparent hover:border-[#d9c4b3]"
                                                    }`}
                                            >
                                                <img
                                                    src={image}
                                                    alt={`${waffle.name} ${index + 1
                                                        }`}
                                                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                                />

                                                {activeImage === index && (
                                                    <span className="absolute inset-0 bg-[#a86f42]/10" />
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* =====================================
                            PRODUCT INFORMATION
                        ===================================== */}

                        <div className="flex w-full flex-col lg:pt-5">
                            {/* Category */}

                            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#f7c873]/15 px-3.5 py-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-[#c08b45]" />

                                <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#a86f42]">
                                    {waffle.category}
                                </span>
                            </div>

                            {/* Product name */}

                            <h1 className="mt-4 max-w-2xl text-[2.35rem] font-bold leading-[1.08] tracking-[-0.045em] text-[#2a1b14] sm:text-5xl lg:text-[3.4rem]">
                                {waffle.name}
                            </h1>

                            {/* Description */}

                            <p className="mt-5 max-w-xl text-[15px] leading-7 text-[#765f52] sm:text-base sm:leading-8">
                                {waffle.description}
                            </p>

                            {/* Divider */}

                            <div className="my-7 h-px w-full bg-[#eadfd6] sm:my-8" />

                            {/* Price */}

                            <div className="flex flex-wrap items-end gap-x-3 gap-y-2">
                                <span className="text-3xl font-bold tracking-tight text-[#2a1b14] sm:text-4xl">
                                    ₹{waffle.price.toLocaleString("en-IN")}
                                </span>

                                {waffle.oldPrice && (
                                    <span className="mb-1 text-sm font-medium text-[#a18b7c] line-through sm:text-base">
                                        ₹
                                        {waffle.oldPrice.toLocaleString(
                                            "en-IN"
                                        )}
                                    </span>
                                )}

                                {discount && (
                                    <span className="mb-1 rounded-lg bg-[#f7c873]/25 px-2.5 py-1 text-[11px] font-extrabold tracking-wide text-[#93632e]">
                                        {discount}% OFF
                                    </span>
                                )}
                            </div>

                            {/* Availability */}

                            <div className="mt-4 inline-flex w-fit items-center gap-2 rounded-full bg-[#edf7eb] px-3 py-1.5">
                                <span className="relative flex h-2 w-2">
                                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#65a95b] opacity-50" />
                                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#5b9c51]" />
                                </span>

                                <span className="text-xs font-bold text-[#4d8847]">
                                    Available to order
                                </span>
                            </div>

                            {/* Order card */}

                            <div className="mt-8 rounded-[26px] border border-[#eadfd6] bg-white p-4 shadow-[0_14px_40px_rgba(91,55,35,0.06)] sm:p-5">
                                <button
                                    type="button"
                                    onClick={handleWhatsAppOrder}
                                    className="group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-[#a86f42] px-6 text-sm font-bold text-white shadow-[0_12px_28px_rgba(168,111,66,0.22)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#925e36] hover:shadow-[0_16px_32px_rgba(168,111,66,0.27)] active:translate-y-0"
                                >
                                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 transition group-hover:bg-white/20">
                                        <MessageCircle size={18} />
                                    </span>

                                    <span>Order on WhatsApp</span>
                                </button>

                                <div className="mt-3 flex items-start gap-2 px-1">
                                    <MessageCircle
                                        size={14}
                                        className="mt-0.5 shrink-0 text-[#a88a75]"
                                    />

                                    <p className="text-xs leading-5 text-[#8a7162]">
                                        Send your order directly to Huffle
                                        Waffles on WhatsApp.
                                    </p>
                                </div>
                            </div>

                            {/* Small trust points */}

                            <div className="mt-6 grid grid-cols-2 gap-3">
                                <div className="rounded-2xl border border-[#eadfd6] bg-white/60 px-4 py-3.5">
                                    <p className="text-xs font-bold text-[#4c392f]">
                                        Freshly Prepared
                                    </p>
                                    <p className="mt-1 text-[11px] leading-4 text-[#927c6d]">
                                        Made fresh for your order
                                    </p>
                                </div>

                                <div className="rounded-2xl border border-[#eadfd6] bg-white/60 px-4 py-3.5">
                                    <p className="text-xs font-bold text-[#4c392f]">
                                        Easy Ordering
                                    </p>
                                    <p className="mt-1 text-[11px] leading-4 text-[#927c6d]">
                                        Order directly on WhatsApp
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* =========================================
                MOBILE BOTTOM ORDER BAR
            ========================================= */}

            <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#eadfd6] bg-[#fffaf4]/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-10px_35px_rgba(42,27,20,0.08)] backdrop-blur-xl lg:hidden">
                <button
                    type="button"
                    onClick={handleWhatsAppOrder}
                    className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#a86f42] px-4 text-sm font-bold text-white shadow-[0_8px_22px_rgba(168,111,66,0.2)] transition active:scale-[0.99]"
                >
                    <MessageCircle size={18} />

                    <span className="truncate">
                        Order {waffle.name} • ₹
                        {waffle.price.toLocaleString("en-IN")}
                    </span>
                </button>
            </div>

            {/* Bottom spacing for mobile sticky CTA */}

            <div className="h-20 lg:hidden" />
        </main>
    );
}