import React from "react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-[1400px] m-auto">
      <header>헤더</header>
      <main>
        {children}
      </main>
    </div>
  )
}

export default AppLayout;