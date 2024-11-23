"use client";

import { Link, usePathname } from "@/app/navigation";
import type { SidebarLinkItem } from "@/constants/sidebar-register";
import { getQueryClient } from "@/providers/root/query-client";
import { useAuthenticated } from "@/store/user";
import { cn } from "@hackquest/ui/lib/utils";
import { useRive } from "@rive-app/react-canvas";
import { useEffect, useRef } from "react";
import { useSidebar } from "./sidebar-provider";
export function SidebarLink({
	linkItem,
	level,
}: {
	linkItem: SidebarLinkItem;
	level: number;
}) {
	const pathname = usePathname();
	const isAuthenticated = useAuthenticated();
	const queryClient = getQueryClient();
	const { active, setActive } = useSidebar();

	const { rive, RiveComponent } = useRive(
		linkItem.riveKey
			? {
					src: `/rive/sidebar/${linkItem.riveKey}.riv`,
				}
			: {},
	);

	const _riveInstance = useRef<any>();

	useEffect(() => {
		if (active === linkItem.link) {
			rive?.play("active");
		} else {
			rive?.play("default");
		}
	}, [active, rive, linkItem.link]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (pathname === linkItem.link) {
			setActive(linkItem.link);
		}
	}, []);

	if (!isAuthenticated && linkItem.meta?.auth) {
		return null;
	}

	return (
		<li>
			<Link href={linkItem.link}>
				<div
					data-active={active === linkItem.link}
					className={cn(
						"flex cursor-pointer items-center gap-2 rounded-lg border border-transparent px-3 py-1 text-neutral-600 text-sm leading-[150%] transition-all duration-300 hover:border-neutral-200 hover:bg-neutral-100 data-[active=true]:bg-neutral-100 data-[active=true]:font-extrabold data-[active=true]:text-primary-neutral",
					)}
					style={{
						paddingLeft: !level ? `12px` : `${12 + level * 24}px`,
					}}
					onKeyDown={() => {
						queryClient.invalidateQueries({ queryKey: ["sidebar"] });
						setActive(linkItem.link);
					}}
					onClick={() => {
						queryClient.invalidateQueries({ queryKey: ["sidebar"] });
						setActive(linkItem.link);
					}}
					onMouseEnter={() => {
						active !== linkItem.link && rive?.play("hover");
					}}
					onMouseLeave={() => {
						active !== linkItem.link && rive?.play("default");
					}}
				>
					{!linkItem.riveKey && <span>{linkItem.icon}</span>}
					{linkItem.riveKey && (
						<span className="h-4 w-4">
							<RiveComponent />
						</span>
					)}
					<span>{linkItem.title}</span>
				</div>
			</Link>
		</li>
	);
}
