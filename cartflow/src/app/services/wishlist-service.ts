import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap, map, of, forkJoin} from 'rxjs';
import { Product } from '../models/product';
import { WishListItem } from '../models/wishlistItem';
import { AddToWishListDto } from '../models/addToWish';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
    private baseUrl = `${environment.apiUrl}/api/wishlist`;

  private wishlistCountSubject = new BehaviorSubject<number>(0);
  wishlistCount$ = this.wishlistCountSubject.asObservable();

  constructor(private http: HttpClient) {
    this.syncCountFromStorage();
  }

  private syncCountFromStorage() {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || '[]');
    const total = wishlist.reduce((sum: number, i: any) => sum + i.quantity, 0);
    this.wishlistCountSubject.next(total);
  }

  private updateCount(wishlist: any[]) {
    const total = wishlist.reduce((sum, i) => sum + i.quantity, 0);
    this.wishlistCountSubject.next(total);
  }

  // not logged In user can also add to wishlist 
  // wishlist saved in local storage 
  addToLocalWishList(productId: number, quantity = 1) {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || '[]');
    const item = wishlist.find((x: any) => x.productId === productId);

    if (item) item.quantity += quantity;
    else wishlist.push({ productId, quantity });

    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    this.updateCount(wishlist);
  }

  // clear wishlist 
  clearLocalWishList() {
    localStorage.removeItem("wishlist");
    this.wishlistCountSubject.next(0);
  }

  // logged In User add to wishlist 
  addToDbWishList(dto: AddToWishListDto) {
    return this.http.post(`${this.baseUrl}/add`, dto).pipe(
      tap(() => {
        this.wishlistCountSubject.next(this.wishlistCountSubject.value + dto.quantity);
      })
    );
  }

  setDbWishListCount(count: number) {
    this.wishlistCountSubject.next(count);
  }

  // get local wishlist 
   getLocalWishList(): any[] {
    return JSON.parse(localStorage.getItem("wishlist") || '[]');
  }

  // get db wishlist 
  getDbWishList() {
    return this.http.get<WishListItem[]>(`${this.baseUrl}`);
  }

  removeFromDbWishList(productId: number) {
  return this.http
    .delete(`${this.baseUrl}/${productId}`)
    .pipe(
      tap(() => {
        // decrement count by 1 (or more if you support quantities later)
        const current = this.wishlistCountSubject.value;
        this.wishlistCountSubject.next(Math.max(current - 1, 0));
      })
    );
}


    hydrateLocalWishList() {
        const raw = this.getLocalWishList();

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

 mergeWishList(items: AddToWishListDto[]) {
  return this.http.post(`${this.baseUrl}/merge`, items).pipe(
    tap(() => {
      const total = items.reduce((s, i) => s + i.quantity, 0);
      this.wishlistCountSubject.next(total);
    })
  );
}
}
