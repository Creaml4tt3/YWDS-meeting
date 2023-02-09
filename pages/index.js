import Head from "next/head";
import Nav from "./nav";

export default function Home() {
  return (
    <>
      <Head>
        <title>Booking Meeting Room App</title>
        <meta name="description" content="Created by Creaml4tt3" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="App-Container">
        <span className="Heading">Welcome to Meeting Room Booking YWDS</span>
        <span className="Sub-Heading">BY Creaml4tt3</span>
        <Nav navActive={"Home"} />
      </main>
    </>
  );
}
