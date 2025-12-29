import { useMemo, useState } from "react";
import { Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

type SkinType = "oily" | "dry" | "combo" | "normal";
type Concern = "acne" | "dryness" | "redness" | "dark_circles";
type Budget = "drugstore" | "mid" | "high";

function OptionPill({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.pill, selected && styles.pillSelected]}
    >
      <Text style={[styles.pillText, selected && styles.pillTextSelected]}>
        {label}
      </Text>
    </Pressable>
  );
}

export default function QuestionsScreen() {
  const { uri } = useLocalSearchParams<{ uri?: string }>();

  const [skinType, setSkinType] = useState<SkinType>("combo");
  const [sensitive, setSensitive] = useState<boolean>(false);
  const [concern, setConcern] = useState<Concern>("acne");
  const [budget, setBudget] = useState<Budget>("drugstore");

  const canContinue = useMemo(() => !!uri, [uri]);

  const onContinue = () => {
    if (!uri) return;

    router.push({
      pathname: "/results",
      params: {
        uri,
        skinType,
        sensitive: String(sensitive),
        concern,
        budget,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Quick questions</Text>
        <Text style={styles.subtitle}>
          This helps personalize your routine (takes ~10 seconds).
        </Text>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Skin type</Text>
          <View style={styles.rowWrap}>
            <OptionPill
              label="Oily"
              selected={skinType === "oily"}
              onPress={() => setSkinType("oily")}
            />
            <OptionPill
              label="Dry"
              selected={skinType === "dry"}
              onPress={() => setSkinType("dry")}
            />
            <OptionPill
              label="Combo"
              selected={skinType === "combo"}
              onPress={() => setSkinType("combo")}
            />
            <OptionPill
              label="Normal"
              selected={skinType === "normal"}
              onPress={() => setSkinType("normal")}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Sensitive skin?</Text>
          <View style={styles.rowWrap}>
            <OptionPill
              label="No"
              selected={!sensitive}
              onPress={() => setSensitive(false)}
            />
            <OptionPill
              label="Yes"
              selected={sensitive}
              onPress={() => setSensitive(true)}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Main concern</Text>
          <View style={styles.rowWrap}>
            <OptionPill
              label="Acne"
              selected={concern === "acne"}
              onPress={() => setConcern("acne")}
            />
            <OptionPill
              label="Dryness"
              selected={concern === "dryness"}
              onPress={() => setConcern("dryness")}
            />
            <OptionPill
              label="Redness"
              selected={concern === "redness"}
              onPress={() => setConcern("redness")}
            />
            <OptionPill
              label="Dark circles"
              selected={concern === "dark_circles"}
              onPress={() => setConcern("dark_circles")}
            />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Budget</Text>
          <View style={styles.rowWrap}>
            <OptionPill
              label="$ Drugstore"
              selected={budget === "drugstore"}
              onPress={() => setBudget("drugstore")}
            />
            <OptionPill
              label="$$ Mid"
              selected={budget === "mid"}
              onPress={() => setBudget("mid")}
            />
            <OptionPill
              label="$$$ High"
              selected={budget === "high"}
              onPress={() => setBudget("high")}
            />
          </View>
        </View>

        {!uri ? (
          <Text style={styles.warning}>
            No photo found. Go back and retake a photo.
          </Text>
        ) : null}

        <Pressable
          style={[styles.cta, !canContinue && styles.ctaDisabled]}
          onPress={onContinue}
          disabled={!canContinue}
        >
          <Text style={styles.ctaText}>Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 20, gap: 12, backgroundColor: "#fff" },

  title: { fontSize: 26, fontWeight: "800", color: "#111", marginTop: 6 },
  subtitle: { fontSize: 14, color: "#444", marginBottom: 6 },

  card: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 16,
    padding: 14,
    gap: 10,
    backgroundColor: "#fff",
  },
  sectionTitle: { fontSize: 16, fontWeight: "800", color: "#111" },

  rowWrap: { flexDirection: "row", flexWrap: "wrap", gap: 10 },

  pill: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#111",
    backgroundColor: "#fff",
  },
  pillSelected: { backgroundColor: "#111" },
  pillText: { fontSize: 14, fontWeight: "700", color: "#111" },
  pillTextSelected: { color: "#fff" },

  warning: { color: "crimson", marginTop: 6, fontWeight: "700" },

  cta: {
    marginTop: "auto",
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#111",
    alignItems: "center",
    backgroundColor: "#111",
    marginBottom: 10,
  },
  ctaDisabled: { opacity: 0.5 },
  ctaText: { fontSize: 16, fontWeight: "800", color: "#fff" },
});
