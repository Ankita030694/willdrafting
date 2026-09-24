"use client";

import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "motion/react";

import { Badge } from "@/components/ui/pricing-7-utils/badge";
import { Button } from "@/components/ui/pricing-7-utils/button";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/pricing-7-utils/toggle-group";
import { FancyButton } from "@/components/ui/pricing-7-utils/fancy-button";
import { ArrowUpRightIcon, CheckIcon } from "lucide-react";

const animVariant: Variants = {
  initial: { opacity: 0, y: 14, filter: "blur(2px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 22, stiffness: 320 },
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(2px)",
    transition: { duration: 0.15 },
  },
};

type PricingTier = {
  value: string;
  label: string;
  price: number;
  description: string;
  features: string[];
};

const tiers: PricingTier[] = [
  {
    value: "starter",
    label: "Starter",
    price: 29,
    description:
      "For solo founders validating ideas and building initial traction.",
    features: [
      "Up to 3 projects",
      "Basic analytics",
      "Email support",
      "5 GB storage",
      "Community access",
    ],
  },
  {
    value: "growth",
    label: "Growth",
    price: 79,
    description: "For small teams scaling their product with advanced tooling.",
    features: [
      "Unlimited projects",
      "Advanced analytics & funnels",
      "Priority support (8h SLA)",
      "50 GB storage",
      "Custom integrations",
      "Team collaboration",
      "API access",
    ],
  },
  {
    value: "scale",
    label: "Scale",
    price: 199,
    description:
      "For established teams needing enterprise-grade infrastructure.",
    features: [
      "Everything in Growth",
      "Dedicated account manager",
      "500 GB storage",
      "SSO & SAML",
      "Audit logs",
      "Custom SLA",
      "Unlimited API calls",
      "On-premise deployment",
    ],
  },
];

export function Pricing() {
  const [selected, setSelected] = useState("growth");

  const currentTier = tiers.find((t) => t.value === selected) ?? tiers[1];

  return (
    <section aria-label="Pricing" className="mx-auto w-full max-w-3xl">
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="secondary" className="w-fit">
            Pricing
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Select your growth stage
          </h2>
          <p className="max-w-2xl text-lg text-muted-foreground">
            Pick a plan that matches where you are today. Upgrade seamlessly as
            your product and team evolve.
          </p>
        </div>

        <div className="flex justify-center">
          <ToggleGroup
            type="single"
            value={selected}
            onValueChange={(val: string) => {
              if (val) setSelected(val);
            }}
            className="h-auto rounded-full bg-muted p-1"
          >
            {tiers.map((tier) => (
              <ToggleGroupItem
                key={tier.value}
                value={tier.value}
                className="min-w-28 rounded-full border-0 px-6 py-2 text-muted-foreground data-pressed:bg-card data-pressed:text-foreground"
              >
                {tier.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>

        <div className="w-full max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTier.value}
              variants={animVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              className="rounded-4xl bg-muted p-1"
            >
              <div className="grid grid-cols-1 items-start gap-6 rounded-3xl bg-card p-8 shadow-elevated-lg md:grid-cols-[1.25fr_auto_1fr]">
                <div className="flex flex-col gap-6 md:order-3">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-xl font-medium text-foreground">
                      {currentTier.label} plan
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {currentTier.description}
                    </p>
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-6xl font-semibold tracking-tight text-foreground tabular-nums">
                        ${currentTier.price}
                      </span>
                      <span className="text-lg text-muted-foreground">
                        /month
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      billed monthly
                    </p>
                  </div>

                  <FancyButton size="lg" className="w-full">
                    Start free trial
                    <ArrowUpRightIcon />
                  </FancyButton>
                </div>

                <div className="hidden w-px self-stretch bg-border/50 md:order-2 md:block" />

                <div className="flex flex-col gap-4 md:order-1">
                  <ul className="flex flex-col gap-3">
                    {currentTier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-primary">
                          <CheckIcon className="size-3 text-primary-foreground" />
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <p className="text-base text-muted-foreground">
            Not sure which plan is right? We&apos;re happy to help.
          </p>
          <Button variant="link" className="gap-1 p-0 text-primary">
            Talk to our team
            <ArrowUpRightIcon className="size-3.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
export default Pricing;
