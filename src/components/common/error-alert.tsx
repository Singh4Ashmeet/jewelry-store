import { AlertTriangle } from "lucide-react";

export function ErrorAlert({ title = "Something went wrong", message }: { title?: string; message: string }) {
  return (
    <div className="flex gap-3 rounded-[6px] border border-red-200 bg-red-50 p-4 text-sm text-red-900" role="alert">
      <AlertTriangle className="mt-0.5 shrink-0" size={18} aria-hidden="true" />
      <div>
        <p className="font-semibold">{title}</p>
        <p className="mt-1">{message}</p>
      </div>
    </div>
  );
}
