"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Energy = {
  current1: string
  current2: string
  power1: string
  power2: string
  timestamp: string
  voltage: string
}

export const columns: ColumnDef<Energy>[] = [
  {
    accessorKey: "current1",
    header: "HEATER CURRENT",
  },
  {
    accessorKey: "current2",
    header: "BOILER CURRENT",
  },
  {
    accessorKey: "power1",
    header: "HT POWER",
  },
  {
    accessorKey: "power2",
    header: "BR POWER",
  },
  {
    accessorKey: "timestamp",
    header: "TIME",
  },
]
