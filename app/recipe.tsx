import { useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { type ScrollView, StyleSheet, View } from "react-native";
import { BrewSteps } from "@/components/BrewSteps";
import { BrewTimer } from "@/components/BrewTimer";
import { BrewVisual } from "@/components/BrewVisual";
import ContentContainer from "@/components/ContentContainer";
import { HapticPressable } from "@/components/HapticPressable";
import { StyledText } from "@/components/StyledText";
import {
  formatDuration,
  GRIND_LABELS,
  getRecipe,
  ORIENTATION_LABELS,
  ROAST_LABELS,
} from "@/data/recipes";
import { useBrewTimer } from "@/hooks/useBrewTimer";
import { n } from "@/utils/scaling";

function Spec({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.spec}>
      <StyledText style={styles.specLabel}>{label}</StyledText>
      <StyledText style={styles.specValue}>{value}</StyledText>
    </View>
  );
}

export default function RecipeScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recipe = id ? getRecipe(id) : undefined;
  const steps = recipe?.steps ?? [];

  const { elapsed, running, activeIndex, toggle, reset } = useBrewTimer(steps);
  const [showNoScale, setShowNoScale] = useState(false);

  const scrollRef = useRef<ScrollView>(null);
  const containerTop = useRef(0);
  const stepTops = useRef<number[]>([]);

  useEffect(() => {
    if (!running || activeIndex < 0) {
      return;
    }
    const target = containerTop.current + (stepTops.current[activeIndex] ?? 0);
    scrollRef.current?.scrollTo({
      y: Math.max(target - n(80), 0),
      animated: true,
    });
  }, [running, activeIndex]);

  if (!recipe) {
    return (
      <ContentContainer headerTitle="Recipe">
        <StyledText style={styles.message}>Recipe not found.</StyledText>
      </ContentContainer>
    );
  }

  const ratio = Math.round((recipe.waterGrams / recipe.coffeeGrams) * 10) / 10;

  return (
    <View style={styles.root}>
      <ContentContainer
        contentGap={28}
        headerTitle={recipe.name}
        scrollRef={scrollRef}
      >
        <StyledText style={styles.author}>{recipe.author}</StyledText>
        <StyledText style={styles.blurb}>{recipe.blurb}</StyledText>

        <View style={styles.specs}>
          <Spec label="Coffee" value={`${recipe.coffeeGrams}g`} />
          <Spec label="Water" value={`${recipe.waterGrams}g`} />
          <Spec label="Ratio" value={`1:${ratio}`} />
          <Spec label="Temp" value={`${recipe.waterTempC}C`} />
          <Spec label="Time" value={formatDuration(recipe.totalSeconds)} />
          <Spec label="Roast" value={ROAST_LABELS[recipe.roast]} />
          <Spec label="Grind" value={GRIND_LABELS[recipe.grind]} />
          <Spec
            label="Orientation"
            value={ORIENTATION_LABELS[recipe.orientation]}
          />
          <Spec label="C40 clicks" value={`${recipe.c40Clicks}`} />
        </View>

        <HapticPressable
          onPress={() => setShowNoScale((value) => !value)}
          style={styles.toggle}
        >
          <StyledText style={styles.sectionTitle}>Without a scale</StyledText>
          <StyledText style={styles.toggleHint}>
            {showNoScale ? "Hide" : "Show"}
          </StyledText>
        </HapticPressable>
        {showNoScale && (
          <BrewVisual
            coffeeGrams={recipe.coffeeGrams}
            waterGrams={recipe.waterGrams}
          />
        )}

        <StyledText style={styles.sectionTitle}>Brew</StyledText>
        <BrewSteps
          activeIndex={activeIndex}
          onContainerLayout={(y) => {
            containerTop.current = y;
          }}
          onStepLayout={(index, y) => {
            stepTops.current[index] = y;
          }}
          steps={recipe.steps}
        />

        <View style={styles.bottomSpacer} />
      </ContentContainer>

      <BrewTimer
        elapsed={elapsed}
        onReset={reset}
        onToggle={toggle}
        running={running}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
  },
  author: {
    fontSize: n(18),
  },
  blurb: {
    fontSize: n(20),
    lineHeight: n(28),
  },
  specs: {
    width: "100%",
    gap: n(14),
  },
  spec: {
    width: "100%",
    gap: n(2),
  },
  specLabel: {
    fontSize: n(16),
    opacity: 0.6,
  },
  specValue: {
    fontSize: n(26),
  },
  sectionTitle: {
    fontSize: n(30),
  },
  toggle: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  toggleHint: {
    fontSize: n(18),
    opacity: 0.6,
  },
  message: {
    fontSize: n(24),
  },
  bottomSpacer: {
    height: n(120),
  },
});
