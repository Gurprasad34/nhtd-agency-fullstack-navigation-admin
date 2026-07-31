import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendNotification } from "@/lib/email";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional().or(z.literal("")),
  service: z.string().max(100).optional().or(z.literal("")),
  message: z.string().max(3000).optional().or(z.literal(""))
});

export async function POST(req: Request) {
  try {
    const parsed = schema.safeParse(await req.json());

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          issues: parsed.error.flatten(),
        },
        { status: 400 }
      );
    }

    const row = await prisma.contactSubmission.create({
      data: parsed.data,
    });

    // Email is optional for now.
    // If it isn't configured, don't fail the request.
    try {
      await sendNotification(
        `New website contact: ${row.name}`,
        `
          <h2>New Contact Request</h2>

          <p><strong>Name:</strong> ${row.name}</p>
          <p><strong>Email:</strong> ${row.email}</p>
          <p><strong>Phone:</strong> ${row.phone || "Not provided"}</p>
          <p><strong>Service:</strong> ${row.service || "Not provided"}</p>
          <p><strong>Message:</strong> ${row.message || "No message provided"}</p>
        `
      );
    } catch (err) {
      console.log("Email not configured. Skipping notification.");
    }

    return NextResponse.json({
      message: "Thank you! Your message has been submitted.",
    });
  } catch (err) {
    console.error(err);

    return NextResponse.json(
      {
        error: "The form could not be submitted.",
      },
      { status: 500 }
    );
  }
}