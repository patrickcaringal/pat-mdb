import React, { createContext } from 'react';
import { ICardItem } from './interfaces';

const ItemsContext = createContext<ICardItem[]>([]);

export const ItemsProvider = ItemsContext.Provider;

export default ItemsContext;
