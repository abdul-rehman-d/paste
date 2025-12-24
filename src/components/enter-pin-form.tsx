"use client";

import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { unlockRoom } from "@/app/actions";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { FORMS_ID } from "@/lib/constants";

const PinSchema = z.object({
  pin: z
    .string()
    .length(4, "Pin must be 4 characters")
    .regex(/^[0-9]+$/, "Pin must be numeric"),
});

export function EnterPinForm({ roomSlug }: { roomSlug: string }) {
  const form = useForm({
    defaultValues: {
      pin: "",
    },
    validators: {
      onSubmit: PinSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const errorMessages = await unlockRoom({
          pin: value.pin,
          roomSlug,
        });
        form.setErrorMap({
          onSubmit: {
            ...(errorMessages ?? {}),
          },
        });
      } catch (error) {
        console.error("incorrect pin:", error);
      }
    },
  });

  return (
    <form
      id={FORMS_ID.ENTER_PIN_FORM}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="grow m-4 flex w-full flex-col justify-center items-center"
    >
      <FieldGroup className="w-64">
        <form.Field
          name="pin"
          // biome-ignore lint/correctness/noChildrenProp: false-positive
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;

            return (
              <Field
                data-invalid={isInvalid}
                data-disabled={field.form.state.isSubmitting}
              >
                <FieldLabel
                  htmlFor={field.name}
                  className="text-lg text-center"
                >
                  Enter your PIN to unlock
                </FieldLabel>
                <div className="flex flex-col gap-2">
                  <InputOTP
                    autoFocus
                    maxLength={4}
                    value={field.state.value}
                    disabled={field.form.state.isSubmitting}
                    onChange={(val: string) => {
                      field.handleChange(val);
                      // Autosubmit when the PIN reaches 4 characters
                      if (val && val.length === 4) {
                        form.handleSubmit();
                      }
                    }}
                  >
                    <InputOTPGroup>
                      {[0, 1, 2, 3].map((i) => (
                        <InputOTPSlot
                          index={i}
                          key={`input-${i}`}
                          className="h-16 w-16 text-3xl font-semibold"
                        />
                      ))}
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
