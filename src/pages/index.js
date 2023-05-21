import Header from "@/components/Header"
import Page from "@/components/Page"
import QueryForm from "@/components/queryForm"

export default function home() {
  return (
    <>
      <Page>
        <Header></Header>
        <QueryForm />
      </Page>
    </>
  )
}
