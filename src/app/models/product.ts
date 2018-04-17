export interface IProduct {
    id: number;
    productName: string;
    productCode: string;
    tags?: string[];
    releaseDate: string;
    price: number;
    street: string;
    zip: string;
    complement?: string;
    neighborhood: string;
    number?: string;
    city: string;
    uf: string;
    description: string;
    starRating: number;
    imageUrl: string;
}
