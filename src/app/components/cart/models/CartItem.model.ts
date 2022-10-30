import { ProductModel } from "../../store/models";

export class CartItemModel {
    id?: number;

    cartId?: number;

    price?: number;

    productId?: number;

    quantity?: number;

    totalPrice?: number;

    product?: ProductModel;
}