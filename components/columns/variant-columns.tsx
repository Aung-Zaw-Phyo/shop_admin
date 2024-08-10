"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, ArrowUpDown, Edit, Trash } from "lucide-react"
import Link from "next/link"
import useServerFormState from "@/hooks/useServerFormState"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { deleteVariant } from "@/app/(dashboard)/variants/_action"
import { Product } from "./product-columns"


export type Variant = {
    id: number
    color: string,
    size: string,
    stock: number,
    product: Product,
    createdAt: string,
    updatedAt: string,
}

export const variantColumns: ColumnDef<Variant>[] = [
    {
        accessorKey: "product",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Product
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const product: Product = row.getValue('product');
            return <div className='font-medium'>{product?.name}</div>
        }
    },
    {
        accessorKey: "color",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Color
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "size",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Size
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "stock",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Stock
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Created At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue('createdAt'));
            const formatted = date.toLocaleString();
            return <div className='font-medium'>{formatted}</div>
        }
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Updated At
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.getValue('updatedAt'));
            const formatted = date.toLocaleString();
            return <div className='font-medium'>{formatted}</div>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const variant = row.original
            const [state, formAction] = useServerFormState(deleteVariant, null)
            const router = useRouter();

            const onDelete = () => {
                formAction(variant.id);
            }
            useEffect(() => {
                if (state && state.success) {
                    router.refresh();
                }
            }, [state])
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <Link href={`/variants/${variant.id}/edit`} >
                            <DropdownMenuItem className="cursor-pointer flex items-center gap-3">
                                <Edit size={22} />
                                <span>Edit</span>
                            </DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem onClick={onDelete} className="cursor-pointer flex items-center gap-3">
                            <Trash size={22} />
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
