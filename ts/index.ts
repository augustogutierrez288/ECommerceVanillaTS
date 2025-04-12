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
        console.table(this.products);
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
            container.classList.add("card", "bg-white", "border-white");
            container.style.width = "18rem";
            container.style.height = "600px";
            container.innerHTML = 
            `
                ${product.price > product.priceOff ? `<div class="badge bg-black text-white position-absolute" style="top: 0.5rem; right: 0.5rem">Sale</div>` : ""}
                <figure class="object-fit-contain" style="width: 300px; height: 300px;">
                    <img src="${product.img}" class="card-img-top w-100 h-100" alt="${product.nameProduct}">
                </figure>
                <div class="card-body">
                    <h3 class="card-title text-black mt-2 mb-2">${product.nameProduct}</h3>
                    <p class="card-text text-black mt-2 mb-2">${product.description}</p>
                    ${
                        product.price > product.priceOff
                        ?
                        `
                        <div class="d-flex justify-content-start align-items-center gap-2 mt-2 mb-2">
                            <span class="d-block text-muted text-decoration-line-through text-black">$${product.price}</span>
                            <p class="text-black m-0">$${product.priceOff}</p>
                        </div>
                        `
                        :
                        `
                            <p class="text-black mt-2 mb-2">$${product.price}</p>
                        `
                    }
                    
                    <button class="btn btn-primary mt-2" type="button" id=${product.id}>Ver más.</button>
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
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia cumque provident magnam?",
    "Auriculares Inalambricos",
    5,
    "./assets/img/AuricularM10.png"
);

const AuricularTWSF9 = new Product(
    "2",
    "Auricular Inalambrico F9 5.3v",
    14499,
    15499,
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia cumque provident magnam?",
    "Auriculares Inalambricos",
    3,
    "./assets/img/AuricularF9.png"
);

const SamsungAKG = new Product(
    "3",
    "Auricular Samsung AKG USB-C",
    15499,
    12399,
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia cumque provident magnam?",
    "Auriculares Inalambricos",
    4,
    "./assets/img/SamsungAKG.png"
);
const AuricularA6s = new Product(
    "4",
    "Auricular Inalambrico A6s",
    15499,
    9799,
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia cumque provident magnam?",
    "Auriculares Inalambricos",
    3,
    "./assets/img/AuricularA6s.png"
);

const AuricularSamsung = new Product(
    "5",
    "Auricular In-Ear Samsung Blanco",
    37499,
    38199,
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia cumque provident magnam?",
    "Auriculares Inalambricos",
    5,
    "./assets/img/SamsungBlancos.png"
);

const AuricularP9 = new Product(
    "6",
    "Auricular Inalambrico P9",
    38499,
    40699,
    "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia cumque provident magnam?",
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