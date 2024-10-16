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
import { useRouter } from "next/navigation"
import { User } from "./user-columns"
import { Switch } from "@mui/material"
import { updateOrder } from "@/app/(dashboard)/orders/_action"
import { Image } from "./product-columns"

export type ShippingAddressType = {
    name: string,
    phone: string,
    line1: string,
    line2: string,
    city: string,
    state: string,
    postal_code: string,
    country: string,
}

export enum OrderStatusEnum {
    pending = "Pending",
    complete = "Complete",
}

export type Order = {
    id: number,
    orderNumber: string,
    totalAmount: number,
    status: OrderStatusEnum,
    user: User,
    shippingAddress: ShippingAddressType;
    createdAt: string,
    updatedAt: string,
}

type OrderItem = {
    id: number,
    quantity: number,
    color: string,
    size: string,
    name: string,
    description: string,
    price: number,
    images: Image[]
}

export type OrderDetails = {
    id: number,
    orderNumber: string,
    totalAmount: number,
    status: OrderStatusEnum,
    user: User,
    items: OrderItem[],
    shippingAddress: ShippingAddressType;
    createdAt: string,
    updatedAt: string,
}


export const orderColumns: ColumnDef<Order>[] = [
    {
        accessorKey: "user",
        header: "User Name",
        cell: ({ row }) => {
            const user: User = row.getValue('user');
            return <div className='font-medium'>{user?.name}</div>
        }
    },
    {
        accessorKey: "orderNumber",
        header: "Order Number",
        cell: ({ row }) => {
            const orderNumber = row.getValue('orderNumber') as string;
            return <p className="px-3">{orderNumber}</p>;
        }
    },
    {
        accessorKey: "totalAmount",
        header: "Total Amount",
    },
    {
        accessorKey: "status",
        header: "Is Complete",
        cell: ({ row }) => {
            const [state, formAction] = useServerFormState(updateOrder, null)
            const status = row.getValue('status') as string;
            const router = useRouter();

            const toggleStatus = async () => {
                await formAction(row.original.id);
                router.refresh()
            }

            return <Switch
                checked={OrderStatusEnum.complete == status ? true : false}
                onChange={toggleStatus}
                inputProps={{ 'aria-label': 'controlled' }}
            />;
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
            const order = row.original;

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
                        <Link href={`/orders/${order.id}`} >
                            <DropdownMenuItem className="cursor-pointer flex items-center gap-3">
                                <Eye size={22} />
                                <span>View</span>
                            </DropdownMenuItem>
                        </Link>
                    </DropdownMenuContent >
                </DropdownMenu >
            )
        },
    },
]
