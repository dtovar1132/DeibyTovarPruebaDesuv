import { FormControl } from "@angular/forms";

export interface Product {
    id: string,
    name: string,
    description: string,
    logo: string,
    date_release: string,
    date_revision: string;
}

export interface ProductResponse {
    message?: string,
    data: Product | Product[]
}

export interface ProductStoreModel {
    products: Product[];
    productsFilter: Product[];
    productsPage: Product[];
    perPage: number;
    filter: string;
    page: number;
    totalPages: number;
    product?:Product | null
}

export interface ProductForm {
    id: FormControl<string | null>;
    name: FormControl<string | null>;
    description: FormControl<string | null>;
    date_release: FormControl<string | null>;
    date_revision: FormControl<string | null>;
    logo: FormControl<string | null>;
}