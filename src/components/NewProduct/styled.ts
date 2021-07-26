import styled from "styled-components";

import { colors } from "../colors";

export const Container = styled.section`
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 1rem;

	padding: 1rem;
	margin-top: 1rem;

	.wrapper {
		width: 100%;
		max-width: 640px;
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: 1rem;

		.title {
			position: relative;
			width: 100%;
			max-width: 640px;
			display: flex;
			justify-content: flex-start;
			align-items: center;

			h2 {
				position: absolute;
				font-size: 2rem;
				color: ${colors.primary};
				left: 50%;
				transform: translateX(-50%);
			}
		}
	}
`;
