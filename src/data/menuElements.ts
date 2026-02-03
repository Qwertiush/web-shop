import type { MenuElementModel } from '../models/MenuElementModel';
import { types } from './dummyDB/productTypesDatabase';

export const menuElements: MenuElementModel[] = [
  { 
    title: 'PC parts',
    dropdownElements: [
      types.find(t => t.id === '0') || types[0],
      types.find(t => t.id === '1') || types[0],
      types.find(t => t.id === '2') || types[0],
      types.find(t => t.id === '3') || types[0],
      types.find(t => t.id === '4') || types[0],
      types.find(t => t.id === '5') || types[0],
      types.find(t => t.id === '6') || types[0],
      types.find(t => t.id === '7') || types[0],
    ] 
  },
    {
    title: 'Peripherals',
    dropdownElements: [
      types.find(t => t.id === '8') || types[0],
      types.find(t => t.id === '9') || types[0],
      types.find(t => t.id === '10') || types[0],
    ] 
  },
  { 
    title: 'Builds',
    dropdownElements: [
      types.find(t => t.id === '11') || types[0],
      types.find(t => t.id === '12') || types[0],
      types.find(t => t.id === '13') || types[0],
    ]
  },
];
