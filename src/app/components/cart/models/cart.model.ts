import { CartItemModel } from "./CartItem.model";
import { DeliveryModel } from "./delivery.model";


export class CartModel{

    id?: number;

    userId?: number;

    delivery?: DeliveryModel;

    cartItems?: CartItemModel[];
}