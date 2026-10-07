import React from 'react';

export default function WhatsAppButton() {
  const whatsappUrl = `https://wa.me/22646553556?text=${encodeURIComponent("Bonjour TURF PERFORMANCE PRO, j'ai besoin d'aide concernant mon accès TURFELITE-PMU.")}`;

  return (
    <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50">
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter sur WhatsApp"
        className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-full shadow-2xl shadow-emerald-900/50 hover:scale-110 active:scale-95 transition-all duration-300 animate-pulse hover:animate-none"
      >
        {/* SVG WhatsApp Official Icon */}
        <svg
          className="w-8 h-8 sm:w-9 sm:h-9 fill-current"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 2c-5.514 0-9.998 4.486-9.998 10.001 0 1.8.47 3.547 1.365 5.107l-1.398 5.11 5.231-1.372c1.51.824 3.22 1.259 4.799 1.259 5.516 0 10.001-4.485 10.001-10s-4.485-10-10.001-10zm5.834 14.161c-.244.688-1.22 1.31-1.696 1.383-.454.07-1.041.1-1.688-.108-.393-.127-.899-.292-1.547-.573-2.73-1.183-4.512-3.955-4.649-4.138-.137-.183-1.118-1.488-1.118-2.838 0-1.35.706-2.012.958-2.286.252-.274.55-.343.733-.343.183 0 .366.002.526.01.171.008.402-.065.628.478.228.548.777 1.897.845 2.034.068.137.114.297.023.48-.091.183-.137.297-.274.457-.137.16-.289.358-.412.48-.137.137-.28.286-.12.526.16.24.712 1.172 1.528 1.898 1.049.934 1.935 1.223 2.21 1.36.274.137.434.114.594-.068.16-.183.686-.8.868-1.074.183-.274.366-.228.617-.137.252.091 1.599.754 1.874.891.274.137.457.206.526.32.068.114.068.663-.176 1.351z"/>
        </svg>
      </a>
    </div>
  );
}
