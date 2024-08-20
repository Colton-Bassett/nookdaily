import { Task } from "@/app/types";

// Define possible points with their probabilities
const POINTS_OPTIONS = [
	{ value: 100, weight: 70 },
	{ value: 150, weight: 20 },
	{ value: 200, weight: 10 },
];

// Function to get a random point value with weighted probabilities
const getRandomPoints = (): number => {
	const totalWeight = POINTS_OPTIONS.reduce(
		(sum, option) => sum + option.weight,
		0
	);
	const randomValue = Math.random() * totalWeight;

	let accumulatedWeight = 0;
	for (const option of POINTS_OPTIONS) {
		accumulatedWeight += option.weight;
		if (randomValue < accumulatedWeight) {
			return option.value;
		}
	}

	// Fallback in case something goes wrong
	return POINTS_OPTIONS[0].value;
};

const tasksData: Task[] = [
	// FOOD
	{
		id: "food-01",
		name: "Meat Alternative",
		description: "Go meatless for a meal today",
		type: "food",
		points: getRandomPoints(),
		multiplier: 1,
		dateAssigned: "",
		imageUrl: "",
	},
	{
		id: "food-02",
		name: "Eat Fruits or Vegetables",
		description: "Have fruit or vegetables for a snack",
		type: "food",
		points: getRandomPoints(),
		multiplier: 1,
		dateAssigned: "",
		imageUrl: "",
	},
	{
		id: "food-03",
		name: "Healthier Food Option",
		description: "Choose a healthy option for food",
		type: "food",
		points: getRandomPoints(),
		multiplier: 1,
		dateAssigned: "",
		imageUrl: "",
	},
	{
		id: "food-04",
		name: "Try New Recipe",
		description: "Look up a new recipe and try it",
		type: "food",
		points: getRandomPoints(),
		multiplier: 1,
		dateAssigned: "",
		imageUrl: "",
	},
	{
		id: "food-05",
		name: "Visit New Restaurant",
		description: "Try eating somewhere new today",
		type: "food",
		points: getRandomPoints(),
		multiplier: 1,
		dateAssigned: "",
		imageUrl: "",
	},
	/* SELF CARE */
	{
		id: "self-01",
		name: "Go on a Walk",
		description: "Take a short walk outside",
		type: "self",
		points: getRandomPoints(),
		multiplier: 1,
		dateAssigned: "",
		imageUrl: "",
	},
	{
		id: "self-02",
		name: "Meditate",
		description: "Clear your mind with some meditation",
		type: "self",
		points: getRandomPoints(),
		multiplier: 1,
		dateAssigned: "",
		imageUrl: "",
	},
	{
		id: "self-03",
		name: "Journal Time",
		description: "Write a page or two about whatever you like",
		type: "self",
		points: getRandomPoints(),
		multiplier: 1,
		dateAssigned: "",
		imageUrl: "",
	},
	{
		id: "self-04",
		name: "Tech Break",
		description:
			"Consciously spend some time away from technology and social media",
		type: "self",
		points: getRandomPoints(),
		multiplier: 1,
		dateAssigned: "",
		imageUrl: "",
	},
	/* PURCHASE */
	{
		id: "purchase-01",
		name: "Clean or Organize",
		description: "Choose something small to clean or organize",
		type: "purchase",
		points: getRandomPoints(),
		multiplier: 1,
		dateAssigned: "",
		imageUrl: "",
	},
	{
		id: "purchase-02",
		name: "Be Spontaneous",
		description: "Do something different and spontaneous",
		type: "purchase",
		points: getRandomPoints(),
		multiplier: 1,
		dateAssigned: "",
		imageUrl: "",
	},
	{
		id: "purchase-03",
		name: "Learn Something New",
		description: "Take time to learn something new",
		type: "purchase",
		points: getRandomPoints(),
		multiplier: 1,
		dateAssigned: "",
		imageUrl: "",
	},
	{
		id: "purchase-04",
		name: "Give Something",
		description: "Give someone a gift or a compliment",
		type: "purchase",
		points: getRandomPoints(),
		multiplier: 1,
		dateAssigned: "",
		imageUrl: "",
	},
	{
		id: "purchase-05",
		name: "Try New Hobby",
		description: "Try a new hobby you've always wanted to try",
		type: "purchase",
		points: getRandomPoints(),
		multiplier: 1,
		dateAssigned: "",
		imageUrl: "",
	},
	/* SOCIAL */
	{
		id: "social-01",
		name: "Practice Active Listening",
		description:
			"Practice active listening and validation, make someone feel heard",
		type: "social",
		points: getRandomPoints(),
		multiplier: 1,
		dateAssigned: "",
		imageUrl: "",
	},
	{
		id: "social-02",
		name: "Say Yes",
		description: "Say yes to the next (reasonable) request you get",
		type: "social",
		points: getRandomPoints(),
		multiplier: 1,
		dateAssigned: "",
		imageUrl: "",
	},

	{
		id: "social-03",
		name: "Talk to Someone",
		description: "Message someone or drop by for a chat",
		type: "social",
		points: getRandomPoints(),
		multiplier: 1,
		dateAssigned: "",
		imageUrl: "",
	},
	{
		id: "social-04",
		name: "Do a Favor",
		description: "Offer to do someone a favor",
		type: "social",
		points: getRandomPoints(),
		multiplier: 1,
		dateAssigned: "",
		imageUrl: "",
	},
	{
		id: "social-05",
		name: "Make Gratitude List",
		description: "Tell someone how grateful you are for something they do",
		type: "social",
		points: getRandomPoints(),
		multiplier: 1,
		dateAssigned: "",
		imageUrl: "",
	},
	{
		id: "social-06",
		name: "Say Thank You",
		description: "Call up someone or take time to express gratitude",
		type: "social",
		points: getRandomPoints(),
		multiplier: 1,
		dateAssigned: "",
		imageUrl: "",
	},
	{
		id: "social-07",
		name: "Compliment Someone",
		description: "Say something positive to a stranger or friend",
		type: "social",
		points: getRandomPoints(),
		multiplier: 1,
		dateAssigned: "",
		imageUrl: "",
	},
];
export default tasksData;
