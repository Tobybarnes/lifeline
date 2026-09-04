"use client"

import type { CSSProperties } from "react"
import { registerCompanyIcons } from "@/components/lifeline/company-icon"

type BrandIconProps = { className?: string }

function createBrandIcon(path: string, viewBox = "0 0 24 24") {
  return function BrandIcon({ className }: BrandIconProps) {
    return (
      <svg
        viewBox={viewBox}
        fill="currentColor"
        aria-hidden="true"
        className={className}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d={path} />
      </svg>
    )
  }
}

function createMaskedBrandIcon(src: string) {
  const maskStyle: CSSProperties = {
    backgroundColor: "currentColor",
    WebkitMaskImage: `url("${src}")`,
    maskImage: `url("${src}")`,
    WebkitMaskPosition: "center",
    maskPosition: "center",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskSize: "contain",
    maskSize: "contain",
  }

  return function MaskedBrandIcon({ className }: BrandIconProps) {
    return <span aria-hidden="true" className={className} style={maskStyle} />
  }
}

// Verified brand paths from Simple Icons 16.28.0 (CC0-1.0).
const NikeIcon = createBrandIcon(
  "M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.12 0-1.933-.392-2.437-1.177-.317-.504-.41-1.143-.28-1.918.13-.775.476-1.6 1.036-2.478.467-.71 1.232-1.643 2.297-2.8a6.122 6.122 0 00-.784 1.848c-.28 1.195-.028 2.072.756 2.632.373.261.886.392 1.54.392.522 0 1.11-.084 1.764-.252L24 7.8z",
  "0 7.5 24 9",
)

const CashAppIcon = createBrandIcon(
  "M23.59 3.475a5.1 5.1 0 00-3.05-3.05c-1.31-.42-2.5-.42-4.92-.42H8.36c-2.4 0-3.61 0-4.9.4a5.1 5.1 0 00-3.05 3.06C0 4.765 0 5.965 0 8.365v7.27c0 2.41 0 3.6.4 4.9a5.1 5.1 0 003.05 3.05c1.3.41 2.5.41 4.9.41h7.28c2.41 0 3.61 0 4.9-.4a5.1 5.1 0 003.06-3.06c.41-1.3.41-2.5.41-4.9v-7.25c0-2.41 0-3.61-.41-4.91zm-6.17 4.63l-.93.93a.5.5 0 01-.67.01 5 5 0 00-3.22-1.18c-.97 0-1.94.32-1.94 1.21 0 .9 1.04 1.2 2.24 1.65 2.1.7 3.84 1.58 3.84 3.64 0 2.24-1.74 3.78-4.58 3.95l-.26 1.2a.49.49 0 01-.48.39H9.63l-.09-.01a.5.5 0 01-.38-.59l.28-1.27a6.54 6.54 0 01-2.88-1.57v-.01a.48.48 0 010-.68l1-.97a.49.49 0 01.67 0c.91.86 2.13 1.34 3.39 1.32 1.3 0 2.17-.55 2.17-1.42 0-.87-.88-1.1-2.54-1.72-1.76-.63-3.43-1.52-3.43-3.6 0-2.42 2.01-3.6 4.39-3.71l.25-1.23a.48.48 0 01.48-.38h1.78l.1.01c.26.06.43.31.37.57l-.27 1.37c.9.3 1.75.77 2.48 1.39l.02.02c.19.2.19.5 0 .68z",
)

