export const convertStringChars = (str: string, searchvalue: string, newvalue: string) =>
    str.replace(searchvalue, newvalue);

export const isCategoryForCatalog = (category: string): boolean => {
    const catalogPages = ['popular', 'now-playing', 'upcoming', 'on-air'];
    return catalogPages.includes(category);
};
