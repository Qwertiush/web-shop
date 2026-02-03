import type { ProductType } from "../../models/ProductType";
import { productTypeParameters } from "./productTypeParameters";

export const types: ProductType[] = [
    {
        title: "Default",
        id: "-1",
        productParameters: [
            productTypeParameters[1],
            productTypeParameters[2],
        ]
    },
    {
        title: "RAM",
        id: "0",
        productParameters: [
            productTypeParameters[0],
            productTypeParameters[1],
            productTypeParameters[2],
            productTypeParameters[3],
            productTypeParameters[4],
            productTypeParameters[5],
        ]
    },
    {
        title: "Graphics Card",
        id: "1",
        productParameters: [
            productTypeParameters[0],
            productTypeParameters[1],
            productTypeParameters[2],
        ]
        
    },
    {
        title: "CPU",
        id: "2",
        productParameters: [
            productTypeParameters[0],
            productTypeParameters[1],
            productTypeParameters[2],
        ]
        
    },
    {
        title: "Storage",
        id: "3",
        productParameters: [
            productTypeParameters[0],
            productTypeParameters[1],
            productTypeParameters[2],
        ]
        
    },
    {
        title: "Power supply",
        id: "4",
        productParameters: [
            productTypeParameters[0],
            productTypeParameters[1],
            productTypeParameters[2],
        ]
        
    },
    {
        title: "Case",
        id: "5",
        productParameters: [
            productTypeParameters[0],
            productTypeParameters[1],
            productTypeParameters[2],
        ]
        
    },
    {
        title: "Cooler",
        id: "6",
        productParameters: [
            productTypeParameters[0],
            productTypeParameters[1],
            productTypeParameters[2],
        ]
        
    },
    {
        title: "MotherBoard",
        id: "7",
        productParameters: [
            productTypeParameters[0],
            productTypeParameters[1],
            productTypeParameters[2],
        ]
        
    },
    {
        title: "Screen",
        id: "8",
        productParameters: [
            productTypeParameters[0],
            productTypeParameters[1],
            productTypeParameters[2],
            productTypeParameters[3],
            productTypeParameters[7],
            productTypeParameters[8],
        ]
        
    },
    {
        title: "Mouse",
        id: "9",
        productParameters: [
            productTypeParameters[0],
            productTypeParameters[1],
            productTypeParameters[2],
        ]
        
    },
    {
        title: "Keyboard",
        id: "10",
        productParameters: [
            productTypeParameters[0],
            productTypeParameters[1],
            productTypeParameters[2],
        ]
        
    },
    {
        title: "Office",
        id: "11",
        productParameters: [
            productTypeParameters[0],
            productTypeParameters[1],
            productTypeParameters[2],
        ]
        
    },
    {
        title: "Gaming",
        id: "12",
        productParameters: [
            productTypeParameters[0],
            productTypeParameters[1],
            productTypeParameters[2],
        ]
        
    },
    {
        title: "Studio",
        id: "13",
        productParameters: [
            productTypeParameters[0],
            productTypeParameters[1],
            productTypeParameters[2],
        ]
        
    },
]