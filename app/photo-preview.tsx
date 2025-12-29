import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function PhotoPreviewScreen() {
  const { uri } = useLocalSearchParams<{ uri?: string }>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preview</Text>

      {uri ? (
        <Image source={{ uri }} style={styles.image} />
      ) : (
        <Text style={styles.text}>No photo received.</Text>
      )}

      <View style={styles.row}>
        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Retake</Text>
        </Pressable>

        <Pressable
          style={styles.buttonPrimary}
          onPress={() => alert("Next: Questions screen ✅")}
          disabled={!uri}
        >
          <Text style={styles.buttonTextPrimary}>Use Photo</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, gap: 14 },
  title: { fontSize: 24, fontWeight: "700", marginTop: 10 },
  text: { fontSize: 16, opacity: 0.8 },
  image: { width: "100%", height: 520, borderRadius: 16, marginTop: 10 },
  row: { flexDirection: "row", gap: 12, marginTop: "auto", paddingBottom: 10 },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
  },
  buttonText: { fontSize: 16, fontWeight: "600" },
  buttonPrimary: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
  },
  buttonTextPrimary: { fontSize: 16, fontWeight: "700" },
});
