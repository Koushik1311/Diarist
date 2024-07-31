set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.check_mood_limit()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  IF (SELECT COUNT(*) FROM diarry_entries_moods WHERE diary_entry_id = NEW.diary_entry_id) >=5 THEN RAISE EXCEPTION 'A diary entry can have a maximum of 5 moods.';
  END IF;
  RETURN NEW;
END;$function$
;

CREATE TRIGGER check_mood_limit_trigger BEFORE INSERT ON public.diarry_entries_moods FOR EACH ROW EXECUTE FUNCTION check_mood_limit();



