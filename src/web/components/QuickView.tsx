import { useState } from 'react';
import { useStore } from '../lib/store';

export default function QuickView() {
  const { quickViewProduct: product, setQuickView, addToCart, toggleWishlist, wishlist, lang } = useStore();
  const [selectedImg, setSelectedImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);

  if (!product) return null;

  const name = product.name[lang];
  const desc = product.description[lang];
  const material = product.material[lang];
  const closure = product.closure[lang];
  const price = product.salePrice ?? product.price;
  const isWishlisted = wishlist.includes(product.id);
  const t = (uk: string, en: string) => lang === 'uk' ? uk : en;

  const handleAdd = () => {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => { setAdded(false); setQty(1); }, 2000);
  };

  const renderStars = (rating: number) => Array.from({ length: 5 }, (_, i) => (
    <span key={i} className={i < Math.floor(rating) ? 'text-[#C08081]' : 'text-[#EDE0E0]'}>★</span>
  ));

  const accordionSections = [
    {
      id: 'shipping',
      title: t('Доставка та повернення', 'Shipping & Returns'),
      content: t(
        'Доставка по Україні Новою Поштою 1-3 дні. Безкоштовна доставка від 500₴. Повернення протягом 14 днів.',
        'Delivery across Ukraine by Nova Poshta 1-3 days. Free shipping from ₴500. Returns within 14 days.'
      ),
    },
    {
      id: 'care',
      title: t('Догляд за прикрасою', 'Care Instructions'),
      content: t(
        'Зберігайте в сухому місці. Уникайте контакту з водою, парфумами та хімічними засобами. Чистіть м\'якою сухою тканиною.',
        'Store in a dry place. Avoid contact with water, perfume and chemicals. Clean with a soft dry cloth.'
      ),
    },
    {
      id: 'materials',
      title: t('Матеріали та виробництво', 'Materials & Sourcing'),
      content: t(
        '100% ручна робота. Всі матеріали екологічно чисті та перевірені. Натуральні камені сертифіковані.',
        '100% handmade. All materials are eco-friendly and verified. Natural stones are certified.'
      ),
    },
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={() => setQuickView(null)}
      />

      {/* Modal */}
      <div className="fixed inset-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[900px] md:max-h-[90vh] z-50 bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
        {/* Close */}
        <button
          onClick={() => setQuickView(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 bg-white shadow rounded-full flex items-center justify-center hover:bg-[#F9F0F0] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2D3142" strokeWidth="2" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="flex flex-col md:flex-row overflow-auto">
          {/* Images */}
          <div className="md:w-[45%] flex-shrink-0 p-4 md:p-6">
            <div className="aspect-square rounded-2xl overflow-hidden bg-[#F9F0F0] mb-3 img-zoom-container">
              <img
                src={product.images[selectedImg]}
                alt={name}
                className="w-full h-full object-cover"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImg(i)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${selectedImg === i ? 'border-[#C08081]' : 'border-[#EDE0E0] hover:border-[#F4C2C2]'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 p-4 md:p-6 overflow-y-auto">
            {/* Tags */}
            <div className="flex gap-2 mb-3">
              {product.tags.map(tag => (
                <span key={tag} className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  tag === 'new' ? 'bg-[#2D3142] text-white' :
                  tag === 'bestseller' ? 'bg-[#F4C2C2] text-[#2D3142]' :
                  'bg-[#C08081] text-white'
                }`} style={{fontFamily: "'Montserrat', sans-serif"}}>
                  {tag === 'new' ? t('Новинка', 'New') : tag === 'bestseller' ? t('Хіт', 'Bestseller') : t('Знижка', 'Sale')}
                </span>
              ))}
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-[#2D3142] mb-2" style={{fontFamily: "'Playfair Display', serif"}}>
              {name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex text-sm">{renderStars(product.rating)}</div>
              <span className="text-sm text-[#8B7E74]" style={{fontFamily: "'Montserrat', sans-serif"}}>
                {product.rating} ({product.reviewsCount} {t('відгуків', 'reviews')})
              </span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-[#2D3142]" style={{fontFamily: "'Montserrat', sans-serif"}}>{price} ₴</span>
              {product.salePrice && (
                <span className="text-lg text-[#8B7E74] line-through" style={{fontFamily: "'Montserrat', sans-serif"}}>{product.price} ₴</span>
              )}
            </div>

            {/* Description */}
            <p className="text-sm text-[#8B7E74] leading-relaxed mb-5" style={{fontFamily: "'Montserrat', sans-serif"}}>{desc}</p>

            {/* Specs */}
            <div className="bg-[#F9F0F0] rounded-xl p-4 mb-5">
              <h4 className="text-xs font-bold text-[#2D3142] uppercase tracking-wider mb-3" style={{fontFamily: "'Montserrat', sans-serif"}}>
                {t('Характеристики', 'Specifications')}
              </h4>
              <div className="grid grid-cols-2 gap-y-2">
                {[
                  [t('Матеріал', 'Material'), material],
                  product.length && [t('Довжина', 'Length'), product.length],
                  product.beadSize && [t('Розмір намистини', 'Bead Size'), product.beadSize],
                  [t('Застібка', 'Closure'), closure],
                  [t('Вага', 'Weight'), product.weight],
                  [t('Ручна робота', 'Handmade'), t('Так ✓', 'Yes ✓')],
                ].filter(Boolean).map(([key, val]) => (
                  <div key={key as string} className="col-span-1">
                    <span className="text-[11px] text-[#8B7E74] block" style={{fontFamily: "'Montserrat', sans-serif"}}>{key}</span>
                    <span className="text-xs font-semibold text-[#2D3142]" style={{fontFamily: "'Montserrat', sans-serif"}}>{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-4">
              <span className="text-sm font-semibold text-[#2D3142]" style={{fontFamily: "'Montserrat', sans-serif"}}>{t('Кількість:', 'Qty:')}</span>
              <div className="flex items-center border border-[#EDE0E0] rounded-full">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center hover:bg-[#F9F0F0] rounded-l-full text-lg font-bold text-[#2D3142] transition-colors">−</button>
                <span className="w-10 text-center text-sm font-bold text-[#2D3142]" style={{fontFamily: "'Montserrat', sans-serif"}}>{qty}</span>
                <button onClick={() => setQty(q => Math.min(10, q + 1))} className="w-9 h-9 flex items-center justify-center hover:bg-[#F9F0F0] rounded-r-full text-lg font-bold text-[#2D3142] transition-colors">+</button>
              </div>
              {product.stock <= 3 && (
                <span className="text-xs text-[#C08081] font-medium" style={{fontFamily: "'Montserrat', sans-serif"}}>
                  {t(`Лишилось: ${product.stock}`, `Only ${product.stock} left`)}
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 mb-5">
              <button
                onClick={handleAdd}
                className={`flex-1 py-3.5 rounded-full font-semibold text-sm transition-all ${added ? 'bg-[#88D8B0] text-white' : 'bg-[#2D3142] text-white hover:bg-[#1a1f30]'}`}
                style={{fontFamily: "'Montserrat', sans-serif"}}
              >
                {added ? t('✓ Додано в кошик!', '✓ Added to Cart!') : t('В кошик', 'Add to Cart')}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all ${isWishlisted ? 'bg-[#F4C2C2]/20 border-[#F4C2C2]' : 'border-[#EDE0E0] hover:border-[#F4C2C2]'}`}
                aria-label="Wishlist"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? "#F4C2C2" : "none"} stroke={isWishlisted ? "#C08081" : "#8B7E74"} strokeWidth="1.8" strokeLinecap="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                </svg>
              </button>
            </div>

            {/* Accordion */}
            <div className="border-t border-[#EDE0E0]">
              {accordionSections.map(sec => (
                <div key={sec.id} className="border-b border-[#EDE0E0]">
                  <button
                    onClick={() => setOpenSection(openSection === sec.id ? null : sec.id)}
                    className="w-full flex items-center justify-between py-3 text-sm font-semibold text-[#2D3142] text-left"
                    style={{fontFamily: "'Montserrat', sans-serif"}}
                  >
                    {sec.title}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8B7E74" strokeWidth="2" strokeLinecap="round" className={`transition-transform ${openSection === sec.id ? 'rotate-180' : ''}`}>
                      <polyline points="6 9 12 15 18 9"/>
                    </svg>
                  </button>
                  {openSection === sec.id && (
                    <p className="pb-3 text-xs text-[#8B7E74] leading-relaxed" style={{fontFamily: "'Montserrat', sans-serif"}}>
                      {sec.content}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
