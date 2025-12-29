import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function ResultsScreen() {
  const params = useLocalSearchParams<{
    uri?: string;
    skinType?: string;
    sensitive?: string;
    concern?: string;
    budget?: string;
  }>();

  const uri = params.uri;
  const sensitive =
    params.sensitive === "true" || params.sensitive === "1" ? "Yes" : "No";

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Your results ✨</Text>
        <Text style={styles.subtitle}>
          MVP results for now — next we’ll generate a routine + products.
        </Text>

        <View style={styles.previewBox}>
          {uri ? (
            <Image source={{ uri }} style={styles.image} resizeMode="cover" />
          ) : (
            <Text style={styles.text}>No photo received.</Text>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.row}>
            <Text style={styles.label}>Skin type: </Text>
            {params.skinType ?? "-"}
          </Text>
          <Text style={styles.row}>
            <Text style={styles.label}>Sensitive: </Text>
            {params.sensitive ? sensitive : "-"}
          </Text>
          <Text style={styles.row}>
            <Text style={styles.label}>Concern: </Text>
            {params.concern ?? "-"}
          </Text>
          <Text style={styles.row}>
            <Text style={styles.label}>Budget: </Text>
            {params.budget ?? "-"}
          </Text>
        </View>

        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Back</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 20, gap: 12, backgroundColor: "#fff" },

  title: { fontSize: 26, fontWeight: "800", color: "#111", marginTop: 6 },
  subtitle: { fontSize: 14, color: "#444" },
  text: { fontSize: 16, color: "#444" },

  previewBox: {
    flex: 1,
    minHeight: 0,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#F7F7F7",
    marginTop: 6,
  },
  image: { width: "100%", height: "100%" },

  card: {
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 16,
    padding: 14,
    gap: 8,
    backgroundColor: "#fff",
  },
  row: { fontSize: 16, color: "#111" },
  label: { fontWeight: "800", color: "#111" },

  button: {
    marginTop: 8,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#111",
    alignItems: "center",
    backgroundColor: "#111",
    marginBottom: 10,
  },
  buttonText: { fontSize: 16, fontWeight: "800", color: "#fff" },
});
