import React from "react";
import {
	createStyles,
	makeStyles,
	withStyles,
	Theme,
} from "@material-ui/core/styles";
import { AppBar, Tabs, Tab, Typography, Box } from "@material-ui/core";

import ClientsList from "../../components/ClientsList";
import ProductsList from "../../components/ProductsList";

import { colors } from "../../components/colors";

// types
interface TabPanelProps {
	children?: React.ReactNode;
	index: any;
	value: any;
}

interface StyledTabProps {
	label: string;
}

const CustomTabs = withStyles({
	root: {
		backgroundColor: colors.white,
		color: colors.dark,
	},
	indicator: {
		height: "0.25rem",
		backgroundColor: colors.primary,
	},
})(Tabs);

const CustomTab = withStyles((theme: Theme) =>
	createStyles({
		root: {
			textTransform: "none",
			minWidth: "8rem",
			fontSize: "1.2rem",
			fontWeight: theme.typography.fontWeightRegular,
			marginRight: theme.spacing(0),
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
			color: colors.dark,
			"&:hover": {
				color: colors.secondary,
				backgroundColor: colors.light,
			},
			"&$selected": {
				color: colors.primary,
				fontWeight: "700",
			},
			"&:focus": {
				color: colors.primary,
			},
		},
		selected: {},
	})
)((props: StyledTabProps) => <Tab disableRipple {...props} />);

function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography component={"span"}>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

function a11yProps(index: any) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

const useStyles = makeStyles((theme: Theme) => ({
	root: {
		flexGrow: 1,
		backgroundColor: colors.white,

		display: "flex",
		flexDirection: "column",
	},
}));

export default function SimpleTabs() {
	const classes = useStyles();
	const [value, setValue] = React.useState(0);

	const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
		setValue(newValue);
	};

	return (
		<div className={classes.root}>
			<AppBar position="static">
				<CustomTabs
					value={value}
					onChange={handleChange}
					aria-label="Inventário"
					centered
				>
					<CustomTab label="Clientes" {...a11yProps(0)} />
					<CustomTab label="Produtos" {...a11yProps(1)} />
				</CustomTabs>
			</AppBar>
			<TabPanel value={value} index={0}>
				<ClientsList />
			</TabPanel>
			<TabPanel value={value} index={1}>
				<ProductsList />
			</TabPanel>
		</div>
	);
}
