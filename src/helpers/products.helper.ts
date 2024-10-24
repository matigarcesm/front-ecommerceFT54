import { IProduct } from "@/types";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export async function getProductsDB(): Promise<IProduct[]> {

    try {
        const res = await fetch(`${APIURL}/products`, {
            next: { revalidate: 1200 }
        })
        const products = await res.json()
        return products;
        
    } catch (error: any) {
        throw new Error(error)
        
    }
};

export async function getProductById(id: string): Promise<IProduct> {

    try {
        const products: IProduct[] = await getProductsDB()
        const productFiltered = products.find((product) => product.id.toString() === id)
        if(!productFiltered) throw new Error ("Product not found")
        return productFiltered;
     
    } catch (error: any) {
        throw new Error(error)
        
    }
};

