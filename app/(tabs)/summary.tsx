import { StyleSheet, FlatList, View } from "react-native";
import { theme } from "@/utils/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useSummaryStore } from "@/store/summaryStore";
import { SummaryItem } from "@/utils/types";
import { FC } from "react";
import { formatTime } from "@/utils/functions";
import { Text } from "react-native-paper";

type ItemProps = {
  item: SummaryItem;
};

const Item: FC<ItemProps> = ({ item }) => {
  return (
    <View
      key={`${item.title}-${item.time.hours}:${item.time.minutes}:${item.time.seconds}`}
      style={styles.itemContainer}
    >
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemTime}>{formatTime(item.time)}</Text>
    </View>
  );
};

export default function SummaryScreen() {
  const summary = useSummaryStore((state) => state.summary);

  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={[
        theme.colors?.onTertiary,
        theme.colors?.onSecondary,
        theme.colors?.onPrimary,
      ]}
      style={styles.container}
    >
      <Text style={styles.header}>Your focus today:</Text>
      <FlatList
        data={summary}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) =>
          `${item.title}-${item.time.hours}:${item.time.minutes}:${item.time.seconds}`
        }
        style={styles.flatList}
      />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 50,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 32,
    color: theme.colors?.tertiary,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  itemTitle: {
    fontSize: 32,
  },
  itemTime: {
    fontSize: 32,
  },
  flatList: {
    flex: 1,
  },
});
