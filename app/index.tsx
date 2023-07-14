import { FlatList, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import apodsJson from "../src/data/apods.json";
import ApodListItem from "../src/components/ApodListItem";
import FullScreenImage from "../src/components/FullScreenImage";
import { fetchApods } from "../src/api/apods";
import { Apod } from "../src/types";

export default function Page() {
  const [apods, setApods] = useState<Apod[]>(apodsJson);
  const [activePicture, setActivePicture] = useState(null);

  useEffect(() => {
    fetchApods().then(setApods);
  }, []);

  if (!apods) {
    return <ActivityIndicator />;
  }
  return (
    <>
      <FlatList
        data={apods}
        renderItem={({ item }) => (
          <ApodListItem
            apod={item}
            onImagePress={() => setActivePicture(item.url)}
          />
        )}
      />

      <FullScreenImage
        url={activePicture}
        onClose={() => setActivePicture(null)}
      />
    </>
  );
}
