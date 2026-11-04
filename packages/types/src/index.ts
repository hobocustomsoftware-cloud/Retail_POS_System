export enum UserRole {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  CASHIER = 'CASHIER',
  WAITER = 'WAITER',
  BARTENDER = 'BARTENDER',
  KITCHEN = 'KITCHEN',
  BBQ = 'BBQ'
}

export enum OrderStatus {
  PENDING = 'PENDING',
  IN_PROGRESS = 'IN_PROGRESS',
  READY = 'READY',
  SERVED = 'SERVED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export enum OrderType {
  DINE_IN = 'DINE_IN',
  TAKEOUT = 'TAKEOUT',
  DELIVERY = 'DELIVERY',
  BAR_TAB = 'BAR_TAB'
}

export enum PaymentMethod {
  CASH = 'CASH',
  CARD = 'CARD',
  SPLIT = 'SPLIT'
}

export interface Tenant {
  id: string;
  name: string;
  slug: string;
  plan?: string;
  subscriptionStatus?: string;
}

export interface User {
  id: string;
  tenantId?: string; // null for standalone or system
  name: string;
  pin?: string;
  role: UserRole;
}

export interface MenuCategory {
  id: string;
  tenantId?: string;
  name: string;
  station?: 'KITCHEN' | 'BBQ' | 'BAR';
}

export interface MenuItem {
  id: string;
  tenantId?: string;
  categoryId: string;
  name: string;
  price: number;
  station?: 'KITCHEN' | 'BBQ' | 'BAR';
  hasModifiers: boolean;
}

export interface Table {
  id: string;
  tenantId?: string;
  name: string;
  section?: string;
  status?: 'FREE' | 'OCCUPIED';
}

export interface OrderItemModifier {
  id: string;
  name: string;
  price: number;
}

export interface OrderItem {
  id: string;
  orderId: string;
  menuItemId: string;
  quantity: number;
  price: number;
  modifiers?: OrderItemModifier[];
  notes?: string;
  station?: 'KITCHEN' | 'BBQ' | 'BAR';
  status: OrderStatus;
}

export interface Order {
  id: string;
  tenantId?: string;
  orderNumber: string;
  type: OrderType;
  tableId?: string;
  userId?: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  createdAt: Date;
}

export interface Payment {
  id: string;
  orderId: string;
  amount: number;
  method: PaymentMethod;
  createdAt: Date;
}

export interface License {
  key: string;
  machineId?: string;
  activatedAt?: Date;
  expiresAt?: Date;
  valid: boolean;
}
