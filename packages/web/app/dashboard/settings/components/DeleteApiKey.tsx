"use client";

import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { api } from "@/lib/trpc";

export default function DeleteApiKey({
  name,
  id,
}: {
  name: string;
  id: string;
}) {
  const router = useRouter();
  const mutator = api.apiKeys.revoke.useMutation({
    onSuccess: () => {
      toast({
        description: "Key was successfully deleted",
      });
      router.refresh();
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash className="size-5" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete API Key</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the API key &quot;{name}&quot;? Any
            service using this API key will lose access.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              type="button"
              variant="destructive"
              onClick={() => mutator.mutate({ id })}
            >
              Delete
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
