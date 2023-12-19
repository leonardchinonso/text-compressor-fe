import { NextRequest } from "@/node_modules/next/server";
import { BenchmarkRequest } from "@/utils/service";


const validateRequest = (request: BenchmarkRequest) => {
    if (!request.text) {
      throw new Error('Input text is required');
    }
};


export async function POST(request: NextRequest) {
    const reqBody = (await request.json()) as BenchmarkRequest;

    try {
        validateRequest(reqBody);
      } catch (e) {
        if (e instanceof Error) {
          return new Response(e.message, { status: 400 });
        }
    }

    const response = await fetch("http://localhost:8000/v1/single-thread", {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqBody),
    }).then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      const ret = res.json();
      return ret;
    });

    return new Response(JSON.stringify(response), {
      status: 200,
    });
}
