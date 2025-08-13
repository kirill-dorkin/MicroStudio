import Image from "next/image";
import { CustomCursorElement } from "./custom-cursor-element";
import { ScrollView } from "./scroll-view";

export default function PortfolioCard({
  card,
}: {
  card: {
    name: string;
    description: string;
    img: string;
    url: string;
  };
}) {
  return (
    <div>
      <CustomCursorElement
        cursor={<div className="text-zinc-950 text-lg font-medium">View</div>}
      >
        <ScrollView>
          <div className="group hover:scale-105 transition-all duration-500 ">
            <a href={card.url} target="_blank" rel="noreferrer">
              <Image
                className=" w-full grayscale-25 hover:grayscale-0 rounded-md object-cover object-top  transition-all duration-500  "
                height={480}
                width={720}
                src={card.img}
                alt={card.name}
              />
              <div className="mt-4">
                <h3 className="text-title text-2xl font-medium ">
                  {card.name}
                </h3>
                <p className="text-muted-foreground">{card.description}</p>
              </div>
            </a>
          </div>
        </ScrollView>
      </CustomCursorElement>
    </div>
  );
}
