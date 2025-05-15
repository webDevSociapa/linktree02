export default async function GET(req){
  const response = await fetch();
  const data = await response.json();
  return data;
}


const data = await GET();
