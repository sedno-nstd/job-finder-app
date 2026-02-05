import { FormNavigation } from "../../Step3JobPreferences/parts/FormNavigation";

interface Props {
  prevStep: () => void;
  isValid: boolean;
}

export function Step2Nvaigation({ isValid, prevStep }: Props) {
  return <FormNavigation isValid={isValid} data={[""]} prevStep={prevStep} />;
}
