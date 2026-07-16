import { Search } from "@/shared/constants/icons";

interface Props {
  placeholder?: string;
}

const SearchInput = ({ placeholder = "Search..." }: Props) => {
  return (
    <div className="relative hidden lg:block w-full max-w-md">
      <Search
        size={18}
        className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
      />

      <input type="text" placeholder={placeholder} className="ls-input pl-10" />
    </div>
  );
};

export default SearchInput;
