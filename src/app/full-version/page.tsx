import { redirect } from "next/navigation";
// Preserve old bookmarks while retiring the template's waitlist.
export default function FullVersionPage() {
  redirect("/#contact");
}
