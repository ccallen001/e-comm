import {
  DropdownMenu as ShadCnUiDropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownMenuProps {
  trigger: React.ReactNode;
  label: React.ReactNode;
  items: React.ReactNode[];
}

function DropdownMenu({ trigger, label, items }: DropdownMenuProps) {
  return (
    <ShadCnUiDropdownMenu>
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{label}</DropdownMenuLabel>

        <DropdownMenuSeparator />

        {items.map((item, i) => (
          <DropdownMenuItem key={i} className="flex-col">
            {item}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </ShadCnUiDropdownMenu>
  );
}

export default DropdownMenu;
