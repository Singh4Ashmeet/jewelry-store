export function StaticPage({ title, copy }: { title: string; copy: string }) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.28em] text-[#A07840]">Aurelia Jewellery</p>
      <h1 className="mt-4 font-display text-6xl">{title}</h1>
      <p className="mt-6 text-lg leading-8 text-[#6B6B68]">{copy}</p>
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {["Premium support", "Integration ready", "Secure structure", "Luxury service"].map((item) => (
          <div key={item} className="border border-[#EAE5DF] bg-white p-6">
            <h2 className="font-display text-2xl">{item}</h2>
            <p className="mt-2 text-sm leading-6 text-[#737373]">Prepared as a production foundation with safe mocked flows.</p>
          </div>
        ))}
      </div>
    </section>
  );
}
