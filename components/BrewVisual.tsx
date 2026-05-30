import { StyleSheet, View } from "react-native";
import { StyledText } from "@/components/StyledText";
import { useInvertColors } from "@/contexts/InvertColorsContext";
import { n } from "@/utils/scaling";

// AeroPress reference points used to brew without a scale.
const GRAMS_PER_SCOOP = 11; // level AeroPress scoop of beans
const ML_PER_CHAMBER_NUMBER = 60; // approx water per molded chamber number
const CHAMBER_NUMBERS = [1, 2, 3, 4];
const CIRCLED = ["①", "②", "③", "④"];

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

interface BrewVisualProps {
  coffeeGrams: number;
  waterGrams: number;
}

export function BrewVisual({ coffeeGrams, waterGrams }: BrewVisualProps) {
  const { invertColors } = useInvertColors();
  const fg = invertColors ? "black" : "white";

  const scoopValue = coffeeGrams / GRAMS_PER_SCOOP;
  const scoops = quarterLabel(scoopValue);
  const scoopUnit = scoopValue === 1 ? "scoop" : "scoops";
  const chamberTarget = halfLabel(waterGrams / ML_PER_CHAMBER_NUMBER);
  const fillFraction = Math.min(
    waterGrams / (ML_PER_CHAMBER_NUMBER * CHAMBER_NUMBERS.length),
    1
  );

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <StyledText style={styles.value}>{`${scoops} ${scoopUnit}`}</StyledText>
        <StyledText style={styles.hint}>
          {`${coffeeGrams}g coffee · level AeroPress scoop`}
        </StyledText>
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
});
