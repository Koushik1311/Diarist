create policy "Enable delete for users based on user_id"
on "public"."diary_entries"
as permissive
for delete
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));




