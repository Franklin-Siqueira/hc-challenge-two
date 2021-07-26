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

import imgArrowBack from "../../assets/arrow-back.svg";
import { colors } from "../colors";
import * as S from "./styled";

// types
type Product = {
	name: string;
	imageUrl: string;
	price: number;
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

function NewProduct() {
	const history = useHistory();
	const { database } = useInventory();
	const [newProduct, setNewProduct] = useState({
		name: "",
		imageUrl: "",
		price: 0,
	} as Product);

	const handleProductName = (value: string) => {
		setNewProduct((newProduct) => {
			newProduct.name = value;
			return newProduct;
		});
	};

	const handleProductImageUrl = (value: string) => {
		setNewProduct((newProduct) => {
			newProduct.imageUrl = value;
			return newProduct;
		});
	};

	const handleProductPrice = (value: string) => {
		setNewProduct((newProduct) => {
			newProduct.price = Number(value);
			return newProduct;
		});
	};

	const saveData = () => {
		database.products.push(newProduct);
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
					<h2>Novo Produto</h2>
				</div>
				<form onSubmit={saveData} className={classes.root} autoComplete="off">
					<CustomTextField
						id="name"
						label="Nome"
						variant="outlined"
						required
						type="text"
						size="medium"
						onChange={(e) => handleProductName(e.target.value)}
					/>
					<CustomTextField
						id="imageUrl"
						label="Url da imagem"
						variant="outlined"
						type="text"
						size="medium"
						onChange={(e) => handleProductImageUrl(e.target.value)}
					/>
					<CustomTextField
						id="price"
						label="R$"
						variant="outlined"
						required
						type="number"
						size="medium"
						onChange={(e) => handleProductPrice(e.target.value)}
					/>
					<ColorButton variant="contained" size="large" type="submit">
						Cadastrar Produto
					</ColorButton>
				</form>
			</div>
		</S.Container>
	);
}

export default memo(NewProduct);
