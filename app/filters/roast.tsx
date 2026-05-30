import { router } from "expo-router";
import { OptionsSelector } from "@/components/OptionsSelector";
import { useFilters } from "@/contexts/FiltersContext";
import { ROAST_LABELS, type Roast } from "@/data/recipes";

const OPTIONS = [
  { label: "Any", value: "any" },
  ...(Object.keys(ROAST_LABELS) as Roast[]).map((value) => ({
    label: ROAST_LABELS[value],
    value,
  })),
];

export default function RoastFilterScreen() {
  const { filters, setFilter } = useFilters();

  return (
    <OptionsSelector
      onSelect={(value) => {
        setFilter("roast", value === "any" ? null : (value as Roast));
        router.back();
      }}
      options={OPTIONS}
      selectedValue={filters.roast ?? "any"}
      title="Roast"
    />
  );
}
