import { FiBook, FiCode, FiHelpCircle, FiMoreHorizontal } from "react-icons/fi";

export const askAiOptions = [
	{
		value: "summarizeConcept",
		label: "Summarize Concept",
		icon: <FiBook className="size-4" />,
	},
	{
		value: "explainExample",
		label: "Explain Example",
		icon: <FiCode className="size-4" />,
	},
	{
		value: "explainQuiz",
		label: "Explain Quiz",
		icon: <FiHelpCircle className="size-4" />,
	},
	{
		value: "expandKnowledge",
		label: "Expand Knowledge",
		icon: <FiMoreHorizontal className="size-4" />,
	},
] as const;
