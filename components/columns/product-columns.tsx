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
import { MoreHorizontal, ArrowUpDown, Edit, Trash, Eye } from "lucide-react"
import Link from "next/link"
import useServerFormState from "@/hooks/useServerFormState"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { deleteProduct } from "@/app/(dashboard)/products/_action"
import { Category } from "./category-columns"

export type Image = {
    id: number,
    name: string,
}

export type Product = {
    id: number,
    name: string,
    description: string,
    price: number,
    categories: Category[],
    images: Image[];
    createdAt: string,
    updatedAt: string,
}

export const productColumns: ColumnDef<Product>[] = [
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
        cell: ({ row }) => {
            const name = row.getValue('name') as string;
            return <p className="px-3">{name}</p>;
        }
    },
    {
        accessorKey: "description",
        header: "Description",
    },
    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "images",
        header: "Image",
        cell: ({ row }) => {
            const images = row.getValue('images') as Image[];
            return images && images[0] ? <img src={images[0].name} width={60} className="rounded" alt="Product Image" /> : null;
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
            const date = new Date(row.getValue('createdAt'));
            const formatted = date.toLocaleString();
            return <div className='font-medium'>{formatted}</div>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const product = row.original
            const [state, formAction] = useServerFormState(deleteProduct, null)
            const router = useRouter();

            const onDelete = () => {
                formAction(product.id);
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
                        <Link href={`/products/${product.id}`} >
                            <DropdownMenuItem className="cursor-pointer flex items-center gap-3">
                                <Eye size={22} />
                                <span>View</span>
                            </DropdownMenuItem>
                        </Link>
                        <Link href={`/products/${product.id}/edit`} >
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
