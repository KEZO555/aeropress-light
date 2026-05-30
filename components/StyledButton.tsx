import { StyleSheet } from "react-native";
import { n } from "@/utils/scaling";
import { HapticPressable } from "./HapticPressable";
import { StyledText } from "./StyledText";

interface ButtonProps {
  numberOfLines?: number;
  onPress?: () => void;
  selected?: boolean;
  text: string;
}

export function StyledButton({
  text,
  onPress,
  selected = false,
  numberOfLines = 1,
}: ButtonProps) {
  return (
    <HapticPressable onPress={onPress} style={styles.button}>
      <StyledText
        numberOfLines={numberOfLines}
        style={[styles.buttonText, selected && styles.selected]}
      >
        {text}
      </StyledText>
    </HapticPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  buttonText: {
    fontSize: n(30),
  },
  selected: {
    textDecorationLine: "underline",
  },
});
