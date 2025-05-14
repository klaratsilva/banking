"use client";

import CountUp from "react-countup";

const AnimatedCounter = ({
  totalCurrentBalance,
}: {
  totalCurrentBalance: number;
}) => {
  return (
    <div>
      <CountUp end={totalCurrentBalance} decimal="," prefix="$" duration={3} />
    </div>
  );
};

export default AnimatedCounter;
