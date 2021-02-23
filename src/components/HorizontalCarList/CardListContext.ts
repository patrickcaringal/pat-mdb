import React, { createContext } from 'react';

export const ItemsContext = createContext<any>(null);
export const LoaderContext = createContext<any>(null);

export const ItemsProvider = ItemsContext.Provider;
export const LoaderProvider = LoaderContext.Provider;
