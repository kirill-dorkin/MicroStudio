import { SOCIAL_ICON_PATHS } from "@/content/social-icons";
import { cn } from "@/lib/utils";

export function SocialIcon({
  name,
  className,
}: {
  name: keyof typeof SOCIAL_ICON_PATHS;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={cn("size-5", className)}
    >
      <path fill="currentColor" d={SOCIAL_ICON_PATHS[name]} />
    </svg>
  );
}
