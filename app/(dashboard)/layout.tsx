import MainWrapper from "@/components/layouts/MainWrapper";

export default function Layout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        <MainWrapper>
          {children}
        </MainWrapper>
      </>
    )
  }