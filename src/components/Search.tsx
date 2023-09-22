import { useState } from "react";

// import { editStatusOption, yearsOption } from "../utils/options";
const SearchContainer = () => {
  const [form, setForm] = useState({
    status: "All",
    place: "All",
    dri_id: "",
    date: "All",
    customerName: "",
    appNumber: "",
    company: "All",
    membership_type: "All",
    acceptance: "accepted",
    amc: "All",
  });
  const handleInputChange = (event: any) => {
    const { name, value } = event.target;

    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(form);
  };

  return (
    <div>
      <form
        onSubmit={() => "hello"}
        className="w-full md:w-full mt-4 bg-gray-50 mx-auto rounded py-5 px-[5%]  shadow-md hover:shadow-lg transition duration-400 ease-in-out"
      >
        <div className="flex w-full items-center justify-between  mb-5">
          <h1 className="text-2xl ">Search Job </h1>
        </div>
        <div className="flex justify-evenly flex-wrap gap-3">
          {/* DRI_ID */}
          <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="status" className="text-xs">
              Position
            </label>
            <input
              id="dri_id"
              type="text"
              name="dri_id"
              value={form.dri_id}
              onChange={handleInputChange}
              className="border border-gray-400 py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* App NUMBER */}
          <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="status" className="text-xs">
              Compony
            </label>
            <input
              id="appNumber"
              type="text"
              name="appNumber"
              value={form.appNumber}
              onChange={handleInputChange}
              className="border border-gray-400 py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* status */}
          <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="status" className="text-xs">
              Job Status
            </label>
            <select
              id="status"
              name="status"
              value={form.status}
              onChange={handleInputChange}
              className="border border-gray-400 py-1 px-2 capitalize rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["Pending", "Interview", "Declined"].map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
          {/* place */}
          <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="place" className="text-xs">
              Location
            </label>
            <select
              id="place"
              name="place"
              value={form.place}
              onChange={handleInputChange}
              className="border border-gray-400 py-1 px-2 capitalize rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["Toronto", "Québec City", "Montreal", "Ottawa", "Victoria"].map(
                (data) => {
                  return (
                    <option key={data} value={data}>
                      {data}
                    </option>
                  );
                }
              )}
            </select>
          </div>
          {/* member Type */}
          <div className="flex flex-col  mb-4 flex-1">
            <label htmlFor="place" className="text-xs">
              Job Type
            </label>
            <select
              id="membership_type"
              name="membership_type"
              value={form.membership_type}
              onChange={handleInputChange}
              className="border border-gray-400 py-1 px-2 capitalize rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["full-time", "internship", "part-time"].map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div>
          {/* company */}
          {/* <div className="flex flex-col mb-4 flex-1">
            <label htmlFor="company" className="text-xs">
            company:
            </label>
            <select
              id="company"
              name="company"
              value={form.company}
              onChange={handleInputChange}
              className="border border-gray-400 py-1 px-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {["All", ...companyOptions].map((data) => {
                return (
                  <option key={data} value={data}>
                    {data}
                  </option>
                );
              })}
            </select>
          </div> */}
          {/* Date */}
        </div>

        <button
          type="submit"
          disabled={true}
          className="w-3/12 mt-6 mx-auto bg-black text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SearchContainer;
