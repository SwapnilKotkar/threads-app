"use client";

import React, { ChangeEvent, useState } from "react";
import * as z from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Image from "next/image";
import { Textarea } from "../ui/textarea";
import { isBase64Image } from "@/lib/utils";
import { useUploadThing } from "@/lib/uploadthing";
import { updateUser } from "@/lib/actions/user.actions";
import { usePathname, useRouter } from "next/navigation";
import { ThreadValidation } from "@/lib/validations/thread";

interface Props {
	user: {
		id: string;
		objectId: string;
		username: string;
		name: string;
		bio: string;
		image: string;
	};
	btnTitle: string;
}

const PostThread = ({ userId }: { userId: string }) => {
	const pathname = usePathname();
	const router = useRouter();

	const form = useForm({
		resolver: zodResolver(ThreadValidation),
		defaultValues: {
			thread: " ",
			accountId: userId,
		},
	});

	const onSubmit = async () => {
		// await createThread()
		// VIDEO TIME LINE - 2:38:11
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="mt-10 flex flex-col text-justify gap-10"
			>
				<FormField
					control={form.control}
					name="thread"
					render={({ field }) => (
						<FormItem className="flex flex-col w-full gap-3">
							<FormLabel className="text-base-semibold text-light-2">
								Content
							</FormLabel>
							<FormControl>
								<Textarea
									rows={15}
									className="no-focus border border-dark-4 bg-dark-3 text-light-1"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<Button type="submit" className="bg-primary-500">
					Post thread
				</Button>
			</form>
		</Form>
	);
};

export default PostThread;
