import {
  EuiCollapsibleNav,
} from "@elastic/eui";
import { Menu } from "../menu";

export interface Sidebarprops {
  navIsOpen: boolean;
  setNavIsOpen: (event: boolean) => void;
}

export const Sidebar: React.FC<Sidebarprops> = ({
  navIsOpen,
  setNavIsOpen,
}) => {
  return (
    <>
      <EuiCollapsibleNav
        isOpen={navIsOpen}
        size={240}
        onClose={() => setNavIsOpen(false)}
      >
        <Menu />
      </EuiCollapsibleNav>
    </>
  );
};
