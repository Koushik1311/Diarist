revoke delete on table "public"."categories" from "anon";

revoke insert on table "public"."categories" from "anon";

revoke references on table "public"."categories" from "anon";

revoke select on table "public"."categories" from "anon";

revoke trigger on table "public"."categories" from "anon";

revoke truncate on table "public"."categories" from "anon";

revoke update on table "public"."categories" from "anon";

revoke delete on table "public"."categories" from "authenticated";

revoke insert on table "public"."categories" from "authenticated";

revoke references on table "public"."categories" from "authenticated";

revoke select on table "public"."categories" from "authenticated";

revoke trigger on table "public"."categories" from "authenticated";

revoke truncate on table "public"."categories" from "authenticated";

revoke update on table "public"."categories" from "authenticated";

revoke delete on table "public"."categories" from "service_role";

revoke insert on table "public"."categories" from "service_role";

revoke references on table "public"."categories" from "service_role";

revoke select on table "public"."categories" from "service_role";

revoke trigger on table "public"."categories" from "service_role";

revoke truncate on table "public"."categories" from "service_role";

revoke update on table "public"."categories" from "service_role";

revoke delete on table "public"."diary_entries_tags" from "anon";

revoke insert on table "public"."diary_entries_tags" from "anon";

revoke references on table "public"."diary_entries_tags" from "anon";

revoke select on table "public"."diary_entries_tags" from "anon";

revoke trigger on table "public"."diary_entries_tags" from "anon";

revoke truncate on table "public"."diary_entries_tags" from "anon";

revoke update on table "public"."diary_entries_tags" from "anon";

revoke delete on table "public"."diary_entries_tags" from "authenticated";

revoke insert on table "public"."diary_entries_tags" from "authenticated";

revoke references on table "public"."diary_entries_tags" from "authenticated";

revoke select on table "public"."diary_entries_tags" from "authenticated";

revoke trigger on table "public"."diary_entries_tags" from "authenticated";

revoke truncate on table "public"."diary_entries_tags" from "authenticated";

revoke update on table "public"."diary_entries_tags" from "authenticated";

revoke delete on table "public"."diary_entries_tags" from "service_role";

revoke insert on table "public"."diary_entries_tags" from "service_role";

revoke references on table "public"."diary_entries_tags" from "service_role";

revoke select on table "public"."diary_entries_tags" from "service_role";

revoke trigger on table "public"."diary_entries_tags" from "service_role";

revoke truncate on table "public"."diary_entries_tags" from "service_role";

revoke update on table "public"."diary_entries_tags" from "service_role";

revoke delete on table "public"."tags" from "anon";

revoke insert on table "public"."tags" from "anon";

revoke references on table "public"."tags" from "anon";

revoke select on table "public"."tags" from "anon";

revoke trigger on table "public"."tags" from "anon";

revoke truncate on table "public"."tags" from "anon";

revoke update on table "public"."tags" from "anon";

revoke delete on table "public"."tags" from "authenticated";

revoke insert on table "public"."tags" from "authenticated";

revoke references on table "public"."tags" from "authenticated";

revoke select on table "public"."tags" from "authenticated";

revoke trigger on table "public"."tags" from "authenticated";

revoke truncate on table "public"."tags" from "authenticated";

revoke update on table "public"."tags" from "authenticated";

revoke delete on table "public"."tags" from "service_role";

revoke insert on table "public"."tags" from "service_role";

revoke references on table "public"."tags" from "service_role";

revoke select on table "public"."tags" from "service_role";

revoke trigger on table "public"."tags" from "service_role";

revoke truncate on table "public"."tags" from "service_role";

revoke update on table "public"."tags" from "service_role";

alter table "public"."diary_entries" drop constraint "public_diary_entries_category_id_fkey";

alter table "public"."diary_entries_tags" drop constraint "public_diary_entries_tags_diary_entry_id_fkey";

alter table "public"."diary_entries_tags" drop constraint "public_diary_entries_tags_tag_id_fkey";

alter table "public"."categories" drop constraint "categories_pkey";

alter table "public"."diary_entries_tags" drop constraint "diary_entries_tags_pkey";

alter table "public"."tags" drop constraint "tags_pkey";

drop index if exists "public"."categories_pkey";

drop index if exists "public"."diary_entries_tags_pkey";

drop index if exists "public"."tags_pkey";

drop table "public"."categories";

drop table "public"."diary_entries_tags";

drop table "public"."tags";

alter table "public"."diary_entries" drop column "category_id";

alter table "public"."diary_entries" drop column "is_locked";



