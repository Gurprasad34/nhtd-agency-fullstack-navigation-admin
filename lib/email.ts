import { Resend } from "resend";
export async function sendNotification(subject:string, html:string){
  const key=process.env.RESEND_API_KEY; const to=process.env.NOTIFICATION_EMAIL;
  if(!key||!to) return { skipped:true };
  const resend=new Resend(key);
  await resend.emails.send({from:process.env.EMAIL_FROM||"Agency Website <onboarding@resend.dev>",to,subject,html});
  return { skipped:false };
}
