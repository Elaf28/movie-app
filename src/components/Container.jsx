export const Container = ({ children, className }) => (
  <div
    className={`mx-auto w-full max-w-[1400px] px-3 md:px-6 lg:px-10 ${className}`}
  >
    {children}
  </div>
);
