"use client"

import { useEffect, useState } from "react";

const CurrentYear: React.FC = () => {
	const [year, setYear] = useState<number | null>(null);

 	useEffect(() => {
 		setYear(new Date().getFullYear());
 	}, []);

	return <span>{year ?? new Date().getFullYear()}</span>;
};

export default CurrentYear;


