import { StyleSheet, View } from "react-native";
import { StyledText } from "@/components/StyledText";
import { useInvertColors } from "@/contexts/InvertColorsContext";
import type { BrewMethod } from "@/data/recipes";
import { n } from "@/utils/scaling";

// Reference points used to brew without a scale.
const AEROPRESS_GRAMS_PER_SCOOP = 11; // level AeroPress scoop of beans
const V60_GRAMS_PER_SCOOP = 12; // level Hario V60 measuring scoop
const ML_PER_CHAMBER_NUMBER = 60; // approx water per molded chamber number
const CHAMBER_NUMBERS = [1, 2, 3, 4];
const CIRCLED = ["①", "②", "③", "④"];
const ML_PER_FUNNEL_MARK = 100; // graduation spacing drawn on the V60 funnel

// V60 funnel silhouette (a truncated cone, wide rim down to the drip hole).
const FUNNEL_HEIGHT = n(200);
const FUNNEL_TOP_HALF = n(80);
const FUNNEL_BOTTOM_HALF = n(16);

function funnelHalfWidth(fraction: number): number {
  return FUNNEL_BOTTOM_HALF + (FUNNEL_TOP_HALF - FUNNEL_BOTTOM_HALF) * fraction;
}

// Build the border-triangle trapezoid that fills the funnel from the drip hole
// up to a given height, matching the cone's taper.
function funnelFillStyle(fraction: number, color: string) {
  const topHalf = funnelHalfWidth(fraction);
  return {
    width: FUNNEL_BOTTOM_HALF * 2,
    height: 0,
    borderTopWidth: FUNNEL_HEIGHT * fraction,
    borderTopColor: color,
    borderLeftWidth: topHalf - FUNNEL_BOTTOM_HALF,
    borderLeftColor: "transparent",
    borderRightWidth: topHalf - FUNNEL_BOTTOM_HALF,
    borderRightColor: "transparent",
  } as const;
}

const QUARTER_GLYPHS: Record<number, string> = {
  0.25: "¼",
  0.5: "½",
  0.75: "¾",
};

function quarterLabel(value: number): string {
  const rounded = Math.round(value * 4) / 4;
  const whole = Math.floor(rounded);
  const glyph = QUARTER_GLYPHS[rounded - whole] ?? "";
  if (whole === 0) {
    return glyph || "0";
  }
  return `${whole}${glyph}`;
}

function halfLabel(value: number): string {
  const rounded = Math.round(value * 2) / 2;
  const whole = Math.floor(rounded);
  const frac = rounded - whole;
  return frac === 0.5 ? `${whole}½` : `${whole}`;
}

function scoopRow(coffeeGrams: number, gramsPerScoop: number, label: string) {
  const scoops = quarterLabel(coffeeGrams / gramsPerScoop);
  const unit = scoops === "1" ? "scoop" : "scoops";
  return {
    value: `${scoops} ${unit}`,
    hint: `${coffeeGrams}g coffee · ${label}`,
  };
}

interface BrewVisualProps {
  coffeeGrams: number;
  method: BrewMethod;
  waterGrams: number;
}

export function BrewVisual({
  coffeeGrams,
  method,
  waterGrams,
}: BrewVisualProps) {
  const { invertColors } = useInvertColors();
  const fg = invertColors ? "black" : "white";

  if (method === "v60") {
    return (
      <V60Visual coffeeGrams={coffeeGrams} fg={fg} waterGrams={waterGrams} />
    );
  }
  return (
    <AeroPressVisual
      coffeeGrams={coffeeGrams}
      fg={fg}
      waterGrams={waterGrams}
    />
  );
}

