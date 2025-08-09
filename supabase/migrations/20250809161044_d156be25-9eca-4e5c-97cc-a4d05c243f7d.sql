-- Enable required extensions for scheduling HTTP calls
create extension if not exists pg_net with schema extensions;
create extension if not exists pg_cron with schema extensions;

-- Unschedule existing job if present to make this idempotent
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM cron.job WHERE jobname = 'weekly-heartbeat') THEN
    PERFORM cron.unschedule('weekly-heartbeat');
  END IF;
END;
$$;

-- Schedule weekly heartbeat (Mondays at 03:00 UTC)
select
  cron.schedule(
    'weekly-heartbeat',
    '0 3 * * 1',
    $$
    select
      net.http_post(
        url := 'https://pucrkdrmvjzzbatxpfqz.supabase.co/functions/v1/heartbeat',
        headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1Y3JrZHJtdmp6emJhdHhwZnF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk2NjM3MDAsImV4cCI6MjA2NTIzOTcwMH0.M53LUU2sdi9XIFO2fUplPh5NgSHyRyDPAHzIxkje6cM"}'::jsonb,
        body := jsonb_build_object('time', now(), 'source', 'pg_cron')
      ) as request_id;
    $$
  );