import type { ProductTypeParameter } from "../../models/ProductType";

export const productTypeParameters: ProductTypeParameter[] = [
    {
        id: '400',
        name: 'producer',
        type: 'dropdown',
        values: ['Asus', 'Gigabyte', 'Aorus', 'AlmostRAM', 'UBRAM', 'hehaRAM']
    },
    {
        id: '501',
        name: 'min price',
        type: 'input'
    },
    {
        id: '502',
        name: 'max price',
        type: 'input'
    },
    {
        id: '404',
        name: 'RAM Architecture',
        type: 'checkbox',
        values: ['DDR3', 'DDR4', 'DDR5']
    },
    {
        id: '406',
        name: 'Screen size',
        type: 'checkbox',
        values: ['23', '24', '25']
    },
    {
        id: '407',
        name: 'Frequency',
        type: 'checkbox',
        values: ['60 Hz', '144 Hz', '500 hz']
    },
]