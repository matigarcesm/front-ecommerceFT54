export interface IProduct {
    id: number;
    name: string;
    description: string;
    price: number;
    stock: number;
    image: string;
    categoryId: number
}

export interface ICategory {
    id:  number;
    name:string
}


export interface ILoginProps {
    email: string
    password: string
}

export interface ILoginErrors {
    email?: string
    password?: string
}

export interface IRegisterProps {

    email: string
    password: string
    name: string
    address: string
    phone: string

}

export interface IRegisterErrors {
    email?: string
    password?: string
    name?: string
    address?: string
    phone?: string
}



export interface IUserSession {
    token: string
    user: {
        id: number
        name: string
        email: string
        address: string
        phone: string
        role: string
        credential: {
            id: number
            password: string
        }
        orders: IOrder
    }
}

export interface IOrder {
    id: number;
    status: string;
    date: Date;
    products: IProduct[]
}