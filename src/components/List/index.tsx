import { EuiText } from "@elastic/eui";

interface SimpleListProps {
  title: string;
  description: string;
}

export const SimpleList: React.FC<SimpleListProps> = ({
  description,
  title,
}) => {
  return (
    <EuiText>
      <p style={{ paddingBottom: "0.5rem" }}>
        <span style={{ fontWeight: "bold" }}>{title}</span>
        {description}
      </p>
    </EuiText>
  );
};
