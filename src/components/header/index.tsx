import { EuiHeaderSectionItem, EuiPageHeader, EuiText } from "@elastic/eui";

export const badges = {
  default: "#D3DAE6",
  success: "#6DCCB1",
  warning: "#F1D86F",
  danger: "#FF7E62",
  primary: "#79AAD9",
};

export interface HeaderProps {
  title: string;
  children: React.ReactNode;
  titleBadge?: String;
  colorBadge?: string;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  children,
  titleBadge,
  colorBadge,
}: HeaderProps) => {
  return (
    <EuiPageHeader>
      <EuiHeaderSectionItem border="right">
        <EuiText>
          <h1>{title}</h1>
        </EuiText>
        {titleBadge && (
          <div
            style={{
              marginLeft: "3rem",
              background: colorBadge,
              padding: "1rem",
              borderRadius: "20px",
            }}
          >
            {titleBadge}
          </div>
        )}
      </EuiHeaderSectionItem>
      <EuiHeaderSectionItem>{children}</EuiHeaderSectionItem>
    </EuiPageHeader>
  );
};
