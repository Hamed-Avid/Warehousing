import { HiOutlineX } from "react-icons/hi";

export default function Modal({ modalRef, title, handler, children }) {
  return (
    <div className="fixed inset-0 z-50 h-screen w-full bg-slate-300 bg-opacity-30 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="fixed left-1/2 top-1/2 max-h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg bg-frg p-4 shadow-lg transition-all duration-300 ease-out md:max-w-lg"
      >
        <div className="mb-6 flex items-center justify-between border-b border-b-primary pb-2">
          <p className="text-base font-bold text-primary">{title}</p>
          <button onClick={handler}>
            <HiOutlineX className="h-5 w-5 text-primary" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
