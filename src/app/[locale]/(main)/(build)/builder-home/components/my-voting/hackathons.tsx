import { AnimatedContent } from "@/components/common/animated-content";
import { Pagination } from "@/components/common/pagination";
import {
	type HackathonExtend,
	type HackathonStatus,
	useListHackathonsQuery,
} from "@/graphql/generated/hooks";
import {
	Tabs,
	TabsIndicator,
	TabsList,
	TabsTrigger,
} from "@hackquest/ui/shared/tabs";
import type React from "react";
import { useState } from "react";
import { PAGE_LIMIT, myVotingTabs } from "../../constants/data";
import HackathonCard from "../hackathon-card";
import HackathonSkeleton from "../hackathon-skeleton/hackathon-skeleton";
import HackathonNodata from "../no-data/hackathon-nodata";

interface MyHackathonProps {
	scrollToRef: () => void;
}
const Hackathons: React.FC<MyHackathonProps> = ({ scrollToRef }) => {
	const [params, setParams] = useState({
		page: 1,
		limit: 4,
		status: myVotingTabs[0]?.value,
	});
	const { data, isLoading } = useListHackathonsQuery(params);

	return (
		<div className="flex flex-col gap-6">
			<Tabs
				value={params.status}
				onValueChange={(tab) => {
					setParams({
						...params,
						page: 1,
						status: tab as HackathonStatus,
					});
				}}
			>
				<TabsList className="headline-s flex justify-start gap-4">
					{myVotingTabs.map((v) => (
						<TabsTrigger key={v.value} value={v.value}>
							{v.label}
						</TabsTrigger>
					))}
					<TabsIndicator />
				</TabsList>
			</Tabs>
			<AnimatedContent
				value={params.status}
				className="flex flex-col gap-6 sm:border-neutral-200 sm:border-t sm:pt-6"
			>
				{isLoading ? (
					<HackathonSkeleton />
				) : data?.listHackathons?.data?.length ? (
					<>
						{data?.listHackathons?.data?.map((hackathon) => (
							<div className="w-full" key={hackathon.id}>
								<HackathonCard hackathon={hackathon as HackathonExtend} />
							</div>
						))}
						<Pagination
							total={data?.listHackathons?.total}
							page={params.page}
							limit={PAGE_LIMIT}
							onPageChange={(page) => {
								scrollToRef();
								setParams({
									...params,
									page,
								});
							}}
						/>
					</>
				) : (
					<HackathonNodata />
				)}
			</AnimatedContent>
		</div>
	);
};

export default Hackathons;
