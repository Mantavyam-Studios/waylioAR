"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@repo/design-system/components/ui/avatar";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@repo/design-system/components/ui/carousel";
import type { Dictionary } from "@repo/internationalization";
import { User } from "lucide-react";
import { useEffect, useState } from "react";

type TestimonialsProps = {
  dictionary: Dictionary;
};

export const Testimonials = ({ dictionary }: TestimonialsProps) => {
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
    }, 4000);
  }, [api, current]);

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10">
          <h2 className="text-left font-regular text-2xl tracking-tighter sm:text-3xl md:text-4xl lg:max-w-xl lg:text-5xl">
            {dictionary.web.home.testimonials.title}
          </h2>
          <Carousel className="w-full" setApi={setApi}>
            <CarouselContent className="-ml-2 md:-ml-4">
              {dictionary.web.home.testimonials.items.map((item, index) => (
                <CarouselItem className="pl-2 md:pl-4 md:basis-1/2 lg:basis-1/2" key={index}>
                  <div className="flex aspect-video h-full flex-col justify-between rounded-md bg-muted p-4 sm:p-6">
                    <User aria-hidden="true" className="h-6 w-6 stroke-1 sm:h-8 sm:w-8" />
                    <div className="flex flex-col gap-3 sm:gap-4">
                      <div className="flex flex-col">
                        <h3 className="text-lg tracking-tight sm:text-xl">{item.title}</h3>
                        <p className="max-w-xs text-sm text-muted-foreground sm:text-base">
                          {item.description}
                        </p>
                      </div>
                      <p className="flex flex-row items-center gap-2 text-xs sm:text-sm">
                        <span className="text-muted-foreground">By</span>
                        <Avatar className="h-4 w-4 sm:h-6 sm:w-6">
                          <AvatarImage src={item.author.image} />
                          <AvatarFallback>??</AvatarFallback>
                        </Avatar>
                        <span>{item.author.name}</span>
                      </p>
                    </div>
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
