import { useState, ChangeEvent, memo } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles, withStyles, Theme } from "@material-ui/core/styles";
import {
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TablePagination,
	TableRow,
	Button,
} from "@material-ui/core";

import useInventory from "../../hooks/useInventory";

import { colors } from "../../components/colors";
import * as S from "./styled";

// types
interface Column {
	id: "name" | "email" | "address";
	label: string;
	minWidth?: number;
	align?: "right";
	format?: (value: number) => string;
}

const columns: Column[] = [
	{ id: "name", label: "Nome", minWidth: 150 },
	{ id: "email", label: "E-mail", minWidth: 150 },
	{
		id: "address",
		label: "Endereço",
		minWidth: 170,
		format: (value: number) => value.toLocaleString("pt-BR"),
	},
];

interface Data {
	name: string;
	email: string;
	address: string;
}

function createData(name: string, email: string, address: string): Data {
	return { name, email, address };
}

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

const useStyles = makeStyles({
	root: {
		width: "100%",
		"max-width": "900px",
		margin: "0 auto",
	},
	container: {
		width: "100%",
		height: "100%",
	},
});

function ClientsList() {
	const { database } = useInventory();
	const history = useHistory();

	const rows = database.clients.map((i) => {
		return createData(i.name, i.email, i.address);
	});

	const classes = useStyles();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState(10);

	const handleChangePage = (event: unknown, newPage: number) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	return (
		<S.Section>
			<Paper className={classes.root}>
				<TableContainer className={classes.container}>
					<Table stickyHeader aria-label="sticky table">
						<TableHead>
							<TableRow>
								{columns.map((column) => (
									<TableCell
										key={column.id}
										align={column.align}
										style={{ minWidth: column.minWidth }}
									>
										{column.label}
									</TableCell>
								))}
							</TableRow>
						</TableHead>
						<TableBody>
							{rows
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row) => {
									return (
										<TableRow
											hover
											role="checkbox"
											tabIndex={-1}
											key={row.email}
										>
											{columns.map((column) => {
												const value = row[column.id];
												return (
													<TableCell key={column.id} align={column.align}>
														{column.format && typeof value === "number"
															? column.format(value)
															: value}
													</TableCell>
												);
											})}
										</TableRow>
									);
								})}
						</TableBody>
					</Table>
				</TableContainer>
				<TablePagination
					rowsPerPageOptions={[10, 25, 100]}
					component="div"
					count={rows.length}
					rowsPerPage={rowsPerPage}
					page={page}
					onPageChange={handleChangePage}
					onRowsPerPageChange={handleChangeRowsPerPage}
				/>
			</Paper>
			<ColorButton
				variant="contained"
				size="large"
				type="button"
				onClick={() => history.push("/newclient")}
			>
				Novo Cliente
			</ColorButton>
		</S.Section>
	);
}

export default memo(ClientsList);
