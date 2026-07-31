import { ArrowLeft, BriefcaseBusiness, LogOut, Mail, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { isAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import LoginForm from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function Page() {
  if (!(await isAdmin())) {
    return (
      <main className="min-h-screen bg-cream px-5 py-12 sm:py-20">
        <div className="mx-auto mb-6 max-w-md">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-navy transition hover:text-blue"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to website
          </Link>
        </div>
        <LoginForm />
      </main>
    );
  }

  const [contacts, jobs] = await Promise.all([
    prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.jobApplication.findMany({ orderBy: { createdAt: "desc" } }),
  ]);

  return (
    <main className="min-h-screen bg-slate-50 pb-14">
      <header className="border-b border-slate-200 bg-white">
        <div className="container-site flex flex-col gap-5 py-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-blue/10 text-blue">
              <ShieldCheck className="h-6 w-6" aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-blue">Independent Pathways</p>
              <h1 className="text-2xl font-bold text-navy">Admin Dashboard</h1>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link href="/" className="btn-secondary inline-flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Website
            </Link>
            <form action="/api/admin/logout" method="post">
              <button className="btn-primary inline-flex items-center gap-2" type="submit">
                <LogOut className="h-4 w-4" aria-hidden="true" />
                Log Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <div className="container-site py-10">
        <div className="mb-8">
          <p className="eyebrow">Private workspace</p>
          <h2 className="mt-2 text-3xl font-bold text-navy">Welcome back</h2>
          <p className="mt-2 text-slate-600">
            Review new contact requests and job applications from the website.
          </p>
        </div>

        <section className="mb-8 grid gap-5 sm:grid-cols-2">
          <div className="card flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">Contact Requests</p>
              <p className="mt-2 text-4xl font-bold text-navy">{contacts.length}</p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-blue/10 text-blue">
              <Mail className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>

          <div className="card flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-500">Job Applications</p>
              <p className="mt-2 text-4xl font-bold text-navy">{jobs.length}</p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-green/10 text-green">
              <BriefcaseBusiness className="h-6 w-6" aria-hidden="true" />
            </div>
          </div>
        </section>

        <section className="card overflow-x-auto">
          <h2 className="mb-5 text-2xl font-bold text-navy">
            Contact Requests ({contacts.length})
          </h2>
          <table className="admin-table w-full min-w-[850px]">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Service</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-500">
                    No contact requests yet.
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact.id}>
                    <td>{contact.createdAt.toLocaleString()}</td>
                    <td>{contact.name}</td>
                    <td>
                      {contact.email}
                      <br />
                      {contact.phone}
                    </td>
                    <td>{contact.service}</td>
                    <td className="max-w-md">{contact.message}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>

        <section className="card mt-8 overflow-x-auto">
          <h2 className="mb-5 text-2xl font-bold text-navy">
            Job Applications ({jobs.length})
          </h2>
          <table className="admin-table w-full min-w-[900px]">
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Position</th>
                <th>Experience</th>
                <th>Resume</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-10 text-center text-slate-500">
                    No job applications yet.
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.createdAt.toLocaleString()}</td>
                    <td>
                      {job.name}
                      <br />
                      {job.email}
                      <br />
                      {job.phone}
                    </td>
                    <td>{job.position}</td>
                    <td className="max-w-md">{job.experience}</td>
                    <td>
                      <a
                        className="font-semibold text-blue hover:underline"
                        href={`/api/admin/resumes/${job.id}`}
                      >
                        Download
                      </a>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
