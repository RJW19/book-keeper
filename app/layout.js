import SessionProvider from "./components/ClientSessionProvider";
import "./globals.css";

export default async function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <main className="mx-auto max-w-5xl text-2xl flex gap-2">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