function AeroPressVisual({
  coffeeGrams,
  fg,
  waterGrams,
}: {
  coffeeGrams: number;
  fg: string;
  waterGrams: number;
}) {
  const chamberCapacity = ML_PER_CHAMBER_NUMBER * CHAMBER_NUMBERS.length;
  const coffee = scoopRow(
    coffeeGrams,
    AEROPRESS_GRAMS_PER_SCOOP,
    "level AeroPress scoop"
  );
  // The chamber is only numbered to ④, so a larger brew can't name a mark.
  const overCapacity = waterGrams > chamberCapacity;
  const chamberTarget = overCapacity
    ? "the top"
    : halfLabel(waterGrams / ML_PER_CHAMBER_NUMBER);
  const fillFraction = Math.min(waterGrams / chamberCapacity, 1);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <StyledText style={styles.value}>{coffee.value}</StyledText>
        <StyledText style={styles.hint}>{coffee.hint}</StyledText>
      </View>

      <View style={styles.row}>
        <StyledText
          style={styles.value}
        >{`Fill to ${chamberTarget}`}</StyledText>
        <StyledText style={styles.hint}>
          {`${waterGrams}g water · chamber numbers`}
        </StyledText>
      </View>

      <View style={styles.chamberRow}>
        <View style={[styles.chamber, { borderColor: fg }]}>
          <View
            style={[
              styles.water,
              { height: `${fillFraction * 100}%`, backgroundColor: fg },
            ]}
          />
          {CHAMBER_NUMBERS.map((num, index) => (
            <View
              key={num}
              style={[
                styles.tick,
                { bottom: `${(num / CHAMBER_NUMBERS.length) * 100}%` },
              ]}
            >
              <View style={[styles.tickLine, { backgroundColor: fg }]} />
              <StyledText style={styles.tickLabel}>{CIRCLED[index]}</StyledText>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

function V60Visual({
  coffeeGrams,
  fg,
  waterGrams,
}: {
  coffeeGrams: number;
  fg: string;
  waterGrams: number;
}) {
  const coffee = scoopRow(
    coffeeGrams,
    V60_GRAMS_PER_SCOOP,
    "level Hario scoop"
  );
  // Capacity sits one mark above the target so the fill line stays below the
  // rim and there is always a graduation just above the water level.
  const capacity =
    (Math.floor(waterGrams / ML_PER_FUNNEL_MARK) + 1) * ML_PER_FUNNEL_MARK;
  const markCount = capacity / ML_PER_FUNNEL_MARK;
  const fillFraction = waterGrams / capacity;
  const marks = Array.from(
    { length: markCount },
    (_, i) => (i + 1) / markCount
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <StyledText style={styles.value}>{coffee.value}</StyledText>
        <StyledText style={styles.hint}>{coffee.hint}</StyledText>
      </View>

      <View style={styles.row}>
        <StyledText
          style={styles.value}
        >{`Fill to ~${waterGrams}ml`}</StyledText>
        <StyledText style={styles.hint}>
          {`${waterGrams}g water · Hario V60 funnel`}
        </StyledText>
      </View>

      <View style={styles.funnelRow}>
        <View style={styles.funnel}>
          <View style={styles.funnelLayer}>
            <View style={[funnelFillStyle(1, fg), styles.funnelBody]} />
          </View>
          <View style={styles.funnelLayer}>
            <View
              style={[funnelFillStyle(fillFraction, fg), styles.funnelWater]}
            />
          </View>
          {marks.map((fraction) => (
            <View
              key={fraction}
              style={[styles.funnelMark, { bottom: FUNNEL_HEIGHT * fraction }]}
            >
              <View
                style={[
                  styles.funnelMarkLine,
                  {
                    backgroundColor: fg,
                    width: funnelHalfWidth(fraction) * 2,
                  },
                ]}
              />
            </View>
          ))}
          <View
            style={[
              styles.funnelTarget,
              { bottom: FUNNEL_HEIGHT * fillFraction - n(10) },
            ]}
          >
            <View
              style={[
                styles.funnelTargetLine,
                {
                  backgroundColor: fg,
                  width: funnelHalfWidth(fillFraction) * 2,
                },
              ]}
            />
            <StyledText style={styles.funnelTargetLabel}>
              {`${waterGrams}ml`}
            </StyledText>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: n(18),
  },
  row: {
    gap: n(2),
  },
  value: {
    fontSize: n(26),
  },
  hint: {
    fontSize: n(15),
    opacity: 0.6,
  },
  chamberRow: {
    width: "100%",
    alignItems: "center",
    paddingTop: n(6),
  },
  chamber: {
    width: n(120),
    height: n(220),
    borderWidth: n(2),
    borderTopLeftRadius: n(6),
    borderTopRightRadius: n(6),
    borderBottomLeftRadius: n(20),
    borderBottomRightRadius: n(20),
    overflow: "hidden",
    justifyContent: "flex-end",
  },
  water: {
    width: "100%",
    opacity: 0.25,
  },
  tick: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
  },
  tickLine: {
    height: n(1),
    width: n(14),
    opacity: 0.7,
  },
  tickLabel: {
    fontSize: n(15),
    paddingLeft: n(6),
    opacity: 0.7,
  },
  funnelRow: {
    width: "100%",
    alignItems: "center",
    paddingTop: n(6),
  },
  funnel: {
    width: FUNNEL_TOP_HALF * 2 + n(64),
    height: FUNNEL_HEIGHT,
    position: "relative",
  },
  funnelLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  funnelBody: {
    opacity: 0.14,
  },
  funnelWater: {
    opacity: 0.32,
  },
  funnelMark: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
  },
  funnelMarkLine: {
    height: n(1),
    opacity: 0.45,
  },
  funnelTarget: {
    position: "absolute",
    left: 0,
    right: 0,
    height: n(20),
    alignItems: "center",
    justifyContent: "center",
  },
  funnelTargetLine: {
    height: n(2),
  },
  funnelTargetLabel: {
    position: "absolute",
    right: n(4),
    fontSize: n(15),
    opacity: 0.8,
  },
});
