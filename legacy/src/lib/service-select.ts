export const SERVICE_IDS = [
  "new",
  "onepage",
  "improve",
  "ads",
  "support",
  "consult",
] as const;
export type ServiceId = (typeof SERVICE_IDS)[number];

const EVENT = "microstudio:select-service";

/** Preselects a service in the contact form (the link itself scrolls there). */
export function selectService(id: ServiceId) {
  window.dispatchEvent(new CustomEvent<ServiceId>(EVENT, { detail: id }));
}

export function onServiceSelected(handler: (id: ServiceId) => void) {
  const listener = (e: Event) => handler((e as CustomEvent<ServiceId>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
