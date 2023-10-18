import { useState, ChangeEvent } from 'react';

interface ProjectNameFormProps {
  onAddName: (name: string) => void;
  setErrors: (errors: any) => void;
}

const ProjectNameForm: React.FC<ProjectNameFormProps> = ({ onAddName, setErrors }) => {
  const [name, setName] = useState<string>('');

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setErrors(null);
    setName(e.target.value);
    onAddName(e.target.value);
  };

  return (
    <div className="mt-4 flex items-baseline">
      <input
        type="text"
        placeholder="Add project name..."
        className="w-full p-2 border rounded-md"
        value={name}
        onChange={handleNameChange}
      />
    </div>
  );
};

export default ProjectNameForm;
