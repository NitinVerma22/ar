/* eslint-disable @typescript-eslint/no-explicit-any */
export const config = {
  runtime: "nodejs",
};

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Requested-With",
  "Access-Control-Max-Age": "86400",
};

export async function OPTIONS() {
  return new Response(null, {
    status: 200, // YE 204 se 200 kar diya
    headers: CORS_HEADERS,
  });
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbyLmwQgNGBovMFd7U-TIzD7MqJRU_w0KCUUVx2fJbMrXmotqllGw5RghtKz_iq3IuNJ/exec",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    const text = await response.text();

    let payload: any;
    try {
      payload = JSON.parse(text);
    } catch {
      payload = { message: text };
    }

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        ...CORS_HEADERS,
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: "Something went wrong",
        details: error?.message || error,
      }),
      {
        status: 500,
        headers: {
          ...CORS_HEADERS,
          "Content-Type": "application/json",
        },
      }
    );
  }
}