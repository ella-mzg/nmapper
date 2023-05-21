import Header from "@/components/Header"
import Page from "@/components/Page"
import ScanDetail from "@/components/ScanDetail"
import { useRouter } from "next/router"

export default function ScanDetailPage() {
  const router = useRouter()
  const { scanId } = router.query

  return (
    <>
      <Page>
        <Header />
        <ScanDetail scanId={scanId} />
      </Page>
    </>
  )
}
