import { SOCIAL_ICON_PATHS } from "./brand-paths";

type Props = { className?: string };

export function WhatsappIcon({ className }: Props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className ?? "size-5"} fill="currentColor">
      <path d={SOCIAL_ICON_PATHS.whatsapp} />
    </svg>
  );
}

export function InstagramIcon({ className }: Props) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className ?? "size-5"} fill="currentColor">
      <path d={SOCIAL_ICON_PATHS.instagram} />
    </svg>
  );
}
