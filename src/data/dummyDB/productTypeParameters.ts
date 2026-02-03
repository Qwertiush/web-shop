import type { ProductTypeParameter } from "../../models/ProductType";

export const productTypeParameters: ProductTypeParameter[] = [
    {
        id: '400',
        name: 'producer',
        type: 'dropdown',
        values: ['Asus', 'Gigabyte', 'Aourus', 'AlmostRAM', 'UBRAM', 'hehaRAM']
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
        name: 'RAM_Architecture',
        type: 'checkbox',
        values: ['DDR3', 'DDR4', 'DDR5']
    },
    {
        id: '406',
        name: '23',
        type: 'checkbox'
    },
    {
        id: '407',
        name: '24',
        type: 'checkbox'
    },
    {
        id: '408',
        name: '25',
        type: 'checkbox'
    },
]