const ShopifyIcon = createBrandIcon(
  "M15.337 23.979l7.216-1.561s-2.604-17.613-2.625-17.73c-.018-.116-.114-.192-.211-.192s-1.929-.136-1.929-.136-1.275-1.274-1.439-1.411c-.045-.037-.075-.057-.121-.074l-.914 21.104h.023zM11.71 11.305s-.81-.424-1.774-.424c-1.447 0-1.504.906-1.504 1.141 0 1.232 3.24 1.715 3.24 4.629 0 2.295-1.44 3.76-3.406 3.76-2.354 0-3.54-1.465-3.54-1.465l.646-2.086s1.245 1.066 2.28 1.066c.675 0 .975-.545.975-.932 0-1.619-2.654-1.694-2.654-4.359-.034-2.237 1.571-4.416 4.827-4.416 1.257 0 1.875.361 1.875.361l-.945 2.715-.02.01zM11.17.83c.136 0 .271.038.405.135-.984.465-2.064 1.639-2.508 3.992-.656.213-1.293.405-1.889.578C7.697 3.75 8.951.84 11.17.84V.83zm1.235 2.949v.135c-.754.232-1.583.484-2.394.736.466-1.777 1.333-2.645 2.085-2.971.193.501.309 1.176.309 2.1zm.539-2.234c.694.074 1.141.867 1.429 1.755-.349.114-.735.231-1.158.366v-.252c0-.752-.096-1.371-.271-1.871v.002zm2.992 1.289c-.02 0-.06.021-.078.021s-.289.075-.714.21c-.423-1.233-1.176-2.37-2.508-2.37h-.115C12.135.209 11.669 0 11.265 0 8.159 0 6.675 3.877 6.21 5.846c-1.194.365-2.063.636-2.16.674-.675.213-.694.232-.772.87-.075.462-1.83 14.063-1.83 14.063L15.009 24l.927-21.166z",
)

// Artwork stays in public so the marks do not inflate the client bundle.
// Masks keep every logo in Lifeline's original currentColor treatment.
const LiverpoolJohnMooresUniversityIcon = createMaskedBrandIcon(
  "/images/toby/companies/liverpool-john-moores-university.svg",
)
const DunAndBradstreetIcon = createMaskedBrandIcon(
  "/images/toby/companies/dun-and-bradstreet.svg",
)
const NtlIcon = createMaskedBrandIcon("/images/toby/companies/ntl.svg")
const MtvIcon = createMaskedBrandIcon("/images/toby/companies/mtv.svg")
const LondonGamesFestivalIcon = createMaskedBrandIcon(
  "/images/toby/companies/london-games-festival.png",
)
const AkqaIcon = createMaskedBrandIcon("/images/toby/companies/akqa.svg")
const AStrangelyIsolatedPlaceIcon = createMaskedBrandIcon(
  "/images/toby/companies/a-strangely-isolated-place.webp",
)
const JaguarLandRoverIcon = createMaskedBrandIcon(
  "/images/toby/companies/jaguar-land-rover.svg",
)
const AmazonAlexaIcon = createMaskedBrandIcon(
  "/images/toby/companies/amazon-alexa.svg",
)
const HoytArboretumFriendsIcon = createMaskedBrandIcon(
  "/images/toby/companies/hoyt-arboretum-friends.png",
)

registerCompanyIcons({
  "liverpool-john-moores-university": {
    icon: LiverpoolJohnMooresUniversityIcon,
    sizeClassName: "h-8 w-8",
  },
  "dun-and-bradstreet": {
    icon: DunAndBradstreetIcon,
    sizeClassName: "h-6 w-32",
  },
  "ntl-interactive": { icon: NtlIcon, sizeClassName: "h-7 w-20" },
  mtv: { icon: MtvIcon, sizeClassName: "h-8 w-10" },
  "london-games-festival": {
    icon: LondonGamesFestivalIcon,
    sizeClassName: "h-6 w-32",
  },
  akqa: { icon: AkqaIcon, sizeClassName: "h-6 w-14" },
  "a-strangely-isolated-place": {
    icon: AStrangelyIsolatedPlaceIcon,
    sizeClassName: "h-8 w-8",
  },
  "jaguar-land-rover": {
    icon: JaguarLandRoverIcon,
    sizeClassName: "h-8 w-8",
  },
  nike: { icon: NikeIcon, sizeClassName: "h-6 w-12" },
  "amazon-alexa": { icon: AmazonAlexaIcon, sizeClassName: "h-6 w-32" },
  "cash-app": { icon: CashAppIcon, sizeClassName: "h-8 w-8" },
  "hoyt-arboretum-friends": {
    icon: HoytArboretumFriendsIcon,
    sizeClassName: "h-6 w-32",
  },
  shopify: { icon: ShopifyIcon, sizeClassName: "h-8 w-8" },
})

/** Render once so Toby's company marks register before the timeline renders. */
export function TobyCompanyIcons() {
  return null
}
