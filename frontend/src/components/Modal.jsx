const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50">
          </div>
          <div className="absolute top-[40%] right-[50%] bg-black p-4 rounded-lg z-10 text-right">
          <h1 className="text-white absolute left-7">Update/Delete category</h1>

            <button
              onClick={onClose}
              className="text-black mb-2 px-2 font-semibold bg-white rounded-full hover:text-gray-500 focus:outline-none mr-2"
            >
              X
            </button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
