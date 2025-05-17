import localFont from "next/font/local";

export const vazirFD = localFont({
  src: [
    {
      path: "./VazirFD/Vazir-Light-FD.ttf",
      weight: "300",
      style: "normal",
    },
    { path: "./VazirFD/Vazir-FD.ttf", weight: "400", style: "normal" },
    {
      path: "./VazirFD/Vazir-Medium-FD.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./VazirFD/Vazir-Bold-FD.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./VazirFD/Vazir-Black-FD.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  display: "swap",
});

export const bYekan = localFont({
  src: [
    { path: "./BYekan/B-Yekan.ttf", weight: "400", style: "normal" },
    { path: "./BYekan/B -Yekan-Bold.ttf", weight: "700", style: "normal" },
  ],
});

export const iranSans = localFont({
  src: [
    {
      path: "./IRANSans/IRANSansWeb_Light.woff",
      weight: "300",
      style: "normal",
    },
    { path: "./IRANSans/IRANSansWeb.woff", weight: "400", style: "normal" },
    {
      path: "./IRANSans/IRANSansWeb_Medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "./IRANSans/IRANSansWeb_Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
});

export const iranSans700 = localFont({
  src: [
    {
      path: "./IRANSans/IRANSansWeb_Bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
});
