import { MessagesSquareIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const thread = [
  { id: 1, from: "them", text: "Are we still on for tonight?" },
  { id: 2, from: "me", text: "Absolutely. I'll bring the good coffee." },
  { id: 3, from: "them", text: "Perfect, see you at eight." },
] as const;

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <div className="grid min-h-svh lg:grid-cols-[1.05fr_1fr]">
      <aside className="relative hidden flex-col justify-between overflow-hidden bg-primary p-12 text-primary-foreground lg:flex">
        <div className="flex items-center gap-2.5">
          <span className="flex size-9 items-center justify-center rounded-2xl bg-primary-foreground/10 ring-1 ring-primary-foreground/15">
            <MessagesSquareIcon className="size-4.5" strokeWidth={2} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            Lara Messenger
          </span>
        </div>

        <div className="flex max-w-sm flex-col gap-3">
          {thread.map((message, index) => (
            <div
              key={message.id}
              className={cn(
                "flex animate-in fade-in slide-in-from-bottom-2 fill-mode-both duration-500 ease-out",
                message.from === "me" ? "justify-end" : "justify-start",
              )}
              style={{ animationDelay: `${120 + index * 120}ms` }}
            >
              <p
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
                  message.from === "me"
                    ? "rounded-br-md bg-primary-foreground text-primary"
                    : "rounded-bl-md bg-primary-foreground/10 text-primary-foreground",
                )}
              >
                {message.text}
              </p>
            </div>
          ))}

          <div
            className="flex animate-in fade-in slide-in-from-bottom-2 fill-mode-both justify-start duration-500 ease-out"
            style={{ animationDelay: "480ms" }}
          >
            <div className="flex items-center gap-1 rounded-2xl rounded-bl-md bg-primary-foreground/10 px-4 py-3.5">
              <span className="size-1.5 animate-pulse rounded-full bg-primary-foreground/70" />
              <span className="size-1.5 animate-pulse rounded-full bg-primary-foreground/70 [animation-delay:200ms]" />
              <span className="size-1.5 animate-pulse rounded-full bg-primary-foreground/70 [animation-delay:400ms]" />
            </div>
          </div>
        </div>

        <p className="flex items-center gap-2.5 text-sm text-primary-foreground/70">
          <span className="size-2 rounded-full bg-primary-foreground ring-4 ring-primary-foreground/15" />
          Messages arrive the moment they&rsquo;re sent.
        </p>
      </aside>

      <main className="flex flex-col justify-center px-6 py-12 sm:px-10 lg:px-16">
        <div className="mx-auto flex w-full max-w-sm flex-col">
          <div className="mb-10 flex items-center gap-2.5 lg:hidden">
            <span className="flex size-9 items-center justify-center rounded-2xl bg-primary/10 text-primary ring-1 ring-primary/15">
              <MessagesSquareIcon className="size-4.5" strokeWidth={2} />
            </span>
            <span className="font-display text-lg font-semibold tracking-tight">
              Lara Messenger
            </span>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700 ease-out">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
