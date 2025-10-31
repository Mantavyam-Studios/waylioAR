import { Button } from "@repo/design-system/components/ui/button";
import { Check, Minus, MoveRight, PhoneCall } from "lucide-react";
import Link from "next/link";
import { env } from "@/env";

const Pricing = () => (
  <div className="w-full py-20 lg:py-40">
    <div className="container mx-auto">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <div className="flex flex-col gap-2">
          <h2 className="max-w-xl text-center font-regular text-3xl tracking-tighter md:text-5xl">
            Prices that make sense!
          </h2>
          <p className="max-w-xl text-center text-lg text-muted-foreground leading-relaxed tracking-tight">
            Eliminate Navigation Chaos with Waylio AR Integration
          </p>
        </div>
        <div className="grid w-full grid-cols-3 divide-x pt-20 text-left lg:grid-cols-4">
          <div className="col-span-3 lg:col-span-1" />
          <div className="flex flex-col gap-2 px-3 py-1 md:px-6 md:py-4">
            <p className="text-2xl">Startup</p>
            <p className="text-muted-foreground text-sm">
              Includes core Waylio features like AR navigation, appointment booking, and digital prescriptions for a single campus.
            </p>
            <p className="mt-8 flex flex-col gap-2 text-xl lg:flex-row lg:items-center">
              <span className="text-4xl">$50</span>
              <span className="text-muted-foreground text-sm"> / month</span>
            </p>
            <Button asChild className="mt-8 gap-4" variant="outline">
              <Link href={env.NEXT_PUBLIC_APP_URL}>
                Try it <MoveRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-2 px-3 py-1 md:px-6 md:py-4">
            <p className="text-2xl">Growth</p>
            <p className="text-muted-foreground text-sm">
              All Professional features, plus smart parking, multi-building support, and advanced operational analytics.
            </p>
            <p className="mt-8 flex flex-col gap-2 text-xl lg:flex-row lg:items-center">
              <span className="text-4xl">$150</span>
              <span className="text-muted-foreground text-sm"> / month</span>
            </p>
            <Button asChild className="mt-8 gap-4">
              <Link href={env.NEXT_PUBLIC_APP_URL}>
                Try it <MoveRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="flex flex-col gap-2 px-3 py-1 md:px-6 md:py-4">
            <p className="text-2xl">Enterprise</p>
            <p className="text-muted-foreground text-sm">
              For multi-campus health systems. Includes custom integrations, dedicated support, and white-labeling options.
            </p>
            <p className="mt-8 flex flex-col gap-2 text-xl lg:flex-row lg:items-center">
              <span className="text-4xl">$500</span>
              <span className="text-muted-foreground text-sm"> / month</span>
            </p>
            <Button asChild className="mt-8 gap-4" variant="outline">
              <Link href="/contact">
                Contact us <PhoneCall className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="col-span-3 px-3 py-4 lg:col-span-1 lg:px-6">
            <b>Features</b>
          </div>
          <div />
          <div />
          <div />
          {/* New Line */}
          <div className="col-span-3 px-3 py-4 lg:col-span-1 lg:px-6">AR Indoor Navigation</div>
          <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
            <Check className="h-4 w-4 text-primary" />
          </div>
          <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
            <Check className="h-4 w-4 text-primary" />
          </div>
          <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
            <Check className="h-4 w-4 text-primary" />
          </div>
          {/* New Line */}
          <div className="col-span-3 px-3 py-4 lg:col-span-1 lg:px-6">
            Appointment & Queue Management
          </div>
          <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
            <Minus className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
            <Check className="h-4 w-4 text-primary" />
          </div>
          <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
            <Check className="h-4 w-4 text-primary" />
          </div>
          {/* New Line */}
          <div className="col-span-3 px-3 py-4 lg:col-span-1 lg:px-6">
            Digital Prescriptions
          </div>
          <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
            <Minus className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
            <Check className="h-4 w-4 text-primary" />
          </div>
          <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
            <Check className="h-4 w-4 text-primary" />
          </div>
          {/* New Line */}
          <div className="col-span-3 px-3 py-4 lg:col-span-1 lg:px-6">
            Visitors
          </div>
          <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
            <p className="text-muted-foreground text-sm">1000 +</p>
          </div>
          <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
            <p className="text-muted-foreground text-sm">10000 +</p>
          </div>
          <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
            <p className="text-muted-foreground text-sm">100000 +</p>
          </div>
          {/* New Line */}
          <div className="col-span-3 px-3 py-4 lg:col-span-1 lg:px-6">
            Smart Parking Management
          </div>
          <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
            <Minus className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
            <Check className="h-4 w-4 text-primary" />
          </div>
          <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
            <Check className="h-4 w-4 text-primary" />
          </div>
          {/* New Line */}
          <div className="col-span-3 px-3 py-4 lg:col-span-1 lg:px-6">
            Operational Analytics
          </div>
          <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
            <Minus className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
            <Check className="h-4 w-4 text-primary" />
          </div>
          <div className="flex justify-center px-3 py-1 md:px-6 md:py-4">
            <Check className="h-4 w-4 text-primary" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Pricing;
