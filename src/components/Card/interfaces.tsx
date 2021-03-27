export interface ICard {
    id: string;
    image: string;
    title: string;
    subtitle: string;
    onClick?: () => void;
}

export interface IStyle {
    style?: { width?: number; imgHeight?: number; marginRight?: number };
}
