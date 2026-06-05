import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { pageSearchParams } from '@/lib/filterUtils';

function hrefFor(pathname: string, searchParams: Record<string, string | string[] | undefined>, page: number) {
  const params = new URLSearchParams();
  Object.entries(searchParams).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => params.append(key, item));
    } else if (value) {
      params.set(key, value);
    }
  });
  const next = pageSearchParams(params, page).toString();
  return next ? `${pathname}?${next}` : pathname;
}

export function ProductPagination({
  pathname,
  searchParams,
  page,
  totalPages,
}: {
  pathname: string;
  searchParams: Record<string, string | string[] | undefined>;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1).filter((item) => {
    return item === 1 || item === totalPages || Math.abs(item - page) <= 1;
  });

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Product pagination">
      <Link
        aria-disabled={page <= 1}
        className={`inline-flex h-10 items-center gap-2 border border-[#EAE5DF] px-4 text-xs font-semibold tracking-[0.14em] uppercase ${
          page <= 1 ? 'pointer-events-none text-[#A8A29A]' : 'text-[#1C1C1A] hover:border-[#B58E62]'
        }`}
        href={hrefFor(pathname, searchParams, Math.max(1, page - 1))}
      >
        <ChevronLeft size={16} aria-hidden="true" />
        Previous
      </Link>
      {pages.map((item, index) => {
        const previous = pages[index - 1];
        return (
          <span key={item} className="inline-flex items-center gap-2">
            {previous && item - previous > 1 && <span className="px-1 text-sm text-[#6B6B68]">...</span>}
            <Link
              aria-current={item === page ? 'page' : undefined}
              className={`flex h-10 min-w-10 items-center justify-center border px-3 text-sm ${
                item === page
                  ? 'border-[#1C1C1A] bg-[#1C1C1A] text-white'
                  : 'border-[#EAE5DF] text-[#1C1C1A] hover:border-[#B58E62]'
              }`}
              href={hrefFor(pathname, searchParams, item)}
            >
              {item}
            </Link>
          </span>
        );
      })}
      <Link
        aria-disabled={page >= totalPages}
        className={`inline-flex h-10 items-center gap-2 border border-[#EAE5DF] px-4 text-xs font-semibold tracking-[0.14em] uppercase ${
          page >= totalPages ? 'pointer-events-none text-[#A8A29A]' : 'text-[#1C1C1A] hover:border-[#B58E62]'
        }`}
        href={hrefFor(pathname, searchParams, Math.min(totalPages, page + 1))}
      >
        Next
        <ChevronRight size={16} aria-hidden="true" />
      </Link>
    </nav>
  );
}
