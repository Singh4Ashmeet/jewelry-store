export default function Loading() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="h-6 w-32 animate-pulse rounded bg-[#EAE5DF]" />
      <div className="mt-4 h-16 w-full max-w-xl animate-pulse rounded bg-[#EAE5DF]" />
      <div className="mt-8 h-40 animate-pulse rounded-[8px] bg-[#F5F1EB]" />
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="rounded-[8px]">
            <div className="aspect-[1.08/1] animate-pulse rounded-[8px] bg-[#F5F1EB]" />
            <div className="mt-4 h-4 w-3/4 animate-pulse rounded bg-[#EAE5DF]" />
            <div className="mt-3 h-4 w-1/2 animate-pulse rounded bg-[#EAE5DF]" />
          </div>
        ))}
      </div>
    </section>
  );
}
