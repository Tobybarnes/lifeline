import { cn } from "@/lib/utils"
import type { LifelineCountry } from "./types"

export function LifelineCountryFlag({
  country,
  className,
}: {
  country: LifelineCountry
  className?: string
}) {
  return (
    <span
      role="img"
      aria-label={country.name}
      title={country.name}
      data-lifeline-country={country.name}
      className={cn("inline-block h-4 text-[15px] leading-4", className)}
    >
      {country.flag}
    </span>
  )
}
