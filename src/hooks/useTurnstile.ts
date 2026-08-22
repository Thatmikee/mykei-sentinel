import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Cloudflare Turnstile, as an invisible widget.
 *
 * The send-loi Worker fails closed: no valid token, no email. That is the right
 * default, but it means any form posting to the Worker needs a token, and the
 * two enquiry forms had none. They were built for Netlify Forms, which handled
 * spam itself, so nothing here had to.
 *
 * Pilot.tsx already had a working implementation. Rather than copy it a second
 * and third time and let three copies drift apart, which is precisely how this
 * codebase ended up with fifteen golds and seven creams, it lives here once.
 *
 * The token is single use. Turnstile issues a fresh one per solve and the Worker
 * rejects a replay, so reset() must run after a failed submit or the next
 * attempt fails on a stale token.
 */

declare global {
  interface Window {
    turnstile?: {
      render: (el: string | HTMLElement, opts: Record<string, unknown>) => string;
      reset: (id?: string) => void;
      remove: (id?: string) => void;
    };
  }
}

const SCRIPT_ID = "cf-turnstile-script";
const SITE_KEY = "0x4AAAAAADLhkxAX0ez1A7Za";

export const ENQUIRY_ENDPOINT = "https://send-loi.michaelesema.workers.dev";

export function useTurnstile(containerId: string, action: string) {
  const widgetId = useRef<string | null>(null);
  const [token, setToken] = useState<string>("");

  const onSuccess = useCallback((t: string) => setToken(t), []);

  useEffect(() => {
    if (!document.getElementById(SCRIPT_ID)) {
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
    }

    const render = () => {
      if (window.turnstile && !widgetId.current) {
        widgetId.current = window.turnstile.render("#" + containerId, {
          sitekey: SITE_KEY,
          size: "invisible",
          action,
          callback: onSuccess,
        });
      }
    };

    if (window.turnstile) render();
    else window.addEventListener("cf-turnstile-loaded", render);

    return () => {
      window.removeEventListener("cf-turnstile-loaded", render);
      // Without this the widget outlives the component across route changes and
      // the next render targets a container no longer in the document.
      if (widgetId.current && window.turnstile?.remove) {
        try { window.turnstile.remove(widgetId.current); } catch { /* already gone */ }
        widgetId.current = null;
      }
    };
  }, [containerId, action, onSuccess]);

  const reset = useCallback(() => {
    setToken("");
    if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
  }, []);

  return { token, reset };
}
