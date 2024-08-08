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
import { deleteAdmin } from "@/app/(dashboard)/admins/_action"


export type Admin = {
    id: string
    name: string,
    email: string,
    image: string,
    createdAt: string,
    updatedAt: string,
}

export const adminColumns: ColumnDef<Admin>[] = [
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
        accessorKey: "email",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Email
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const image = row.getValue('image') as string;
            return image ? <img src={image} width={60} className="rounded" alt="Admin Image" /> : null;
        }
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
        accessorKey: "createdAt",
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
            const date = new Date(row.getValue('createdAt'));
            const formatted = date.toLocaleString();
            return <div className='font-medium'>{formatted}</div>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const admin = row.original
            const [state, formAction] = useServerFormState(deleteAdmin, null)
            const router = useRouter();

            const onDelete = () => {
                formAction(admin.id);
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
                        <Link href={`/admins/${admin.id}/edit`} >
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
