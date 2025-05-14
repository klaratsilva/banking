import React from "react";

const RightSideBar = ({ user, transactions, banks }: RightSidebarProps) => {
  return (
    <aside className="right-sidebar">
      <section className="flex flex-col pb-8">
        <div className="profile-banner"></div>
      </section>
    </aside>
  );
};

export default RightSideBar;
