export default async function fetchLib<R>(path: string, optons?: RequestInit) {
  const req = await fetch(`${process.env.NEXT_PUBLIC_GO_WRAP_API_URL}${path}`, optons);
  const res: R = await req.json();
  return res;
}
