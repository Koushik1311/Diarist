drop policy "User can see their own subscription" on "public"."subscriptions";

create policy "Enable read access for all users"
on "public"."subscriptions"
as permissive
for select
to public
using (true);


create policy "Enable update access for all users"
on "public"."subscriptions"
as permissive
for update
to public
using (true);




