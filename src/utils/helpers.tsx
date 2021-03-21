import moment from 'moment';

export const convertStringChars = (str: string, searchvalue: string, newvalue: string) =>
    str.replace(searchvalue, newvalue);

export const isCategoryForCatalog = (category: string): boolean => {
    const catalogPages = ['popular', 'now-playing', 'upcoming', 'on-air'];
    return catalogPages.includes(category);
};

export const formatNumWithComma = (num: number = 0): string => {
    return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const formatDate = (date: string = new Date().toDateString()): string => {
    return moment(date).format('MMMM DD, YYYY');
};

export const formatHours = (num: number): string => {
    const hours = Math.floor(num / 60);
    const minutes = num % 60;

    return `${hours}h ${minutes ? `${minutes}m` : ''}`;
};
