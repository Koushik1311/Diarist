create type "public"."security_questions" as enum ('Who was your first crush?', 'What was your first concert or event?', 'What was your most unusual job?', 'What was the first foreign country you visited?', 'What was your childhood dream job?', 'What was your first big purchase?', 'What was the first video game you played?', 'Describe your childhood in one word.', 'What was your favorite childhood toy?', 'What was your first movie in a theater?', 'Who was your first favorite band?', 'What was the first meal you cooked?', 'Where was your favorite hiding spot as a child?');

drop function if exists "public"."check_mood_limit"();

create table "public"."user_passkeys" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "updated_at" timestamp with time zone not null default now(),
    "passkey_hash" text not null default ''::text,
    "security_question" security_questions not null,
    "security_answer_hash" text not null default ''::text,
    "user_id" uuid not null
);


alter table "public"."user_passkeys" enable row level security;

alter table "public"."private_memory_vault" drop column "encrypted_key";

CREATE UNIQUE INDEX user_passkeys_pkey ON public.user_passkeys USING btree (id);

CREATE UNIQUE INDEX user_passkeys_user_id_key ON public.user_passkeys USING btree (user_id);

alter table "public"."user_passkeys" add constraint "user_passkeys_pkey" PRIMARY KEY using index "user_passkeys_pkey";

alter table "public"."user_passkeys" add constraint "user_passkeys_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."user_passkeys" validate constraint "user_passkeys_user_id_fkey";

alter table "public"."user_passkeys" add constraint "user_passkeys_user_id_key" UNIQUE using index "user_passkeys_user_id_key";

grant delete on table "public"."user_passkeys" to "anon";

grant insert on table "public"."user_passkeys" to "anon";

grant references on table "public"."user_passkeys" to "anon";

grant select on table "public"."user_passkeys" to "anon";

grant trigger on table "public"."user_passkeys" to "anon";

grant truncate on table "public"."user_passkeys" to "anon";

grant update on table "public"."user_passkeys" to "anon";

grant delete on table "public"."user_passkeys" to "authenticated";

grant insert on table "public"."user_passkeys" to "authenticated";

grant references on table "public"."user_passkeys" to "authenticated";

grant select on table "public"."user_passkeys" to "authenticated";

grant trigger on table "public"."user_passkeys" to "authenticated";

grant truncate on table "public"."user_passkeys" to "authenticated";

grant update on table "public"."user_passkeys" to "authenticated";

grant delete on table "public"."user_passkeys" to "service_role";

grant insert on table "public"."user_passkeys" to "service_role";

grant references on table "public"."user_passkeys" to "service_role";

grant select on table "public"."user_passkeys" to "service_role";

grant trigger on table "public"."user_passkeys" to "service_role";

grant truncate on table "public"."user_passkeys" to "service_role";

grant update on table "public"."user_passkeys" to "service_role";

create policy "Enable insert for authenticated users only"
on "public"."user_passkeys"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for authenticated users only"
on "public"."user_passkeys"
as permissive
for select
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id));


create policy "Enable update for users based on user id"
on "public"."user_passkeys"
as permissive
for update
to authenticated
using ((( SELECT auth.uid() AS uid) = user_id))
with check ((( SELECT auth.uid() AS uid) = user_id));




