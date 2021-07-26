import { useState, memo } from "react";
import { useHistory } from "react-router-dom";
import useInventory from "../../hooks/useInventory";

import {
	createStyles,
	makeStyles,
	withStyles,
	Theme,
} from "@material-ui/core/styles";
import { TextField, Button, IconButton } from "@material-ui/core";

import { colors } from "../colors";
import imgArrowBack from "../../assets/arrow-back.svg";
import * as S from "./styled";

// types
type Client = {
	name: string;
	email: string;
	address: string;
};

// material UI styles
const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& > *": {
				margin: theme.spacing(0),
				width: "100%",
			},

			width: "100%",
			"max-width": "640px",
			display: "flex",
			"flex-direction": "column",
			gap: "1rem",

			"margin-top": "1rem",
		},
	})
);

const ColorButton = withStyles((theme: Theme) => ({
	root: {
		height: "3.5rem",
		fontSize: "1rem",
		fontWeight: theme.typography.fontWeightBold,
		fontFamily: [
			"Lato",
			"Nunito",
			"-apple-system",
			"BlinkMacSystemFont",
			'"Segoe UI"',
			"Roboto",
			'"Helvetica Neue"',
			"Arial",
			"sans-serif",
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"',
		].join(","),
		color: colors.white,
		backgroundColor: colors.primary,
		marginTop: "1rem",
		"&:hover": {
			backgroundColor: colors.secondary,
		},
	},
}))(Button);

const CustomTextField = withStyles({
	root: {
		"& label.Mui-focused": {
			color: colors.primary,
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: colors.primary,
			},
			"&:hover fieldset": {
				borderColor: colors.secondary,
			},
			"&.Mui-focused fieldset": {
				borderColor: colors.primary,
			},
		},
	},
})(TextField);

function NewClient() {
	const history = useHistory();
	const { database } = useInventory();
	const [newClient, setNewClient] = useState({
		name: "",
		email: "",
		address: "",
	} as Client);

	const handleClientName = (value: string) => {
		setNewClient((newClient) => {
			newClient.name = value;
			return newClient;
		});
	};

	const handleClientEmail = (value: string) => {
		setNewClient((newClient) => {
			newClient.email = value;
			return newClient;
		});
	};

	const handleClientAddress = (value: string) => {
		setNewClient((newClient) => {
			newClient.address = value;
			return newClient;
		});
	};

	const saveData = () => {
		database.clients.push(newClient);
		try {
			localStorage.setItem("inventory", JSON.stringify(database));
			alert("Cadastro realizado com sucesso!");
		} catch (error) {
			alert("Houve um erro com o cadastro, tente novamente!");
		}
		history.push("/");
	};

	const classes = useStyles();

	return (
		<S.Container>
			<div className="wrapper">
				<div className="title">
					<IconButton
						color="primary"
						aria-label="seta para voltar"
						onClick={() => {
							history.push("/");
						}}
					>
						<img src={imgArrowBack} alt="Seta para voltar" />
					</IconButton>
					<h2>Novo Cliente</h2>
				</div>
				<form onSubmit={saveData} className={classes.root} autoComplete="off">
					<CustomTextField
						id="name"
						label="Nome"
						variant="outlined"
						required
						type="text"
						size="medium"
						onChange={(e) => handleClientName(e.target.value)}
					/>
					<CustomTextField
						id="email"
						label="E-mail"
						variant="outlined"
						required
						type="email"
						size="medium"
						onChange={(e) => handleClientEmail(e.target.value)}
					/>
					<CustomTextField
						id="address"
						label="Endereço"
						variant="outlined"
						type="text"
						size="medium"
						onChange={(e) => handleClientAddress(e.target.value)}
					/>
					<ColorButton variant="contained" size="large" type="submit">
						Cadastrar Cliente
					</ColorButton>
				</form>
			</div>
		</S.Container>
	);
}

export default memo(NewClient);
