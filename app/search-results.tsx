import { router } from "expo-router";
import ContentContainer from "@/components/ContentContainer";
import { StyledButton } from "@/components/StyledButton";
import { StyledText } from "@/components/StyledText";
import { useFilters } from "@/contexts/FiltersContext";
import { filterRecipes } from "@/data/recipes";
import { n } from "@/utils/scaling";

export default function SearchResultsScreen() {
  const { filters } = useFilters();
  const results = filterRecipes(filters);

  return (
    <ContentContainer headerTitle="Results">
      {results.length === 0 ? (
        <StyledText style={{ fontSize: n(24) }}>No recipes match.</StyledText>
      ) : (
        results.map((recipe) => (
          <StyledButton
            key={recipe.id}
            onPress={() =>
              router.push({ pathname: "/recipe", params: { id: recipe.id } })
            }
            text={recipe.name}
          />
        ))
      )}
    </ContentContainer>
  );
}
