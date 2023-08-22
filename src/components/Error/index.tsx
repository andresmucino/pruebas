import { EuiFlexGroup, EuiPageHeader, EuiText } from "@elastic/eui";

export interface ErrorPageProps {
  message: string;
}

export const ErrorPage: React.FC<ErrorPageProps> = ({ message }) => {
  return (
    <EuiPageHeader>
      <EuiFlexGroup justifyContent="spaceAround">
        <EuiText size="m">
          <p>{message}</p>
        </EuiText>
      </EuiFlexGroup>
    </EuiPageHeader>
  );
};
