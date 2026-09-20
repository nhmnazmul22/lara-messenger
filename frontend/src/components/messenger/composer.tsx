import { PaperclipIcon, SendIcon, SmileIcon } from "lucide-react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group";

export function Composer() {
  return (
    <div className="shrink-0 border-t p-3 sm:p-4">
      <InputGroup className="min-h-12">
        <InputGroupTextarea
          rows={1}
          placeholder="Type a message"
          className="min-h-10 self-center"
          aria-label="Type a message"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            variant="ghost"
            size="icon-sm"
            className="rounded-2xl text-muted-foreground"
            aria-label="Add an emoji"
          >
            <SmileIcon />
          </InputGroupButton>
          <InputGroupButton
            variant="ghost"
            size="icon-sm"
            className="rounded-2xl text-muted-foreground"
            aria-label="Attach a file"
          >
            <PaperclipIcon />
          </InputGroupButton>
          <InputGroupButton
            variant="default"
            size="icon-sm"
            className="rounded-2xl"
            aria-label="Send message"
          >
            <SendIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
}