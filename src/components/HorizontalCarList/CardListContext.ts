import React, { createContext } from 'react';

const ItemsContext = createContext<any>(null);

export const ItemsProvider = ItemsContext.Provider;

export default ItemsContext;
