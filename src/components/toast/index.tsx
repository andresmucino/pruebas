import { EuiToast } from "@elastic/eui";

export interface ToastAlertProps {
  message: string;
  titleToast: string;
  color: "danger" | "primary" | "success" | "warning";
  iconType: string;
}

export const ToastAlert: React.FC<ToastAlertProps> = ({
  message,
  color,
  iconType,
  titleToast,
}) => (
  <EuiToast
    style={{
      position: "absolute",
      bottom: 15,
      right: 15,
      maxWidth: 320,
    }}
    title={titleToast}
    color={color}
    iconType={iconType}
  >
    <p>{message}</p>
  </EuiToast>
);
