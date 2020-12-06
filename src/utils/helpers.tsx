export const convertUrlToWord = (str: string) => str.replace('-', ' ');

export const isCategoryForCatalog = (category: string): boolean => {
    const catalogPages = ['popular', 'now-playing', 'upcoming', 'on-the-air'];
    return catalogPages.includes(category);
};
