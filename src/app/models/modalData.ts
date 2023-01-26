import { ModalType } from "./Enums/modalType";

export interface ModalData {
  hasCancelButton: boolean,
  buttonTitle: string;
  title: string;
  modalType: ModalType,
  response: boolean,
  message: string,
  object: Object | null,
  isDisabled: boolean
}