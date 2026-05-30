import { type Href, router } from "expo-router";
import ContentContainer from "@/components/ContentContainer";
import { StyledButton } from "@/components/StyledButton";

export default function CustomiseScreen() {
  return (
    <ContentContainer headerTitle="Customise">
      <StyledButton
        onPress={() => router.push("/settings/customise-interface" as Href)}
        text="Interface"
      />
    </ContentContainer>
  );
}
