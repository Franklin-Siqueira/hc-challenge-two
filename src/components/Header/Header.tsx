import { memo } from "react";

import imgLogo from "../../assets/vtex-logo.svg";

import * as S from "./styled";

function Header() {
	return (
		<S.Header>
			<a href="/">
				<img src={imgLogo} alt="Logo" />
			</a>
		</S.Header>
	);
}

export default memo(Header);
