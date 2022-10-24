import { Span } from "components";

type Props = {
  text: string;
  isLoading: boolean;
};

export const FormButton = ({ isLoading, text }: Props) => (
  <button
    type="submit"
    className={`px-4 py-1 ${
      isLoading ? "bg-gray-400" : "bg-gray-600"
    } font-semibold rounded-lg text-white`}
    disabled={isLoading}
  >
    {isLoading ? <Span>Loading...</Span> : <Span>{text}</Span>}
  </button>
);
