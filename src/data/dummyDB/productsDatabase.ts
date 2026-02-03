import type { ProductModel } from "../../models/ProductModel";
import { types } from "./productTypesDatabase";

export const products: ProductModel[] = [
    { 
        id: "1",
        title: 'RAM DDR5 6200Mhz CL16 UBRAM',
        oldPrice: 1002.48,
        price: 999.99,
        currency: 'zł',
        description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        specification: [{id: '400', title: 'Producent', value: 'UBRAM'},{id: '401', title: 'Size', value: "16GB"},{id: '402', title: 'Mhz', value: "6200"},{id: '403', title: 'CL', value: "16"},{id: '404', title: 'Architecture', value: "DDR5"}],
        image: "https://tse4.mm.bing.net/th/id/OIP.pKDU4aJMs6Ld8WhkVYXGbwHaEK?pid=Api", 
        productType: types.find(t => t.id === '0') || types[0]
    },
    { 
        id: "2",
        title: 'RAM DDR5 5600Mhz CL46 AlmostRAM', 
        oldPrice: 782.86,
        price: 657.21,
        currency: 'zł',
        description: "This is a very good RAM my friend, fast gepard.",
        specification: [{id: '400', title: 'Producent', value: 'AlmostRAM'},{id: '401', title: 'Size (GB)', value: "256"},{id: '402', title: 'Mhz', value: "6200"},{id: '403', title: 'CL', value: "16"},{id: '404', title: 'Architecture', value: "DDR5"}],
        image: "https://cdn.mos.cms.futurecdn.net/8ggu44ntut7sHj5FoRAehE.jpg",
        productType: types.find(t => t.id === '0') || types[0]
    },
    {
        id: "3",
        title: 'RAM DDR5 6000Mhz CL24 hehaRAM', 
        price: 975.53,
        oldPrice: -1,
        currency: 'zł',
        description: "Very fine", 
        image: "https://www.bhphotovideo.com/images/images1000x1000/crucial_cp2k16g56c46u5_32gb_5600_mhz_ddr5_1763724.jpg",
        specification: [{id: '400', title: 'producent', value: 'hehaRAM'},{id: '404', title: 'Architecture', value: "DDR5"}],
        productType: types.find(t => t.id === '0') || types[0]
    },
    { 
        id: "4",
        title: 'RAM DDR5 6000Mhz CL24 hehaRAM', 
        price: 975.53,
        oldPrice: -1,
        currency: 'zł',
        description: "Very fine", 
        image: "https://www.bhphotovideo.com/images/images1000x1000/crucial_cp2k16g56c46u5_32gb_5600_mhz_ddr5_1763724.jpg",
        specification: [{id: '400', title: 'producent', value: 'hehaRAM'},{id: '404', title: 'Architecture', value: "DDR5"}],
        productType: types.find(t => t.id === '0') || types[0]
    },
    { 
        id: "5",
        title: 'RAM DDR5 6000Mhz CL24 hehaRAM', 
        price: 975.53,
        oldPrice: -1,
        currency: 'zł',
        description: "Very fine", 
        image: "https://www.bhphotovideo.com/images/images1000x1000/crucial_cp2k16g56c46u5_32gb_5600_mhz_ddr5_1763724.jpg",
        specification: [{id: '400', title: 'producent', value: 'hehaRAM'},{id: '404', title: 'Architecture', value: "DDR5"}],
        productType: types.find(t => t.id === '0') || types[0]
    },
    { 
        id: "6",
        title: 'RAM DDR5 6000Mhz CL24 hehaRAM', 
        price: 975.53,
        oldPrice: -1,
        currency: 'zł',
        description: "Very fine", 
        image: "https://www.bhphotovideo.com/images/images1000x1000/crucial_cp2k16g56c46u5_32gb_5600_mhz_ddr5_1763724.jpg",
        specification: [{id: '400', title: 'producent', value: 'hehaRAM'},{id: '404', title: 'Architecture', value: "DDR5"}],
        productType: types.find(t => t.id === '0') || types[0]
    },
    { 
        id: "7",
        title: 'RAM DDR5 6000Mhz CL24 hehaRAM', 
        price: 975.53,
        oldPrice: -1,
        currency: 'zł',
        description: "Very fine", 
        image: "https://www.bhphotovideo.com/images/images1000x1000/crucial_cp2k16g56c46u5_32gb_5600_mhz_ddr5_1763724.jpg",
        specification: [{id: '400', title: 'producent', value: 'hehaRAM'},{id: '404', title: 'Architecture', value: "DDR5"}],
        productType: types.find(t => t.id === '0') || types[0]
    },
    { 
        id: "8",
        title: 'RAM DDR5 6000Mhz CL24 hehaRAM DDR4', 
        price: 975.53,
        oldPrice: -1,
        currency: 'zł',
        description: "Very fine", 
        image: "https://www.bhphotovideo.com/images/images1000x1000/crucial_cp2k16g56c46u5_32gb_5600_mhz_ddr5_1763724.jpg",
        specification: [{id: '400', title: 'producent', value: 'hehaRAM'},{id: '404', title: 'Architecture', value: "DDR4"}],
        productType: types.find(t => t.id === '0') || types[0]
    },
    {
        id: "9",
        title: 'Ultra hd super frequency monitor, a lot Hz',
        oldPrice: 200.48,
        price: 199.99,
        currency: 'zł',
        description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        specification: [{id: '400', title: 'producent', value: 'Oink'}],
        image: "https://m.media-amazon.com/images/I/711U7Cqp-LL._AC_SL1500_.jpg",
        productType: types.find(t => t.id === '8') || types[0]
    },
    { 
        id: "10",
        title: 'Ultra hd super frequency monitor, a lot Hz',
        price: 200.48,
        oldPrice: -1,
        currency: 'zł',
        description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        specification: [{id: '400', title: 'producent', value: 'Boing'}],
        image: "https://cdn.thewirecutter.com/wp-content/media/2021/05/27-inch-monitor-2048px-1572.jpg",
        productType: types.find(t => t.id === '8') || types[0]
    },
    { 
        id: "11",
        title: 'Ultra hd super frequency monitor, a lot Hz',
        oldPrice: 745.87,
        price: 19.76,
        currency: 'zł',
        description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        specification: [{id: '400', title: 'producent', value: 'Bang'},{id: '401', title: 'Frequency', value: '60 Hz'},{id: '402', title: 'Size', value: "24''"}], 
        image: "https://www.bhphotovideo.com/images/images2000x2000/samsung_s27c350h_27_16_9_led_971590.jpg",
        productType: types.find(t => t.id === '8') || types[0]
    },
    { 
        id: "12",
        title: 'Gigabyte RTX 1080 Ti',
        oldPrice: 970,
        price: 940,
        currency: 'zł',
        description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        specification: [{id: '400', title: 'producent', value: 'Gigabyte'}], 
        image: "https://static.gigabyte.com/StaticFile/Image/Global/136e4b81116db24897cdbc5483b24743/Product/18113/Png",
        productType: types.find(t => t.id === '1') || types[0]
    },
    { 
        id: "13",
        title: 'Aorus RTX 1080 Ti Super',
        oldPrice: 1000,
        price: 200,
        currency: 'zł',
        description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        specification: [{id: '400', title: 'producent', value: 'Aorus'}],
        image: "https://static.gigabyte.com/StaticFile/Image/Global/8cd9b83c084dde40c3b8dcaf8603158f/Product/17568/Png",
        productType: types.find(t => t.id === '1') || types[0]
    },
    { 
        id: "14",
        title: 'RAM DDR5 6200Mhz CL16 UBRAM',
        oldPrice: 200,
        price: 52,
        currency: 'zł',
        description: "is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
        specification: [{id: '400', title: 'Producent', value: 'UBRAM'},{id: '401', title: 'Size', value: "256MB"},{id: '402', title: 'Mhz', value: "6200"},{id: '403', title: 'CL', value: "16"},{id: '404', title: 'Architecture', value: "DDR5"}],
        image: "https://tse4.mm.bing.net/th/id/OIP.pKDU4aJMs6Ld8WhkVYXGbwHaEK?pid=Api", 
        productType: types.find(t => t.id === '0') || types[0]
    },
]

export const highlightedProducts: ProductModel[] = [
    products[12],
    products[8],
    products[10]
]