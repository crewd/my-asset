import React from "react";

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <header>헤더</header>
      <main>
        {children}
      </main>
    </div>
  )
}

export default AppLayout;