import { useState, useEffect } from 'react';
import { useStore } from '../lib/store';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { cartItems, openCart, wishlist, lang, setLang, setSearchOpen } = useStore();

  const cartCount = cartItems.reduce((s, i) => s + i.quantity, 0);
  const wishCount = wishlist.length;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const t = (uk: string, en: string) => lang === 'uk' ? uk : en;

  const navLinks = [
    { label: t('Колекції', 'Collections'), href: '#collections' },
    { label: t('Новинки', 'New Arrivals'), href: '#products' },
    { label: t('Про нас', 'About'), href: '#about' },
    { label: t('Контакти', 'Contact'), href: '#contact' },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'nav-solid' : 'nav-transparent'}`}>
        <div className="max-w-[1280px] mx-auto px-6 h-[72px] flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-full bg-[#F4C2C2] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <circle cx="8" cy="8" r="4" fill="#2D3142"/>
                <circle cx="8" cy="8" r="2" fill="#F4C2C2"/>
              </svg>
            </div>
            <span className="font-playfair font-700 text-[20px] text-[#2D3142] tracking-wide" style={{fontFamily: "'Playfair Display', serif", fontWeight: 700}}>
              Artisan
            </span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                className="text-[#2D3142] text-sm font-medium tracking-wide hover:text-[#C08081] transition-colors duration-200"
                style={{fontFamily: "'Montserrat', sans-serif"}}
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'uk' ? 'en' : 'uk')}
              className="hidden md:block text-xs font-semibold text-[#8B7E74] hover:text-[#2D3142] transition-colors border border-[#EDE0E0] px-2 py-1 rounded"
              style={{fontFamily: "'Montserrat', sans-serif"}}
            >
              {lang === 'uk' ? 'EN' : 'UA'}
            </button>

            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="w-9 h-9 flex items-center justify-center hover:bg-[#F4C2C2]/30 rounded-full transition-colors"
              aria-label="Search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D3142" strokeWidth="1.8" strokeLinecap="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
            </button>

            {/* Wishlist */}
            <button
              className="w-9 h-9 flex items-center justify-center hover:bg-[#F4C2C2]/30 rounded-full transition-colors relative"
              aria-label="Wishlist"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={wishCount > 0 ? "#F4C2C2" : "none"} stroke="#2D3142" strokeWidth="1.8" strokeLinecap="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {wishCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#C08081] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {wishCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={openCart}
              className="w-9 h-9 flex items-center justify-center hover:bg-[#F4C2C2]/30 rounded-full transition-colors relative"
              aria-label="Cart"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2D3142" strokeWidth="1.8" strokeLinecap="round">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/>
                <path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#2D3142] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden w-9 h-9 flex items-center justify-center"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2D3142" strokeWidth="1.8" strokeLinecap="round">
                {mobileOpen ? (
                  <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                ) : (
                  <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-[#FFF5F5] border-t border-[#EDE0E0] px-6 py-6 flex flex-col gap-4">
            {navLinks.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[#2D3142] text-base font-medium py-2 border-b border-[#EDE0E0] last:border-0"
                style={{fontFamily: "'Montserrat', sans-serif"}}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => setLang(lang === 'uk' ? 'en' : 'uk')}
              className="text-sm font-semibold text-[#8B7E74] text-left"
            >
              {lang === 'uk' ? 'Switch to English' : 'Перейти на Українську'}
            </button>
          </div>
        )}
      </nav>
    </>
  );
}
