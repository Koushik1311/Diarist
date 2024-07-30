alter table "public"."diarry_entries_moods" drop constraint "public_diarry_entries_moods_diary_entry_id_fkey";

alter table "public"."diarry_entries_moods" drop constraint "public_diarry_entries_moods_mood_id_fkey";

CREATE UNIQUE INDEX unique_diary_entry_mood ON public.diarry_entries_moods USING btree (diary_entry_id, mood_id);

alter table "public"."diarry_entries_moods" add constraint "diarry_entries_moods_diary_entry_id_fkey" FOREIGN KEY (diary_entry_id) REFERENCES diary_entries(id) ON DELETE CASCADE not valid;

alter table "public"."diarry_entries_moods" validate constraint "diarry_entries_moods_diary_entry_id_fkey";

alter table "public"."diarry_entries_moods" add constraint "diarry_entries_moods_mood_id_fkey" FOREIGN KEY (mood_id) REFERENCES moods(id) ON DELETE CASCADE not valid;

alter table "public"."diarry_entries_moods" validate constraint "diarry_entries_moods_mood_id_fkey";

alter table "public"."diarry_entries_moods" add constraint "unique_diary_entry_mood" UNIQUE using index "unique_diary_entry_mood";

create policy "Enable delete for authenticated users only"
on "public"."diarry_entries_moods"
as permissive
for delete
to authenticated
using (true);


create policy "Enable read access authenticated users"
on "public"."diarry_entries_moods"
as permissive
for select
to authenticated
using (true);




