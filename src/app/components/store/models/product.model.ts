
export class ProductModel {
  public id?: number | undefined;
  public image?: string | undefined;
  public name: string | undefined;
  public price: number | undefined;
  public description: string | undefined;
  public carCategory: string | undefined | any;
  public partCategory: string | undefined | any;
}