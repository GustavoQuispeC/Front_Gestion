import React from 'react'
import Image from 'next/image';
import { Button } from '../ui/button';

const products = () => {
  return (
    <div className="p-4 mx-auto lg:max-w-6xl md:max-w-4xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 dark:text-blue-500 mb-6 sm:mb-12">Catálogo de productos</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        <div className="bg-white dark:bg-neutral-600 flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition-all">
            <div className="w-full">
            <Image
              src="https://readymadeui.com/images/product1.webp"
              alt="Product 1"
              width={230}
              height={307}
              className="w-full object-cover object-top aspect-[230/307]"
            />
            </div>

          <div className="p-4 flex-1 flex flex-col">
            <div className="flex-1">
              <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">Lexicon Luxe</h5>
              <div className="mt-2 flex items-center flex-wrap gap-2">
                <h6 className="text-sm sm:text-base font-semibold text-slate-900">$10</h6>
                <div className="bg-blue-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto" title="Wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-blue-800 inline-block"
                    viewBox="0 0 64 64">
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"></path>
                  </svg>
                </div>
              </div>
            </div>
            <Button type="button" className="text-sm px-2 py-2 font-medium w-full mt-4 tracking-wide ml-auto outline-none border-none ">Cotizar</Button>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-600 flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition-all">
            <div className="w-full">
            <Image
              src="https://readymadeui.com/images/product2.webp"
              alt="Product 2"
              width={230}
              height={307}
              className="w-full object-cover object-top aspect-[230/307]"
            />
            </div>

          <div className="p-4 flex-1 flex flex-col">
            <div className="flex-1">
              <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">Adjective Attire</h5>
              <div className="mt-2 flex items-center flex-wrap gap-2">
                <h6 className="text-sm sm:text-base font-semibold text-slate-900">$12</h6>
                <div className="bg-blue-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto" title="Wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-blue-800 inline-block"
                    viewBox="0 0 64 64">
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"></path>
                  </svg>
                </div>
              </div>
            </div>
           <Button type="button" className="text-sm px-2 py-2 font-medium w-full mt-4 tracking-wide ml-auto outline-none border-none ">Cotizar</Button>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-600 flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition-all">
            <div className="w-full">
            <Image
              src="https://readymadeui.com/images/product3.webp"
              alt="Product 3"
              width={230}
              height={307}
              className="w-full object-cover object-top aspect-[230/307]"
            />
            </div>

          <div className="p-4 flex-1 flex flex-col">
            <div className="flex-1">
              <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">ThreadCraft Vibes</h5>
              <div className="mt-2 flex items-center flex-wrap gap-2">
                <h6 className="text-sm sm:text-base font-semibold text-slate-900">$14</h6>
                 <div className="bg-blue-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto" title="Wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-blue-800 inline-block"
                    viewBox="0 0 64 64">
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"></path>
                  </svg>
                </div>
              </div>
            </div>
      <Button type="button" className="text-sm px-2 py-2 font-medium w-full mt-4 tracking-wide ml-auto outline-none border-none ">Cotizar</Button>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-600 flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition-all">
            <div className="w-full">
            <Image
              src="https://readymadeui.com/images/product7.webp"
              alt="Product 3"
              width={230}
              height={307}
              className="w-full object-cover object-top aspect-[230/307]"
            />
            </div>

          <div className="p-4 flex-1 flex flex-col">
            <div className="flex-1">
              <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">Verbal Vogue Tees</h5>
              <div className="mt-2 flex items-center flex-wrap gap-2">
                <h6 className="text-sm sm:text-base font-semibold text-slate-900">$12</h6>
                <div className="bg-blue-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto" title="Wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-blue-800 inline-block"
                    viewBox="0 0 64 64">
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"></path>
                  </svg>
                </div>
              </div>
            </div>
           <Button type="button" className="text-sm px-2 py-2 font-medium w-full mt-4 tracking-wide ml-auto outline-none border-none ">Cotizar</Button>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-600 flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition-all">
            <div className="w-full">
            <Image
              src="https://readymadeui.com/images/product5.webp"
              alt="Product 3"
              width={230}
              height={307}
              className="w-full object-cover object-top aspect-[230/307]"
            />
            </div>

          <div className="p-4 flex-1 flex flex-col">
            <div className="flex-1">
              <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">Jargon Jungle</h5>
              <div className="mt-2 flex items-center flex-wrap gap-2">
                <h6 className="text-sm sm:text-base font-semibold text-slate-900">$15</h6>
               <div className="bg-blue-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto" title="Wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-blue-800 inline-block"
                    viewBox="0 0 64 64">
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"></path>
                  </svg>
                </div>
              </div>
            </div>
           <Button type="button" className="text-sm px-2 py-2 font-medium w-full mt-4 tracking-wide ml-auto outline-none border-none ">Cotizar</Button>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-600 flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition-all">
            <div className="w-full">
            <Image
              src="https://readymadeui.com/images/product6.webp"
              alt="Product 3"
              width={230}
              height={307}
              className="w-full object-cover object-top aspect-[230/307]"
            />
            </div>

          <div className="p-4 flex-1 flex flex-col">
            <div className="flex-1">
              <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">Syllable Streetwear</h5>
              <div className="mt-2 flex items-center flex-wrap gap-2">
                <h6 className="text-sm sm:text-base font-semibold text-slate-900">$14</h6>
              <div className="bg-blue-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto" title="Wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-blue-800 inline-block"
                    viewBox="0 0 64 64">
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"></path>
                  </svg>
                </div>
              </div>
            </div>
            <Button type="button" className="text-sm px-2 py-2 font-medium w-full mt-4 tracking-wide ml-auto outline-none border-none ">Cotizar</Button>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-600 flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition-all">
            <div className="w-full">
            <Image
              src="https://readymadeui.com/images/product1.webp"
              alt="Product 3"
              width={230}
              height={307}
              className="w-full object-cover object-top aspect-[230/307]"
            />
            </div>

          <div className="p-4 flex-1 flex flex-col">
            <div className="flex-1">
              <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">Syllable Streetwear</h5>
              <div className="mt-2 flex items-center flex-wrap gap-2">
                <h6 className="text-sm sm:text-base font-semibold text-slate-900">$14</h6>
                <div className="bg-blue-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto" title="Wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-blue-800 inline-block"
                    viewBox="0 0 64 64">
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"></path>
                  </svg>
                </div>
              </div>
            </div>
           <Button type="button" className="text-sm px-2 py-2 font-medium w-full mt-4 tracking-wide ml-auto outline-none border-none ">Cotizar</Button>
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-600 flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition-all">
            <div className="w-full">
            <Image
              src="https://readymadeui.com/images/product2.webp"
              alt="Product 3"
              width={230}
              height={307}
              className="w-full object-cover object-top aspect-[230/307]"
            />
            </div>

          <div className="p-4 flex-1 flex flex-col">
            <div className="flex-1">
              <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">Syllable Streetwear</h5>
              <div className="mt-2 flex items-center flex-wrap gap-2">
                <h6 className="text-sm sm:text-base font-semibold text-slate-900">$14</h6>
                 <div className="bg-blue-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto" title="Wishlist">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16px" className="fill-blue-800 inline-block"
                    viewBox="0 0 64 64">
                    <path
                      d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                      data-original="#000000"></path>
                  </svg>
                </div>
              </div>
            </div>
           <Button type="button" className="text-sm px-2 py-2 font-medium w-full mt-4 tracking-wide ml-auto outline-none border-none ">Cotizar</Button>
          </div>
          
        </div>
       
      </div>
    </div>
  )
}

export default products