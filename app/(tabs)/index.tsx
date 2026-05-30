import { router } from "expo-router";
import ContentContainer from "@/components/ContentContainer";
import { StyledButton } from "@/components/StyledButton";
import { categories } from "@/data/recipes";

export default function RecipesScreen() {
  return (
    <ContentContainer headerTitle="Recipes" hideBackButton>
      {categories.map((category) => (
        <StyledButton
          key={category.id}
          numberOfLines={2}
          onPress={() =>
            router.push({ pathname: "/category", params: { id: category.id } })
          }
          text={category.name}
        />
      ))}
    </ContentContainer>
  );
}
