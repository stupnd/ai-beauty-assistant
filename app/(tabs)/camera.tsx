import { useEffect, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";


export default function CameraScreen() {
  const cameraRef = useRef<CameraView>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  if (!permission) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Checking camera permissions…</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.text}>Camera permission is required.</Text>
        <Pressable style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Allow Camera</Text>
        </Pressable>
      </View>
    );
  }

  const takePhoto = async () => {
    // CameraView exposes takePictureAsync via ref in the new API
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const cam: any = cameraRef.current;
    if (!cam) return;

    try {
      const photo = await cam.takePictureAsync({
        quality: 0.8,
        skipProcessing: true,
      });

      // For now, just log the URI (next step we’ll navigate to a preview screen)
      if (photo?.uri) {
  router.push({ pathname: "/photo-preview", params: { uri: photo.uri } });
}

    } catch (e) {
      console.error(e);
      alert("Could not take photo.");
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="front"
        onCameraReady={() => setIsReady(true)}
      />

      <View style={styles.overlay}>
        <Text style={styles.title}>Take a selfie</Text>
        <Text style={styles.subtitle}>Good lighting • No heavy filters</Text>

        <Pressable
          style={[styles.captureBtn, !isReady && styles.captureBtnDisabled]}
          onPress={takePhoto}
          disabled={!isReady}
        >
          <Text style={styles.captureText}>
            {isReady ? "Capture" : "Loading…"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  camera: { flex: 1 },
  overlay: {
    position: "absolute",
    bottom: 40,
    left: 20,
    right: 20,
    gap: 10,
  },
  title: { fontSize: 24, fontWeight: "700" },
  subtitle: { fontSize: 14, opacity: 0.8 },
  captureBtn: {
    alignSelf: "center",
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 999,
    borderWidth: 1,
  },
  captureBtnDisabled: { opacity: 0.5 },
  captureText: { fontSize: 16, fontWeight: "600" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: 20 },
  text: { fontSize: 16, textAlign: "center", marginBottom: 12 },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 10,
    borderWidth: 1,
  },
  buttonText: { fontSize: 16, fontWeight: "600" },
});
