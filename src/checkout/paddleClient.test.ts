import { beforeEach, describe, expect, test, vi } from "vitest";
import type { Paddle } from "@paddle/paddle-js";

type EventCallback = (event: { name: string }) => void;

const { initializePaddle } = vi.hoisted(() => ({ initializePaddle: vi.fn() }));

vi.mock("@paddle/paddle-js", () => ({ initializePaddle }));

function fakePaddle(open = vi.fn()): Paddle {
  return { Checkout: { open } } as unknown as Paddle;
}

beforeEach(() => {
  vi.resetModules();
  initializePaddle.mockReset();
});

describe("openPaddleCheckout", () => {
  test("undefined init result rejects with paddle_init_failed; retry after a working init succeeds", async () => {
    initializePaddle.mockResolvedValueOnce(undefined);
    const { openPaddleCheckout } = await import("./paddleClient");

    await expect(
      openPaddleCheckout({
        transactionId: "txn_1",
        email: "a@b.com",
        onCompleted: vi.fn(),
        onClosed: vi.fn(),
      }),
    ).rejects.toThrow("paddle_init_failed");

    const open = vi.fn();
    initializePaddle.mockResolvedValueOnce(fakePaddle(open));

    await openPaddleCheckout({
      transactionId: "txn_2",
      email: "b@c.com",
      onCompleted: vi.fn(),
      onClosed: vi.fn(),
    });

    expect(open).toHaveBeenCalledWith({
      transactionId: "txn_2",
      customer: { email: "b@c.com" },
      settings: { displayMode: "overlay", theme: "dark", locale: "en" },
    });
  });

  test("rejected init rejects the caller; retry after init succeeds", async () => {
    initializePaddle.mockRejectedValueOnce(new Error("network down"));
    const { openPaddleCheckout } = await import("./paddleClient");

    await expect(
      openPaddleCheckout({
        transactionId: "txn_1",
        email: "a@b.com",
        onCompleted: vi.fn(),
        onClosed: vi.fn(),
      }),
    ).rejects.toThrow("network down");

    const open = vi.fn();
    initializePaddle.mockResolvedValueOnce(fakePaddle(open));

    await openPaddleCheckout({
      transactionId: "txn_2",
      email: "b@c.com",
      onCompleted: vi.fn(),
      onClosed: vi.fn(),
    });

    expect(open).toHaveBeenCalledTimes(1);
  });

  test("suppresses a post-completion closed event; a fresh open still fires onClosed on its own", async () => {
    let eventCallback: EventCallback | undefined;
    initializePaddle.mockImplementationOnce((opts: { eventCallback: EventCallback }) => {
      eventCallback = opts.eventCallback;
      return Promise.resolve(fakePaddle());
    });
    const { openPaddleCheckout } = await import("./paddleClient");

    const onCompleted1 = vi.fn();
    const onClosed1 = vi.fn();
    await openPaddleCheckout({
      transactionId: "txn_1",
      email: "a@b.com",
      onCompleted: onCompleted1,
      onClosed: onClosed1,
    });
    eventCallback!({ name: "checkout.completed" });
    eventCallback!({ name: "checkout.closed" });
    expect(onCompleted1).toHaveBeenCalledTimes(1);
    expect(onClosed1).not.toHaveBeenCalled();

    const onCompleted2 = vi.fn();
    const onClosed2 = vi.fn();
    await openPaddleCheckout({
      transactionId: "txn_2",
      email: "b@c.com",
      onCompleted: onCompleted2,
      onClosed: onClosed2,
    });
    eventCallback!({ name: "checkout.closed" });
    expect(onClosed2).toHaveBeenCalledTimes(1);
    expect(onCompleted2).not.toHaveBeenCalled();
  });

  test("clearPaddleListeners clears listeners so subsequently fired events invoke nothing", async () => {
    let eventCallback: EventCallback | undefined;
    initializePaddle.mockImplementationOnce((opts: { eventCallback: EventCallback }) => {
      eventCallback = opts.eventCallback;
      return Promise.resolve(fakePaddle());
    });
    const { openPaddleCheckout, clearPaddleListeners } = await import("./paddleClient");

    const onCompleted = vi.fn();
    const onClosed = vi.fn();
    await openPaddleCheckout({
      transactionId: "txn_1",
      email: "a@b.com",
      onCompleted,
      onClosed,
    });

    clearPaddleListeners();

    expect(() => eventCallback!({ name: "checkout.completed" })).not.toThrow();
    expect(() => eventCallback!({ name: "checkout.closed" })).not.toThrow();
    expect(onCompleted).not.toHaveBeenCalled();
    expect(onClosed).not.toHaveBeenCalled();
  });
});
