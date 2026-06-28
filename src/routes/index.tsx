import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { useEffect, useRef, useState } from "react";

const submitContactForm = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    const d = data as { name?: string; email?: string; message?: string };
    if (!d.name?.trim() || !d.email?.trim() || !d.message?.trim()) {
      throw new Error("All fields are required");
    }
    return { name: d.name.trim(), email: d.email.trim(), message: d.message.trim() };
  })
  .handler(async ({ data }) => {
    // Log the submission for now
    console.log("[Contact Submission]", {
      name: data.name,
      email: data.email,
      message: data.message,
      timestamp: new Date().toISOString(),
    });

    // In the future, this is where we'd send an email
    return {
      success: true,
      message: "Thanks for reaching out! We'll get back to you within 24 hours.",
    };
  });

export const Route = createFileRoute("/")({
  component: Home,
});

const NAV_LINKS = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#results" },
  { label: "Pricing", href: "#pricing" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  {
    title: "One-on-One Personal Training",
    desc: "Get undivided attention from our expert coaches. Every session is tailored to your goals, fitness level, and schedule. Maximum results, minimum wasted time.",
    icon: (
      <svg className="h-10 w-10 text-orange-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
  },
  {
    title: "Group Fitness Classes",
    desc: "High-energy group sessions that push you harder than you'd push yourself. Build community, burn serious calories, and have fun doing it.",
    icon: (
      <svg className="h-10 w-10 text-orange-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Weight Loss Programs",
    desc: "Science-backed nutrition and training protocols designed to burn fat and keep it off. Accountability check-ins keep you on track every step of the way.",
    icon: (
      <svg className="h-10 w-10 text-orange-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
      </svg>
    ),
  },
  {
    title: "Muscle Building",
    desc: "Progressive overload programming backed by exercise science. Build lean muscle mass with periodized training plans that evolve as you get stronger.",
    icon: (
      <svg className="h-10 w-10 text-orange-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    title: "Nutrition Coaching",
    desc: "Custom meal plans and macro coaching that fit your lifestyle. No fad diets — just sustainable nutrition strategies that fuel your performance.",
    icon: (
      <svg className="h-10 w-10 text-orange-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-3.75-1.5m-6 0L12 18l3.75-1.5M6 14.25v3.75a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 18v-3.75" />
      </svg>
    ),
  },
  {
    title: "Online Training",
    desc: "Full remote coaching with personalized workouts via our app. Video demos, progress tracking, and direct messaging with your coach — anywhere, anytime.",
    icon: (
      <svg className="h-10 w-10 text-orange-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
      </svg>
    ),
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah Mitchell",
    result: "Lost 30 lbs in 12 weeks",
    quote:
      "I tried every diet and gym program out there. Nothing stuck until I found Elite Performance Training. The coaching, the accountability, the energy — it changed everything. I'm stronger, leaner, and more confident than ever.",
    image:
      "https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=200&q=80",
  },
  {
    name: "Marcus Johnson",
    result: "Gained 15 lbs of muscle",
    quote:
      "I was stuck in a plateau for two years. The coaches at Elite redesigned my entire approach — nutrition, training, recovery. In three months I saw more progress than the previous two years combined.",
    image:
      "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=200&q=80",
  },
  {
    name: "Jessica Chen",
    result: "Dropped 8% body fat",
    quote:
      "The group classes are addictive! I actually look forward to my 6 AM workouts. The community support and coach expertise keep me coming back. Best decision I ever made for my health.",
    image:
      "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=200&q=80",
  },
  {
    name: "David Rodriguez",
    result: "42 lbs down — 6 months",
    quote:
      "After my doctor told me I needed to make a change, I found Elite. The weight loss program gave me a roadmap, and my coach held me accountable every single week. I've never felt better.",
    image:
      "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=200&q=80",
  },
];

const PRICING_PLANS = [
  {
    name: "Basic",
    price: "$59",
    unit: "/session",
    desc: "Perfect for getting started",
    features: [
      "One-on-one training session",
      "Custom workout plan",
      "Basic progress tracking",
      "Email support",
      "Flexible scheduling",
    ],
    highlighted: false,
    stripeLink: "https://buy.stripe.com/5kQ4gB0HE2c8esL7YdcQU03",
  },
  {
    name: "Pro",
    price: "$99",
    unit: "/session",
    desc: "Our most popular package",
    features: [
      "Everything in Basic",
      "Nutrition coaching",
      "Weekly check-ins",
      "Priority scheduling",
      "Access to group classes",
      "Progress photos & analysis",
    ],
    highlighted: true,
    stripeLink: "https://buy.stripe.com/aFa6oJ9ea2RIfwP5Q5cQU01",
  },
  {
    name: "Elite",
    price: "$149",
    unit: "/session",
    desc: "Maximum results, fastest",
    features: [
      "Everything in Pro",
      "Unlimited sessions",
      "24/7 direct coach access",
      "Monthly body composition scan",
      "Meal prep guidance",
      "Supplement recommendations",
      "VIP booking priority",
    ],
    highlighted: false,
    stripeLink: "https://buy.stripe.com/fZu5kFduq4ZQdoHbapcQU02",
  },
];

function ScrollReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`scroll-reveal ${visible ? "visible" : ""} ${className}`}>
      {children}
    </div>
  );
}

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-dark-950/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-wider text-orange-500">
            ELITE
          </span>
          <span className="hidden text-lg font-bold tracking-wider text-white sm:inline">
            PERFORMANCE TRAINING
          </span>
          <span className="text-lg font-bold tracking-wider text-white sm:hidden">
            PT
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wider text-gray-300 transition-colors hover:text-orange-500"
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://buy.stripe.com/aFa6oJ9ea2RIfwP5Q5cQU01"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-orange-500 px-5 py-2 text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-orange-600"
          >
            Book Now
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white md:hidden"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-dark-900 md:hidden">
          <div className="flex flex-col gap-3 px-6 py-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="py-2 text-sm font-medium uppercase tracking-wider text-gray-300 transition-colors hover:text-orange-500"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://buy.stripe.com/aFa6oJ9ea2RIfwP5Q5cQU01"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-block rounded-full bg-orange-500 px-5 py-3 text-center text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-orange-600"
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1920&q=80')",
        }}
      />
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-dark-950/95 via-dark-950/80 to-dark-950/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-transparent to-dark-950/30" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <div className="animate-fade-in-up">
          <span className="mb-6 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
            Elite Performance Training
          </span>
        </div>
        <h1 className="animate-fade-in-up animate-delay-100 text-5xl font-black leading-tight tracking-tighter sm:text-7xl md:text-8xl lg:text-9xl">
          <span className="text-white">TRANSFORM</span>
          <br />
          <span className="text-orange-500">YOUR BODY.</span>
          <br />
          <span className="text-white">TRANSFORM</span>
          <br />
          <span className="text-orange-500">YOUR LIFE.</span>
        </h1>
        <p className="animate-fade-in-up animate-delay-200 mx-auto mt-8 max-w-2xl text-lg text-gray-300 sm:text-xl">
          Expert coaching. Proven programs. Unwavering accountability.
          <br />
          <span className="text-orange-400">Results that speak for themselves.</span>
        </p>
        <div className="animate-fade-in-up animate-delay-300 mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <a
            href="#contact"
            className="animate-pulse-glow inline-block rounded-full bg-orange-500 px-10 py-4 text-base font-bold uppercase tracking-wider text-white transition-all hover:bg-orange-600 hover:scale-105"
          >
            Book a Free Session
          </a>
          <a
            href="#services"
            className="inline-block rounded-full border border-white/20 px-10 py-4 text-base font-bold uppercase tracking-wider text-white transition-all hover:border-orange-500 hover:text-orange-500"
          >
            Explore Programs
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce">
        <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section id="services" className="relative bg-dark-950 py-24 md:py-32">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,107,0,0.05)_0%,_transparent_50%)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
              What We Offer
            </span>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
              Built for <span className="text-orange-500">Results</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              Every program is engineered for one thing: transforming you. No fluff, no fads — just proven methodology and relentless support.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.title}>
              <div
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-dark-900 p-8 transition-all duration-300 hover:border-orange-500/50 hover:shadow-[0_0_30px_-5px_rgba(255,107,0,0.15)]"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="mb-5">{service.icon}</div>
                <h3 className="mb-3 text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                  {service.title}
                </h3>
                <p className="leading-relaxed text-gray-400">{service.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  return (
    <section id="results" className="relative bg-dark-900 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
              Real Results
            </span>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
              Client <span className="text-orange-500">Success Stories</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              Our clients don't just look different — they feel different. Here's what they have to say.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <ScrollReveal key={t.name}>
              <div className="group rounded-2xl border border-white/10 bg-dark-800 p-8 transition-all duration-300 hover:border-orange-500/30">
                <div className="mb-4 flex items-center gap-4">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-orange-500/30"
                    loading="lazy"
                  />
                  <div>
                    <h4 className="font-bold text-white">{t.name}</h4>
                    <p className="text-sm font-semibold text-orange-400">{t.result}</p>
                  </div>
                </div>
                <p className="leading-relaxed text-gray-300 italic">&ldquo;{t.quote}&rdquo;</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BeforeAfterSection() {
  const transformations = [
    {
      before:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80",
      after:
        "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80&sat=-100",
      label: "12-Week Transformation",
      result: "Lost 28 lbs | Gained lean muscle",
    },
    {
      before:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80",
      after:
        "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=600&q=80&sat=-100",
      label: "8-Week Body Composition",
      result: "Dropped 6% body fat",
    },
    {
      before:
        "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80",
      after:
        "https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80&sat=-100",
      label: "16-Week Muscle Building",
      result: "Gained 12 lbs of muscle",
    },
  ];

  return (
    <section className="relative bg-dark-950 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
              See the Difference
            </span>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
              Before &amp; <span className="text-orange-500">After</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              Real transformations from real clients. Scroll through the results.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3">
          {transformations.map((t, i) => (
            <ScrollReveal key={i}>
              <div className="group overflow-hidden rounded-2xl border border-white/10 bg-dark-900 transition-all duration-300 hover:border-orange-500/30">
                <div className="relative flex">
                  {/* Before */}
                  <div className="relative w-1/2">
                    <img
                      src={t.before}
                      alt="Before"
                      className="h-72 w-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute top-2 left-2 rounded bg-black/70 px-2 py-0.5 text-xs font-bold uppercase text-white">
                      Before
                    </span>
                  </div>
                  {/* After */}
                  <div className="relative w-1/2">
                    <div className="absolute inset-0 bg-gradient-to-b from-orange-500/10 to-transparent mix-blend-overlay" />
                    <img
                      src={t.after}
                      alt="After"
                      className="h-72 w-full object-cover"
                      loading="lazy"
                    />
                    <span className="absolute top-2 right-2 rounded bg-orange-500/80 px-2 py-0.5 text-xs font-bold uppercase text-white">
                      After
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-sm font-bold uppercase tracking-wider text-orange-400">
                    {t.label}
                  </h4>
                  <p className="mt-1 text-sm text-gray-300">{t.result}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="relative bg-dark-900 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <span className="mb-4 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
              Investment
            </span>
            <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">
              Choose Your <span className="text-orange-500">Plan</span>
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-gray-400">
              No hidden fees. No long-term contracts. Just results.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 lg:grid-cols-3">
          {PRICING_PLANS.map((plan, i) => (
            <ScrollReveal key={plan.name}>
              <div
                className={`relative overflow-hidden rounded-2xl border p-8 transition-all duration-300 ${
                  plan.highlighted
                    ? "border-orange-500 bg-dark-800 shadow-[0_0_40px_-10px_rgba(255,107,0,0.2)] scale-105"
                    : "border-white/10 bg-dark-900 hover:border-orange-500/50"
                }`}
              >
                {plan.highlighted && (
                  <div className="absolute top-0 left-0 right-0">
                    <div className="bg-orange-500 py-1.5 text-center text-xs font-bold uppercase tracking-[0.2em] text-white">
                      Most Popular
                    </div>
                  </div>
                )}

                <div className={plan.highlighted ? "mt-6" : ""}>
                  <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
                  <p className="mt-1 text-sm text-gray-400">{plan.desc}</p>

                  <div className="mt-6 flex items-baseline gap-1">
                    <span className="text-5xl font-black text-white">{plan.price}</span>
                    <span className="text-gray-400">{plan.unit}</span>
                  </div>

                  <ul className="mt-8 space-y-3">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                        <svg className="mt-0.5 h-4 w-4 flex-shrink-0 text-orange-500" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={plan.stripeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-8 block w-full rounded-full py-3.5 text-center text-sm font-bold uppercase tracking-wider transition-all ${
                      plan.highlighted
                        ? "bg-orange-500 text-white hover:bg-orange-600 hover:shadow-lg"
                        : "border border-white/20 text-white hover:border-orange-500 hover:text-orange-500"
                    }`}
                  >
                    Get Started
                  </a>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    setErrorMsg("");

    try {
      const result = await submitContactForm({ data: { name, email, message } });
      if (result.success) {
        setStatus("success");
        setName("");
        setEmail("");
        setMessage("");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="relative bg-dark-950 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2">
          <ScrollReveal>
            <div>
              <span className="mb-4 inline-block rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-orange-400">
                Get in Touch
              </span>
              <h2 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
                Ready to <span className="text-orange-500">Transform?</span>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-gray-300">
                Book your free no-obligation session today. Let's talk about your goals,
                assess where you are, and build a plan to get you where you want to be.
              </p>

              <div className="mt-10 space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
                    <svg className="h-5 w-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="font-medium text-white">123 Fitness Ave, Suite 200</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
                    <svg className="h-5 w-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="font-medium text-white">hello@eliteperformancetraining.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/10">
                    <svg className="h-5 w-5 text-orange-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Phone</p>
                    <p className="font-medium text-white">(555) 123-4567</p>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <form
              onSubmit={handleSubmit}
              className="rounded-2xl border border-white/10 bg-dark-900 p-8"
            >
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-300">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    disabled={status === "loading"}
                    className="w-full rounded-xl border border-white/10 bg-dark-800 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-300">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={status === "loading"}
                    className="w-full rounded-xl border border-white/10 bg-dark-800 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 disabled:opacity-50"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="mb-2 block text-sm font-medium text-gray-300">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Tell us about your fitness goals..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    disabled={status === "loading"}
                    className="w-full resize-none rounded-xl border border-white/10 bg-dark-800 px-4 py-3 text-white placeholder-gray-500 outline-none transition-all focus:border-orange-500 focus:ring-1 focus:ring-orange-500/30 disabled:opacity-50"
                  />
                </div>

                {status === "success" && (
                  <div className="rounded-xl border border-green-500/30 bg-green-500/10 px-4 py-3 text-sm text-green-400">
                    Thanks for reaching out! We'll get back to you within 24 hours.
                  </div>
                )}

                {status === "error" && (
                  <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-orange-500 py-4 text-base font-bold uppercase tracking-wider text-white transition-all hover:bg-orange-600 hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {status === "loading" ? (
                    <>
                      <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  ) : status === "success" ? (
                    "Message Sent!"
                  ) : (
                    "Send Message"
                  )}
                </button>
              </div>
            </form>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="border-t border-white/10 bg-dark-950 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div>
            <a href="#" className="text-lg font-bold tracking-wider text-white">
              <span className="text-orange-500">ELITE</span> PERFORMANCE TRAINING
            </a>
            <p className="mt-2 text-sm text-gray-400">
              Transform your body. Transform your life.
            </p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-gray-400 transition-colors hover:text-orange-500" aria-label="Instagram">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 transition-colors hover:text-orange-500" aria-label="Facebook">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a href="#" className="text-gray-400 transition-colors hover:text-orange-500" aria-label="YouTube">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Elite Performance Training. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <main>
      <NavBar />
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <BeforeAfterSection />
      <PricingSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}