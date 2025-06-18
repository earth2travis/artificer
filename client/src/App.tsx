import { useState } from 'react'
import { Button } from './components/ui/button'
import { hcWithType } from 'server/dist/client'

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"

const client = hcWithType(SERVER_URL);

type ResponseType = Awaited<ReturnType<typeof client.hello.$get>>;

function App() {
  const [data, setData] = useState<Awaited<ReturnType<ResponseType["json"]>> | undefined>()

  async function sendRequest() {
    try {
      const res = await client.hello.$get()
      if (!res.ok) {
        console.log("Error fetching data")
        return
      }
      const data = await res.json()
      setData(data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="max-w-xl mx-auto flex flex-col gap-6 items-center justify-start min-h-screen px-4 md:px-8" style={{ background: 'var(--scroll-100)' }}>
      <h1 className="text-6xl md:text-5xl font-black font-title">Artificer</h1>
      <h2 className="text-2xl font-bold">Magical MCP Servers</h2>
      <p>Stop wasting your AI investment on generic responses. We connect your tools to real customer data, internal systems, and business processes to immediately deliver a measurable ROI.</p>
      <div className='flex items-center'>
        <Button
          onClick={sendRequest}
          variant='secondary'
        >
          Schedule Free Consultation
        </Button>
      </div>
        {data && (
          <pre className="bg-gray-100 p-4 rounded-md">
            <code>
            Message: {data.message} <br />
            Success: {data.success.toString()}
            </code>
          </pre>
        )}
        <h2 className="text-2xl font-bold">AI That Actually Knows Your Business</h2>
        <p>For adventurers struggling to connect artificial intelligence to organizational knowledge, Artificer builds MCP servers that transform generic responses into business insights. We deliver secure implementations with enterprise grade protection, granting your AI access to your customers, processes, and data.</p>
    </div>
  )
}

export default App