// Heartbeat edge function: responds 200 for uptime pings
// Includes CORS and simple JSON response

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const now = new Date().toISOString();
  console.log("[heartbeat] Ping received", { time: now, method: req.method, ua: req.headers.get("user-agent") });

  return new Response(
    JSON.stringify({ status: "ok", time: now }),
    { headers: { "Content-Type": "application/json", ...corsHeaders } },
  );
});