import { Database as DB } from "./types_db";

declare global {
  type Database = DB;
  type DiaryEntry = DB["public"]["Tables"]["diary_entries"]["Row"];
  type SubscriptionType = DB["public"]["Tables"]["subscriptions"]["Row"];
  type TimeCapsule = DB["public"]["Tables"]["time_capsules"]["Row"];
}
