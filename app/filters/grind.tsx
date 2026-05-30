import { router } from "expo-router";
import { OptionsSelector } from "@/components/OptionsSelector";
import { useFilters } from "@/contexts/FiltersContext";
import { GRIND_LABELS, type Grind } from "@/data/recipes";

const OPTIONS = [
  { label: "Any", value: "any" },
  ...(Object.keys(GRIND_LABELS) as Grind[]).map((value) => ({
    label: GRIND_LABELS[value],
    value,
  })),
];

export default function GrindFilterScreen() {
  const { filters, setFilter } = useFilters();

  return (
    <OptionsSelector
      onSelect={(value) => {
        setFilter("grind", value === "any" ? null : (value as Grind));
        router.back();
      }}
      options={OPTIONS}
      selectedValue={filters.grind ?? "any"}
      title="Grind"
    />
  );
}
