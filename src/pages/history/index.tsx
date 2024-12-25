import SessionLayout from "@/client/ui/layouts/Layout";
import { HistoryModule } from "@/client/ui/modules/Historz/HistoryModule";
import { NextPageWithLayout } from "@/types/global";
import { Wrapper } from "..";

const History: NextPageWithLayout = () => (
  <Wrapper>
    <HistoryModule />
  </Wrapper>
);

export default History;

History.getLayout = (router, pageProps, PageComponent) => (
  <SessionLayout title="Persodict | History">
    <PageComponent router={router} {...pageProps} />
  </SessionLayout>
);

export const getServerSideProps = async () => ({ props: {} });