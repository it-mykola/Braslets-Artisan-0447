import { useStore } from '../lib/store';

export default function CartDrawer() {
  const { cartItems, cartOpen, closeCart, removeFromCart, updateQuantity, lang } = useStore();

  const subtotal = cartItems.reduce((s, i) => s + (i.product.salePrice ?? i.product.price) * i.quantity, 0);
  const shipping = subtotal > 500 ? 0 : 60;
  const total = subtotal + shipping;

  const t = (uk: string, en: string) => lang === 'uk' ? uk : en;

  if (!cartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-50 cart-overlay"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-[420px] z-50 bg-white shadow-2xl flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-[#EDE0E0]">
          <h2 className="text-xl font-bold text-[#2D3142]" style={{fontFamily: "'Playfair Display', serif"}}>
            {t('Кошик', 'Cart')}
            {cartItems.length > 0 && (
              <span className="ml-2 text-sm font-normal text-[#8B7E74]" style={{fontFamily: "'Montserrat', sans-serif"}}>
                ({cartItems.reduce((s, i) => s + i.quantity, 0)} {t('шт.', 'items')})
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="w-9 h-9 flex items-center justify-center hover:bg-[#F9F0F0] rounded-full transition-colors"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D3142" strokeWidth="1.8" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
              <div className="w-20 h-20 bg-[#F9F0F0] rounded-full flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C08081" strokeWidth="1.5" strokeLinecap="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
              </div>
              <p className="text-[#8B7E74] text-sm" style={{fontFamily: "'Montserrat', sans-serif"}}>
                {t('Кошик порожній', 'Your cart is empty')}
              </p>
              <button
                onClick={closeCart}
                className="px-6 py-2.5 bg-[#2D3142] text-white text-sm font-semibold rounded-full hover:bg-[#1a1f30] transition-colors"
                style={{fontFamily: "'Montserrat', sans-serif"}}
              >
                {t('Перейти до покупок', 'Continue Shopping')}
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Free shipping notice */}
              {subtotal < 500 && (
                <div className="bg-[#F4C2C2]/20 border border-[#F4C2C2] rounded-xl px-4 py-3">
                  <p className="text-xs text-[#C08081] font-medium" style={{fontFamily: "'Montserrat', sans-serif"}}>
                    🎁 {t(`Ще ${500 - subtotal}₴ до безкоштовної доставки!`, `${500 - subtotal}₴ more for free shipping!`)}
                  </p>
                </div>
              )}

              {cartItems.map(item => (
                <div key={item.product.id} className="flex gap-3 py-3 border-b border-[#EDE0E0] last:border-0">
                  <div className="w-20 h-20 bg-[#F9F0F0] rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.product.images[0]} alt={item.product.name[lang]} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-semibold text-[#2D3142] line-clamp-2 mb-1" style={{fontFamily: "'Montserrat', sans-serif"}}>
                      {item.product.name[lang]}
                    </h4>
                    <p className="text-xs text-[#8B7E74] mb-2" style={{fontFamily: "'Montserrat', sans-serif"}}>
                      {(item.product.salePrice ?? item.product.price)} ₴
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center border border-[#EDE0E0] rounded-full overflow-hidden">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-[#F9F0F0] text-[#2D3142] text-sm font-bold transition-colors"
                        >−</button>
                        <span className="w-8 text-center text-xs font-semibold text-[#2D3142]" style={{fontFamily: "'Montserrat', sans-serif"}}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-7 h-7 flex items-center justify-center hover:bg-[#F9F0F0] text-[#2D3142] text-sm font-bold transition-colors"
                        >+</button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-[#8B7E74] hover:text-[#C08081] transition-colors"
                        aria-label="Remove"
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
                          <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4h6v2"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-[#2D3142] flex-shrink-0" style={{fontFamily: "'Montserrat', sans-serif"}}>
                    {(item.product.salePrice ?? item.product.price) * item.quantity} ₴
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer summary */}
        {cartItems.length > 0 && (
          <div className="px-6 py-5 border-t border-[#EDE0E0] bg-[#FFF5F5]">
            <div className="flex justify-between text-sm mb-2" style={{fontFamily: "'Montserrat', sans-serif"}}>
              <span className="text-[#8B7E74]">{t('Підсумок:', 'Subtotal:')}</span>
              <span className="font-semibold text-[#2D3142]">{subtotal} ₴</span>
            </div>
            <div className="flex justify-between text-sm mb-3" style={{fontFamily: "'Montserrat', sans-serif"}}>
              <span className="text-[#8B7E74]">{t('Доставка:', 'Shipping:')}</span>
              <span className={`font-semibold ${shipping === 0 ? 'text-[#88D8B0]' : 'text-[#2D3142]'}`}>
                {shipping === 0 ? t('Безкоштовно', 'Free') : `${shipping} ₴`}
              </span>
            </div>
            <div className="flex justify-between text-base font-bold border-t border-[#EDE0E0] pt-3 mb-4" style={{fontFamily: "'Montserrat', sans-serif"}}>
              <span className="text-[#2D3142]">{t('Всього:', 'Total:')}</span>
              <span className="text-[#2D3142]">{total} ₴</span>
            </div>
            <button className="w-full py-3.5 bg-[#2D3142] text-white font-semibold rounded-full hover:bg-[#1a1f30] transition-colors text-sm" style={{fontFamily: "'Montserrat', sans-serif"}}>
              {t('Оформити замовлення', 'Checkout')}
            </button>
            <button
              onClick={closeCart}
              className="w-full py-3 mt-2 border border-[#EDE0E0] text-[#2D3142] font-semibold rounded-full hover:bg-white transition-colors text-sm"
              style={{fontFamily: "'Montserrat', sans-serif"}}
            >
              {t('Продовжити покупки', 'Continue Shopping')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
