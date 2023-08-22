import {
  EuiModal,
  EuiModalBody,
  EuiModalHeader,
  EuiModalHeaderTitle,
} from "@elastic/eui";

export interface ModalProps {
  onCloseModal: () => void;
  children: React.ReactNode;
  titleModal: string;
  minWdith?: string | number;
}

export const Modal: React.FC<ModalProps> = ({
  onCloseModal,
  children,
  titleModal,
  minWdith,
}) => {
  return (
    <EuiModal onClose={onCloseModal} style={{ minWidth: minWdith}}>
      <EuiModalHeader>
        <EuiModalHeaderTitle>{titleModal}</EuiModalHeaderTitle>
      </EuiModalHeader>
      <EuiModalBody>{children}</EuiModalBody>
    </EuiModal>
  );
};
