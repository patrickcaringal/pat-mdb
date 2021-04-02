type TVariant = 'horizontal' | 'vertical';

export interface ICard {
    id: string;
    image: string;
    title: string;
    subtitle: string;
    description?: string;
    variant?: TVariant;
    onClick?: () => void;
}

export interface ICardSkeleton {
    variant?: TVariant;
}

export interface IStyle {
    style?: {
        cardContainer?: {
            [key: string]: any;
        };
        cardImage?: {
            [key: string]: any;
        };
        cardContent?: {
            [key: string]: any;
        };
    };
}
