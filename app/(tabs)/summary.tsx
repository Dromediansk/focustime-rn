import { StyleSheet, FlatList, View } from "react-native";
import { theme } from "@/utils/theme";
import { useSummaryStore } from "@/store/summaryStore";
import { SummaryItem } from "@/utils/types";
import { formatTime } from "@/utils/functions";
import { IconButton, Text } from "react-native-paper";
import { AppBackground } from "@/components/AppBackground";

const Item = ({ item }: { item: SummaryItem }) => {
  return (
    <View
      key={`${item.title}-${item.timer.hours}:${item.timer.minutes}:${item.timer.seconds}`}
      style={styles.itemContainer}
    >
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemTime}>{formatTime(item.timer)}</Text>
    </View>
  );
};

export default function SummaryScreen() {
  const { summary, clearSummary } = useSummaryStore((state) => state);

  return (
    <AppBackground style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Summary</Text>
        <IconButton
          iconColor={theme.colors.primary}
          icon="delete"
          disabled={summary.length === 0}
          onPress={clearSummary}
        />
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
            `${item.title}-${item.timer.hours}:${item.timer.minutes}:${item.timer.seconds}`
          }
          style={styles.flatList}
        />
      )}
    </AppBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    paddingTop: theme.spacing.xxl,
  },
  headerContainer: {
    borderBottomWidth: 0.5,
    borderBottomColor: theme.colors?.primary,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing.lg,
  },
  header: {
    fontSize: theme.fonts.headlineLarge.fontSize,
    fontFamily: theme.fonts.play.fontFamily,
    marginBottom: theme.spacing.md,
    color: theme.colors?.primary,
    textAlign: "center",
    justifyContent: "center",
  },
  noDataContainer: {
    flex: 1,
    justifyContent: "center",
  },
  noDataText: {
    fontSize: theme.fonts.headlineSmall.fontSize,
    fontFamily: theme.fonts.play.fontFamily,
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
    fontFamily: theme.fonts.play.fontFamily,
    color: theme.colors?.onPrimaryContainer,
  },
  itemTime: {
    fontSize: theme.fonts.headlineSmall.fontSize,
    fontFamily: theme.fonts.play.fontFamily,
    color: theme.colors?.onPrimaryContainer,
  },
  flatList: {
    flex: 1,
    width: "100%",
    padding: theme.spacing.lg,
  },
});
