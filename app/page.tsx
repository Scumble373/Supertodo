import Image from "next/image";
import Section from "./components/layout/Section";
import Navigation from "./components/layout/Navigation";

//Hey this is a comment from scotts work computer
export default function Home() {
  return (
    <>
    <Navigation />
      <Section classOptions={"flex justify-center flex-col"}>
        <h1 className="mx-auto text-center mt-7 font-sans text-5xl font-bold">The Last To-do App You'll Ever Need</h1>
        <img className="mx-auto mt-5" src={"https://placehold.co/1000x600"} width='1000px' height='600px' alt="hero" />
      </Section>
      <Section classOptions={"flex justify-center flex-col"}>
        <p></p>
      </Section>
    </>
  )
}
