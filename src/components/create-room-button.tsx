"use client";

import { useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FORMS_ID } from "@/lib/constants";
import { CreateRoomForm } from "./create-room-form";

export function CreateARoomButton() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className={buttonVariants({ variant: "default" })}>
        Create a Room
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a Room</DialogTitle>
          <CreateRoomForm open={open} />
        </DialogHeader>
        <DialogFooter className="border-t py-2">
          <Button type="submit" form={FORMS_ID.CREATE_ROOM_FORM}>
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
