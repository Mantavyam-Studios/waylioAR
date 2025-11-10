"use client";

import { Button } from "@repo/design-system/components/ui/button";
import { Calendar } from "@repo/design-system/components/ui/calendar";
import { Input } from "@repo/design-system/components/ui/input";
import { Label } from "@repo/design-system/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@repo/design-system/components/ui/popover";
import { cn } from "@repo/design-system/lib/utils";
import type { Dictionary } from "@repo/internationalization";
import { format } from "date-fns";
import { CalendarIcon, Check, MoveRight } from "lucide-react";
import { useState } from "react";

type ContactFormProps = {
  dictionary: Dictionary;
};

export const ContactForm = ({ dictionary }: ContactFormProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="w-full py-20 lg:py-40">
      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h4 className="max-w-xl text-left font-regular text-2xl tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                  {dictionary.web.contact.meta.title}
                </h4>
                <p className="max-w-sm text-left text-base text-muted-foreground leading-relaxed tracking-tight sm:text-lg">
                  {dictionary.web.contact.meta.description}
                </p>
              </div>
            </div>
            {dictionary.web.contact.hero.benefits.map((benefit, index) => (
              <div
                className="flex flex-row items-start gap-4 sm:gap-6 text-left"
                key={index}
              >
                <Check className="mt-2 h-4 w-4 text-primary shrink-0" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm sm:text-base">{benefit.title}</p>
                  <p className="text-muted-foreground text-xs sm:text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center">
            <div className="flex w-full max-w-sm flex-col gap-4 rounded-md border p-6 sm:p-8">
              <p className="text-sm sm:text-base">{dictionary.web.contact.hero.form.title}</p>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="picture">
                  {dictionary.web.contact.hero.form.date}
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      className={cn(
                        "w-full max-w-sm justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                      variant="outline"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <span>{dictionary.web.contact.hero.form.date}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      initialFocus
                      mode="single"
                      onSelect={setDate}
                      selected={date}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="firstname">
                  {dictionary.web.contact.hero.form.firstName}
                </Label>
                <Input id="firstname" type="text" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="lastname">
                  {dictionary.web.contact.hero.form.lastName}
                </Label>
                <Input id="lastname" type="text" />
              </div>
              <div className="grid w-full max-w-sm items-center gap-1">
                <Label htmlFor="picture">
                  {dictionary.web.contact.hero.form.resume}
                </Label>
                <Input id="picture" type="file" />
              </div>

              <Button className="w-full gap-4">
                {dictionary.web.contact.hero.form.cta}{" "}
                <MoveRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
