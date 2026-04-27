export const Container = ({ children, className }) => (
  <div className={`px-3 md:px-6 lg:px-10 max-w-[1400px] mx-auto w-full ${className}`}>
    {children}
  </div>
);