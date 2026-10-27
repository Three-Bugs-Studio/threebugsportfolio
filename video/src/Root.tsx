import React from "react";
import { Composition } from "remotion";
import { Promo, PROMO_FRAMES } from "./Promo";
import { Showreel, showreelFrames } from "./Showreel";

export const Root: React.FC = () => (
  <>
    <Composition
      id="Promo"
      component={Promo}
      durationInFrames={PROMO_FRAMES}
      fps={60}
      width={1920}
      height={1080}
    />
    <Composition
      id="Showreel"
      component={Showreel}
      durationInFrames={showreelFrames("vi")}
      fps={60}
      width={1920}
      height={1080}
    />
    <Composition
      id="ShowreelEN"
      component={Showreel}
      defaultProps={{ lang: "en" as const }}
      durationInFrames={showreelFrames("en")}
      fps={60}
      width={1920}
      height={1080}
    />
  </>
);
