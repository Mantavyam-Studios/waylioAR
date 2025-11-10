"use client";

import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@repo/design-system/components/ui/carousel";
import type { Dictionary } from "@repo/internationalization";
import { useEffect, useState } from "react";

type CasesProps = {
  dictionary: Dictionary;
};

export const Cases = ({ dictionary }: CasesProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 1000);
  }, [api, current]);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10">
          <h2 className="text-left font-regular text-2xl tracking-tighter sm:text-3xl md:text-4xl lg:max-w-xl lg:text-5xl">
            {dictionary.web.home.cases.title}
          </h2>
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {Array.from({ length: 15 }).map((_, index) => (
                <CarouselItem className="pl-2 md:pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6" key={index}>
                  <div className="flex aspect-square items-center justify-center rounded-md bg-muted p-4 sm:p-6">
                    <span className="text-xs sm:text-sm">Logo {index + 1}</span>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
};
