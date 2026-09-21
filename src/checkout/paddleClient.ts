import { initializePaddle, type Paddle } from "@paddle/paddle-js";

type Listeners = { onCompleted?: () => void; onClosed?: () => void };
let paddlePromise: Promise<Paddle | undefined> | null = null;
let listeners: Listeners = {};

function getPaddle(): Promise<Paddle | undefined> {
  if (!paddlePromise) {
    paddlePromise = initializePaddle({
      token: import.meta.env.VITE_PADDLE_CLIENT_TOKEN as string,
      environment: import.meta.env.VITE_PADDLE_ENV === "production" ? "production" : "sandbox",
      eventCallback: (event) => {
        if (event.name === "checkout.completed") listeners.onCompleted?.();
        if (event.name === "checkout.closed") listeners.onClosed?.();
      },
    });
  }
  return paddlePromise;
}

export function clearPaddleListeners(): void {
  listeners = {};
}

export async function openPaddleCheckout(args: {
  transactionId: string;
  email: string;
  onCompleted: () => void;
  onClosed: () => void;
}): Promise<void> {
  let paddle: Paddle | undefined;
  try {
    paddle = await getPaddle();
  } catch (err) {
    paddlePromise = null; // allow retry after a rejected init
    throw err;
  }
  if (!paddle) {
    paddlePromise = null; // allow retry after an undefined-resolving init
    throw new Error("paddle_init_failed");
  }
  let completed = false;
  listeners = {
    onCompleted: () => { completed = true; args.onCompleted(); },
    onClosed: () => { if (!completed) args.onClosed(); }, // suppress post-success closed (F1b)
  };
  paddle.Checkout.open({
    transactionId: args.transactionId,
    customer: { email: args.email },
    settings: { displayMode: "overlay", theme: "dark", locale: "en" },
  });
}
