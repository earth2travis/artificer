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
    <div className="max-w-xl mx-auto flex flex-col gap-6 items-center justify-center min-h-screen" style={{ background: 'var(--scroll-100)' }}>
      <h1 className="text-5xl font-black">Artificer</h1>
      <h2 className="text-2xl font-bold">Context Aware Artificial Intelligence</h2>
      <p>We connect your AI to real customer data, internal systems, and business processes.</p>
      <div className='flex items-center'>
        <Button
          onClick={sendRequest}
        >
          Contact Us
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
        <p>For adventurers struggling to connect AI tools to organizational knowledge, Artificer forges MCP servers that transform generic assistants into context-aware systems. We deliver production ready implementations with enterprise grade security, enabling the full power of your realm's data.</p>
    </div>
  )
}

export default App