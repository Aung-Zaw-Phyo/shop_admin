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
import { deleteCategory } from "@/app/(dashboard)/categories/_action"
import { useEffect } from "react"
import { useRouter } from "next/navigation"


export type Category = {
    id: string
    name: string,
    createdAt: string,
    updatedAt: string,
}

export const categoryColumns: ColumnDef<Category>[] = [
    {
        accessorKey: "name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
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
        header: "Updated At",
        cell: ({ row }) => {
            const date = new Date(row.getValue('updatedAt'));
            const formatted = date.toLocaleString();
            return <div className='font-medium'>{formatted}</div>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const category = row.original
            const [state, formAction] = useServerFormState(deleteCategory, null)
            const router = useRouter();

            const onDelete = () => {
                formAction(category.id);
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
                        <Link href={`/categories/${category.id}/edit`} >
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
