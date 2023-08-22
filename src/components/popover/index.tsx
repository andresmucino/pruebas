import { EuiPopover, EuiText } from "@elastic/eui";

interface PopoverProps {
  children: React.ReactNode;
  button: NonNullable<React.ReactNode> | undefined;
  isPopoverOpen: boolean;
  closePopover: () => void;
}

export const Popover: React.FC<PopoverProps> = ({
  children,
  button,
  closePopover,
  isPopoverOpen,
}) => {
  return (
    <EuiPopover
      button={button}
      isOpen={isPopoverOpen}
      closePopover={closePopover}
      anchorPosition="downCenter"
    >
      {children}
    </EuiPopover>
  );
};
