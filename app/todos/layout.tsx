import Toolbar from "../components/layout/Toolbar";
import localFont from "next/font/local";
import "./../globals.css";

const geistSans = localFont({
  src: "./../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

interface LayoutProps {
    children: React.ReactNode;
}

const TodosLayout = ({children}: LayoutProps) => {
  return (
    <html lang="en">
      <body>
        <Toolbar />
        <div className={`${geistSans.variable} ${geistMono.variable} antialiased`}> 
          {children}
        </div>
      </body>
    </html>
  );
}

export default TodosLayout;