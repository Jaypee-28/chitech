// components/SearchInput.tsx
"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  onSearch: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({
  onSearch,
  placeholder,
}: SearchInputProps) {
  const [value, setValue] = useState("");

  // Debounce logic to reduce unnecessary search calls
  useEffect(() => {
    const timeout = setTimeout(() => {
      onSearch(value.trim().toLowerCase());
    }, 300); // delay in ms

    return () => clearTimeout(timeout);
  }, [value, onSearch]);

  return (
    <Input
      placeholder={placeholder || "Search products..."}
      value={value}
      onChange={(e) => setValue(e.target.value)}
      className="w-full max-w-sm"
    />
  );
}
