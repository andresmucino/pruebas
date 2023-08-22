import { EuiLoadingSpinner } from "@elastic/eui";
import "./styles.css";

interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  children: React.ReactNode;
  isDisabled?: boolean;
  isLoading?: boolean;
  type?: "button" | "reset" | "submit";
  color?: string;
  fill?: boolean;
  size?: string;
}

export const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  isDisabled,
  isLoading,
  type,
  color,
  fill,
  size,
}) => {
  const styleButton = fill ? "btn-style-fill" : "btn-style-border";
  const witten =
    size === "s" ? "100px" : size === "" ? "100%" : size === "m" ? "120px" : "";

  return (
    <button
      className={`btn btn-1 btn-sep icon-info ${styleButton}`}
      style={{ borderRadius: "6px", backgroundColor: color, width: witten }}
      onClick={onClick}
      disabled={isDisabled || isLoading === true}
      type={type}
    >
      {isLoading && <EuiLoadingSpinner size="m" />}{" "}
      <span style={{ paddingLeft: "8px" }}>{children}</span>
    </button>
  );
};
