import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";

export default function PhotoPreviewScreen() {
  const { uri } = useLocalSearchParams<{ uri?: string }>();

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.title}>Preview</Text>

        <View style={styles.previewBox}>
          {uri ? (
            <Image source={{ uri }} style={styles.image} resizeMode="cover" />
          ) : (
            <Text style={styles.text}>No photo received.</Text>
          )}
        </View>

        <View style={styles.row}>
          <Pressable style={styles.button} onPress={() => router.back()}>
            <Text style={styles.buttonText}>Retake</Text>
          </Pressable>

          <Pressable
            style={[styles.buttonPrimary, !uri && styles.buttonDisabled]}
            onPress={() => {
              if (!uri) return;
              router.push({ pathname: "/questions", params: { uri } });
            }}
            disabled={!uri}
          >
            <Text style={styles.buttonTextPrimary}>Use Photo</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { flex: 1, padding: 20, gap: 12, backgroundColor: "#fff" },

  title: { fontSize: 26, fontWeight: "800", color: "#111" },
  text: { fontSize: 16, color: "#444" },

  previewBox: {
    flex: 1,
    minHeight: 0,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    borderRadius: 16,
    overflow: "hidden",
    backgroundColor: "#F7F7F7",
  },
  image: { width: "100%", height: "100%" },

  row: { flexDirection: "row", gap: 12, paddingBottom: 10 },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#111",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  buttonPrimary: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#111",
    alignItems: "center",
    backgroundColor: "#111",
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { fontSize: 16, fontWeight: "700", color: "#111" },
  buttonTextPrimary: { fontSize: 16, fontWeight: "800", color: "#fff" },
});
