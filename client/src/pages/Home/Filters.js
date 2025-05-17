import React from "react";
import { RxCross2 } from "react-icons/rx";

const categories = [
  { name: "Electronics", value: "electronic" },
  { name: "Home", value: "home" },
  { name: "Fashion", value: "fashion" },
  { name: "Sports", value: "sport" },
  { name: "Books", value: "book" },
  { name: "Other", value: "other" },
];

const ages = [
  { name: "0-1 Years old", value: "0-1" },
  { name: "2-5 Years old", value: "2-5" },
  { name: "6-8 Years old", value: "6-8" },
  { name: "9-12 Years old", value: "9-12" },
  { name: "13+ Years old", value: "12-20" },
];

const Filters = ({ showFilters, setshowFilters, filters, setfilters }) => {
  return (
    <div className="w-72 pt-3 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between p-3 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-[#203A43]">Filters</h1>
        <h1 className="cursor-pointer text-gray-500 hover:text-red-500">
          <RxCross2 size={21} onClick={() => setshowFilters(!showFilters)} />
        </h1>
      </div>

      <div className="flex flex-col gap-4 mt-5 p-3">
        <h1 className="text-gray-600 text-sm font-medium">Categories</h1>
        <div className="flex flex-col gap-2">
          {categories.map((category) => (
            <div key={category.value} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-[#203A43] border-gray-300 rounded focus:ring focus:ring-opacity-50"
                name="category"
                checked={filters.category.includes(category.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setfilters({
                      ...filters,
                      category: [...filters.category, category.value],
                    });
                  } else {
                    setfilters({
                      ...filters,
                      category: filters.category.filter(
                        (item) => item !== category.value
                      ),
                    });
                  }
                }}
              />
              <label htmlFor="category" className="text-gray-700">
                {category.name}
              </label>
            </div>
          ))}
        </div>

        <h1 className="text-gray-600 text-sm font-medium">Ages</h1>
        <div className="flex flex-col gap-2">
          {ages.map((age) => (
            <div key={age.value} className="flex items-center gap-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 text-[#203A43] border-gray-300 rounded focus:ring focus:ring-opacity-50"
                name="age"
                checked={filters.age.includes(age.value)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setfilters({
                      ...filters,
                      age: [...filters.age, age.value],
                    });
                  } else {
                    setfilters({
                      ...filters,
                      age: filters.age.filter((item) => item !== age.value),
                    });
                  }
                }}
              />
              <label htmlFor="age" className="text-gray-700">
                {age.name}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
