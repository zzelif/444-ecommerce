"use client";

import { useTransition } from "react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type LoginResult = { success: boolean; message: string } | void;

export function LoginForm({ action }: { action: (formData: FormData) => Promise<LoginResult> }) {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    startTransition(async () => {
      const result = await action(formData);
      if (result && "success" in result && result.success === false) {
        toast.error(result.message);
      } else {
        toast.success("Logging in...");
      }
    });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-80">
      <h1 className="text-lg font-semibold mb-3">Admin Login</h1>
      <Input name="username" placeholder="Username" required />
      <Input type="password" name="password" placeholder="Password" required />
      <Button type="submit" disabled={isPending} className="rounded-lg">
        {isPending ? "Logging in..." : "Login"}
      </Button>
    </form>
  );
}
