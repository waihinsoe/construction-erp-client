import { useSyncExternalStore } from "react";
const MOBILE_QUERY = "(max-width: 767px)";
function subscribe(notify: () => void) {
  const query = window.matchMedia(MOBILE_QUERY);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}
export function useIsMobile() {
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOBILE_QUERY).matches,
    () => false,
  );
}
