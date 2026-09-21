import type { CheckoutRequest } from "../lib/checkoutSchema";

export async function createCheckout(
  payload: CheckoutRequest,
): Promise<{ orderId: string; provider: string; transactionId: string }> {
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((json as { error?: string }).error ?? `http_${res.status}`);
  return json as { orderId: string; provider: string; transactionId: string };
}

export async function fetchOrderStatus(
  id: string,
): Promise<{ status: string; sku: string; plan: string } | null> {
  const res = await fetch(`/api/orders?id=${encodeURIComponent(id)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`http_${res.status}`);
  return (await res.json()) as { status: string; sku: string; plan: string };
}
