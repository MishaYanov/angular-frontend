import {IsExistInCartPipe} from './is-exist-in-cart.pipe';
import {ItemsHandlerPipe} from './items-handler.pipe';

export const cartGuards: any[] = [IsExistInCartPipe, ItemsHandlerPipe];