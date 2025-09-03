import { Canvas, Path, Skia } from "@shopify/react-native-skia";
import { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";

export default function Index() {
  const width = 300;
  const height = 100;
  const amplitude = 40;
  const frequency = 0.05;

  const [path, setPath] = useState<any>(null);

  useEffect(() => {
    // Native only: Skia.Path.Make() works immediately
    const p = Skia.Path.Make();
    p.moveTo(0, height / 2);
    for (let x = 0; x <= width; x++) {
      const y = height / 2 + amplitude * Math.sin(x * frequency);
      p.lineTo(x, y);
    }
    setPath(p);
  }, []);

  if (!path) return <Text>Loading graph...</Text>;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text>Data1: Value</Text>
      <Text>Data2: Value</Text>

      <Canvas style={{ width, height, marginVertical: 20 }}>
        <Path path={path} color="blue" style="stroke" strokeWidth={2} />
      </Canvas>

      <Button title="Record Data" onPress={() => {}} />
      <Button title="Prior Data" onPress={() => {}} />
    </View>
  );
}
