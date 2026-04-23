import { useState } from 'react';
import { Product } from '../lib/data';
import { useStore } from '../lib/store';

type Props = {
  product: Product;
  delay?: number;
};

export default function ProductCard({ product, delay = 0 }: Props) {
  const { addToCart, toggleWishlist, wishlist, lang, setQuickView } = useStore();
  const [addedToCart, setAddedToCart] = useState(false);

  const isWishlisted = wishlist.includes(product.id);
  const name = product.name[lang];
  const price = product.salePrice ?? product.price;
  const hasDiscount = !!product.salePrice;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={i < Math.floor(rating) ? 'text-[#C08081]' : 'text-[#EDE0E0]'}>★</span>
    ));
  };

  const tagLabels: Record<string, { uk: string; en: string }> = {
    new: { uk: 'Новинка', en: 'New' },
    bestseller: { uk: 'Хіт', en: 'Bestseller' },
    sale: { uk: 'Знижка', en: 'Sale' },
  };

  const addLabel = lang === 'uk' ? 'В кошик' : 'Add to Cart';
  const addedLabel = lang === 'uk' ? '✓ Додано!' : '✓ Added!';
  const quickLabel = lang === 'uk' ? 'Деталі' : 'Quick View';

  return (
    <div
      className="product-card bg-white cursor-pointer rounded-2xl overflow-hidden border border-[#EDE0E0]"
      style={{ animationDelay: `${delay}ms` }}
      onClick={() => setQuickView(product)}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-[#F9F0F0] aspect-square img-zoom-container">
        <img
          src={product.images[0]}
          alt={name}
          className="product-img-primary w-full h-full object-cover absolute inset-0"
          loading="lazy"
        />
        {product.images[1] && (
          <img
            src={product.images[1]}
            alt={name}
            className="product-img-secondary w-full h-full object-cover absolute inset-0"
            loading="lazy"
          />
        )}

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {product.tags.map(tag => (
            <span
              key={tag}
              className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                tag === 'new' ? 'bg-[#2D3142] text-white' :
                tag === 'bestseller' ? 'bg-[#F4C2C2] text-[#2D3142]' :
                'bg-[#C08081] text-white'
              }`}
              style={{fontFamily: "'Montserrat', sans-serif"}}
            >
              {tagLabels[tag][lang]}
            </span>
          ))}
        </div>

        {/* Wishlist */}
        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full shadow flex items-center justify-center hover:bg-[#FFF5F5] transition-all"
          style={{ animation: isWishlisted ? 'heartPulse 0.3s ease' : undefined }}
          aria-label="Add to wishlist"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={isWishlisted ? "#F4C2C2" : "none"} stroke={isWishlisted ? "#C08081" : "#8B7E74"} strokeWidth="1.8" strokeLinecap="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>

        {/* Stock warning */}
        {product.stock <= 3 && (
          <div className="absolute bottom-3 left-3 bg-[#C08081]/90 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full" style={{fontFamily: "'Montserrat', sans-serif"}}>
            {lang === 'uk' ? `Лишилось ${product.stock}` : `Only ${product.stock} left`}
          </div>
        )}

        {/* Hover actions */}
        <div className="card-actions absolute bottom-0 left-0 right-0 p-3 flex gap-2">
          <button
            onClick={handleAddToCart}
            className={`flex-1 py-2 text-xs font-semibold rounded-full transition-all duration-200 ${
              addedToCart
                ? 'bg-[#88D8B0] text-white'
                : 'bg-[#2D3142] text-white hover:bg-[#1a1f30]'
            }`}
            style={{fontFamily: "'Montserrat', sans-serif"}}
          >
            {addedToCart ? addedLabel : addLabel}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setQuickView(product); }}
            className="px-3 py-2 text-xs font-semibold bg-white text-[#2D3142] rounded-full hover:bg-[#FFF5F5] transition-colors border border-[#EDE0E0]"
            style={{fontFamily: "'Montserrat', sans-serif"}}
          >
            {quickLabel}
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-semibold text-[#2D3142] text-sm leading-tight line-clamp-2 flex-1" style={{fontFamily: "'Montserrat', sans-serif"}}>
            {name}
          </h3>
        </div>

        <div className="flex items-center gap-1 mb-2">
          <div className="flex text-xs">{renderStars(product.rating)}</div>
          <span className="text-xs text-[#8B7E74]" style={{fontFamily: "'Montserrat', sans-serif"}}>({product.reviewsCount})</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-[#2D3142]" style={{fontFamily: "'Montserrat', sans-serif"}}>
            {price} ₴
          </span>
          {hasDiscount && (
            <span className="text-sm text-[#8B7E74] line-through" style={{fontFamily: "'Montserrat', sans-serif"}}>
              {product.price} ₴
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
