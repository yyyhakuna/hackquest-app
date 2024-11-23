import type { ListOrganizerApplicationQuery } from "@/graphql/generated/hooks";
import { getQueryClient } from "@/providers/root/query-client";
import { Button } from "@hackquest/ui/shared/button";
import { DialogClose, DialogFooter } from "@hackquest/ui/shared/dialog";
import { FeedbackIcon } from "@hackquest/ui/shared/feedback-icon";
import type { QueryObserverResult } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { LuClock4 } from "react-icons/lu";
import { useApplicationAction } from "../../utils/use-application-action";

export const PendingCardFooter = ({
	id,
	refetch,
}: {
	id: string;
	refetch: () => Promise<
		QueryObserverResult<ListOrganizerApplicationQuery, Error>
	>;
}) => {
	const queryClient = getQueryClient();
	queryClient.invalidateQueries();
	const closeRef = useRef<HTMLButtonElement>(null);
	const t = useTranslations("HackathonOrganizer.manage");
	const { approve, decline, waitlist } = useApplicationAction(refetch, [id]);
	return (
		<DialogFooter className="mt-5 w-full max-w-[752px]">
			<DialogClose className="hidden" ref={closeRef} />
			<Button
				className="flex-1"
				onClick={() => {
					closeRef!.current!.click();
					approve();
				}}
			>
				{t("approve")}
				<BsArrowRight />
			</Button>
			<Button
				className="flex-1"
				color="neutral"
				variant="outline"
				onClick={() => {
					closeRef!.current!.click();
					decline();
				}}
			>
				{t("decline")}
				<BsArrowRight />
			</Button>
			<Button
				className="flex-1"
				color="neutral"
				variant="outline"
				onClick={() => {
					closeRef!.current!.click();
					waitlist();
				}}
			>
				{t("waitlist")}
				<BsArrowRight />
			</Button>
		</DialogFooter>
	);
};

export const ApporvedCardFooter = ({
	isConfirm,
	id,
	refetch,
}: {
	isConfirm: boolean;
	id: string;
	refetch: () => Promise<
		QueryObserverResult<ListOrganizerApplicationQuery, Error>
	>;
}) => {
	const t = useTranslations("HackathonOrganizer.manage");
	const closeRef = useRef<HTMLButtonElement>(null);
	const { undo } = useApplicationAction(refetch, [id]);
	return (
		<>
			<DialogClose className="hidden" ref={closeRef} />
			{isConfirm ? (
				<DialogFooter className="mt-5 w-full max-w-[752px] ">
					<Button className="flex-1 cursor-default" color="success">
						<FeedbackIcon />
						Confirmed by applicatant
					</Button>
				</DialogFooter>
			) : (
				<DialogFooter className="mt-5 w-full max-w-[752px] ">
					<Button
						className="flex-1 cursor-default cursor-default bg-neutral-300"
						color="neutral"
					>
						<LuClock4 className="h-5 w-5" />
						Wait for confirmation from the applicant
					</Button>
					<Button
						className="flex-1"
						color="destructive"
						variant="outline"
						onClick={() => {
							closeRef.current?.click();
							undo();
						}}
					>
						<BsArrowLeft />
						{t("undo")}
					</Button>
				</DialogFooter>
			)}
		</>
	);
};

export const DeclineCardFooter = ({
	id,
	refetch,
}: {
	id: string;
	refetch: () => Promise<
		QueryObserverResult<ListOrganizerApplicationQuery, Error>
	>;
}) => {
	const { undo } = useApplicationAction(refetch, [id]);
	const t = useTranslations("HackathonOrganizer.manage");
	const closeRef = useRef<HTMLButtonElement>(null);
	return (
		<DialogFooter className="mt-5 w-full max-w-[752px] cursor-default">
			<DialogClose ref={closeRef} className="hidden" />
			<Button
				className="flex-1 cursor-default bg-destructive-600"
				color="destructive"
			>
				Declined by organizer
			</Button>
			<Button
				className="flex-1"
				color="destructive"
				variant="outline"
				onClick={() => {
					closeRef.current?.click();
					undo();
				}}
			>
				<BsArrowLeft />
				{t("undo")}
			</Button>
		</DialogFooter>
	);
};

export const WaitlistCardFooter = ({
	id,
	refetch,
}: {
	id: string;
	refetch: () => Promise<
		QueryObserverResult<ListOrganizerApplicationQuery, Error>
	>;
}) => {
	const { undo } = useApplicationAction(refetch, [id]);
	const t = useTranslations("HackathonOrganizer.manage");
	const closeRef = useRef<HTMLButtonElement>(null);
	return (
		<DialogFooter className="mt-5 w-full max-w-[752px]">
			<DialogClose ref={closeRef} className="hidden" />
			<Button
				className="flex flex-1 cursor-default bg-neutral-600"
				color="neutral"
			>
				<LuClock4 className="h-5 w-5" />
				Waitlist by organizer
			</Button>
			<Button
				className="flex-1"
				color="destructive"
				variant="outline"
				onClick={() => {
					closeRef.current?.click();
					undo();
				}}
			>
				<BsArrowLeft />
				{t("undo")}
			</Button>
		</DialogFooter>
	);
};
