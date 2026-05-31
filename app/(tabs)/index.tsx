import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import ContentContainer from "@/components/ContentContainer";
import { HapticPressable } from "@/components/HapticPressable";
import { StyledButton } from "@/components/StyledButton";
import { StyledText } from "@/components/StyledText";
import { useUserRecipes } from "@/contexts/UserRecipesContext";
import {
  BROWSE_METHODS,
  type BrewMethod,
  categoriesForMethod,
  METHOD_LABELS,
} from "@/data/recipes";
import { n } from "@/utils/scaling";

export default function RecipesScreen() {
  const { userRecipes } = useUserRecipes();
  const [method, setMethod] = useState<BrewMethod>("aeropress");

  const recipesForMethod = userRecipes.filter(
    (recipe) => recipe.method === method
  );
  const categories = categoriesForMethod(method);

  return (
    <ContentContainer
      headerTitle="Recipes"
      hideBackButton
      rightAction={{
        icon: "add",
        onPress: () => router.push("/create-recipe"),
      }}
    >
      <View style={styles.tabs}>
        {BROWSE_METHODS.map((m) => (
          <HapticPressable key={m} onPress={() => setMethod(m)}>
            <StyledText
              style={[
                styles.tab,
                method === m ? styles.tabActive : styles.tabIdle,
              ]}
            >
              {METHOD_LABELS[m]}
            </StyledText>
          </HapticPressable>
        ))}
      </View>
      {recipesForMethod.map((recipe) => (
        <StyledButton
          key={recipe.id}
          numberOfLines={2}
          onPress={() =>
            router.push({ pathname: "/recipe", params: { id: recipe.id } })
          }
          text={recipe.name}
        />
      ))}
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

const styles = StyleSheet.create({
  tabs: {
    flexDirection: "row",
    gap: n(28),
  },
  tab: {
    fontSize: n(22),
  },
  tabActive: {
    opacity: 1,
    textDecorationLine: "underline",
  },
  tabIdle: {
    opacity: 0.4,
  },
});
