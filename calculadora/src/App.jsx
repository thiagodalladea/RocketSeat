import React from "react";

const textVariants = {
	default: "text-xl",
	muted: "text-xl text-(--text-secondary)",
	heading: "text-2xl",
	blast: "text-3xl",
	title: "text-4xl",
};

const buttonVariants = {
	default: "bg-(--background)",
	primary: "bg-(--primary)"
}

const buttons = [
	[
		{ input: "C", className: "flex-1 h-16" },
		{ input: "/", variant: "primary" },
	],
	[
		{ input: "7" },
		{ input: "8" },
		{ input: "9" },
		{ input: "*", variant: "primary" },
	],
	[
		{ input: "4" },
		{ input: "5" },
		{ input: "6" },
		{ input: "-", variant: "primary" },
	],
	[
		{ input: "1" },
		{ input: "2" },
		{ input: "3" },
		{ input: "+", variant: "primary" },
	],
	[
		{ input: "0", className: "flex-1 h-16" },
		{ input: "," },
		{ input: "=", className: "w-16 h-16 bg-[#7F45E2]" },
	]
]

const CalculatorContext = React.createContext()

function CalculatorProvider ({ children }) {
	const [history, setHistory] = React.useState([])

	function updateHistory(operation, parsedResult) {
		setHistory(prev => [...prev, `${operation}=${parsedResult}`])
	}

	return (
		<CalculatorContext.Provider
			value={{ history, updateHistory }}
		>
			{ children }
		</CalculatorContext.Provider>
	)
}

function Text({
	as = "span",
	variant = "default",
	className,
	children,
	...props
}) {
	return React.createElement(
		as,
		{
			className: `${textVariants[variant]} ${className ? className : ""}`,
			...props,
		},
		children,
	);
}

function Button({ children, className, variant="default", ...props }) {
	return( 
		<Text
			as="button"
			variant="heading"
			className={
				`flex items-center justify-center rounded-xl p-3 cursor-pointer text-(--text) 
				bg-linear-(--gradient) hover:bg-linear-(--gradient-hover) shadow-(--shadow)
				${ buttonVariants[variant] }
				${ className ? className : "" }`
			}
			{...props}
		>
			{ children }
		</Text>
	)
}

function Card({ children, className, ...props }) {
	return(
		<div className={`
			bg-(--background) shadow-(--shadow) rounded-2xl
			${ className ? className : ""}
		`}
		>
			{ children }
		</div>
	)
}

function CalculatorDisplay({ operation, result }) {
	return(
		<div className={`
			flex flex-col gap-2 px-[1.375rem] cursor-default select-none
		`}
		>
			<Text as="div" className="flex items-center justify-end h-7" variant="muted">
				{ result && operation}
			</Text>
			<div className={`
				flex items-center justify-between h-9
			`}
			>
				<Text variant="muted">
					=
				</Text>
				<Text variant="blast">
					{ result || operation }
				</Text>
			</div>
		</div>
	)
}

function Calculator() {
	const [operation, setOperation] = React.useState("")
	const [result, setResult] = React.useState("")
	const { updateHistory } = React.useContext(CalculatorContext)

	function handleInputClick(input) {
		if (input === "C") {
			setOperation("")
			setResult("")
			return
		}

		if (input === "=") {
			const operationResult = eval(operation.replace(/,/g, "."))
			const parsedResult = operationResult.toString()?.replace(/\./g, ",")
			setResult(parsedResult)
			updateHistory(operation, parsedResult)
			return
		}

		if (result) {
			setOperation(isNaN(input) ? `${result}${input}` : input)
			setResult("")
			return
		}

		setOperation(`${operation}${input}`)
	}

	return(
		<Card className={`
			flex flex-col gap-[1.625rem] w-[22.25rem] pt-14 px-8 pb-8
		`}
		>
			<CalculatorDisplay
				operation={ operation }
				result={ result }
			>
			</CalculatorDisplay>

			<div className="flex flex-col gap-3">
				{ buttons.map((row, index) => (
					<div key={`row-${index}`} className="flex gap-3">
						{ row.map(button => (
							<Button
								key={button.input}
								className={button.className ? button.className : "w-16 h-16"}
								variant={button.variant}
								onClick={() => handleInputClick(button.input)}
							>
								{button.input}
							</Button>
						)) }
						
					</div>
				)) }
			</div>
		</Card>
	)
}

function OperationHistory() {
	const { history } = React.useContext(CalculatorContext);

	return (
		<Card className="py-10 px-8 w-full">
			<Text
				as="h1"
				variant="heading"
				className={`
					mb-4
				`}
			>
				Histórico de Operações
			</Text>
			{history.length > 0 ? (
				<ul className="flex flex-col gap-3">
					{history.map((value, index) => (
						<Text key={`item-${index}`} as="li" variant="muted">{value}</Text>
					))}
				</ul>
			) : (
				<Text as="p" variant="muted">Nenhuma operação recente.</Text>
			)}
		</Card>
	);
}
																																																																		
export default function App() {
	return(
		<>
			<Text as="h1" variant="title" className={"text-(--text) pt-15 text-center"}>
				Calculadora com React.JS
			</Text>
			<main className="px-16 py-22 flex flex-col sm:flex-row items-center sm:items-stretch justify-center gap-3">
				<CalculatorProvider>
					<Calculator />
					<OperationHistory />
				</CalculatorProvider>
			</main>
		</>
	);
}