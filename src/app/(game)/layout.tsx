import TrpcProvider from "@/components/provider/TrpcProvider";
import { Toaster } from "@/components/ui/toaster";
import { PropsWithChildren } from "react";

const gameLayout = ({children}:PropsWithChildren) => {
  return (
    <TrpcProvider>
      {children}
      <Toaster />
    </TrpcProvider>
  );
}

export default gameLayout;