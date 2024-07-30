create policy "Enable insert for authenticated users only"
on "public"."diarry_entries_moods"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."moods"
as permissive
for select
to authenticated
using (true);




