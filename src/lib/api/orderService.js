import { apiGet, apiPost } from './apiClient';
import { apiPostPublic } from './apiClient';

export async function createOrder(payload) {
  return apiPost('/orders', payload);
}

export async function payOrder({ order_id, method, amount, currency, phone_number }) {
  return apiPost('/checkout/pay', {
    order_id,
    method,
    amount,
    currency: currency || 'KSH',
    ...(phone_number ? { phone_number } : {}),
  });
}

export async function fetchCustomerOrders({ page = 1, page_size = 20 } = {}) {
  const q = new URLSearchParams({ page: String(page), page_size: String(page_size) });
  const data = await apiGet(`/customer/orders?${q}`);
  return {
    items: data.items || data.orders || (Array.isArray(data) ? data : []),
    pagination: data.pagination || {},
  };
}

const COMPLETED_ORDER_STATUSES = [
  'delivered',
  'complete',
  'completed',
  'closed',
  'fulfilled',
  'success',
  'successful',
  'done',
  'received',
];

// The orders API has returned the delivery state under different fields (and,
// in some responses, as a nested status object). Keep that API variation out
// of the views so completed purchases are not accidentally filtered away.
export function isCompletedOrder(order) {
  if (!order || typeof order !== 'object') return false;
  if (order.is_completed === true || order.completed_at || order.delivered_at) return true;

  const statuses = [];
  const collectStatuses = (value, key = '', depth = 0) => {
    if (depth > 2 || value == null) return;

    if (typeof value === 'string' && /(status|state|completion|delivery|fulfillment)/i.test(key)) {
      statuses.push(value.toLowerCase());
      return;
    }

    if (typeof value === 'object') {
      Object.entries(value).forEach(([childKey, childValue]) => collectStatuses(childValue, childKey, depth + 1));
    }
  };

  collectStatuses(order);
  return statuses.some((status) => COMPLETED_ORDER_STATUSES.some((alias) => status.includes(alias)));
}

export async function validateCoupon(code, subtotal) {
  return apiPostPublic('/public/checkout/coupons/validate', { code, subtotal });
}

export function buildOrderPayload({
  user,
  address,
  delivery,
  items,
  subtotal,
  total,
  coupon,
  discount,
  serviceProductId,
}) {
  let parcelWeight = 0;
  let maxLength = 0;
  let maxWidth = 0;
  let parcelHeight = 0;

  items.forEach((item) => {
    const w = item.product?.weight || 0.5;
    const l = item.product?.length || 20;
    const wd = item.product?.width || 15;
    const h = item.product?.height || 10;
    parcelWeight += w * item.quantity;
    maxLength = Math.max(maxLength, l);
    maxWidth = Math.max(maxWidth, wd);
    parcelHeight += h * item.quantity;
  });

  const isPickup = delivery === 'pickup';
  const isExpress = delivery === 'boda_express';

  return {
    parcel_weight: parcelWeight || 0.5,
    parcel_length: maxLength || 20,
    parcel_width: maxWidth || 15,
    parcel_height: parcelHeight || 10,
    parcel_description: 'Marketplace order',
    declared_value: subtotal,

    service_type: isPickup ? 'pickup' : 'dropoff',
    delivery_type: isPickup ? 'warehouse' : 'doorstep',
    priority: isExpress ? 'express' : 'standard',
    service_product_id: serviceProductId,

    pickup_contact_name: user.full_name,
    pickup_contact_email: user.email,
    pickup_contact_phone: address.phone,

    delivery_contact_name: address.name || user.full_name,
    delivery_contact_email: user.email,
    delivery_contact_phone: address.phone,

    line_items: items.map((i) => ({
      product_id: i.product.id,
      vendor_slug: i.product.vendor_slug || '',
      name: i.product.name,
      quantity: i.quantity,
      unit_price: i.product.price,
    })),
    commerce_grand_total: total,
    coupon_code: coupon?.code || '',
    coupon_discount: discount || 0,
  };
}

export function pickDefaultServiceProduct(channels) {
  if (!channels?.length) return null;
  const ke = channels.find(
    (c) =>
      (c.destination_country || '').toUpperCase() === 'KE' ||
      (c.destination_country || '').toLowerCase().includes('kenya')
  );
  return ke || channels[0];
}

export const ORDER_STATUS_STAGES = [
  'pending',
  'pending_procurement',
  'confirmed',
  'packed',
  'shipped',
  'in_transit',
  'out_for_delivery',
  'delivered',
];

export function orderStatusIndex(status) {
  const normalized = (status || '').toLowerCase();
  const idx = ORDER_STATUS_STAGES.indexOf(normalized);
  if (idx >= 0) return idx;
  if (normalized.includes('deliver')) return ORDER_STATUS_STAGES.length - 1;
  if (normalized.includes('ship') || normalized.includes('transit')) return 4;
  if (normalized.includes('confirm')) return 2;
  return 1;
}
