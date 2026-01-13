import type { Metadata } from 'next';
import './questbook.css';

export const metadata: Metadata = {
  title: 'The Interview Quest | Zuper',
  description: "A Guide for Your Journey to Zuper - An interactive quest book for interview preparation",
};

export default function QuestBookLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Patrick+Hand&family=Permanent+Marker&family=Indie+Flower&family=Kalam:wght@300;400;700&family=Amatic+SC:wght@400;700&family=Homemade+Apple&display=swap"
        rel="stylesheet"
      />
      <div className="questbook-body">{children}</div>
    </>
  );
}
