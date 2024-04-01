interface PageHeaderProps {
  children: React.ReactNode;
}

function PageHeader({ children }: PageHeaderProps) {
  return <header className="text-4xl mb-4">{children}</header>;
}

export default PageHeader;
