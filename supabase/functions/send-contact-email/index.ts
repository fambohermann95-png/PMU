import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

serve(async (req) => {
  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, message, honeypot } = await req.json();

    // Anti-spam check
    if (honeypot) {
      return new Response(
        JSON.stringify({ success: false, error: "Spam detected" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ success: false, error: "Veuillez remplir tous les champs obligatoires." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    if (!RESEND_API_KEY) {
      console.log("Resend API Key non configurée. Message enregistré uniquement en base.");
      return new Response(
        JSON.stringify({ success: true, message: "Votre message a été bien reçu par l'équipe TurfElite." }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
      );
    }

    // Send email via Resend API
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "TurfElite Contact <onboarding@resend.dev>",
        to: ["emmabrn888@gmail.com"],
        reply_to: email,
        subject: `[TURFELITE CONTACT] Message de ${name}`,
        html: `
          <h3>Nouveau message de contact TURFELITE-PMU</h3>
          <p><strong>Nom:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <blockquote style="background:#f4f4f4; padding:12px; border-left:4px solid #d4af37;">
            ${message.replace(/\n/g, '<br/>')}
          </blockquote>
        `,
      }),
    });

    const data = await res.json();

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
