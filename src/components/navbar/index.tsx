import { UseAuthContext } from "@/hooks/login";
import {
  EuiHeader,
  EuiHeaderLogo,
  EuiHeaderSectionItem,
} from "@elastic/eui";
import { Popover } from "../popover";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LoadingPage } from "../loading";

export interface NavbarProps {
  onClick: (event: any) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onClick }) => {
  const { user, signOut } = UseAuthContext();
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <LoadingPage isLoading={true} />;

  return (
    <>
      {user !== null && (
        <EuiHeader>
          <EuiHeaderSectionItem border="right">
            <EuiHeaderLogo iconType="menu" onClick={onClick}></EuiHeaderLogo>
          </EuiHeaderSectionItem>
          <EuiHeaderSectionItem>
            <EuiHeaderLogo iconType="help"></EuiHeaderLogo>
            <Popover
              button={
                <EuiHeaderLogo
                  iconType="user"
                  onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                ></EuiHeaderLogo>
              }
              isPopoverOpen={isPopoverOpen}
              closePopover={() => setIsPopoverOpen(!isPopoverOpen)}
            >
              <Link href={"/"} onClick={signOut}>
                Salir
              </Link>
            </Popover>
          </EuiHeaderSectionItem>
        </EuiHeader>
      )}
    </>
  );
};
