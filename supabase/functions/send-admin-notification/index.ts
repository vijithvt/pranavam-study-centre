import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.50.0";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface NotificationRequest {
  type: 'student' | 'tutor';
  registration: any;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, registration }: NotificationRequest = await req.json();
    
    const adminEmail = "admin@example.com"; // Replace with actual admin email
    
    const isStudent = type === 'student';
    const subject = `New ${isStudent ? 'Student' : 'Tutor'} Registration`;
    
    let emailContent = '';
    
    if (isStudent) {
      emailContent = `
        <h2>New Student Registration</h2>
        <p><strong>Student Name:</strong> ${registration.student_name}</p>
        <p><strong>Parent Name:</strong> ${registration.parent_name}</p>
        <p><strong>Email:</strong> ${registration.email}</p>
        <p><strong>Phone:</strong> ${registration.phone}</p>
        <p><strong>Class/Grade:</strong> ${registration.class_grade}</p>
        <p><strong>Subjects:</strong> ${registration.subjects?.join(', ')}</p>
        <p><strong>Mode:</strong> ${registration.mode}</p>
        <p><strong>Location:</strong> ${registration.district}, ${registration.location}</p>
        <p><strong>Time Preference:</strong> ${registration.time_preference || 'Not specified'}</p>
        <p><strong>Special Requests:</strong> ${registration.special_requests || 'None'}</p>
        <p><strong>Registration Date:</strong> ${new Date(registration.created_at).toLocaleDateString()}</p>
      `;
    } else {
      emailContent = `
        <h2>New Tutor Registration</h2>
        <p><strong>Name:</strong> ${registration.full_name}</p>
        <p><strong>Email:</strong> ${registration.email}</p>
        <p><strong>Phone:</strong> ${registration.phone}</p>
        <p><strong>WhatsApp:</strong> ${registration.whatsapp || 'Not provided'}</p>
        <p><strong>Location:</strong> ${registration.district}, ${registration.location}</p>
        <p><strong>Subjects:</strong> ${registration.subjects?.join(', ')}</p>
        <p><strong>Classes:</strong> ${registration.classes?.join(', ')}</p>
        <p><strong>Mode:</strong> ${registration.mode}</p>
        <p><strong>Experience:</strong> ${registration.experience} years</p>
        <p><strong>Qualification:</strong> ${registration.qualification}</p>
        <p><strong>Specialization:</strong> ${registration.specialization || 'Not specified'}</p>
        <p><strong>Languages:</strong> ${registration.languages?.join(', ')}</p>
        <p><strong>Availability:</strong> ${registration.availability}</p>
        <p><strong>Registration Date:</strong> ${new Date(registration.created_at).toLocaleDateString()}</p>
      `;
    }

    const emailResponse = await resend.emails.send({
      from: "Tutor Platform <notifications@resend.dev>",
      to: [adminEmail],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          ${emailContent}
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            Please log in to the admin dashboard to review and approve this registration.
          </p>
        </div>
      `,
    });

    console.log("Admin notification sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending admin notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);