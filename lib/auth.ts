import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "agency_admin";
function secret(){ const s=process.env.SESSION_SECRET; if(!s) throw new Error("SESSION_SECRET is not configured"); return s; }
function sign(payload:string){ return createHmac("sha256",secret()).update(payload).digest("hex"); }
export function createSessionValue(email:string){ const exp=Date.now()+1000*60*60*8; const payload=Buffer.from(JSON.stringify({email,exp})).toString("base64url"); return `${payload}.${sign(payload)}`; }
export function verifySessionValue(value?:string){ if(!value) return false; const [payload,sig]=value.split("."); if(!payload||!sig) return false; const expected=sign(payload); const a=Buffer.from(sig); const b=Buffer.from(expected); if(a.length!==b.length||!timingSafeEqual(a,b)) return false; try{ const data=JSON.parse(Buffer.from(payload,"base64url").toString()); return data.email===process.env.ADMIN_EMAIL && data.exp>Date.now(); }catch{return false;} }
export async function isAdmin(){ const store=await cookies(); return verifySessionValue(store.get(COOKIE_NAME)?.value); }
export { COOKIE_NAME };
