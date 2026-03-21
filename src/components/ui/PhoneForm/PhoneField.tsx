type Props = {
  value: string;
  onChange: (v: string) => void;
};

export function PhoneField({ value, onChange }: Props) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="flex-1 px-3 h-[48px] outline-none"
      placeholder="Phone number"
    />
  );
}
