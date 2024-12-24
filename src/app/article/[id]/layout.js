
import Header from '@/components/Header/Header'

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <div>
      <Header></Header>
      {children}</div>
  );
}
