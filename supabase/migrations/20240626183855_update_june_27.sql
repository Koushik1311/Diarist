drop policy "Enable update for users based on user_id" on "public"."subscriptions";

drop policy "User can get their own subscription" on "public"."subscriptions";

drop policy "Enable insert for users based on user_id" on "public"."subscriptions";

alter table "public"."subscriptions" drop constraint "subscriptions_user_id_fkey";

alter table "public"."diary_entries" add column "is_locked" boolean not null default false;

alter table "public"."subscriptions" alter column "user_id" set not null;

CREATE UNIQUE INDEX subscriptions_user_id_key ON public.subscriptions USING btree (user_id);

alter table "public"."subscriptions" add constraint "public_subscriptions_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."subscriptions" validate constraint "public_subscriptions_user_id_fkey";

alter table "public"."subscriptions" add constraint "subscriptions_user_id_key" UNIQUE using index "subscriptions_user_id_key";

create policy "User can see their own subscription"
on "public"."subscriptions"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable insert for users based on user_id"
on "public"."subscriptions"
as permissive
for insert
to authenticated
with check ((( SELECT auth.uid() AS uid) = user_id));




