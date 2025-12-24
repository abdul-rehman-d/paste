import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { addItemAction } from "@/app/actions";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FORMS_ID } from "@/lib/constants";
import { Button } from "./ui/button";

const Schema = z.object({
  text: z.string().min(1, "text is required"),
  roomSlug: z.string().min(1, "roomSlug is required"),
});

export function AddItemForm({ roomSlug }: { roomSlug: string }) {
  const form = useForm({
    defaultValues: {
      text: "",
      roomSlug,
    },
    validators: {
      onSubmit: Schema,
    },
    onSubmit: async ({ value }) => {
      try {
        const errorMap = await addItemAction(value);
        if (!errorMap) {
          form.reset();
          return;
        }

        form.setErrorMap({
          onSubmit: {
            ...(errorMap ?? {}),
          },
        });
      } catch (error) {
        console.error("Failed to create room:", error);
      }
    },
  });

  return (
    <form
      id={FORMS_ID.ADD_ITEM_FORM}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      className="flex w-full items-center gap-4"
    >
      <FieldGroup>
        <form.Field
          name="text"
          // biome-ignore lint/correctness/noChildrenProp: false-positive
          children={(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  placeholder="Enter text to save"
                  className="p-4 md:text-lg rounded-xs h-auto"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
      </FieldGroup>

      {/* Hidden submit so Enter in text input will submit */}
      <input type="submit" className="hidden" aria-hidden />

      <Button type="submit" disabled={form.state.isSubmitting}>
        Add
      </Button>
    </form>
  );
}
