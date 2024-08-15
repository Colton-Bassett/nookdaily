import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Nook Daily",
	description: "Nook Daily Todo App",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			{/* <Suspense fallback={<Loading />}> */}
			<body className={inter.className}>{children}</body>
			{/* </Suspense> */}
		</html>
	);
}
