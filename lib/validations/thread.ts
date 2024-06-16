import * as z from "zod";

export const ThreadValidation = z.object({
	thread: z.string().url().nonempty(),
	accountId: z.string(),
});

export const CommentValidation = z.object({
	thread: z.string().url().nonempty(),
});
