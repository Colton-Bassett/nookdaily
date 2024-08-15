// Reduces cpu load of page (30%) by removing styles that try to persist through each element draw/redaw
export const clearAnimationStyles = (className: string) => {
	const element = document.querySelector(`.${className}`);

	if (element instanceof HTMLElement) {
		element.style.animation = "none";
		element.style.transform = "none";
		element.style.opacity = "1";
	}
};
