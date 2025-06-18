import { useState } from "react";
import { Button } from "./components/ui/button";
import { hcWithType } from "server/dist/client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./components/ui/card";

const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000";

const client = hcWithType(SERVER_URL);

type ResponseType = Awaited<ReturnType<typeof client.hello.$get>>;

function App() {
  const [data, setData] = useState<
    Awaited<ReturnType<ResponseType["json"]>> | undefined
  >();

  async function sendRequest() {
    try {
      const res = await client.hello.$get();
      if (!res.ok) {
        console.log("Error fetching data");
        return;
      }
      const data = await res.json();
      setData(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="max-w-3xl mx-auto flex flex-col gap-6 items-center justify-start min-h-screen px-4 md:px-8"
      style={{ background: "var(--scroll-100)" }}
    >
      <h1 className="text-6xl md:text-5xl font-black font-title">Artificer</h1>
      <h2 className="text-2xl font-bold">Magical MCP Servers</h2>
      <p>
        Stop letting AI assistants stumble through your realm blind to its
        treasures. We forge the connections that transform generic responses
        into intelligent insights, delivering measurable ROI from your AI
        investment immediately.
      </p>
      <div className="flex items-center">
        <Button onClick={sendRequest} variant="secondary">
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
      <h2 className="text-2xl font-bold">Custom MCP Development</h2>
      <p>
        Artificer builds specialized MCP (Model Context Protocol) servers that
        connect your LLM tools to real customer data, internal systems, and
        business processes.
      </p>

      <div className="grid grid-cols-1 gap-4 w-full my-8">
        <Card>
          <CardHeader>
            <CardTitle>Tools</CardTitle>
            <CardDescription className="text-lg">
              Enable AI to take action.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Tools let your AI assistants perform real business tasks like
              updating customer records, creating support tickets, scheduling
              meetings, or deploying code. Instead of copying and pasting
              between systems, your AI becomes an active participant in your
              workflows, completing processes automatically while you focus on
              strategic decisions.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resources</CardTitle>
            <CardDescription className="text-lg">
              Connect AI to data from your business.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Feed your AI the context it needs to be useful. Resources connect
              your AI to real-time data from databases, documents, customer
              files, and business systems. No more generic responses based on
              outdated training data. Imagine your AI referencing current
              customer information, project status, and company knowledge to
              provide accurate, relevant assistance that actually understands
              your situation.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prompts</CardTitle>
            <CardDescription className="text-lg">
              Transform complex workflows into simple AI commands.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              Custom prompts act like expert templates that guide your AI
              through specialized tasks—from generating technical documentation
              to analyzing customer data patterns. Your team gets instant access
              to institutional knowledge and best practices, ensuring
              consistent, high-quality outputs without requiring everyone to
              become prompt engineering experts.
            </p>
          </CardContent>
        </Card>
      </div>
      <h2 className="text-2xl font-bold">
        AI That Actually Knows Your Business
      </h2>
      <p>
        For adventurers struggling to connect artificial intelligence to
        organizational knowledge, Artificer builds MCP servers that transform
        generic responses into business insights. We deliver secure
        implementations with enterprise grade protection, granting your AI
        access to your customers, processes, and data.
      </p>
      <div className="flex items-center">
        <Button onClick={sendRequest} variant="secondary">
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
      <div className="flex justify-center my-4">
        <img
          src="/raid-guild-logo.svg"
          alt="Raid Guild Logo"
          className="h-16 w-auto"
        />
      </div>
    </div>
  );
}

export default App;
