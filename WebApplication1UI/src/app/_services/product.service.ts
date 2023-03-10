import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../_models/product';
import config from 'src/assets/config.json'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  url = config.apiServer.url + '/api/product/';
  constructor(private http: HttpClient) { }
  getProductList(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + 'ProductsList');
  }
  postProductData(productData: Product): Observable<Product> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Product>(this.url + 'CreateProduct', productData, httpHeaders);
  }
  updateProduct(product: Product): Observable<Product> {
    const httpHeaders = { headers:new HttpHeaders({'Content-Type': 'application/json'}) };
    return this.http.post<Product>(this.url + 'UpdateProduct?id=' + product.productId, product, httpHeaders);
  }
  deleteProductById(id: number): Observable<number> {
    return this.http.post<number>(this.url + 'DeleteProduct?id=' + id, null);
  }
  getProductDetailsById(id: string): Observable<Product> {
    return this.http.get<Product>(this.url + 'ProductDetail?id=' + id);
  }
}