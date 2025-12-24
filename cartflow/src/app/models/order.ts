export interface OrderDto {
  id: number;
  total: number;
  status: string;
  quantity: number;
  productName: string;
  productImageUrl: string;
  userName: string;
  userAddress: string;
  userPhone: string;
  userImageUrl: string;
  createdAt: number;
}