"use client";

import { CheckCircle2Icon } from "lucide-react";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export function SuccessBanner() {
  const searchParams = useSearchParams();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (searchParams.get("success") === "true") {
      setShow(true);

      setTimeout(() => setShow(false), 3000);
    }
  }, [searchParams]);

  if (!show) return null;

  return (
    <div>
      <Alert className="bg-accent">
        <CheckCircle2Icon />
        <AlertTitle>Success! Product has been added.</AlertTitle>
      </Alert>
    </div>
  );
}
