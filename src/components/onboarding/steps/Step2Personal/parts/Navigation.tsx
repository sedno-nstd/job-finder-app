import { FormNavigation } from "@/src/components/shared/FormNavigation";

interface Props {
  prevStep: () => void;
}

export function Step2Nvaigation({ prevStep }: Props) {
  return <FormNavigation onBack={prevStep} variant="registration" />;
}
