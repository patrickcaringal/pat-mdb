export interface ICard {
    id: string;
    image: string;
    title: string;
    subtitle: string;
    description?: string;
    variant?: 'horizontal' | 'vertical';
    onClick?: () => void;
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
