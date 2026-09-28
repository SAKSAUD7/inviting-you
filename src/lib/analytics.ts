import { sendGAEvent } from '@next/third-parties/google'

export function trackEvent(eventName: string, params: Record<string, any> = {}) {
  if (typeof window === 'undefined') return;

  const pathname = window.location.pathname;
  if (pathname.startsWith('/admin') || pathname.startsWith('/i/')) {
    return;
  }

  // sendGAEvent natively pushes to dataLayer under the hood for GA4.
  // Format: gtag('event', eventName, params)
  sendGAEvent('event', eventName, params);
}
