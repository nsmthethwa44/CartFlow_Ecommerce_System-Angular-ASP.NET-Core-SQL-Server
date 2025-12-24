import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap, map, of, forkJoin} from 'rxjs';
import { AddToCartDto } from '../models/addToCart';
import { Product } from '../models/product';
import { CartItem } from '../models/cartItem';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private baseUrl = `${environment.apiUrl}/api/cart`;

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  constructor(private http: HttpClient) {
    this.syncCountFromStorage();
  }

  private syncCountFromStorage() {
    const cart = JSON.parse(localStorage.getItem("cart") || '[]');
    const total = cart.reduce((sum: number, i: any) => sum + i.quantity, 0);
    this.cartCountSubject.next(total);
  }

  private updateCount(cart: any[]) {
    const total = cart.reduce((sum, i) => sum + i.quantity, 0);
    this.cartCountSubject.next(total);
  }

  // not logged In user can also add to cart 
  // cart saved in local storage 
  addToLocalCart(productId: number, quantity = 1) {
    const cart = JSON.parse(localStorage.getItem("cart") || '[]');
    const item = cart.find((x: any) => x.productId === productId);

    if (item) item.quantity += quantity;
    else cart.push({ productId, quantity });

    localStorage.setItem("cart", JSON.stringify(cart));
    this.updateCount(cart);
  }

  // clear cart 
  clearLocalCart() {
    localStorage.removeItem("cart");
    this.cartCountSubject.next(0);
  }

  // logged In User add to cart 
  addToDbCart(dto: AddToCartDto) {
    return this.http.post(`${this.baseUrl}/add`, dto).pipe(
      tap(() => {
        this.cartCountSubject.next(this.cartCountSubject.value + dto.quantity);
      })
    );
  }

  setDbCartCount(count: number) {
    this.cartCountSubject.next(count);
  }

  // get local cart 
   getLocalCart(): any[] {
    return JSON.parse(localStorage.getItem("cart") || '[]');
  }

  // get db cart 
  getDbCart() {
    return this.http.get<CartItem[]>(`${this.baseUrl}`);
  }

  removeFromDbCart(productId: number) {
  return this.http
    .delete(`${this.baseUrl}/${productId}`)
    .pipe(
      tap(() => {
        // decrement count by 1 (or more if you support quantities later)
        const current = this.cartCountSubject.value;
        this.cartCountSubject.next(Math.max(current - 1, 0));
      })
    );
}


    hydrateLocalCart() {
        const raw = this.getLocalCart();

        if (!raw.length) {
          return of([]);
        }

      return forkJoin(
        raw.map(item => 
          this.http.get<Product>(`${environment.apiUrl}/api/product/${item.productId}`).pipe(
            map(product => ({
              productId: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.imageUrl,
              quantity: item.quantity
            }))
          )
        )
      );
  }

 mergeCart(items: AddToCartDto[]) {
  return this.http.post(`${this.baseUrl}/merge`, items).pipe(
    tap(() => {
      const total = items.reduce((s, i) => s + i.quantity, 0);
      this.cartCountSubject.next(total);
    })
  );
}



}


// public async Task CreateOrderAsync(int userId, CreateOrderDto dto)
// {
//     var cartItems = await _cartRepo.GetUserCartAsync(userId);
//     if (!cartItems.Any())
//         throw new InvalidOperationException("Cart is empty");

//     var order = new Order
//     {
//         UserId = userId,
//         Status = "Pending",
//         CreatedAt = DateTime.UtcNow,
//         Total = cartItems.Sum(i => i.Quantity * i.Product.Price),
//         Items = cartItems.Select(i => new OrderItem
//         {
//             ProductId = i.ProductId,
//             ProductName = i.Product.Name,
//             PriceAtPurchase = i.Product.Price,
//             Quantity = i.Quantity
//         }).ToList()
//     };

//     await _orderRepo.AddAsync(order);
//     await _cartRepo.ClearCartAsync(userId);
// }


