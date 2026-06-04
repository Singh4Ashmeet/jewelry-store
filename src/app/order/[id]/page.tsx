import { ButtonLink } from "@/components/common/button";

type Props = { params: Promise<{ id: string }> };

export default async function OrderPage({ params }: Props) {
  const { id } = await params;
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
      <p className="text-xs uppercase tracking-[0.28em] text-[#A07840]">Order confirmed</p>
      <h1 className="mt-4 font-display text-6xl">Thank you</h1>
      <p className="mt-6 text-lg leading-8 text-[#737373]">
        Your order <span className="font-medium text-[#1C1C1A]">{id}</span> has been created. Tracking will appear here after fulfilment.
      </p>
      <ButtonLink href="/new-in" className="mt-8">Continue Shopping</ButtonLink>
    </section>
  );
}
