import {
  CategoriasGrid,
  ComplexNavbar,
  Footer,
  HeroWithCarousel,
  ProductFilterSidebar,
} from "@/components";

export default function Home() {
  return (
    <>
      <div className="bg-slate-50">
        <ComplexNavbar />
        <HeroWithCarousel />
        <CategoriasGrid />

        <ProductFilterSidebar />

        {/* Icono de whatsapp */}
        <a
          href="https://wa.me/923095970"
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-7"
            viewBox="0 0 32 32"
            fill="currentColor"
          >
            <path d="M16 0a16 16 0 0 0-13.84 24.08L0 32l8.16-2.16A16 16 0 1 0 16 0zm0 29.33a13.22 13.22 0 0 1-6.72-1.8l-.48-.28-4.84 1.28 1.3-4.78-.32-.5A13.27 13.27 0 1 1 16 29.33zm7.38-9.38c-.4-.2-2.36-1.17-2.73-1.3s-.63-.2-.9.2-1.04 1.3-1.28 1.56-.48.3-.84.1a10.94 10.94 0 0 1-3.36-2.06 12.7 12.7 0 0 1-2.36-3.02c-.24-.4 0-.62.18-.84s.42-.52.63-.8c.2-.28.26-.46.38-.76s.06-.58 0-.8c-.1-.24-.94-2.4-1.3-3.3s-.7-.7-.96-.7h-.82a1.6 1.6 0 0 0-1.18.56 4.93 4.93 0 0 0-1.44 3.66c0 2.16 1.56 4.27 1.76 4.56s3.1 4.72 7.55 6.6a25.37 25.37 0 0 0 2.52.94 6 6 0 0 0 2.76.18c.84-.12 2.5-1 2.85-1.9s.35-1.7.25-1.88-.36-.28-.75-.48z" />
          </svg>
        </a>
        <Footer />
      </div>
    </>
  );
}
