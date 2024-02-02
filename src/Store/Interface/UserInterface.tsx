export interface UserInterface {
    id: 1,
    name: string,
    username: string,
    email: string,
    address: {
        street: string,
        suite: string,
        city: string,
        zipcode: string,
        geo: {
            lat: string,
            lng: string
        }
    },
    phone: string,
    website: string,
    company: {
        name: string,
        catchPhrase: string,
        bs: string
    }
}

interface UserState {
    users: UserInterface[],
    status: "ideal" | "loading" | "success" | "failed",
    error: string | null
}

const initialState: UserState = {
    users: [],
    status: "ideal",
    error: null
}

export default initialState;