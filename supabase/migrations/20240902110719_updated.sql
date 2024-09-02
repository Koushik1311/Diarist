drop policy "Enable delete for users based on user_id" on "public"."private_memory_vault";

drop policy "Enable insert for users based on user_id" on "public"."private_memory_vault";

drop policy "Enable read access for users based on user_id" on "public"."private_memory_vault";

drop policy "Enable update for users based on user_id" on "public"."private_memory_vault";

drop policy "Enable insert for users based on user_id" on "public"."subscriptions";

drop policy "Enable read access for users based on user_id" on "public"."subscriptions";

drop policy "Enable update for users based on user_id" on "public"."subscriptions";

drop policy "Enable insert for authenticated users only" on "public"."user_passkeys";

drop policy "Enable read access for authenticated users only" on "public"."user_passkeys";

drop policy "Enable update for users based on user id" on "public"."user_passkeys";

revoke delete on table "public"."private_memory_vault" from "anon";

revoke insert on table "public"."private_memory_vault" from "anon";

revoke references on table "public"."private_memory_vault" from "anon";

revoke select on table "public"."private_memory_vault" from "anon";

revoke trigger on table "public"."private_memory_vault" from "anon";

revoke truncate on table "public"."private_memory_vault" from "anon";

revoke update on table "public"."private_memory_vault" from "anon";

revoke delete on table "public"."private_memory_vault" from "authenticated";

revoke insert on table "public"."private_memory_vault" from "authenticated";

revoke references on table "public"."private_memory_vault" from "authenticated";

revoke select on table "public"."private_memory_vault" from "authenticated";

revoke trigger on table "public"."private_memory_vault" from "authenticated";

revoke truncate on table "public"."private_memory_vault" from "authenticated";

revoke update on table "public"."private_memory_vault" from "authenticated";

revoke delete on table "public"."private_memory_vault" from "service_role";

revoke insert on table "public"."private_memory_vault" from "service_role";

revoke references on table "public"."private_memory_vault" from "service_role";

revoke select on table "public"."private_memory_vault" from "service_role";

revoke trigger on table "public"."private_memory_vault" from "service_role";

revoke truncate on table "public"."private_memory_vault" from "service_role";

revoke update on table "public"."private_memory_vault" from "service_role";

revoke delete on table "public"."user_passkeys" from "anon";

revoke insert on table "public"."user_passkeys" from "anon";

revoke references on table "public"."user_passkeys" from "anon";

revoke select on table "public"."user_passkeys" from "anon";

revoke trigger on table "public"."user_passkeys" from "anon";

revoke truncate on table "public"."user_passkeys" from "anon";

revoke update on table "public"."user_passkeys" from "anon";

revoke delete on table "public"."user_passkeys" from "authenticated";

revoke insert on table "public"."user_passkeys" from "authenticated";

revoke references on table "public"."user_passkeys" from "authenticated";

revoke select on table "public"."user_passkeys" from "authenticated";

revoke trigger on table "public"."user_passkeys" from "authenticated";

revoke truncate on table "public"."user_passkeys" from "authenticated";

revoke update on table "public"."user_passkeys" from "authenticated";

revoke delete on table "public"."user_passkeys" from "service_role";

revoke insert on table "public"."user_passkeys" from "service_role";

revoke references on table "public"."user_passkeys" from "service_role";

revoke select on table "public"."user_passkeys" from "service_role";

revoke trigger on table "public"."user_passkeys" from "service_role";

revoke truncate on table "public"."user_passkeys" from "service_role";

revoke update on table "public"."user_passkeys" from "service_role";

alter table "public"."private_memory_vault" drop constraint "private_memory_vault_user_id_fkey";

alter table "public"."user_passkeys" drop constraint "user_passkeys_user_id_fkey";

alter table "public"."user_passkeys" drop constraint "user_passkeys_user_id_key";

alter table "public"."private_memory_vault" drop constraint "private_memory_vault_pkey";

alter table "public"."user_passkeys" drop constraint "user_passkeys_pkey";

drop index if exists "public"."private_memory_vault_pkey";

drop index if exists "public"."user_passkeys_pkey";

drop index if exists "public"."user_passkeys_user_id_key";

drop table "public"."private_memory_vault";

drop table "public"."user_passkeys";

alter table "public"."diary_entries" alter column "content" set default ''::text;

alter table "public"."diary_entries" alter column "content" set not null;

alter table "public"."diary_entries" alter column "title" set default ''::character varying;

alter table "public"."diary_entries" alter column "title" set not null;

alter table "public"."subscriptions" drop column "vault_entry_limit";

create policy "Enable insert for authenticated users only"
on "public"."subscriptions"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."subscriptions"
as permissive
for select
to public
using (true);


create policy "Enable update for users with user_id"
on "public"."subscriptions"
as permissive
for update
to public
using (true)
with check (true);




