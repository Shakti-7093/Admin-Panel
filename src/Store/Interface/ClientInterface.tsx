export interface AddressInterface {
    street: string;
    area: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;
}

export interface ClientInterface {
    id: number,
    name: string,
    email: string,
    phone: string,
    website: string,
    secondemail: string,
    address: AddressInterface
}

interface ClientState {
    clients: ClientInterface[],
    status: "ideal" | "loading" | "success" | "failed",
    error: string | null
}

const initialState: ClientState = {
    clients: [],
    status: "ideal",
    error: null
}

export default initialState;