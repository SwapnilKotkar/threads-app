import { fetchUserPosts } from "@/lib/actions/user.actions";
import { redirect } from "next/navigation";
import React from "react";
import ThreadCard from "../cards/ThreadCard";
import { fetchCommunityPosts } from "@/lib/actions/community.actions";

interface Props {
	currentuserId: string;
	accountId: string;
	accountType: string;
}

const ThreadsTab = async ({ currentuserId, accountId, accountType }: Props) => {
	let result: any;

	if (accountType === "Community") {
		result = await fetchCommunityPosts(accountId);
	} else {
		result = await fetchUserPosts(accountId);
	}

	if (!result) {
		redirect("/");
	}

	return (
		<section className="mt-9 flex flex-col gap-10">
			{result.threads.map((thread: any) => (
				<ThreadCard
					key={thread._id}
					id={thread._id}
					currentUserId={currentuserId}
					parentId={thread.parentId}
					content={thread.text}
					author={
						accountType === "User"
							? { name: result.name, image: result.image, id: result.id }
							: {
									name: thread.author.name,
									image: thread.author.image,
									id: thread.author.id,
							  }
					}
					community={thread.community}
					createdAt={thread.createdAt}
					comments={thread.children}
					isComment={false}
				/>
			))}
		</section>
	);
};

export default ThreadsTab;
