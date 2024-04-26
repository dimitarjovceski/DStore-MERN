const CategoryForm = ({
  value,
  setValue,
  buttonText,
  handleSubmit,
  handleDelete,
}) => {
  return (
    <div className="p-3 justify-center flex">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Write category name"
          className=" p-1 rounded-md"
        />

        <div className="flex justify-between gap-2">
          <button onClick={handleSubmit} className="bg-green-500 text-white py-2 px-4 rounded-lg  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
            {buttonText}
          </button>

          {handleDelete && (
            <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50">
              Delete
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CategoryForm;
