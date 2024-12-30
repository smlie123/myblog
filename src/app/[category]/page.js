import { redirect } from 'next/navigation'
export default async function Home({ params }) {
    const { category } = await params;
    console.log(category)
    redirect(`/${category}/1`)
}
