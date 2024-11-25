// Import necessary dependencies
import { Icon } from 'components/Atomic';
import Tooltip from 'components/widgets/tooltip';
import React, { FC, useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';
import { ReactComponent as ArrowLeftIcon } from '../../assets/icons/arrow-left-solid.svg';
import { ReactComponent as ArrowRightIcon } from '../../assets/icons/arrow-right-solid.svg';
import noImage from '../../assets/images/no_image.png';

// Styled component for the container of each mobile menu item
export const MobileItemContainer = styled.div<{ selected?: boolean }>`
	align-items: center;
	justify-content: end;
	min-width: 140px;
	max-width: 140px;
	width: 140px;
	height: 140px;
	min-height: 180px;
	max-height: 1800px;
	flex: 1;
	display: flex;
	flex-direction: column;
	border-radius: 5px;
	/* border: 1px gray solid; */
	background: #f7f7f7;

	/* padding: 0 5px; */
	margin:5px;
	position: relative;
	${(props) => props.selected && `background-color: #f7f7f7;`}
`;

// Styled component for the image of each menu item
export const MenuItemImage = styled.img<{ isRound?: boolean }>`
	width: 64px;
	height: 64px;
	object-fit: ${(props) => (props.isRound ? 'cover' : 'contain')};
	margin-bottom: 20px;
	border-radius: ${(props) => (props.isRound ? '64px!important' : '0')};
`;

// Styled component for the wrapper of multiple images in a menu item
export const MenuItemImagesWrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	position: relative;
	top: -10px;
`;

// Styled component for each image wrapper in the menu item
export const MenuItemImagesImageWrapper = styled.div`
	width: 35px;
	height: 35px;
	&:nth-child(1) {
		border-right: 1px #ddd dotted;
		border-bottom: 1px #ddd dotted;
	}

	&:nth-child(2) {
		border-bottom: 1px #ddd dotted;
	}

	&:nth-child(3) {
		border-right: 1px #ddd dotted;
	}
`;

// Styled component for the label of each menu item
export const MenuItemLabel = styled.span`
	font-size: 14px;
	font-weight: 500;
	position: relative;
	bottom: 10px;
	left: 0;
	right: 0;
	text-align: center;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

// Styled component for each image in the menu item
export const MenuItemImagesImage = styled.img<{ isRound?: boolean }>`
	width: 100%;
	height: 100%;
	object-fit: cover;
	padding: 3px;
	border-radius: ${(props) => (props.isRound ? '64px!important' : '0')};
`;

// Styled component for the icon of each menu item
export const MenuItemIcon = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 40px;
	margin-bottom: 20px;
	width: 64px;
	height: 64px;
`;

// Function to determine the visibility of left and right arrows based on scroll position
const getVisibleArrows = (div: HTMLDivElement) => {
	let showLeft = false;
	let showRight = false;

	if (div.scrollLeft > 0) showLeft = true;

	if (div.scrollWidth - div.clientWidth > div.scrollLeft) showRight = true;

	return [showLeft, showRight];
};

// Props for the container of menu items
interface MenuItemsContainerProps {
	isLeftArrowVisible: boolean;
	isRightArrowVisible: boolean;
	onScrollChange: (value: number) => void;
	scrollLeft: number;
	children?: React.ReactNode;
}

// Props for each menu item
interface MenuItemProps {
	selected?: boolean;
	imageUrl?: string | null;
	icon?: React.ReactNode | string | null | undefined;
	label: string;
	onClick: () => void;
	className?: string;
	images?: string[];
	hideLabel?: boolean;
	description?: string | null;
	isRound?: boolean;
	children?: React.ReactNode;
}

// Styled component for the wrapper of menu items
const MenuItemsWrapper = styled.div`
	display: flex;
	max-width: 100%;
	min-height: 141px;
	width: 100%;
	overflow-x: auto;
	/* background-color: #ffffff; */
	border-top: 1px #ffffff solid;
	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */

	::-webkit-scrollbar {
		display: none;
	}

	span {
		font-size: 16px;
	}
`;

// Styled component for the left arrow
const ArrowCss = css`
	position: absolute;
	left: 10px;
	bottom: 60px;
	background-color: #f1f1f1;
	border-radius: 30px;
	width: 32px;
	height: 32px;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 3;
`;

// Styled component for the left arrow
const ArrowLeft = styled.div`
	${ArrowCss};
`;

// Styled component for the right arrow
const ArrowRight = styled.div`
	${ArrowCss};
	left: auto;
	right: 10px;
`;

// Styled component for the left arrow icon
const ArrowLeftIconStyled = styled(Icon)`
	font-size: 22px;
`;

// Styled component for the right arrow icon
const ArrowRightIconStyled = styled(Icon)`
	font-size: 22px;
`;

// Container component for mobile menu items
export const MobileItemsContainer: FC<MenuItemsContainerProps> = ({
	children,
	isLeftArrowVisible,
	isRightArrowVisible,
	onScrollChange,
	scrollLeft
}) => {
	const [showLeftArrow, setShowLeftArrow] = useState(false);
	const [showRightArrow, setShowRightArrow] = useState(false);

	const ref = useRef<HTMLDivElement | null>(null);
	if (ref.current && scrollLeft != null) ref.current.scrollLeft = scrollLeft ?? 0;

	// Update visibility on scroll
	useEffect(() => {
		const handleScroll = () => {
			if (ref.current) {
				onScrollChange(ref.current.scrollLeft);
				const [showLeft, showRight] = getVisibleArrows(ref.current);
				setShowLeftArrow(showLeft);
				setShowRightArrow(showRight);
			}
		};

		// Initial visiblity
		handleScroll();

		const actualRef = ref.current;
		actualRef?.addEventListener('scroll', handleScroll);
		return () => actualRef?.removeEventListener('scroll', handleScroll);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<MenuItemsWrapper ref={ref}>
			{showLeftArrow && isLeftArrowVisible && (
				<ArrowLeft>
					<ArrowLeftIconStyled>
						<ArrowLeftIcon />
					</ArrowLeftIconStyled>
				</ArrowLeft>
			)}

			{/* Content */}
			{children}

			{showRightArrow && isRightArrowVisible && (
				<ArrowRight>
					<ArrowRightIconStyled>
						<ArrowRightIcon />
					</ArrowRightIconStyled>
				</ArrowRight>
			)}
		</MenuItemsWrapper>
	);
};

// Component for each menu item
export const MenuItem: FC<MenuItemProps> = (props) => {
	return (
		<MobileItemContainer onClick={props.onClick} selected={props.selected}>
			<div className="checkSvg">
				<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 50 50">
					<path d="M25,2C12.318,2,2,12.318,2,25c0,12.683,10.318,23,23,23c12.683,0,23-10.317,23-23C48,12.318,37.683,2,25,2z M35.827,16.562	L24.316,33.525l-8.997-8.349c-0.405-0.375-0.429-1.008-0.053-1.413c0.375-0.406,1.009-0.428,1.413-0.053l7.29,6.764l10.203-15.036	c0.311-0.457,0.933-0.575,1.389-0.266C36.019,15.482,36.138,16.104,35.827,16.562z"></path>
				</svg>
			</div>
			{!props.hideLabel && <MenuItemLabel>{props.label}</MenuItemLabel>}

			{props.description && props.description.length !== 0 && (
				<Tooltip optionDescription={props.description} $isMobile />
			)}
			{props.imageUrl && (
				<MenuItemImage isRound={props.isRound} src={props.imageUrl} alt={props.label} loading='lazy' />
			)}
			{!props.imageUrl && props.icon && <MenuItemIcon>{props.icon}</MenuItemIcon>}

			{props.images && (
				<MenuItemImagesWrapper>
					{[0, 0, 0, 0].map((_, index) => (
						<MenuItemImagesImageWrapper key={index}>
							{props.images!.length > index && (
								<MenuItemImagesImage
									isRound={props.isRound}
									src={props.images ? props.images[index] : noImage}
									alt={props.label}
									loading='lazy'
								/>
							)}
						</MenuItemImagesImageWrapper>
					))}
				</MenuItemImagesWrapper>
			)}
			<div className="select">Select Options</div>
		</MobileItemContainer>
	);
};
