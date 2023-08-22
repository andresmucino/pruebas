import {
  EuiPanel,
  EuiSpacer,
  EuiTabbedContent,
  EuiTabbedContentTab,
} from "@elastic/eui";

export const colors = {
  primary: "#36A2EF",
  success: "#7DDED8",
  warning: "#F3D371",
  danger: "#F86B63",
  pending: "#98A2B3",
};

export interface TabsProps {
  tabs: EuiTabbedContentTab[];
  color?: string;
  index?: string;
}

export const Tabs: React.FC<TabsProps> = ({ tabs, color, index }) => {
  return (
    <>
      <EuiPanel style={{ padding: "0" }}>
        <div style={{ display: "flex" }}>
          <div
            style={{
              marginRight: "1rem",
              borderRadius: "0.3rem",
              backgroundColor: color,
              display: "flex",
              alignItems: "center",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "100%",
                padding: "0.4rem",
                margin: "0.2rem",
                color: color,
              }}
            >
              {index}
            </div>
          </div>
          <EuiTabbedContent
            style={{ width: "100%" }}
            tabs={tabs}
            initialSelectedTab={tabs[0]}
          />
        </div>
      </EuiPanel>
      <EuiSpacer />
    </>
  );
};
