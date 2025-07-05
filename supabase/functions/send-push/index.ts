import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { title, message, segment = "All" } = await req.json();

    console.log("Sending push notification:", { title, message, segment });

    const headers = {
      "Content-Type": "application/json; charset=utf-8",
      "Authorization": `Basic ${Deno.env.get('ONESIGNAL_REST_API_KEY')}`
    };

    const body = {
      app_id: Deno.env.get('ONESIGNAL_APP_ID'),
      included_segments: [segment],
      headings: { ar: title, en: title },
      contents: { ar: message, en: message },
      android_sound: "mixkit-correct-answer-tone-2870",
      ios_sound: "mixkit-correct-answer-tone-2870.mp3",
      web_buttons: [
        {
          id: "view-website",
          text: "عرض الموقع",
          url: "https://1adebf2e-0306-4e6c-8dfe-816ef5561330.lovableproject.com"
        }
      ]
    };

    const response = await fetch("https://onesignal.com/api/v1/notifications", {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    });

    const result = await response.json();
    
    console.log("OneSignal response:", result);

    return new Response(JSON.stringify({
      success: true,
      data: result
    }), { 
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error("Error sending push notification:", error);
    
    return new Response(JSON.stringify({
      success: false,
      error: error.message
    }), { 
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});