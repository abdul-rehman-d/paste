import { useForm } from "@tanstack/react-form";
import { useEffect } from "react";
import * as z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { FORMS_ID } from "@/lib/constants";

const RoomSchema = z.object({
  roomName: z.string().min(1, "Room name is required"),
  pin: z
    .string()
    .length(4, "Pin must be 4 characters")
    .regex(/^[0-9]+$/, "Pin must be numeric"),
});

export function CreateRoomForm({ open }: { open: boolean }) {
  const form = useForm({
    defaultValues: {
      roomName: "",
      pin: "",
    },
    validators: {
      onSubmit: RoomSchema,
    },
    onSubmit: async ({ value }) => {
      alert(`Room '${value.roomName}' created with pin ${value.pin}`);
    },
  });

  useEffect(() => {
    if (open) {
      form.reset();
    }
  }, [open, form]);

  return (
    <form
      id={FORMS_ID.CREATE_ROOM_FORM}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="mt-2 flex w-full flex-col gap-3 sm:w-3/4"
    >
      <FieldGroup>
        <form.Field
          name="roomName"
          // biome-ignore lint/correctness/noChildrenProp: false-positive
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Room Name</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Enter room name"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>

      <FieldGroup>
        <form.Field
          name="pin"
          // biome-ignore lint/correctness/noChildrenProp: false-positive
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Pin</FieldLabel>
                <div className="flex flex-col gap-2">
                  <InputOTP
                    maxLength={4}
                    value={field.state.value}
                    onChange={(val: string) => field.handleChange(val)}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                  </InputOTP>
                  {/* Hidden input so the label and external form submit work */}
                  <input
                    id={field.name}
                    type="hidden"
                    value={field.state.value}
                    readOnly
                  />
                </div>

                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>

      {/* Hidden submit so Enter in text input will submit */}
      <input type="submit" className="hidden" aria-hidden />
    </form>
  );
}
