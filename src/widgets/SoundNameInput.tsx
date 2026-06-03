function SoundNameInput({
  defaultName,
  onNameChange,
}: {
  defaultName:string | null
  onNameChange: (name: string) => void;
}) {
  return (
    <input
      onChange={(event) => {
        onNameChange(event.target.value);
      }}
      className="sound-name-input"
      value={defaultName ? defaultName : ""}
      type="text"
      placeholder="Podaj nazwę dźwięku"
    ></input>
  );
}

export default SoundNameInput;
