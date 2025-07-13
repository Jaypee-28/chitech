"use client";

import { Input } from "@/components/ui/input";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useEffect, useState } from "react";

interface SearchUserProps {
  onSearch: (query: string) => void;
}

export default function SearchUser({ onSearch }: SearchUserProps) {
  const [value, setValue] = useState("");
  const debounced = useDebounce(value, 300);

  useEffect(() => {
    onSearch(debounced);
  }, [debounced, onSearch]);

  return (
    <Input
      placeholder="Search users..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full max-w-xs"
    />
  );
}
