/**
 * Checks that every external link used on the site responds (demos, GitHub
 * repositories, licences, Instagram, WhatsApp).
 *
 *   pnpm check:links
 */
import portfolio from "../src/data/portfolio.json";
import { site } from "../src/config/site";
import { whatsappUrl } from "../src/lib/contact";

async function main() {
  const urls = new Set<string>([site.instagram]);
  if (site.whatsappE164) urls.add(whatsappUrl(site.whatsappE164));
  for (const p of portfolio as { demo: string; source?: string; licenseUrl?: string }[])
    [p.demo, p.source, p.licenseUrl].forEach((u) => u && urls.add(u));

  let failed = 0;
  for (const url of urls) {
    try {
      const res = await fetch(url, { redirect: "follow", headers: { "user-agent": "Mozilla/5.0 MicroStudio link check" } });
      console.log(res.status, url);
      if (!res.ok) failed++;
    } catch (error) {
      console.log("ERR", url, String(error));
      failed++;
    }
  }
  console.log(`${urls.size - failed}/${urls.size} external links OK`);
  if (failed) process.exit(1);
}

main();
