import { router } from "expo-router";
import ContentContainer from "@/components/ContentContainer";
import { StyledButton } from "@/components/StyledButton";

export default function SettingsScreen() {
  return (
    <ContentContainer headerTitle="Settings" hideBackButton>
      <StyledButton
        onPress={() => router.push("/settings/customise")}
        text="Customise"
      />
    </ContentContainer>
  );
}
