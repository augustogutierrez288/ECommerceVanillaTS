interface IProduct{
    id: string;
    nameProduct: string;
    price: number;
    priceOff: number;
    description: string;
    category: string;
    stars: number;
    img: string;
}

interface ICart{
    products: IProduct[];
    addProduct(product: IProduct): void;
    deleteProduct(product:IProduct): void;
}

interface IEcommerce{
    products: IProduct[];  
    paintProduct(): void; 
}

interface Array<T> {
    find(predicate: (value: T, index: number, obj: T[]) => boolean, thisArg?: any): T | undefined;
}

class Product implements IProduct{
    id: string;
    nameProduct: string;
    price: number;
    priceOff: number;
    description: string;
    category: string;
    stars: number;
    img: string;

    constructor(
        id: string,
        nameProduct: string,
        price: number,
        priceOff: number,
        description: string,
        category: string,
        start: number,
        img: string
    ){
        this.id = id;
        this.nameProduct = nameProduct;
        this.price = price;
        this.priceOff = priceOff;
        this.description = description;
        this.category = category;
        this.stars = start;
        this.img = img;
    }
}

class Cart implements ICart{
    products: IProduct[] = [];

    addProduct(product: IProduct): void {
        const counterCart = document.getElementById("counter-cart") as HTMLSpanElement;
        if (!counterCart) throw new Error("Elemento counter-cart no encontrado");

        this.products.push(product);
        counterCart.textContent = this.products.length.toString();
    }
    deleteProduct(product: IProduct): void{
        const counterCart = document.getElementById("counter-cart") as HTMLSpanElement;
        if (!counterCart) throw new Error("Elemento counter-cart no encontrado");

        this.products = this.products.filter(p => p.id !== product.id);
        counterCart.textContent = this.products.length.toString();
    }
}

class Ecommerce implements IEcommerce{
    
    products: IProduct[];
    private cart: Cart;

    constructor(products: IProduct[]){
        this.products = products;
        this.cart = new Cart();
    }
  
    paintProduct(): void{
        const parentContainer= document.getElementById("parent-container") as HTMLElement;
        if (!parentContainer) throw new Error("Elemento parent-container no encontrado");

        parentContainer.innerHTML = " ";

        this.products.forEach((product) =>{
            const container = document.createElement("article");
            container.classList.add("card");
            container.style.width = "18rem"
            container.innerHTML = 
            `
                ${product.price > product.priceOff ? `<div class="badge bg-dark text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>` : ""}
                <figure class="object-fit-cover">
                    <img src="${product.img}" class="card-img-top" alt="${product.nameProduct}">
                </figure>
                <div class="card-body">
                    <h4 class="card-title">${product.nameProduct}</h4>
                    <p class="card-text">${product.description}</p>
                    ${
                        product.price > product.priceOff
                        ?
                        `
                            <span class="text-muted text-decoration-line-through">$${product.price}</span>
                            <p>$${product.priceOff}</p>
                        `
                        :
                        `
                            <p>$${product.price}</p>
                        `
                    }
                    
                    <button class="btn btn-primary" type="button" id=${product.id}>Ver más.</button>
                </div>
            `
            parentContainer.appendChild(container);
    
            const button = document.getElementById(product.id) as HTMLButtonElement;
            if (!button) throw new Error(`El boton con id ${product.id} no encontrado`);

            button.addEventListener("click",() =>{

                const productFound = this.products.find( p => p.id === product.id) as IProduct;
                this.cart.addProduct(productFound);
            });
        });
    }
}
  
const AuricularM10 = new Product(
    "1",
    "Auricular Inalambrico M10",
    12499,
    10899,
    "Esta es una descripcion cualquiera",
    "Auriculares Inalambricos",
    5,
    "./assets/img/AuricularM10.png"
);

const AuricularTWSF9 = new Product(
    "2",
    "Auricular Inalambrico F9 5.3v",
    14499,
    15499,
    "Esta es una descripcion cualquiera",
    "Auriculares Inalambricos",
    3,
    "./assets/img/AuricularF9.png"
);

const SamsungAKG = new Product(
    "3",
    "Auricular In-Ear Samsung AKG USB-C",
    15499,
    12399,
    "Esta es una descripcion cualquiera",
    "Auriculares Inalambricos",
    4,
    "./assets/img/SamsungAKG.png"
);
const AuricularA6s = new Product(
    "4",
    "Auricular Inalambricos Wireless A6s",
    15499,
    9799,
    "Esta es una descripcion cualquiera",
    "Auriculares Inalambricos",
    3,
    "./assets/img/AuricularA6s.png"
);

const AuricularSamsung = new Product(
    "5",
    "Auricular In-Ear Samsung Clasico Original",
    37499,
    38199,
    "Esta es una descripcion cualquiera",
    "Auriculares Inalambricos",
    5,
    "./assets/img/SamsungBlancos.png"
);

const AuricularP9 = new Product(
    "6",
    "Auricular Inalambricos Vincha P9",
    38499,
    40699,
    "Esta es una descripcion cualquiera",
    "Auriculares Inalambricos",
    5,
    "./assets/img/AuricularP9.png"
);

const products: IProduct[] = [AuricularM10, AuricularTWSF9, AuricularSamsung, AuricularP9, SamsungAKG, AuricularA6s];

const appEcommerce = new Ecommerce(products);

appEcommerce.paintProduct();

const cart = document.getElementById("cart") as HTMLButtonElement;
const panelCart = document.getElementById("panel-cart") as HTMLElement
cart.addEventListener("click", () => {
    panelCart.classList.toggle("active");
})