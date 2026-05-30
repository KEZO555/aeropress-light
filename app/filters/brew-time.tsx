import { router } from "expo-router";
import { OptionsSelector } from "@/components/OptionsSelector";
import { useFilters } from "@/contexts/FiltersContext";
import { BREW_TIME_LABELS, type BrewTime } from "@/data/recipes";

const OPTIONS = [
  { label: "Any", value: "any" },
  ...(Object.keys(BREW_TIME_LABELS) as BrewTime[]).map((value) => ({
    label: BREW_TIME_LABELS[value],
    value,
  })),
];

export default function BrewTimeFilterScreen() {
  const { filters, setFilter } = useFilters();

  return (
    <OptionsSelector
      onSelect={(value) => {
        setFilter("brewTime", value === "any" ? null : (value as BrewTime));
        router.back();
      }}
      options={OPTIONS}
      selectedValue={filters.brewTime ?? "any"}
      title="Brew Time"
    />
  );
}
