import { useState } from 'react';
import {
  capitalizeString,
  transformUnderscoreString,
} from '@/app/utils/string-helpers';
import CheckBox from '@/app/components/CheckBox';
import Link from 'next/link';
import { VendorType } from '@/app/store/vendors/vendor-slice';

type VendorList = {
  list: { field: keyof VendorType; value: string | string[] }[];
};

export default function VendorRow({ list }: VendorList) {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <>
      <div className="flex items-center justify-center">
        <form>
          <CheckBox
            isChecked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
        </form>
      </div>
      {list.map((item, index) => {
        if (Array.isArray(item.value)) {
          let name: string = '';

          if (item.field === 'pros') {
            name = item.value.map((pro) => capitalizeString(pro)).join(', ');
          } else
            name = item.value
              .map((value) => transformUnderscoreString(value))
              .join(', ');

          return (
            <div key={index} className="table-content">
              {name}
            </div>
          );
        } else {
          let name: string = item.value;

          if (item.field === 'detailUrl' || item.field === 'visitWebsiteUrl') {
            return (
              <Link
                key={index}
                className="table-content"
                href={name}
                target="_blank"
              >
                {name}
              </Link>
            );
          }

          return (
            <div key={index} className="table-content">
              {name}
            </div>
          );
        }
      })}
    </>
  );
}
