"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      const { data, error } = await supabase.from("messages").select("*");
      if (error) {
        console.error(error);
      } else {
        setMessages(data);
      }
    };
    load();
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">Supabase Connection Test</h1>
      <ul className="mt-4 space-y-2">
        {messages.map((msg) => (
          <li key={msg.id} className="p-2 border rounded">
            {msg.content} ({msg.created_at})
          </li>
        ))}
      </ul>
    </main>
  );
}
