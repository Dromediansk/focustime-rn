import { StyleSheet, FlatList, View } from "react-native";
import { theme } from "@/utils/theme";
import { LinearGradient } from "expo-linear-gradient";
import { useSummaryStore } from "@/store/summaryStore";
import { SummaryItem } from "@/utils/types";
import { formatTime } from "@/utils/functions";
import { Text } from "react-native-paper";
import { PressableButton } from "@/components/PressableButton";

const Item = ({ item }: { item: SummaryItem }) => {
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
  const { summary, clearSummary } = useSummaryStore((state) => state);

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
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Summary</Text>
      </View>
      {summary.length === 0 ? (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>
            No items found. {"\n"}
            Keep pushing forward, your efforts will pay off.
          </Text>
        </View>
      ) : (
        <FlatList
          data={summary}
          renderItem={({ item }) => <Item item={item} />}
          keyExtractor={(item) =>
            `${item.title}-${item.time.hours}:${item.time.minutes}:${item.time.seconds}`
          }
          style={styles.flatList}
        />
      )}

      <View style={styles.clearButtonContainer}>
        <PressableButton
          buttonStyle={styles.clearButton}
          buttonPressedStyle={styles.clearButtonPressed}
          disabled={summary.length === 0}
          onPress={clearSummary}
        >
          CLEAR
        </PressableButton>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: theme.spacing.xxl,
  },
  headerContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors?.onPrimaryContainer,
    width: "100%",
  },
  header: {
    fontSize: theme.fonts.headlineMedium.fontSize,
    marginBottom: theme.spacing.md,
    color: theme.colors?.onPrimaryContainer,
    textAlign: "center",
    justifyContent: "center",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
  },
  noDataText: {
    fontSize: theme.fonts.headlineSmall.fontSize,
    color: theme.colors?.onSecondaryContainer,
    textAlign: "center",
    marginHorizontal: theme.spacing.lg,
  },
  itemContainer: {
    flexDirection: "row",
    marginBottom: theme.spacing.lg,
    justifyContent: "space-between",
  },
  itemTitle: {
    fontSize: theme.fonts.headlineSmall.fontSize,
    color: theme.colors?.onPrimaryContainer,
  },
  itemTime: {
    fontSize: theme.fonts.headlineSmall.fontSize,
    color: theme.colors?.onPrimaryContainer,
  },
  flatList: {
    flex: 1,
    width: "100%",
    padding: theme.spacing.lg,
  },
  clearButtonContainer: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
  clearButton: {
    backgroundColor: theme.colors.secondaryContainer,
    color: theme.colors.onSecondaryContainer,
  },
  clearButtonPressed: {
    backgroundColor: theme.colors.secondary,
  },
});
