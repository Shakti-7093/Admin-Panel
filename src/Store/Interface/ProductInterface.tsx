export interface ProductInterface {
    id: number,
    title: string,
    description: string,
    price: number,
    discountPercentage: number,
    rating: number,
    stock: number,
    brand: string,
    category: string,
}

interface ProductState {
    products: ProductInterface[],
    status: "ideal" | "loading" | "success" | "failed",
    error: string | null
}

const initialState: ProductState = {
    products: [],
    status: "ideal",
    error: null
}

export default initialState;