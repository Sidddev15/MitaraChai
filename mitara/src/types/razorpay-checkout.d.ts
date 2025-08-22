// Minimal types for Razorpay Checkout.js (browser)
export { };

declare global {
    interface Window {
        Razorpay: new (options: RazorpayCheckoutOptions) => RazorpayCheckoutInstance;
    }

    interface RazorpayCheckoutOptions {
        key: string;
        amount: number;           // in paise
        currency?: string;        // 'INR'
        name?: string;
        description?: string;
        image?: string;
        order_id: string;
        prefill?: { name?: string; email?: string; contact?: string };
        notes?: Record<string, string>;
        theme?: { color?: string };
        handler?: (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
        }) => void;
        modal?: { ondismiss?: () => void };
    }

    interface RazorpayCheckoutInstance {
        open(): void;
        close(): void;
        on(event: string, cb: (...args: any[]) => void): void;
    }
}
