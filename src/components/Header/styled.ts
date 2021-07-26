import styled from "styled-components";

import { colors } from "../colors";

export const Header = styled.header`
	width: 100%;
	height: 6rem;
	background-color: ${colors.primary};
	display: flex;
	align-items: center;
	justify-content: center;

	padding: 1rem;

	img {
		width: 8rem;
	}
`;
