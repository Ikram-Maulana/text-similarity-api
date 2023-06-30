"use client";

import { Button } from "@/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";

export type APIKeyDashboard = {
  usedApiKey: string;
  path: string;
  recency: string;
  duration: string;
  status: number;
};

export const columns: ColumnDef<APIKeyDashboard>[] = [
  {
    accessorKey: "usedApiKey",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          API key used 🔑
          <CaretSortIcon className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "path",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Path
          <CaretSortIcon className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "recency",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Recency
          <CaretSortIcon className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "duration",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Duration
          <CaretSortIcon className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <CaretSortIcon className="w-4 h-4 ml-2" />
        </Button>
      );
    },
  },
];
