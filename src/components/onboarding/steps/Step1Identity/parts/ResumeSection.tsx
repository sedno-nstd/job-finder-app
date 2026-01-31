import { ResumeUploader } from "./ResumeUploader";
import { NoResumeCheckBox } from "./NoResumeCheckbox";

export function ResumeSection() {
  return (
    <div>
      <ResumeUploader />
      <NoResumeCheckBox />
    </div>
  );
}
