import { useEffect, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import CartDrawer from '../components/CartDrawer';
import QuickView from '../components/QuickView';
import ProductCard from '../components/ProductCard';
import { products, collections, testimonials } from '../lib/data';
import { useStore } from '../lib/store';

// Scroll reveal hook
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

// Star rating
function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={i < Math.floor(rating) ? 'text-[#C08081]' : 'text-[#EDE0E0]'}>★</span>
      ))}
    </div>
  );
}

export default function Home() {
  useScrollReveal();
  const { lang, activeCategory, setActiveCategory } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterDone, setNewsletterDone] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const t = (uk: string, en: string) => lang === 'uk' ? uk : en;

  // Hero featured products rotation
  const heroProducts = products.filter(p => p.isFeatured).slice(0, 3);
  useEffect(() => {
    const timer = setInterval(() => setHeroIndex(i => (i + 1) % heroProducts.length), 3000);
    return () => clearInterval(timer);
  }, [heroProducts.length]);

  const categories = [
    { id: 'all', label: t('Все', 'All') },
    { id: 'bracelet', label: t('Браслети', 'Bracelets') },
    { id: 'keychain', label: t('Брелоки', 'Keychains') },
    { id: 'new', label: t('Новинки', 'New') },
    { id: 'bestseller', label: t('Хіти', 'Bestsellers') },
    { id: 'sale', label: t('Знижки', 'Sale') },
  ];

  const filteredProducts = products.filter(p => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'bracelet') return p.category === 'bracelet';
    if (activeCategory === 'keychain') return p.category === 'keychain';
    if (activeCategory === 'new') return p.tags.includes('new');
    if (activeCategory === 'bestseller') return p.tags.includes('bestseller');
    if (activeCategory === 'sale') return p.tags.includes('sale');
    return true;
  });

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterDone(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5F5]">
      <Navbar />
      <CartDrawer />
      <QuickView />

      {/* ──────────── HERO ──────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FFF5F5]">
        {/* Background decorative */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-0 w-[50%] h-full bg-gradient-to-l from-[#F4C2C2]/20 to-transparent" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full bg-[#F4C2C2]/10 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-48 h-48 rounded-full bg-[#F4C2C2]/15 blur-2xl" />
        </div>

        <div className="max-w-[1280px] mx-auto px-6 pt-[72px] w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center min-h-[calc(100vh-72px)] py-16">
            {/* Left content */}
            <div>
              <p className="text-xs font-bold tracking-[3px] text-[#C08081] uppercase mb-4 animate-fade-in-up" style={{fontFamily: "'Montserrat', sans-serif", animationDelay: '0.1s'}}>
                {t('Ручна робота · Натуральні матеріали', 'Handmade · Natural Materials')}
              </p>

              <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold text-[#2D3142] leading-[1.05] mb-6" style={{fontFamily: "'Playfair Display', serif", animationDelay: '0.2s'}}>
                {t(
                  <>Унікальні<br /><em className="not-italic text-[#C08081]">браслети</em><br />та брелоки</>,
                  <>Unique<br /><em className="not-italic text-[#C08081]">bracelets</em><br />& keychains</>
                )}
              </h1>

              <p className="text-base text-[#8B7E74] leading-relaxed mb-8 max-w-md animate-fade-in-up" style={{fontFamily: "'Montserrat', sans-serif", animationDelay: '0.3s'}}>
                {t(
                  'Кожен виріб створений вручну з любов\'ю, натуральних каменів та кристалів. Ідеальний подарунок або особистий талісман.',
                  'Each piece handcrafted with love from natural stones and crystals. The perfect gift or personal talisman.'
                )}
              </p>

              <div className="flex flex-wrap gap-4 mb-12 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                <a
                  href="#products"
                  className="px-8 py-4 bg-[#2D3142] text-white font-semibold rounded-full hover:bg-[#1a1f30] transition-all hover:scale-[1.02] shadow-lg shadow-[#2D3142]/20 text-sm"
                  style={{fontFamily: "'Montserrat', sans-serif"}}
                >
                  {t('Переглянути колекцію', 'Shop Collection')}
                </a>
                <a
                  href="#collections"
                  className="px-8 py-4 border border-[#2D3142] text-[#2D3142] font-semibold rounded-full hover:bg-[#2D3142] hover:text-white transition-all hover:scale-[1.02] text-sm"
                  style={{fontFamily: "'Montserrat', sans-serif"}}
                >
                  {t('Наші колекції', 'Our Collections')}
                </a>
              </div>

              {/* Stats */}
              <div className="flex gap-8 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                {[
                  { num: '500+', label: t('Щасливих клієнтів', 'Happy Customers') },
                  { num: '100%', label: t('Ручна робота', 'Handmade') },
                  { num: '4.9★', label: t('Середня оцінка', 'Avg. Rating') },
                ].map(s => (
                  <div key={s.num}>
                    <div className="text-xl font-bold text-[#2D3142]" style={{fontFamily: "'Playfair Display', serif"}}>{s.num}</div>
                    <div className="text-xs text-[#8B7E74]" style={{fontFamily: "'Montserrat', sans-serif"}}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — hero image showcase */}
            <div className="relative flex items-center justify-center">
              {/* Main rotating product */}
              <div className="relative animate-float">
                <div className="w-[320px] h-[380px] md:w-[400px] md:h-[460px] rounded-3xl overflow-hidden shadow-2xl">
                  {heroProducts.map((p, i) => (
                    <img
                      key={p.id}
                      src={p.images[0]}
                      alt={p.name[lang]}
                      className="w-full h-full object-cover absolute inset-0 transition-opacity duration-700"
                      style={{ opacity: heroIndex === i ? 1 : 0 }}
                    />
                  ))}
                </div>

                {/* Floating product tag */}
                <div className="absolute -bottom-5 -left-8 bg-white rounded-2xl shadow-xl px-4 py-3 min-w-[160px]">
                  <p className="text-xs text-[#8B7E74] mb-0.5" style={{fontFamily: "'Montserrat', sans-serif"}}>{t('Хіт продажів', 'Bestseller')}</p>
                  <p className="text-sm font-bold text-[#2D3142] truncate" style={{fontFamily: "'Montserrat', sans-serif"}}>
                    {heroProducts[heroIndex]?.name[lang]}
                  </p>
                  <p className="text-sm font-bold text-[#C08081]" style={{fontFamily: "'Montserrat', sans-serif"}}>
                    {heroProducts[heroIndex]?.price} ₴
                  </p>
                </div>

                {/* Floating rating tag */}
                <div className="absolute -top-5 -right-8 bg-white rounded-2xl shadow-xl px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#C08081] text-lg">★</span>
                    <span className="font-bold text-[#2D3142]" style={{fontFamily: "'Montserrat', sans-serif"}}>4.9</span>
                    <span className="text-xs text-[#8B7E74]" style={{fontFamily: "'Montserrat', sans-serif"}}>(500+)</span>
                  </div>
                </div>
              </div>

              {/* Indicator dots */}
              <div className="absolute bottom-4 right-8 flex gap-2">
                {heroProducts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setHeroIndex(i)}
                    className={`rounded-full transition-all duration-300 ${heroIndex === i ? 'w-6 h-2 bg-[#C08081]' : 'w-2 h-2 bg-[#F4C2C2]'}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#8B7E74] animate-bounce">
          <span className="text-xs tracking-wider" style={{fontFamily: "'Montserrat', sans-serif"}}>{t('Гортайте', 'Scroll')}</span>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </div>
      </section>

      {/* ──────────── MARQUEE ──────────── */}
      <div className="bg-[#2D3142] py-4 overflow-hidden">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]" style={{animation: 'none'}}>
          <div className="flex gap-12 text-[#F4C2C2] text-sm font-medium tracking-widest uppercase" style={{fontFamily: "'Montserrat', sans-serif"}}>
            {[
              t('Ручна робота', 'Handmade'),
              t('Натуральні камені', 'Natural Stones'),
              t('Безкоштовна доставка від 500₴', 'Free shipping over ₴500'),
              t('Унікальні дизайни', 'Unique Designs'),
              t('Еко-матеріали', 'Eco Materials'),
              t('Ідеальний подарунок', 'Perfect Gift'),
              '✦',
              t('Ручна робота', 'Handmade'),
              t('Натуральні камені', 'Natural Stones'),
              t('Безкоштовна доставка від 500₴', 'Free shipping over ₴500'),
              t('Унікальні дизайни', 'Unique Designs'),
              t('Еко-матеріали', 'Eco Materials'),
              t('Ідеальний подарунок', 'Perfect Gift'),
              '✦',
            ].map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ──────────── COLLECTIONS ──────────── */}
      <section id="collections" className="py-20 px-6 max-w-[1280px] mx-auto">
        <div className="reveal text-center mb-12">
          <p className="text-xs font-bold tracking-[3px] text-[#C08081] uppercase mb-3" style={{fontFamily: "'Montserrat', sans-serif"}}>
            {t('Колекції', 'Collections')}
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#2D3142]" style={{fontFamily: "'Playfair Display', serif"}}>
            {t('Наші колекції', 'Our Collections')}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {collections.map((col, i) => (
            <div
              key={col.id}
              className={`reveal reveal-delay-${i + 1} group relative rounded-2xl overflow-hidden cursor-pointer aspect-[3/4]`}
              onClick={() => setActiveCategory(col.id === 'spring-bloom' || col.id === 'ocean-breeze' ? 'bracelet' : 'all')}
            >
              <div className="img-zoom-container w-full h-full">
                <img src={col.image} alt={col.name[lang]} className="w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D3142]/80 via-[#2D3142]/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h3 className="text-white font-bold text-base mb-0.5" style={{fontFamily: "'Playfair Display', serif"}}>{col.name[lang]}</h3>
                <p className="text-white/70 text-xs mb-2" style={{fontFamily: "'Montserrat', sans-serif"}}>{col.description[lang]}</p>
                <span className="inline-flex items-center gap-1 text-[#F4C2C2] text-xs font-semibold group-hover:gap-2 transition-all" style={{fontFamily: "'Montserrat', sans-serif"}}>
                  {t('Дивитись', 'Explore')} →
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ──────────── PRODUCTS ──────────── */}
      <section id="products" className="py-20 px-6 max-w-[1280px] mx-auto">
        <div className="reveal flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-bold tracking-[3px] text-[#C08081] uppercase mb-2" style={{fontFamily: "'Montserrat', sans-serif"}}>
              {t('Продукти', 'Products')}
            </p>
            <h2 className="text-4xl font-bold text-[#2D3142]" style={{fontFamily: "'Playfair Display', serif"}}>
              {t('Наші вироби', 'Our Products')}
            </h2>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="reveal flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`cat-pill px-5 py-2 rounded-full text-sm font-medium border transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#2D3142] text-white border-[#2D3142]'
                  : 'bg-white text-[#2D3142] border-[#EDE0E0] hover:border-[#F4C2C2]'
              }`}
              style={{fontFamily: "'Montserrat', sans-serif"}}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts.map((product, i) => (
            <div key={product.id} className="reveal" style={{transitionDelay: `${i * 0.05}s`}}>
              <ProductCard product={product} delay={i * 50} />
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-[#8B7E74]" style={{fontFamily: "'Montserrat', sans-serif"}}>
            {t('Товарів не знайдено', 'No products found')}
          </div>
        )}
      </section>

      {/* ──────────── FEATURES ──────────── */}
      <section className="py-16 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C08081" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                  </svg>
                ),
                title: t('Ручна робота', 'Handmade'),
                desc: t('Кожен виріб створений вручну з увагою до деталей', 'Every piece crafted by hand with attention to detail'),
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C08081" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 8v4l3 3"/>
                  </svg>
                ),
                title: t('Швидка доставка', 'Fast Shipping'),
                desc: t('Доставка по Україні 1-3 дні Новою Поштою', 'Delivery across Ukraine 1-3 days via Nova Poshta'),
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C08081" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                  </svg>
                ),
                title: t('Гарантія якості', 'Quality Guarantee'),
                desc: t('Тільки перевірені натуральні матеріали', 'Only verified natural materials'),
              },
              {
                icon: (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#C08081" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                  </svg>
                ),
                title: t('Підтримка', 'Support'),
                desc: t('Завжди на зв\'язку для будь-яких питань', 'Always available for any questions'),
              },
            ].map((f, i) => (
              <div key={i} className={`reveal reveal-delay-${i + 1} flex flex-col items-center text-center gap-3`}>
                <div className="w-14 h-14 bg-[#F9F0F0] rounded-full flex items-center justify-center">
                  {f.icon}
                </div>
                <h4 className="font-bold text-[#2D3142] text-sm" style={{fontFamily: "'Montserrat', sans-serif"}}>{f.title}</h4>
                <p className="text-xs text-[#8B7E74] leading-relaxed" style={{fontFamily: "'Montserrat', sans-serif"}}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── ABOUT ──────────── */}
      <section id="about" className="py-20 px-6 max-w-[1280px] mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image side */}
          <div className="reveal relative">
            <div className="rounded-3xl overflow-hidden aspect-[4/5] img-zoom-container shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80"
                alt="Artisan workspace"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute bottom-8 -right-4 bg-[#2D3142] text-white rounded-2xl px-6 py-4 shadow-xl">
              <p className="text-2xl font-bold" style={{fontFamily: "'Playfair Display', serif"}}>500+</p>
              <p className="text-xs text-[#F4C2C2]" style={{fontFamily: "'Montserrat', sans-serif"}}>{t('Задоволених клієнтів', 'Happy customers')}</p>
            </div>
            <div className="absolute top-8 -left-4 bg-[#F4C2C2] rounded-2xl px-5 py-3 shadow-xl">
              <p className="text-lg font-bold text-[#2D3142]" style={{fontFamily: "'Playfair Display', serif"}}>3+</p>
              <p className="text-xs text-[#2D3142]" style={{fontFamily: "'Montserrat', sans-serif"}}>{t('Роки досвіду', 'Years of craft')}</p>
            </div>
          </div>

          {/* Text side */}
          <div className="reveal">
            <p className="text-xs font-bold tracking-[3px] text-[#C08081] uppercase mb-4" style={{fontFamily: "'Montserrat', sans-serif"}}>
              {t('Про майстра', 'About the Artisan')}
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-[#2D3142] mb-6 leading-tight" style={{fontFamily: "'Playfair Display', serif"}}>
              {t('Зроблено руками,\nзроблено з серцем', 'Made by Hands,\nMade with Heart')}
            </h2>
            <p className="text-[#8B7E74] leading-relaxed mb-4" style={{fontFamily: "'Montserrat', sans-serif"}}>
              {t(
                'Кожен мій виріб — це маленька історія, вкладена в намистини та камені. Я вірю, що прикраса повинна не просто прикрашати, а й нести в собі певну енергетику та сенс.',
                'Every piece I create is a small story embedded in beads and stones. I believe jewelry should not just adorn, but carry energy and meaning.'
              )}
            </p>
            <p className="text-[#8B7E74] leading-relaxed mb-8" style={{fontFamily: "'Montserrat', sans-serif"}}>
              {t(
                'Я використовую лише натуральні екологічні матеріали: справжні дорогоцінні та напівдорогоцінні камені, кристали, перли та металеву фурнітуру преміальної якості.',
                'I use only natural eco-friendly materials: genuine precious and semi-precious stones, crystals, pearls and premium metal hardware.'
              )}
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              {[
                { val: '500+', label: t('Клієнтів', 'Customers') },
                { val: '100%', label: t('Ручна робота', 'Handmade') },
                { val: '♻', label: t('Еко-матеріали', 'Eco Materials') },
              ].map(s => (
                <div key={s.val} className="text-center bg-[#F9F0F0] rounded-2xl p-4">
                  <p className="text-2xl font-bold text-[#C08081]" style={{fontFamily: "'Playfair Display', serif"}}>{s.val}</p>
                  <p className="text-xs text-[#8B7E74] mt-1" style={{fontFamily: "'Montserrat', sans-serif"}}>{s.label}</p>
                </div>
              ))}
            </div>

            <a
              href="#products"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#2D3142] text-white font-semibold rounded-full hover:bg-[#1a1f30] transition-all text-sm"
              style={{fontFamily: "'Montserrat', sans-serif"}}
            >
              {t('Переглянути вироби', 'View All Products')}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ──────────── TESTIMONIALS ──────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="reveal text-center mb-12">
            <p className="text-xs font-bold tracking-[3px] text-[#C08081] uppercase mb-3" style={{fontFamily: "'Montserrat', sans-serif"}}>
              {t('Відгуки', 'Testimonials')}
            </p>
            <h2 className="text-4xl font-bold text-[#2D3142]" style={{fontFamily: "'Playfair Display', serif"}}>
              {t('Що кажуть клієнти', 'What Customers Say')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t_, i) => (
              <div key={t_.id} className={`reveal reveal-delay-${(i % 3) + 1} bg-[#FFF5F5] rounded-2xl p-6 border border-[#EDE0E0]`}>
                <div className="flex items-center gap-3 mb-4">
                  <img src={t_.avatar} alt={t_.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-[#2D3142] text-sm" style={{fontFamily: "'Montserrat', sans-serif"}}>{t_.name}</p>
                    <div className="flex items-center gap-1">
                      <Stars rating={t_.rating} />
                      <span className="text-xs text-[#8B7E74]" style={{fontFamily: "'Montserrat', sans-serif"}}>
                        ✓ {lang === 'uk' ? 'Перевірена покупка' : 'Verified purchase'}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-[#8B7E74] leading-relaxed mb-3 italic" style={{fontFamily: "'Montserrat', sans-serif"}}>
                  "{t_.text}"
                </p>
                <p className="text-xs text-[#C08081] font-semibold" style={{fontFamily: "'Montserrat', sans-serif"}}>
                  🛍 {t_.product}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ──────────── NEWSLETTER ──────────── */}
      <section className="py-20 px-6 bg-[#2D3142] relative overflow-hidden">
        {/* decorative */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#F4C2C2]/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#F4C2C2]/10 blur-3xl pointer-events-none" />

        <div className="max-w-[640px] mx-auto text-center relative">
          <div className="reveal">
            <span className="text-4xl mb-4 block">🎁</span>
            <h2 className="text-4xl font-bold text-white mb-3" style={{fontFamily: "'Playfair Display', serif"}}>
              {lang === 'uk' ? 'Отримай знижку 10%' : 'Get 10% Off'}
            </h2>
            <p className="text-[#F4C2C2] mb-8 text-sm" style={{fontFamily: "'Montserrat', sans-serif"}}>
              {lang === 'uk'
                ? 'Підпишись на розсилку і отримай знижку 10% на перше замовлення + ексклюзивні новинки'
                : 'Subscribe and get 10% off your first order + exclusive new arrivals'}
            </p>

            {newsletterDone ? (
              <div className="bg-[#88D8B0]/20 border border-[#88D8B0]/40 rounded-2xl p-6">
                <p className="text-[#88D8B0] font-semibold text-lg" style={{fontFamily: "'Montserrat', sans-serif"}}>
                  {lang === 'uk' ? '✓ Дякуємо! Промокод надіслано на email.' : '✓ Thank you! Promo code sent to your email.'}
                </p>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex gap-3 max-w-[480px] mx-auto">
                <input
                  type="email"
                  value={newsletterEmail}
                  onChange={e => setNewsletterEmail(e.target.value)}
                  placeholder={lang === 'uk' ? 'Ваш email...' : 'Your email...'}
                  required
                  className="flex-1 px-5 py-3.5 rounded-full bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-sm focus:outline-none focus:border-[#F4C2C2] transition-colors"
                  style={{fontFamily: "'Montserrat', sans-serif"}}
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-[#F4C2C2] text-[#2D3142] font-bold rounded-full hover:bg-[#C08081] hover:text-white transition-all text-sm whitespace-nowrap"
                  style={{fontFamily: "'Montserrat', sans-serif"}}
                >
                  {lang === 'uk' ? 'Підписатись' : 'Subscribe'}
                </button>
              </form>
            )}
            <p className="text-white/40 text-xs mt-4" style={{fontFamily: "'Montserrat', sans-serif"}}>
              {lang === 'uk' ? 'Ніякого спаму. Відписатись можна в будь-який час.' : 'No spam. Unsubscribe anytime.'}
            </p>
          </div>
        </div>
      </section>

      {/* ──────────── FOOTER ──────────── */}
      <footer id="contact" className="bg-[#1A1A2E] text-white pt-16 pb-8 px-6">
        <div className="max-w-[1280px] mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-[#F4C2C2] flex items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <circle cx="8" cy="8" r="4" fill="#2D3142"/>
                    <circle cx="8" cy="8" r="2" fill="#F4C2C2"/>
                  </svg>
                </div>
                <span className="text-xl font-bold" style={{fontFamily: "'Playfair Display', serif"}}>Artisan</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-6" style={{fontFamily: "'Montserrat', sans-serif"}}>
                {lang === 'uk' ? 'Унікальні прикраси ручної роботи з натуральних матеріалів.' : 'Unique handmade jewelry from natural materials.'}
              </p>
              {/* Social */}
              <div className="flex gap-3">
                {[
                  { name: 'Instagram', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/></svg> },
                  { name: 'Facebook', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> },
                  { name: 'TikTok', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg> },
                ].map(s => (
                  <a key={s.name} href="#" className="w-9 h-9 bg-white/10 hover:bg-[#F4C2C2]/20 rounded-full flex items-center justify-center transition-colors text-white" aria-label={s.name}>
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Shop */}
            <div>
              <h4 className="font-bold text-sm mb-4 text-white/80 uppercase tracking-wider" style={{fontFamily: "'Montserrat', sans-serif"}}>
                {lang === 'uk' ? 'Магазин' : 'Shop'}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  lang === 'uk' ? 'Всі вироби' : 'All Products',
                  lang === 'uk' ? 'Браслети' : 'Bracelets',
                  lang === 'uk' ? 'Брелоки' : 'Keychains',
                  lang === 'uk' ? 'Новинки' : 'New Arrivals',
                  lang === 'uk' ? 'Розпродаж' : 'Sale',
                ].map(item => (
                  <li key={item}>
                    <a href="#products" className="text-white/50 hover:text-white text-sm transition-colors" style={{fontFamily: "'Montserrat', sans-serif"}}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="font-bold text-sm mb-4 text-white/80 uppercase tracking-wider" style={{fontFamily: "'Montserrat', sans-serif"}}>
                {lang === 'uk' ? 'Допомога' : 'Help'}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {[
                  lang === 'uk' ? 'Доставка' : 'Shipping',
                  lang === 'uk' ? 'Повернення' : 'Returns',
                  lang === 'uk' ? 'FAQ' : 'FAQ',
                  lang === 'uk' ? 'Контакти' : 'Contact Us',
                  lang === 'uk' ? 'Розмірна таблиця' : 'Size Guide',
                ].map(item => (
                  <li key={item}>
                    <a href="#" className="text-white/50 hover:text-white text-sm transition-colors" style={{fontFamily: "'Montserrat', sans-serif"}}>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-bold text-sm mb-4 text-white/80 uppercase tracking-wider" style={{fontFamily: "'Montserrat', sans-serif"}}>
                {lang === 'uk' ? 'Контакти' : 'Contact'}
              </h4>
              <ul className="flex flex-col gap-3">
                {[
                  { icon: '📧', text: 'artisan@email.com' },
                  { icon: '📱', text: '+380 XX XXX XX XX' },
                  { icon: '📍', text: lang === 'uk' ? 'Україна' : 'Ukraine' },
                  { icon: '🕐', text: lang === 'uk' ? 'Пн-Сб: 9:00-18:00' : 'Mon-Sat: 9am-6pm' },
                ].map(c => (
                  <li key={c.text} className="flex items-start gap-2">
                    <span className="text-sm">{c.icon}</span>
                    <span className="text-white/50 text-sm" style={{fontFamily: "'Montserrat', sans-serif"}}>{c.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/30 text-xs" style={{fontFamily: "'Montserrat', sans-serif"}}>
              © 2025 Artisan. {lang === 'uk' ? 'Всі права захищені.' : 'All rights reserved.'}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex gap-2 items-center">
                {['VISA', 'MC', 'GPay'].map(pm => (
                  <span key={pm} className="text-[10px] font-bold bg-white/10 text-white/50 px-2 py-1 rounded" style={{fontFamily: "'Montserrat', sans-serif"}}>{pm}</span>
                ))}
              </div>
              <div className="flex gap-4">
                {[
                  lang === 'uk' ? 'Умови' : 'Terms',
                  lang === 'uk' ? 'Конфіденційність' : 'Privacy',
                ].map(link => (
                  <a key={link} href="#" className="text-white/30 hover:text-white text-xs transition-colors" style={{fontFamily: "'Montserrat', sans-serif"}}>{link}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
