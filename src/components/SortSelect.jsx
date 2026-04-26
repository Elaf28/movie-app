import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import sortGroups from '@/constants/sortGroups';
import { useSearchParams } from 'react-router';

function SortSelect() {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get('sort') || '';

  const handleValueChange = (value) => {
    const params = new URLSearchParams(searchParams);
    params.set('sort', value);
    params.set('page', '1');
    setSearchParams(params);
  };

  return (
    <Select value={currentSort} onValueChange={handleValueChange}>
      <SelectTrigger className="w-full max-w-48">
        <SelectValue placeholder="Sort By" />
      </SelectTrigger>
      <SelectContent>
        {sortGroups.map((group, i) => (
          <SelectGroup key={i}>
            <SelectLabel>{group.name}</SelectLabel>
            <SelectItem value={group.options[0].value} className='cursor-pointer'>
              {group.options[0].label}
            </SelectItem>
            <SelectItem value={group.options[1].value} className='cursor-pointer'>
              {group.options[1].label}
            </SelectItem>
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}

export default SortSelect;
