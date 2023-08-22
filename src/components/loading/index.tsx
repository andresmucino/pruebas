import {
  EuiPageHeader,
  EuiPanel,
  EuiSkeletonText,
} from "@elastic/eui";

export interface LoadingPageProps {
  isLoading: boolean;
}

export const LoadingPage: React.FC<LoadingPageProps> = ({ isLoading }) => {
  return (
    <EuiPanel style={{ margin: "2vh" }}>
      <EuiPageHeader>
        <EuiSkeletonText
          lines={1}
          size={"relative"}
          isLoading={isLoading}
        ></EuiSkeletonText>
      </EuiPageHeader>
      <EuiSkeletonText
        lines={6}
        size={"m"}
        isLoading={isLoading}
      ></EuiSkeletonText>
    </EuiPanel>
  );
};
