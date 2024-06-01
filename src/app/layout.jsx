

import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { QueryClientProviderWrapper } from "./providers/QueryClientProvider";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Juross Jud Madrid | Web Developer",
  description: "Showcasing Nextjs Apps",
};

export default function RootLayout({ children }) {



  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className={inter.className}>
        <QueryClientProviderWrapper>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster /> 
          </ThemeProvider>
          </QueryClientProviderWrapper>  
      </body>
    </html>
  );
}
