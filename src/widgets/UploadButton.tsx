function UploadButton({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}) {
  return (
    <button disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
}

export default UploadButton;
