import { Search } from "lucide-react";
import { Products } from "..";


const ProductFilterSidebar = () => {
  return (
    <div className="flex dark:bg-neutral-800">
      <div className="w-full max-w-[300px] shrink-0 shadow-md px-6 sm:px-8 min-h-screen py-6">
        <div className="flex items-center border-b border-gray-300 pb-2 mb-6">
          <h3 className="text-blue-900 dark:text-blue-500 text-lg font-semibold">Filtrar</h3>
          <button
            type="button"
            className="text-sm text-red-500 dark:text-orange-400 font-semibold ml-auto cursor-pointer"
          >
            Limpiar todo
          </button>
        </div>
        <div>
          <h6 className="text-blue-900 dark:text-blue-500 text-sm font-semibold">Marca</h6>
          <div className="flex px-3 py-1.5 rounded-md border border-gray-300 bg-gray-100 overflow-hidden mt-2">
            <input
              type="email"
              placeholder="Buscar producto"
              className="w-full bg-transparent outline-none text-gray-900 text-sm"
            />

            <Search width={18} className="text-gray-400 dark:text-gray-500" />
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
                className="text-slate-600 dark:text-slate-400 font-medium text-sm cursor-pointer"
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
                className="text-slate-600 dark:text-slate-400 font-medium text-sm cursor-pointer"
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
                className="text-slate-600 dark:text-slate-400 font-medium text-sm cursor-pointer"
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
                className="text-slate-600 dark:text-slate-400 font-medium text-sm cursor-pointer"
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
                className="text-slate-600 dark:text-slate-400 font-medium text-sm cursor-pointer"
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
                className="text-slate-600 dark:text-slate-400 font-medium text-sm cursor-pointer"
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
                className="text-slate-600 dark:text-slate-400 font-medium text-sm cursor-pointer"
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
                className="text-slate-600 dark:text-slate-400 font-medium text-sm cursor-pointer"
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
        
      </div> 
    </div>
  );
};

export default ProductFilterSidebar;
