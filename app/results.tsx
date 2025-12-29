import { Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { getRecommendations } from "../lib/recommendations";

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
    
const skinType = (params.skinType ?? "combo") as any;
const concern = (params.concern ?? "acne") as any;
const budget = (params.budget ?? "drugstore") as any;

const rec = getRecommendations({
  skinType,
  sensitive: params.sensitive === "true",
  concern,
  budget,
});


  return (
    <SafeAreaView style={styles.safe}>
<ScrollView contentContainerStyle={styles.container}>

       <Text style={styles.title}>Your personalized routine ✨</Text>

       <Text style={styles.subtitle}>{rec.headline}</Text>
<Text style={{ fontSize: 12, color: "#666" }}>
  Based on your photo and answers. Always patch test new products.
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
              
        <View style={styles.card}>
  <Text style={styles.sectionHeader}>AM routine</Text>
  {rec.routineAM.map((s, idx) => (
    <Text key={`am-${idx}`} style={styles.bullet}>
      • <Text style={styles.label}>{s.step}:</Text> {s.why}
    </Text>
  ))}
</View>

<View style={styles.card}>
  <Text style={styles.sectionHeader}>PM routine</Text>
  {rec.routinePM.map((s, idx) => (
    <Text key={`pm-${idx}`} style={styles.bullet}>
      • <Text style={styles.label}>{s.step}:</Text> {s.why}
    </Text>
  ))}
</View>

<View style={styles.card}>
  <Text style={styles.sectionHeader}>Ingredients to look for</Text>
  <Text style={styles.bullet}>{rec.ingredientsToLookFor.map(i => `• ${i}`).join("\n")}</Text>
</View>

{rec.ingredientsToAvoid.length ? (
  <View style={styles.card}>
    <Text style={styles.sectionHeader}>Ingredients to avoid</Text>
    <Text style={styles.bullet}>{rec.ingredientsToAvoid.map(i => `• ${i}`).join("\n")}</Text>
  </View>
) : null}

<View style={styles.card}>
  <Text style={styles.sectionHeader}>Product ideas</Text>
  {rec.productIdeas.map((p, idx) => (
    <Text key={`p-${idx}`} style={styles.bullet}>
      • <Text style={styles.label}>{p.category}:</Text> {p.name} — {p.note}
    </Text>
  ))}
</View>


        <Pressable style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Back</Text>
              </Pressable>
              
              <Pressable
  style={[styles.button, { backgroundColor: "#fff" }]}
  onPress={() => alert("Saved! (Coming soon)")}
>
  <Text style={[styles.buttonText, { color: "#111" }]}>
    Save this routine
  </Text>
</Pressable>

</ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#fff" },
  container: { padding: 20, gap: 12, backgroundColor: "#fff" },

  title: { fontSize: 26, fontWeight: "800", color: "#111", marginTop: 6 },
  subtitle: { fontSize: 14, color: "#444" },
  text: { fontSize: 16, color: "#444" },

 previewBox: {
  height: 260,
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
  
    sectionHeader: { fontSize: 16, fontWeight: "900", color: "#111", marginBottom: 6 },
bullet: { fontSize: 14, color: "#111", lineHeight: 20 },

});
