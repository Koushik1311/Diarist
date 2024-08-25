import { Database as DB } from "./types_db";

declare global {
  type Database = DB;
  type DiaryEntryType = DB["public"]["Tables"]["diary_entries"]["Row"];
  type SubscriptionType = DB["public"]["Tables"]["subscriptions"]["Row"];
  type TimeCapsuleType = DB["public"]["Tables"]["time_capsules"]["Row"];
  type MoodType = DB["public"]["Tables"]["moods"]["Row"];
  type DiaryEntriesMoodsType =
    DB["public"]["Tables"]["diary_entries_moods"]["Row"];
  type TimeCapsulseMoodsType =
    DB["public"]["Tables"]["time_capsules_moods"]["Row"];
  type PrivateMemoryVaultType =
    DB["public"]["Tables"]["private_memory_vault"]["Row"];
  type GoalsForTomorrowType =
    DB["public"]["Tables"]["goals_for_tomorrow"]["Row"];
}
