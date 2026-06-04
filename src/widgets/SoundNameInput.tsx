import { useEffect, useState } from "react";

function SoundNameInput({
  defaultName,
  onNameChange,
}: {
  defaultName:string | null
  onNameChange: (name: string | null) => void;
}) {
  const [name, setName] = useState(defaultName ?? "");

  return (
    <input
      onChange={(event) => {
        setName(event.target.value);
        onNameChange(event.target.value);
      }}
      className="sound-name-input"
      value={name}
      type="text"
      
      placeholder="Podaj nazwę dźwięku"
    ></input>
  );
}

export default SoundNameInput;
