/* eslint-disable import/no-unresolved */
import Head from "next/head";
import styled from "styled-components";

import TranslateModule from "@/client/ui/modules/Translate/TranslateModule";

const Home = () => (
  <>
    <Head>
      <title>Persodict</title>
    </Head>
    <Wrapper>
      <TranslateModule />
    </Wrapper>
  </>
);

export default Home;

export const Wrapper = styled.main`
  margin: auto;
  max-width: 40rem;
`;

/* eslint-disable import/no-unresolved */
// import Head from "next/head";
// import styled from "styled-components";

// import TranslateModule from "@/client/ui/modules/Translate/TranslateModule";
// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]";
// import { useEffect, useState } from "react";

// const Home = () => {
//   const [session, setSession] = useState<any>({} || null);

//   useEffect(() => {
//     async function fetchData() {
//       try {
//         const sesh = await getServerSession(authOptions);
//         setSession(sesh);
//         console.log("ssssssssssssssssssssssssssssssssssssssss", sesh);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     fetchData();
//   }, []);

//   return (
//     <>
//       <Head>
//         <title>Persodict - {session?.user?.name ?? 'test'}</title>
//         <meta content="width=device-width, initial-scale=1" name="viewport" />
//         <link href="/favicon.ico" rel="icon" />
//       </Head>
//       <Wrapper>
//         <TranslateModule />
//       </Wrapper>
//     </>
//   );
// };

// export default Home;

// export const Wrapper = styled.main`
//   margin: auto;
//   max-width: 40rem;
// `;
