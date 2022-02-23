import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Layout from "../components/Layout";
import Auth from "../components/Auth";

export default function Home() {
  return (
    <Layout title="Login">
      <Auth />
    </Layout>
  );
}
