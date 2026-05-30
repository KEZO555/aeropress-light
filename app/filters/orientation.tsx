import { router } from "expo-router";
import { OptionsSelector } from "@/components/OptionsSelector";
import { useFilters } from "@/contexts/FiltersContext";
import { ORIENTATION_LABELS, type Orientation } from "@/data/recipes";

const OPTIONS = [
  { label: "Any", value: "any" },
  ...(Object.keys(ORIENTATION_LABELS) as Orientation[]).map((value) => ({
    label: ORIENTATION_LABELS[value],
    value,
  })),
];

export default function OrientationFilterScreen() {
  const { filters, setFilter } = useFilters();

  return (
    <OptionsSelector
      onSelect={(value) => {
        setFilter(
          "orientation",
          value === "any" ? null : (value as Orientation)
        );
        router.back();
      }}
      options={OPTIONS}
      selectedValue={filters.orientation ?? "any"}
      title="Orientation"
    />
  );
}
