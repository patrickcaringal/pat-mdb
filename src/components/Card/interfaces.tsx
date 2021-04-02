export interface ICard {
    id: string;
    image: string;
    title: string;
    subtitle: string;
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
    };
}
