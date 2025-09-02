import { Search } from "lucide-react";
import { Products } from "..";


const ProductFilterSidebar = () => {
  return (
    <div className="flex">
      <div className="w-full max-w-[300px] shrink-0 shadow-md px-6 sm:px-8 min-h-screen py-6">
        <div className="flex items-center border-b border-gray-300 pb-2 mb-6">
          <h3 className="text-blue-900 text-lg font-semibold">Filtrar</h3>
          <button
            type="button"
            className="text-sm text-red-500 font-semibold ml-auto cursor-pointer"
          >
            Limpiar todo
          </button>
        </div>
        <div>
          <h6 className="text-blue-900 text-sm font-semibold">Marca</h6>
          <div className="flex px-3 py-1.5 rounded-md border border-gray-300 bg-gray-100 overflow-hidden mt-2">
            <input
              type="email"
              placeholder="Buscar producto"
              className="w-full bg-transparent outline-none text-gray-900 text-sm"
            />

            <Search width={18} className="text-gray-400" />
          </div>
          <ul className="mt-6 space-y-4">
            <li className="flex items-center gap-3">
              <input
                id="zara"
                type="checkbox"
                className="w-4 h-4 cursor-pointer"
              />
              <label
                htmlFor="zara"
                className="text-slate-600 font-medium text-sm cursor-pointer"
              >
                Zara
              </label>
            </li>
            <li className="flex items-center gap-3">
              <input
                id="hm"
                type="checkbox"
                className="w-4 h-4 cursor-pointer"
              />
              <label
                htmlFor="hm"
                className="text-slate-600 font-medium text-sm cursor-pointer"
              >
                H&M
              </label>
            </li>
            <li className="flex items-center gap-3">
              <input
                id="uniqlo"
                type="checkbox"
                className="w-4 h-4 cursor-pointer"
              />
              <label
                htmlFor="uniqlo"
                className="text-slate-600 font-medium text-sm cursor-pointer"
              >
                Uniqlo
              </label>
            </li>
            <li className="flex items-center gap-3">
              <input
                id="levis"
                type="checkbox"
                className="w-4 h-4 cursor-pointer"
              />
              <label
                htmlFor="levis"
                className="text-slate-600 font-medium text-sm cursor-pointer"
              >
                Levi’s
              </label>
            </li>
            <li className="flex items-center gap-3">
              <input
                id="nike"
                type="checkbox"
                className="w-4 h-4 cursor-pointer"
              />
              <label
                htmlFor="nike"
                className="text-slate-600 font-medium text-sm cursor-pointer"
              >
                Nike
              </label>
            </li>
            <li className="flex items-center gap-3">
              <input
                id="adidas"
                type="checkbox"
                className="w-4 h-4 cursor-pointer"
              />
              <label
                htmlFor="adidas"
                className="text-slate-600 font-medium text-sm cursor-pointer"
              >
                Adidas
              </label>
            </li>
            <li className="flex items-center gap-3">
              <input
                id="puma"
                type="checkbox"
                className="w-4 h-4 cursor-pointer"
              />
              <label
                htmlFor="puma"
                className="text-slate-600 font-medium text-sm cursor-pointer"
              >
                Puma
              </label>
            </li>
            <li className="flex items-center gap-3">
              <input
                id="tommy"
                type="checkbox"
                className="w-4 h-4 cursor-pointer"
              />
              <label
                htmlFor="tommy"
                className="text-slate-600 font-medium text-sm cursor-pointer"
              >
                Tommy Hilfiger
              </label>
            </li>
          </ul>
        </div>

        <hr className="my-6 border-gray-300" />

        {/* <div>
          <h6 className="text-slate-900 text-sm font-semibold">Size</h6>
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              type="button"
              className="cursor-pointer border border-gray-300 hover:border-blue-600 rounded-md text-[13px] text-slate-600 font-medium py-1 px-1 min-w-14"
            >
              XS
            </button>
            <button
              type="button"
              className="cursor-pointer border border-gray-300 hover:border-blue-600 rounded-md text-[13px] text-slate-600 font-medium py-1 px-1 min-w-14"
            >
              S
            </button>
            <button
              type="button"
              className="cursor-pointer border border-gray-300 hover:border-blue-600 rounded-md text-[13px] text-slate-600 font-medium py-1 px-1 min-w-14"
            >
              M
            </button>
            <button
              type="button"
              className="cursor-pointer border border-gray-300 hover:border-blue-600 rounded-md text-[13px] text-slate-600 font-medium py-1 px-1 min-w-14"
            >
              L
            </button>
            <button
              type="button"
              className="cursor-pointer border border-gray-300 hover:border-blue-600 rounded-md text-[13px] text-slate-600 font-medium py-1 px-1 min-w-14"
            >
              XL
            </button>
            <button
              type="button"
              className="cursor-pointer border border-gray-300 hover:border-blue-600 rounded-md text-[13px] text-slate-600 font-medium py-1 px-1 min-w-14"
            >
              XXL
            </button>
            <button
              type="button"
              className="cursor-pointer border border-gray-300 hover:border-blue-600 rounded-md text-[13px] text-slate-600 font-medium py-1 px-1 min-w-14"
            >
              XXXL
            </button>
            <button
              type="button"
              className="cursor-pointer border border-gray-300 hover:border-blue-600 rounded-md text-[13px] text-slate-600 font-medium py-1 px-1 min-w-14"
            >
              4XL
            </button>
          </div>
        </div> */}

        <hr className="my-6 border-gray-300" />

        {/* <div>
          <h6 className="text-slate-900 text-sm font-semibold">Price</h6>
          <div className="relative mt-6">
            <div className="h-1.5 bg-gray-300 relative">
              <div
                id="activeTrack"
                className="absolute h-1.5 bg-pink-500 rounded-full w-9/12"
              ></div>
            </div>
            <input
              type="range"
              id="minRange"
              min="0"
              max="1000"
              value="0"
              className="absolute top-0 w-full h-1.5 bg-transparent appearance-none cursor-pointer 
                    [&::-webkit-slider-thumb]:appearance-none 
                    [&::-webkit-slider-thumb]:w-5 
                    [&::-webkit-slider-thumb]:h-5 
                    [&::-webkit-slider-thumb]:bg-pink-500 
                    [&::-webkit-slider-thumb]:rounded-full 
                    [&::-webkit-slider-thumb]:border-2 
                    [&::-webkit-slider-thumb]:border-white 
                    [&::-webkit-slider-thumb]:shadow-md 
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:w-5 
                    [&::-moz-range-thumb]:h-5 
                    [&::-moz-range-thumb]:bg-pink-500 
                    [&::-moz-range-thumb]:rounded-full 
                    [&::-moz-range-thumb]:border-2 
                    [&::-moz-range-thumb]:border-white 
                    [&::-moz-range-thumb]:shadow-md 
                    [&::-moz-range-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:border-none"
            />

            <input
              type="range"
              id="maxRange"
              min="0"
              max="1000"
              value="750"
              className="absolute top-0 w-full h-1.5 bg-transparent appearance-none cursor-pointer 
                    [&::-webkit-slider-thumb]:appearance-none 
                    [&::-webkit-slider-thumb]:w-5 
                    [&::-webkit-slider-thumb]:h-5 
                    [&::-webkit-slider-thumb]:bg-pink-500 
                    [&::-webkit-slider-thumb]:rounded-full 
                    [&::-webkit-slider-thumb]:border-2 
                    [&::-webkit-slider-thumb]:border-white 
                    [&::-webkit-slider-thumb]:shadow-md 
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:w-5 
                    [&::-moz-range-thumb]:h-5 
                    [&::-moz-range-thumb]:bg-pink-500 
                    [&::-moz-range-thumb]:rounded-full 
                    [&::-moz-range-thumb]:border-2 
                    [&::-moz-range-thumb]:border-white 
                    [&::-moz-range-thumb]:shadow-md 
                    [&::-moz-range-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:border-none"
            />

            <div className="flex justify-between text-slate-600 font-medium text-sm mt-4">
              <span id="minPrice">$750</span>
              <span id="maxPrice">$1000</span>
            </div>
          </div>
        </div> */}

        <hr className="my-6 border-gray-300" />

        {/* <div>
          <h6 className="text-slate-900 text-sm font-semibold">Color</h6>
          <div className="flex flex-wrap gap-3 mt-4">
            <button
              type="button"
              className="cursor-pointer rounded-full text-[13px] text-white font-medium bg-blue-700 w-8 h-8 hover:scale-[1.05] transition-all"
            ></button>
            <button
              type="button"
              className="cursor-pointer rounded-full text-[13px] text-white font-medium bg-purple-700 w-8 h-8 hover:scale-[1.05] transition-all"
            ></button>
            <button
              type="button"
              className="cursor-pointer rounded-full text-[13px] text-white font-medium bg-pink-700 w-8 h-8 hover:scale-[1.05] transition-all"
            ></button>
            <button
              type="button"
              className="cursor-pointer rounded-full text-[13px] text-white font-medium bg-orange-700 w-8 h-8 hover:scale-[1.05] transition-all"
            ></button>
            <button
              type="button"
              className="cursor-pointer rounded-full text-[13px] text-white font-medium bg-red-700 w-8 h-8 hover:scale-[1.05] transition-all"
            ></button>
            <button
              type="button"
              className="cursor-pointer rounded-full text-[13px] text-white font-medium bg-yellow-700 w-8 h-8 hover:scale-[1.05] transition-all"
            ></button>
            <button
              type="button"
              className="cursor-pointer rounded-full text-[13px] text-white font-medium bg-black w-8 h-8 hover:scale-[1.05] transition-all"
            ></button>
            <button
              type="button"
              className="cursor-pointer rounded-full text-[13px] text-white font-medium bg-gray-700 w-8 h-8 hover:scale-[1.05] transition-all"
            ></button>
          </div>
        </div> */}
      </div>

      <div className="w-full p-6">
        <Products />
        {/* <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-100 w-full h-full rounded-md">
            <div className="bg-white flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition-all">
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
                  <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
                    Syllable Streetwear
                  </h5>
                  <div className="mt-2 flex items-center flex-wrap gap-2">
                    <h6 className="text-sm sm:text-base font-semibold text-slate-900">
                      $14
                    </h6>
                    <div
                      className="bg-slate-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto"
                      title="Wishlist"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        className="fill-slate-800 inline-block"
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-sm px-2 py-2 font-medium w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white tracking-wide ml-auto outline-none border-none rounded"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 w-full h-full rounded-md">
            <div className="bg-white flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition-all">
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
                  <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
                    Syllable Streetwear
                  </h5>
                  <div className="mt-2 flex items-center flex-wrap gap-2">
                    <h6 className="text-sm sm:text-base font-semibold text-slate-900">
                      $14
                    </h6>
                    <div
                      className="bg-slate-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto"
                      title="Wishlist"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        className="fill-slate-800 inline-block"
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-sm px-2 py-2 font-medium w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white tracking-wide ml-auto outline-none border-none rounded"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 w-full h-full rounded-md">
            <div className="bg-white flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition-all">
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
                  <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
                    Syllable Streetwear
                  </h5>
                  <div className="mt-2 flex items-center flex-wrap gap-2">
                    <h6 className="text-sm sm:text-base font-semibold text-slate-900">
                      $14
                    </h6>
                    <div
                      className="bg-slate-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto"
                      title="Wishlist"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        className="fill-slate-800 inline-block"
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-sm px-2 py-2 font-medium w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white tracking-wide ml-auto outline-none border-none rounded"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 w-full h-full rounded-md">
            <div className="bg-white flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition-all">
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
                  <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
                    Jargon Jungle
                  </h5>
                  <div className="mt-2 flex items-center flex-wrap gap-2">
                    <h6 className="text-sm sm:text-base font-semibold text-slate-900">
                      $15
                    </h6>
                    <div
                      className="bg-slate-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto"
                      title="Wishlist"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        className="fill-slate-800 inline-block"
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-sm px-2 py-2 font-medium w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white tracking-wide ml-auto outline-none border-none rounded"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 w-full h-full rounded-md">
            <div className="bg-white flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition-all">
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
                  <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
                    Verbal Vogue Tees
                  </h5>
                  <div className="mt-2 flex items-center flex-wrap gap-2">
                    <h6 className="text-sm sm:text-base font-semibold text-slate-900">
                      $12
                    </h6>
                    <div
                      className="bg-slate-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto"
                      title="Wishlist"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        className="fill-slate-800 inline-block"
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-sm px-2 py-2 font-medium w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white tracking-wide ml-auto outline-none border-none rounded"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 w-full h-full rounded-md">
            <div className="bg-white flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition-all">
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
                  <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
                    ThreadCraft Vibes
                  </h5>
                  <div className="mt-2 flex items-center flex-wrap gap-2">
                    <h6 className="text-sm sm:text-base font-semibold text-slate-900">
                      $14
                    </h6>
                    <div
                      className="bg-slate-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto"
                      title="Wishlist"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        className="fill-slate-800 inline-block"
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-sm px-2 py-2 font-medium w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white tracking-wide ml-auto outline-none border-none rounded"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 w-full h-full rounded-md">
            <div className="bg-white flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition-all">
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
                  <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
                    Adjective Attire
                  </h5>
                  <div className="mt-2 flex items-center flex-wrap gap-2">
                    <h6 className="text-sm sm:text-base font-semibold text-slate-900">
                      $12
                    </h6>
                    <div
                      className="bg-slate-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto"
                      title="Wishlist"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        className="fill-slate-800 inline-block"
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-sm px-2 py-2 font-medium w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white tracking-wide ml-auto outline-none border-none rounded"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 w-full h-full rounded-md">
            <div className="bg-white flex flex-col rounded overflow-hidden shadow-md cursor-pointer hover:scale-[1.01] transition-all">
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
                  <h5 className="text-sm sm:text-base font-semibold text-slate-900 line-clamp-2">
                    Lexicon Luxe
                  </h5>
                  <div className="mt-2 flex items-center flex-wrap gap-2">
                    <h6 className="text-sm sm:text-base font-semibold text-slate-900">
                      $10
                    </h6>
                    <div
                      className="bg-slate-100 w-8 h-8 flex items-center justify-center rounded-full cursor-pointer ml-auto"
                      title="Wishlist"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16px"
                        className="fill-slate-800 inline-block"
                        viewBox="0 0 64 64"
                      >
                        <path
                          d="M45.5 4A18.53 18.53 0 0 0 32 9.86 18.5 18.5 0 0 0 0 22.5C0 40.92 29.71 59 31 59.71a2 2 0 0 0 2.06 0C34.29 59 64 40.92 64 22.5A18.52 18.52 0 0 0 45.5 4ZM32 55.64C26.83 52.34 4 36.92 4 22.5a14.5 14.5 0 0 1 26.36-8.33 2 2 0 0 0 3.27 0A14.5 14.5 0 0 1 60 22.5c0 14.41-22.83 29.83-28 33.14Z"
                          data-original="#000000"
                        ></path>
                      </svg>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="text-sm px-2 py-2 font-medium w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white tracking-wide ml-auto outline-none border-none rounded"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        </div>*/}
      </div> 
    </div>
  );
};

export default ProductFilterSidebar;
