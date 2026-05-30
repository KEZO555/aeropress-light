import { StyleSheet, View } from "react-native";
import { HapticPressable } from "@/components/HapticPressable";
import { StyledText } from "@/components/StyledText";
import { useInvertColors } from "@/contexts/InvertColorsContext";
import { formatDuration } from "@/data/recipes";
import { n } from "@/utils/scaling";

interface BrewTimerProps {
  elapsed: number;
  onReset: () => void;
  onToggle: () => void;
  running: boolean;
}

export function BrewTimer({
  elapsed,
  running,
  onToggle,
  onReset,
}: BrewTimerProps) {
  const { invertColors } = useInvertColors();
  const bg = invertColors ? "white" : "black";
  const fg = invertColors ? "black" : "white";

  return (
    <View style={[styles.container, { backgroundColor: bg, borderColor: fg }]}>
      <StyledText style={styles.time}>{formatDuration(elapsed)}</StyledText>
      <View style={styles.controls}>
        <HapticPressable onPress={onToggle}>
          <StyledText style={styles.control}>
            {running ? "Pause" : "Start"}
          </StyledText>
        </HapticPressable>
        <HapticPressable onPress={onReset}>
          <StyledText style={styles.control}>Reset</StyledText>
        </HapticPressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    right: n(20),
    bottom: n(20),
    alignItems: "flex-end",
    paddingVertical: n(10),
    paddingHorizontal: n(16),
    borderWidth: n(1),
    borderRadius: n(14),
    gap: n(4),
  },
  time: {
    fontSize: n(40),
  },
  controls: {
    flexDirection: "row",
    gap: n(20),
  },
  control: {
    fontSize: n(20),
  },
});
